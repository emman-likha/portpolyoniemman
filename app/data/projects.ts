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
        title: "My Scribble Tasks",
        description:
            "A visually polished to-do list app designed to help users organize and manage daily tasks. Built with a focus on clean UI and a smooth user experience.",
        tech: ["React", "Supabase"],
        status: "Live",
        liveUrl: "https://todo-list-mu-nine-39.vercel.app/",
        repoUrl: "#",
    },
    {
        id: 3,
        title: "Elegant Flowers",
        description:
            "An e-commerce storefront for browsing and purchasing floral products online. Features a clean product catalog and a streamlined checkout flow.",
        tech: ["Next.js", "Tailwind", "TypeScript"],
        status: "Live",
        liveUrl: "https://flower-shop-ecommerce-red.vercel.app/",
        repoUrl: "#",
    },
    {
        id: 4,
        title: "Portfolio V1",
        description:
            "My first personal portfolio site with smooth scroll navigation. Built with vanilla HTML, CSS, and JavaScript to master the fundamentals of web development.",
        tech: ["React", "Tailwind CSS"],
        status: "Live",
        liveUrl: "https://emman-likha.vercel.app/",
        repoUrl: "#",
    },
];
