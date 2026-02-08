"use client";

import Section from "../Section";
import ExperienceItem from "../ExperienceItem";

export default function Experience() {
    const experiences = [
        {
            company: "Tech Solutions Inc.",
            role: "Senior Frontend Developer",
            duration: "2023 - Present",
            description: "Leading the frontend team in rebuilding the core product dashboard using Next.js. Improved performance by 40%."
        },
        {
            company: "Creative Agency",
            role: "Frontend Developer",
            duration: "2021 - 2023",
            description: "Developed award-winning marketing websites for global clients. Specialized in complex animations and interactive experiences."
        },
        {
            company: "StartUp Hub",
            role: "Junior Developer",
            duration: "2020 - 2021",
            description: "Collaborated on the MVP of a fintech application. Implemented responsive UI components and integrated REST APIs."
        }
    ];

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
