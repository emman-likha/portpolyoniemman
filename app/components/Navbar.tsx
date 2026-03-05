"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";


const navLinks = [
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
];

const sectionIds = navLinks.map((l) => l.href.replace("#", ""));

const LOGO_FONT = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

function AnimatedLogo() {
    const texts = ["Portpolyo ni Emman", "Emman's Portfolio"];
    const containerRef = useRef<HTMLDivElement>(null);
    const stateRef = useRef({
        currentIndex: 0,
        transitioning: false,
        smoothFill: 0,
        // "filling" = scroll down, fill left-to-right from 0→1
        // "draining" = scroll up, drain right-to-left from 1→0
        phase: "filling" as "filling" | "draining",
    });

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const fillColor = "#E8E4DB";
        const strokeColor = "#A8A49E";
        const svgHeight = 32;
        const fontSize = 18;
        const FILL_SCROLL_RANGE = 400;
        let clipIdCounter = 0;

        function createSvgForText(text: string): SVGSVGElement {
            const measure = document.createElement("canvas").getContext("2d")!;
            measure.font = `700 ${fontSize}px ${LOGO_FONT}`;
            const metrics = measure.measureText(text);
            const textWidth = Math.ceil(metrics.width) + 4;
            const clipId = `logo-clip-${clipIdCounter++}`;

            const ns = "http://www.w3.org/2000/svg";
            const svg = document.createElementNS(ns, "svg");
            svg.setAttribute("width", String(textWidth));
            svg.setAttribute("height", String(svgHeight));
            svg.setAttribute("viewBox", `0 0 ${textWidth} ${svgHeight}`);
            svg.style.display = "block";
            svg.style.overflow = "visible";

            const defs = document.createElementNS(ns, "defs");
            const clipPath = document.createElementNS(ns, "clipPath");
            clipPath.setAttribute("id", clipId);
            const clipRect = document.createElementNS(ns, "rect");
            clipRect.setAttribute("x", "0");
            clipRect.setAttribute("y", "0");
            clipRect.setAttribute("width", "0");
            clipRect.setAttribute("height", String(svgHeight));
            clipRect.setAttribute("data-role", "clip-rect");
            clipPath.appendChild(clipRect);
            defs.appendChild(clipPath);
            svg.appendChild(defs);

            const strokeText = document.createElementNS(ns, "text");
            strokeText.setAttribute("x", "2");
            strokeText.setAttribute("y", "22");
            strokeText.setAttribute("font-family", LOGO_FONT);
            strokeText.setAttribute("font-size", String(fontSize));
            strokeText.setAttribute("font-weight", "700");
            strokeText.setAttribute("fill", "none");
            strokeText.setAttribute("stroke", strokeColor);
            strokeText.setAttribute("stroke-width", "0.8");
            strokeText.setAttribute("letter-spacing", "-0.02em");
            strokeText.textContent = text;
            svg.appendChild(strokeText);

            const fillText = document.createElementNS(ns, "text");
            fillText.setAttribute("x", "2");
            fillText.setAttribute("y", "22");
            fillText.setAttribute("font-family", LOGO_FONT);
            fillText.setAttribute("font-size", String(fontSize));
            fillText.setAttribute("font-weight", "700");
            fillText.setAttribute("fill", fillColor);
            fillText.setAttribute("stroke", "none");
            fillText.setAttribute("letter-spacing", "-0.02em");
            fillText.setAttribute("clip-path", `url(#${clipId})`);
            fillText.textContent = text;
            svg.appendChild(fillText);

            return svg;
        }

        const wrapper = document.createElement("div");
        wrapper.style.position = "relative";
        wrapper.style.height = `${svgHeight}px`;

        const svgs = texts.map((t, i) => {
            const svg = createSvgForText(t);
            const svgWrap = document.createElement("div");
            svgWrap.style.position = i === 0 ? "relative" : "absolute";
            svgWrap.style.top = "0";
            svgWrap.style.left = "0";
            svgWrap.style.opacity = i === 0 ? "1" : "0";
            svgWrap.appendChild(svg);
            wrapper.appendChild(svgWrap);
            return { wrap: svgWrap, svg };
        });

        container.innerHTML = "";
        container.appendChild(wrapper);

        function getSvgWidth(idx: number): number {
            return parseFloat(svgs[idx].svg.getAttribute("width")!);
        }

        function getClipRect(idx: number): SVGRectElement {
            return svgs[idx].svg.querySelector('[data-role="clip-rect"]')!;
        }

        function setClipFill(idx: number, fillAmount: number) {
            const totalWidth = getSvgWidth(idx);
            const clipRect = getClipRect(idx);
            clipRect.setAttribute("x", "0");
            clipRect.setAttribute("width", String(fillAmount * totalWidth));
        }

        let fillAnchor = window.scrollY;

        // Always transitions to the NEXT word in the array
        // direction controls slide animation + whether next word starts outlined or filled
        function transitionToNext(direction: "down" | "up") {
            const s = stateRef.current;
            if (s.transitioning) return;
            s.transitioning = true;

            const oldIdx = s.currentIndex;
            const newIdx = (oldIdx + 1) % texts.length;
            const oldWrap = svgs[oldIdx].wrap;
            const newWrap = svgs[newIdx].wrap;

            if (direction === "down") {
                // Scroll down: next word starts OUTLINED (fill=0)
                setClipFill(newIdx, 0);
            } else {
                // Scroll up: next word starts FILLED (fill=1)
                setClipFill(newIdx, 1);
            }

            // Slide direction matches scroll
            const exitY = direction === "down" ? -svgHeight : svgHeight;
            const enterY = direction === "down" ? svgHeight : -svgHeight;

            const tl = gsap.timeline({
                onComplete: () => {
                    s.currentIndex = newIdx;
                    if (direction === "down") {
                        s.smoothFill = 0;
                        s.phase = "filling";
                    } else {
                        s.smoothFill = 1;
                        s.phase = "draining";
                    }
                    s.transitioning = false;
                    fillAnchor = window.scrollY;
                    drainStartFill = direction === "up" ? 1 : 0;
                },
            });

            tl.to(oldWrap, {
                y: exitY,
                opacity: 0,
                duration: 0.4,
                ease: "power3.inOut",
            });

            tl.fromTo(
                newWrap,
                { y: enterY, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.4, ease: "power3.inOut" },
                "<0.08"
            );
        }

        let lastScrollY = window.scrollY;
        let rafId: number;
        let drainStartFill = 0;

        function tick() {
            const s = stateRef.current;
            if (s.transitioning) {
                lastScrollY = window.scrollY;
                rafId = requestAnimationFrame(tick);
                return;
            }

            const scrollY = window.scrollY;
            const idx = s.currentIndex;

            if (s.phase === "filling") {
                // Scroll down → fill left-to-right (0 → 1)
                const delta = scrollY - fillAnchor;
                const targetFill = Math.max(0, Math.min(1, delta / FILL_SCROLL_RANGE));

                s.smoothFill += (targetFill - s.smoothFill) * 0.12;
                if (Math.abs(s.smoothFill - targetFill) < 0.001) s.smoothFill = targetFill;

                setClipFill(idx, s.smoothFill);

                // Fully filled → next word enters OUTLINED
                if (s.smoothFill >= 0.995 && targetFill >= 1) {
                    transitionToNext("down");
                }

                // Started scrolling up → switch to draining
                if (scrollY < lastScrollY && s.smoothFill > 0.01 && s.smoothFill < 0.99) {
                    s.phase = "draining";
                    fillAnchor = scrollY;
                    drainStartFill = s.smoothFill;
                }
            } else {
                // Scroll up → drain right-to-left (1 → 0)
                const delta = fillAnchor - scrollY;
                const drainAmount = delta / FILL_SCROLL_RANGE;
                const targetFill = Math.max(0, Math.min(1, drainStartFill - drainAmount));

                s.smoothFill += (targetFill - s.smoothFill) * 0.12;
                if (Math.abs(s.smoothFill - targetFill) < 0.001) s.smoothFill = targetFill;

                setClipFill(idx, s.smoothFill);

                // Fully drained → next word enters FILLED
                if (s.smoothFill <= 0.005 && targetFill <= 0) {
                    transitionToNext("up");
                }

                // Started scrolling down → switch to filling
                if (scrollY > lastScrollY && s.smoothFill > 0.01 && s.smoothFill < 0.99) {
                    s.phase = "filling";
                    fillAnchor = scrollY - s.smoothFill * FILL_SCROLL_RANGE;
                }
            }

            lastScrollY = scrollY;
            rafId = requestAnimationFrame(tick);
        }

        fillAnchor = window.scrollY;
        lastScrollY = window.scrollY;
        rafId = requestAnimationFrame(tick);

        return () => {
            cancelAnimationFrame(rafId);
            gsap.killTweensOf(svgs.map((s) => s.wrap));
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="pointer-events-none"
            style={{ height: 32, minWidth: 180, overflow: "hidden" }}
        />
    );
}

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("");
    const scrollToSection = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const id = href.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
            const offset = 80;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
        }
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Track active section with IntersectionObserver
    useEffect(() => {
        const observers: IntersectionObserver[] = [];

        // Watch the hero section — clear active state when hero is in view
        const heroEl = document.getElementById("hero");
        if (heroEl) {
            const heroObserver = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setActiveSection("");
                    }
                },
                { rootMargin: "-40% 0px -55% 0px" }
            );
            heroObserver.observe(heroEl);
            observers.push(heroObserver);
        }

        sectionIds.forEach((id) => {
            const el = document.getElementById(id);
            if (!el) return;

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setActiveSection(id);
                    }
                },
                { rootMargin: "-40% 0px -55% 0px" }
            );

            observer.observe(el);
            observers.push(observer);
        });

        return () => observers.forEach((o) => o.disconnect());
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent"
                }`}
        >
            <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <a
                    href="#hero"
                    onClick={(e) => {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="text-base md:text-2xl font-bold tracking-tight text-foreground cursor-pointer flex items-center"
                >
                    <AnimatedLogo />
                </a>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-8">
                    {navLinks.map((link) => {
                        const isActive = activeSection === link.href.replace("#", "");
                        return (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => scrollToSection(e, link.href)}
                                className={`relative text-sm font-medium cursor-pointer transition-colors duration-300 group ${isActive
                                    ? "text-primary"
                                    : "text-foreground/80 hover:text-primary"
                                    }`}
                            >
                                {link.name}
                                <span
                                    className="absolute left-1/2 -translate-x-1/2 -bottom-1 h-[2px] bg-primary transition-[width] duration-300 ease-out"
                                    style={{ width: isActive ? "100%" : 0 }}
                                />
                                {!isActive && (
                                    <span className="absolute left-1/2 -translate-x-1/2 -bottom-1 h-[2px] bg-primary w-0 group-hover:w-full transition-[width] duration-300 ease-out" />
                                )}
                            </a>
                        );
                    })}
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden relative w-8 h-8 flex items-center justify-center focus:outline-none"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    <span className="flex flex-col justify-center items-center w-5 h-5">
                        <motion.span
                            animate={isOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="block w-5 h-[1.5px] bg-foreground rounded-full origin-center absolute"
                        />
                        <motion.span
                            animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                            transition={{ duration: 0.15, ease: "easeInOut" }}
                            className="block w-5 h-[1.5px] bg-foreground rounded-full absolute"
                        />
                        <motion.span
                            animate={isOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="block w-5 h-[1.5px] bg-foreground rounded-full origin-center absolute"
                        />
                    </span>
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-background border-b border-border overflow-hidden"
                    >
                        <div className="flex flex-col items-center py-6 space-y-6">
                            {navLinks.map((link) => {
                                const isActive = activeSection === link.href.replace("#", "");
                                return (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        className={`relative text-lg font-medium cursor-pointer transition-colors duration-300 group ${isActive
                                            ? "text-primary"
                                            : "text-foreground hover:text-primary"
                                            }`}
                                        onClick={(e) => {
                                            scrollToSection(e, link.href);
                                            setIsOpen(false);
                                        }}
                                    >
                                        {link.name}
                                        <span
                                            className="absolute left-1/2 -translate-x-1/2 -bottom-1 h-[2px] bg-primary transition-[width] duration-300 ease-out"
                                            style={{ width: isActive ? "100%" : 0 }}
                                        />
                                        {!isActive && (
                                            <span className="absolute left-1/2 -translate-x-1/2 -bottom-1 h-[2px] bg-primary w-0 group-hover:w-full transition-[width] duration-300 ease-out" />
                                        )}
                                    </a>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
