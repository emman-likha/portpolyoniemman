"use client";

import { motion } from "framer-motion";

interface Experience {
    company: string;
    role: string;
    duration: string;
    description: string;
}

export default function ExperienceItem({
    experience,
    index,
}: {
    experience: Experience;
    index: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className="relative pl-8 border-l border-border pb-8 last:pb-0"
        >
            <div className="absolute top-0 left-[-5px] w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-background" />
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                <h4 className="text-lg font-semibold text-foreground">{experience.role}</h4>
                <span className="text-sm text-muted-foreground font-mono bg-muted/50 px-2 py-1 rounded">
                    {experience.duration}
                </span>
            </div>
            <h5 className="text-md font-medium text-primary mb-2">{experience.company}</h5>
            <p className="text-muted-foreground text-sm leading-relaxed">
                {experience.description}
            </p>
        </motion.div>
    );
}
