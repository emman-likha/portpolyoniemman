export interface Project {
    id: number;
    title: string;
    description: string;
    tech: string[];
    status: "Live" | "In Progress";
    liveUrl?: string;
    demoUrl?: string;
}

export const projects: Project[] = [
    {
        id: 1,
        title: "EVRWR Careers",
        description:
            "A job board for the automotive industry. Features job listings, company profiles, and resume submission — all built on a modern tech stack with a focus on user experience.",
        tech: ["NextJS", "TypeScript", "Tailwind CSS", "ExpressJS", "PostgreSQL"],
        status: "In Progress",
        liveUrl: "https://evrwrcareers.vercel.app/",
    },
    {
        id: 2,
        title: "Inventra",
        description:
            "A SaaS platform for intelligent asset management — tracking physical and digital assets like laptops, vehicles, and software licenses from a centralized dashboard. Replaces spreadsheets with automated lifecycle management, assignment tracking, and real-time reporting.",
        tech: ["NextJS", "TypeScript", "Supabase", "Tailwind CSS"],
        status: "In Progress",
        liveUrl: "https://inventra-five.vercel.app/",
    },
    {
        id: 3,

        title: "Classic Civic",
        description:
            "A fan site celebrating the heritage and evolution of classic Honda Civic automobiles. Features generation guides from 1973 onward, serving as a community hub for enthusiasts and collectors.",
        tech: ["React", "Tailwind CSS"],
        status: "Live",
        liveUrl: "https://civic-blog.vercel.app/",
    },
    {
        id: 4,
        title: "Paxx",
        description:
            "A modern password manager for teams and individuals. Features encrypted vault storage, real-time sync, password generator, auto-fill, and secure credential sharing — all built on a zero-knowledge architecture with AES-256 encryption.",
        tech: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
        status: "Live",
        liveUrl: "https://paxx-gamma.vercel.app/",
    },
    {
        id: 5,
        title: "Portfolio V1",
        description:
            "My first personal portfolio site with smooth scroll navigation. Built with vanilla HTML, CSS, and JavaScript to master the fundamentals of web development.",
        tech: ["React", "Tailwind CSS"],
        status: "Live",
        liveUrl: "https://emman-likha.vercel.app/",
    },
    {
        id: 6,
        title: "Markitdown",
        description:
            "A professional writing tool that empowers you to create compelling content with smart suggestions. Features include AI-powered editing, real-time collaboration, and advanced analytics to enhance your writing.",
        tech: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
        status: "Live",
        liveUrl: "https://markitdown-sable.vercel.app/",
    },
];
