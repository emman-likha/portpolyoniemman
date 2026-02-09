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
        title: "E-Commerce Dashboard",
        description:
            "A comprehensive dashboard for managing products, orders, and customers. Features real-time analytics, inventory management, and a customizable widget system.",
        tech: ["Next.js", "TypeScript", "Supabase", "Tailwind"],
        status: "Live",
        liveUrl: "https://civic-blog.vercel.app/",
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
        liveUrl: "https://todo-list-mu-nine-39.vercel.app/",
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
        liveUrl: "https://www.google.com",
        repoUrl: "#",
    },
    {
        id: 4,
        title: "Weather Forecast App",
        description:
            "A sleek weather application with location-based forecasts, animated weather icons, and a 7-day outlook. Integrates with OpenWeatherMap API for real-time data.",
        tech: ["React", "OpenWeatherMap API", "CSS Modules"],
        status: "Live",
        liveUrl: "#",
        repoUrl: "#",
    },
    {
        id: 5,
        title: "Chat Application",
        description:
            "Real-time messaging platform with WebSocket support, message history, typing indicators, and file sharing. Features end-to-end encryption for private conversations.",
        tech: ["Next.js", "Socket.io", "PostgreSQL", "Prisma"],
        status: "In Progress",
        repoUrl: "#",
    },
    {
        id: 6,
        title: "Recipe Finder",
        description:
            "A recipe discovery app that lets users search by ingredients, dietary preferences, and cuisine type. Includes meal planning and grocery list features.",
        tech: ["Vue.js", "Spoonacular API", "Tailwind"],
        status: "Live",
        liveUrl: "#",
        repoUrl: "#",
    },
    {
        id: 7,
        title: "Fitness Tracker",
        description:
            "Personal fitness tracking dashboard with workout logging, progress charts, and goal setting. Syncs with wearable devices for automated data collection.",
        tech: ["React Native", "Firebase", "Chart.js"],
        status: "In Progress",
        repoUrl: "#",
    },
];
