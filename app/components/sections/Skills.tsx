"use client";

import Section from "../Section";

export default function Skills() {
    const skills = [
        "JavaScript (ES6+)", "TypeScript", "React", "Next.js", "Node.js",
        "Tailwind CSS", "PostgreSQL", "GraphQL", "Git", "Figma"
    ];

    return (
        <Section id="skills">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Skills</h2>
                <p className="text-muted-foreground">
                    A curated list of technologies and tools I work with to bring ideas to life.
                </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {skills.map((skill) => (
                    <div
                        key={skill}
                        className="flex items-center justify-center p-4 bg-card border border-border rounded-xl shadow-sm hover:border-primary/50 transition-colors"
                    >
                        <span className="font-medium text-foreground">{skill}</span>
                    </div>
                ))}
            </div>
        </Section>
    );
}
