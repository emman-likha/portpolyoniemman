"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";

interface Experience {
    company: string;
    role: string;
    duration: string;
    description: string;
}

interface ExperienceItemProps {
    experience: Experience;
    index: number;
    isActive: boolean;
}

const ExperienceItem = forwardRef<HTMLDivElement, ExperienceItemProps>(
    ({ experience, index, isActive }, ref) => {
        return (
            <motion.div
                ref={ref}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="relative pl-8 pb-8 last:pb-0"
            >
                {/* Outline-only dot on the line — hidden when the traveling dot is here */}
                <div
                    className="absolute top-0 w-2.5 h-2.5 rounded-full border-2 border-primary bg-background transition-all duration-300"
                    style={{
                        left: "-5px",
                        opacity: isActive ? 0 : 0.7,
                    }}
                />

                <div
                    className={`transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-50"}`}
                >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                        <h4 className="text-lg font-semibold text-foreground">
                            {experience.role}
                        </h4>
                        <span className="text-sm text-muted-foreground font-mono bg-muted/50 px-2 py-1 rounded">
                            {experience.duration}
                        </span>
                    </div>
                    <h5 className="text-md font-medium text-primary mb-2">
                        {experience.company}
                    </h5>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        {experience.description}
                    </p>
                </div>
            </motion.div>
        );
    }
);

ExperienceItem.displayName = "ExperienceItem";

export default ExperienceItem;
