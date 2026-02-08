"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SectionProps {
    id: string;
    children: React.ReactNode;
    className?: string;
}

export default function Section({ id, children, className = "" }: SectionProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <section
            id={id}
            ref={ref}
            className={`min-h-screen w-full flex flex-col justify-center px-6 py-20 md:px-12 lg:px-24 ${className}`}
        >
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full max-w-7xl mx-auto"
            >
                {children}
            </motion.div>
        </section>
    );
}
