"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Github, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import Section from "../Section";
import Button from "../ui/Button";

interface Project {
    id: number;
    title: string;
    description: string;
    tech: string[];
    status: "Live" | "In Progress";
    image?: string;
    demoUrl?: string;
    repoUrl?: string;
}

export default function Projects() {
    const [expandedId, setExpandedId] = useState<number | null>(null);

    const projects: Project[] = [
        {
            id: 1,
            title: "E-Commerce Dashboard",
            description: "A comprehensive dashboard for managing products, orders, and customers. Features real-time analytics, inventory management, and a customizable widget system.",
            tech: ["Next.js", "TypeScript", "Supabase", "Tailwind"],
            status: "Live",
            image: "/placeholder-project-1.jpg",
            demoUrl: "#",
            repoUrl: "#"
        },
        {
            id: 2,
            title: "Task Management App",
            description: "Real-time task collaboration tool with drag-and-drop functionality using React and Firebase. Includes team workspaces, real-time updates, and activity logs.",
            tech: ["React", "Firebase", "dnd-kit"],
            status: "In Progress",
            image: "/placeholder-project-2.jpg",
            demoUrl: "#",
            repoUrl: "#"
        },
        {
            id: 3,
            title: "Portfolio V1",
            description: "My previous portfolio site focused on minimalist design and typography. Built with vanilla HTML/CSS and JavaScript to master the fundamentals.",
            tech: ["HTML/CSS", "JavaScript"],
            status: "Live",
            image: "/placeholder-project-3.jpg",
            repoUrl: "#"
        }
    ];

    const toggleExpand = (id: number) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <Section id="projects" className="bg-card/30">
            <div className="max-w-5xl mx-auto">
                <div className="mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
                    <p className="text-muted-foreground max-w-2xl">
                        Selected works that demonstrate my technical capabilities and problem-solving skills.
                    </p>
                </div>

                {/* Project List */}
                <div className="w-full">
                    {/* Header */}
                    <div className="grid grid-cols-12 gap-4 pb-4 border-b border-border/60 text-sm font-medium text-muted-foreground tracking-wide uppercase">
                        <div className="col-span-6 md:col-span-5 pl-2">Project</div>
                        <div className="col-span-4 md:col-span-5 hidden md:block">Tech Used</div>
                        <div className="col-span-6 md:col-span-2 text-right md:text-left">Status</div>
                    </div>

                    {/* Rows */}
                    <div className="divide-y divide-border/60">
                        {projects.map((project) => (
                            <div key={project.id} className="group">
                                {/* Row Header / Clickable Area */}
                                <div
                                    onClick={() => toggleExpand(project.id)}
                                    className="grid grid-cols-12 gap-4 py-8 items-center cursor-pointer transition-colors hover:bg-muted/30 px-2 -mx-2 rounded-lg"
                                >
                                    {/* Project Name */}
                                    <div className="col-span-6 md:col-span-5 font-semibold text-lg md:text-xl text-foreground flex items-center gap-3">
                                        {expandedId === project.id ? <ChevronUp size={16} className="text-primary" /> : <ChevronDown size={16} className="text-muted-foreground" />}
                                        {project.title}
                                    </div>

                                    {/* Tech Stack (Desktop) */}
                                    <div className="col-span-5 hidden md:flex flex-wrap gap-2">
                                        {project.tech.slice(0, 3).map((t) => (
                                            <span key={t} className="text-sm text-muted-foreground bg-secondary/30 px-2 py-0.5 rounded">
                                                {t}
                                            </span>
                                        ))}
                                        {project.tech.length > 3 && (
                                            <span className="text-sm text-muted-foreground">+ {project.tech.length - 3} more</span>
                                        )}
                                    </div>

                                    {/* Status */}
                                    <div className="col-span-6 md:col-span-2 flex justify-end md:justify-start items-center">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${project.status === "Live"
                                                ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                                                : "bg-amber-500/10 text-amber-600 border-amber-500/20"
                                            }`}>
                                            <div className={`w-1.5 h-1.5 rounded-full ${project.status === "Live" ? "bg-emerald-500" : "bg-amber-500"}`} />
                                            {project.status}
                                        </span>
                                    </div>
                                </div>

                                {/* Expanded Content */}
                                <AnimatePresence>
                                    {expandedId === project.id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            className="overflow-hidden"
                                        >
                                            <div className="pb-8 pt-2 pl-4 md:pl-8 grid md:grid-cols-2 gap-8">
                                                {/* Left: Description & Actions */}
                                                <div className="space-y-6">
                                                    <div className="md:hidden flex flex-wrap gap-2 mb-4">
                                                        {project.tech.map((t) => (
                                                            <span key={t} className="text-xs text-muted-foreground bg-secondary/30 px-2 py-1 rounded">
                                                                {t}
                                                            </span>
                                                        ))}
                                                    </div>

                                                    <p className="text-muted-foreground leading-relaxed">
                                                        {project.description}
                                                    </p>

                                                    <div className="flex gap-4 pt-2">
                                                        {project.demoUrl && (
                                                            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                                                                <Button size="sm" className="gap-2">
                                                                    <ExternalLink size={16} /> Live Demo
                                                                </Button>
                                                            </a>
                                                        )}
                                                        {project.repoUrl && (
                                                            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                                                                <Button variant="outline" size="sm" className="gap-2">
                                                                    <Github size={16} /> View Code
                                                                </Button>
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Right: Visual/Preview */}
                                                <div className="relative aspect-video rounded-lg overflow-hidden bg-muted border border-border/50">
                                                    {/* Placeholder visual */}
                                                    <div className="absolute inset-0 bg-gradient-to-br from-secondary/30 to-background flex items-center justify-center">
                                                        <span className="text-muted-foreground/50 font-medium">Project Preview</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <Button variant="ghost" className="text-muted-foreground hover:text-primary">
                        View Full Project Archive <ArrowUpRight className="ml-1 w-4 h-4" />
                    </Button>
                </div>
            </div>
        </Section>
    );
}

