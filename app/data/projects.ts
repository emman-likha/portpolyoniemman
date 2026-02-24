export interface Project {
    id: number;
    title: string;
    description: string;
    tech: string[];
    status: "Live" | "In Progress";
    liveUrl?: string;
    demoUrl?: string;
    repoUrl?: string;
}

export const projects: Project[] = [
    {
        id: 1,
        title: "Classic Civic",
        description:
            "A fan site celebrating the heritage and evolution of classic Honda Civic automobiles. Features generation guides from 1973 onward, serving as a community hub for enthusiasts and collectors.",
        tech: ["React", "Tailwind CSS"],
        status: "Live",
        liveUrl: "https://civic-blog.vercel.app/",
        repoUrl: "#",
    },
    {
        id: 2,
        title: "Paxx",
        description:
            "A modern password manager for teams and individuals. Features encrypted vault storage, real-time sync, password generator, auto-fill, and secure credential sharing — all built on a zero-knowledge architecture with AES-256 encryption.",
        tech: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
        status: "Live",
        liveUrl: "https://paxx-gamma.vercel.app/",
        repoUrl: "#",
    },
    {
        id: 3,
        title: "Portfolio V1",
        description:
            "My first personal portfolio site with smooth scroll navigation. Built with vanilla HTML, CSS, and JavaScript to master the fundamentals of web development.",
        tech: ["React", "Tailwind CSS"],
        status: "Live",
        liveUrl: "https://emman-likha.vercel.app/",
        repoUrl: "#",
    },
];
