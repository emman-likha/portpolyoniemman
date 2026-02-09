"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
];

const sectionIds = navLinks.map((l) => l.href.replace("#", ""));

function scrollToSection(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault();
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("");

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
                <Link href="/" className="text-2xl font-bold tracking-tight text-foreground">
                    Portpolyo ni Emman.
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-8">
                    {navLinks.map((link) => {
                        const isActive = activeSection === link.href.replace("#", "");
                        return (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => scrollToSection(e, link.href)}
                                className={`relative text-sm font-medium cursor-pointer transition-colors duration-300 group ${
                                    isActive
                                        ? "text-primary"
                                        : "text-foreground/80 hover:text-primary"
                                }`}
                            >
                                {link.name}
                                {/* Active underline — always visible, animated from center */}
                                <span
                                    className="absolute left-1/2 -translate-x-1/2 -bottom-1 h-[2px] bg-primary transition-[width] duration-300 ease-out"
                                    style={{ width: isActive ? "100%" : 0 }}
                                />
                                {/* Hover underline — expands from center on hover (non-active only) */}
                                {!isActive && (
                                    <span className="absolute left-1/2 -translate-x-1/2 -bottom-1 h-[2px] bg-primary w-0 group-hover:w-full transition-[width] duration-300 ease-out" />
                                )}
                            </a>
                        );
                    })}
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-foreground focus:outline-none"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
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
                                        className={`relative text-lg font-medium cursor-pointer transition-colors duration-300 group ${
                                            isActive
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
