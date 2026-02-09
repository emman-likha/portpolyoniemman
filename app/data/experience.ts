export interface Experience {
    company: string;
    role: string;
    duration: string;
    description: string;
}

export const experiences: Experience[] = [
    {
        company: "Tech Solutions Inc.",
        role: "Senior Frontend Developer",
        duration: "2023 - Present",
        description:
            "Leading the frontend team in rebuilding the core product dashboard using Next.js. Improved performance by 40%.",
    },
    {
        company: "Creative Agency",
        role: "Frontend Developer",
        duration: "2021 - 2023",
        description:
            "Developed award-winning marketing websites for global clients. Specialized in complex animations and interactive experiences.",
    },
    {
        company: "StartUp Hub",
        role: "Junior Developer",
        duration: "2020 - 2021",
        description:
            "Collaborated on the MVP of a fintech application. Implemented responsive UI components and integrated REST APIs.",
    },
];
