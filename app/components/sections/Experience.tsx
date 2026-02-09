"use client";

import Section from "../Section";
import ExperienceItem from "../ExperienceItem";
import { experiences } from "@/app/data/experience";

export default function Experience() {
    return (
        <Section id="experience">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Professional Journey</h2>
                <div className="space-y-0">
                    {experiences.map((exp, index) => (
                        <ExperienceItem key={index} experience={exp} index={index} />
                    ))}
                </div>
            </div>
        </Section>
    );
}
