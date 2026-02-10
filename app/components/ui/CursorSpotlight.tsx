"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

type HoverState = "default" | "text" | "clickable" | "image";

const TEXT_TAGS = new Set([
    "P", "H1", "H2", "H3", "H4", "H5", "H6",
    "SPAN", "LABEL", "LI", "BLOCKQUOTE", "EM", "STRONG", "B", "I", "U",
    "SMALL", "MARK", "SUB", "SUP", "CODE", "PRE",
]);

const CURSOR_SIZES: Record<HoverState, number> = {
    default: 30,
    text: 120,
    clickable: 150,
    image: 200,
};

// 8 points around the circle edge + center = 9 sample points
const SAMPLE_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];

function isImageEl(el: Element): boolean {
    return !!(
        (el instanceof HTMLElement && el.dataset.cursor === "image") ||
        el.closest("[data-cursor='image']")
    );
}

function isClickableEl(el: Element): boolean {
    const tag = el.tagName;
    if (
        tag === "BUTTON" ||
        tag === "A" ||
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        !!el.closest("button") ||
        !!el.closest("a")
    ) return true;

    // Check for cursor-pointer class (global CSS overrides computed style with !important)
    if (el instanceof HTMLElement) {
        if (el.classList.contains("cursor-pointer") ||
            !!el.closest(".cursor-pointer")) return true;
        // Check for role or onclick attributes
        const role = el.getAttribute("role");
        if (role === "button" || role === "link" || role === "tab" || role === "menuitem") return true;
    }

    return false;
}

function isTextEl(el: Element): boolean {
    return (
        TEXT_TAGS.has(el.tagName) ||
        !!el.closest("p, h1, h2, h3, h4, h5, h6, li, blockquote")
    );
}

/** Collect unique elements at sampled points across the circle area */
function getElementsInRadius(
    cx: number,
    cy: number,
    radius: number
): Element[] {
    const seen = new Set<Element>();
    const elements: Element[] = [];

    // Sample center
    for (const el of document.elementsFromPoint(cx, cy)) {
        if (!seen.has(el)) {
            seen.add(el);
            elements.push(el);
        }
    }

    // Sample edge points
    for (const angle of SAMPLE_ANGLES) {
        const rad = (angle * Math.PI) / 180;
        const x = cx + Math.cos(rad) * radius;
        const y = cy + Math.sin(rad) * radius;
        for (const el of document.elementsFromPoint(x, y)) {
            if (!seen.has(el)) {
                seen.add(el);
                elements.push(el);
            }
        }
    }

    // Sample at half-radius for better coverage
    for (const angle of SAMPLE_ANGLES) {
        const rad = (angle * Math.PI) / 180;
        const x = cx + Math.cos(rad) * radius * 0.5;
        const y = cy + Math.sin(rad) * radius * 0.5;
        for (const el of document.elementsFromPoint(x, y)) {
            if (!seen.has(el)) {
                seen.add(el);
                elements.push(el);
            }
        }
    }

    return elements;
}

export default function CursorSpotlight() {
    const hoverStateRef = useRef<HoverState>("default");
    const currentSizeRef = useRef(CURSOR_SIZES.default);

    // Use MotionValues for high-performance tracking
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // Animated size as a motion value for smooth transitions
    const sizeValue = useMotionValue(CURSOR_SIZES.default);
    const springSize = useSpring(sizeValue, {
        stiffness: 450,
        damping: 25,
        mass: 0.5,
    });

    // Spring physics for smooth following
    const springConfig = { damping: 25, stiffness: 400, mass: 0.8 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    const classifyElements = useCallback(
        (cx: number, cy: number, radius: number): HoverState => {
            const elements = getElementsInRadius(cx, cy, radius);

            // Image takes highest priority
            for (const el of elements) {
                if (isImageEl(el)) return "image";
            }
            // Then clickable
            for (const el of elements) {
                if (isClickableEl(el)) return "clickable";
            }
            // Then text
            for (const el of elements) {
                if (isTextEl(el)) return "text";
            }
            return "default";
        },
        []
    );

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);

            // Use the current visible radius for hit-testing
            const currentRadius = currentSizeRef.current / 2;
            const newState = classifyElements(
                e.clientX,
                e.clientY,
                currentRadius
            );

            if (newState !== hoverStateRef.current) {
                hoverStateRef.current = newState;
                const newSize = CURSOR_SIZES[newState];
                currentSizeRef.current = newSize;
                sizeValue.set(newSize);
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY, classifyElements, sizeValue]);

    return (
        <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full mix-blend-difference"
            style={{
                x: springX,
                y: springY,
                width: springSize,
                height: springSize,
                translateX: "-50%",
                translateY: "-50%",
                backgroundColor: "#FFFFFF",
            }}
        />
    );
}
