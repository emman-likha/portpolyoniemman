"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CursorSpotlight() {
    const [isHoveringClickable, setIsHoveringClickable] = useState(false);

    // Use MotionValues for high-performance tracking
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // Spring physics for smooth following - slightly looser for "organic" feel
    const springConfig = { damping: 25, stiffness: 400, mass: 0.8 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);

            // Check if hovering over a clickable element
            const target = e.target as HTMLElement;
            // Expanded clickable detection
            const isClickable =
                target.tagName === "BUTTON" ||
                target.tagName === "A" ||
                target.tagName === "INPUT" ||
                target.tagName === "TEXTAREA" ||
                target.closest("button") ||
                target.closest("a") ||
                window.getComputedStyle(target).cursor === "pointer";

            setIsHoveringClickable(!!isClickable);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full mix-blend-difference"
                style={{
                    x: springX,
                    y: springY,
                    translateX: "-50%",
                    translateY: "-50%",
                    backgroundColor: "#FFFFFF", // Use White/Lightest to invert to Darkest
                }}
                animate={{
                    width: isHoveringClickable ? 150 : 30, // Much larger expansion
                    height: isHoveringClickable ? 150 : 30,
                    opacity: 1,
                }}
                transition={{
                    type: "spring",
                    stiffness: 450,
                    damping: 25,
                    mass: 0.5,
                }}
            />
        </>
    );
}
