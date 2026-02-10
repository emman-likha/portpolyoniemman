"use client";

import {
    useScroll,
    useTransform,
    useMotionValueEvent,
    motion,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { experiences } from "@/app/data/experience";

export default function Experience() {
    const contentRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [height, setHeight] = useState(0);
    const [activeDots, setActiveDots] = useState<boolean[]>(
        () => experiences.map(() => false)
    );

    useEffect(() => {
        if (contentRef.current) {
            setHeight(contentRef.current.getBoundingClientRect().height);
        }
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 80%", "end 40%"],
    });

    const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
    const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

    // Track which dots the line has reached
    useMotionValueEvent(heightTransform, "change", (lineHeight) => {
        if (!contentRef.current) return;
        const contentTop = contentRef.current.getBoundingClientRect().top;

        const newActive = dotRefs.current.map((dotEl) => {
            if (!dotEl) return false;
            const dotRect = dotEl.getBoundingClientRect();
            // Dot center relative to the content container top
            const dotCenter = dotRect.top + dotRect.height / 2 - contentTop;
            return lineHeight >= dotCenter;
        });

        setActiveDots((prev) => {
            // Only update if something changed
            if (prev.every((v, i) => v === newActive[i])) return prev;
            return newActive;
        });
    });

    return (
        <section id="experience" ref={containerRef} className="w-full px-6 py-20 md:px-12 lg:px-24">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                    Professional Journey
                </h2>

                <div ref={contentRef} className="relative pb-4">
                    {/* Items */}
                    {experiences.map((exp, index) => (
                        <div
                            key={index}
                            className="relative pl-10 pb-10 last:pb-0"
                        >
                            {/* Circle dot */}
                            <div
                                ref={(el) => { dotRefs.current[index] = el; }}
                                className="absolute left-0 top-1 z-10"
                            >
                                <div className="h-8 w-8 rounded-full bg-background flex items-center justify-center">
                                    <div
                                        className="h-3 w-3 rounded-full border-2 transition-all duration-300"
                                        style={{
                                            borderColor: activeDots[index] ? "var(--primary)" : "var(--border)",
                                            backgroundColor: activeDots[index] ? "var(--primary)" : "transparent",
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="pt-1">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                                    <h4 className="text-lg font-semibold text-foreground">
                                        {exp.role}
                                    </h4>
                                    <span className="text-sm text-muted-foreground font-mono bg-muted/50 px-2 py-1 rounded">
                                        {exp.duration}
                                    </span>
                                </div>
                                <h5 className="text-md font-medium text-primary mb-2">
                                    {exp.company}
                                </h5>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {exp.description}
                                </p>
                            </div>
                        </div>
                    ))}

                    {/* Animated line */}
                    <div
                        style={{ height: height + "px" }}
                        className="absolute left-[15px] top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-border to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
                    >
                        <motion.div
                            style={{
                                height: heightTransform,
                                opacity: opacityTransform,
                            }}
                            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-primary via-muted-foreground to-transparent from-[0%] via-[10%] rounded-full"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
