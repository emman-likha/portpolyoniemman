export interface Project {
    id: number;
    title: string;
    description: string;
    tech: string[];
    status: "Live" | "In Progress";
    image?: string;
    demoUrl?: string;
    repoUrl?: string;
}

export const projects: Project[] = [
    {
        id: 1,
        title: "E-Commerce Dashboard",
        description:
            "A comprehensive dashboard for managing products, orders, and customers. Features real-time analytics, inventory management, and a customizable widget system.",
        tech: ["Next.js", "TypeScript", "Supabase", "Tailwind"],
        status: "Live",
        image: "/placeholder-project-1.jpg",
        demoUrl: "#",
        repoUrl: "#",
    },
    {
        id: 2,
        title: "Task Management App",
        description:
            "Real-time task collaboration tool with drag-and-drop functionality using React and Firebase. Includes team workspaces, real-time updates, and activity logs.",
        tech: ["React", "Firebase", "dnd-kit"],
        status: "In Progress",
        image: "/placeholder-project-2.jpg",
        demoUrl: "#",
        repoUrl: "#",
    },
    {
        id: 3,
        title: "Portfolio V1",
        description:
            "My previous portfolio site focused on minimalist design and typography. Built with vanilla HTML/CSS and JavaScript to master the fundamentals.",
        tech: ["HTML/CSS", "JavaScript"],
        status: "Live",
        image: "/placeholder-project-3.jpg",
        repoUrl: "#",
    },
];
