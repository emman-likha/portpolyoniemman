"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import Link from "next/link";
import { projects } from "@/app/data/projects";

export default function ArchivePage() {
    return (
        <main className="min-h-screen bg-[#5D5C58] text-[#FAF8F3] selection:bg-primary/30 dark:bg-[#E8E4DB] dark:text-[#383734]">
            <div className="max-w-7xl mx-auto px-6 md:px-12 pt-12 pb-32">
                {/* Back link */}
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="mb-16"
                >
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm text-[#D6CFC7]/70 hover:text-[#FAF8F3] dark:text-[#4A4946]/70 dark:hover:text-[#383734] transition-colors group"
                    >
                        <ArrowLeft
                            size={14}
                            className="transition-transform group-hover:-translate-x-1"
                        />
                        Back to Home
                    </Link>
                </motion.div>
                {/* Header */}
                <motion.header
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="mb-16"
                >
                    <p className="text-sm font-mono text-[#D6CFC7] dark:text-[#4A4946] tracking-widest uppercase mb-3">
                        Archive
                    </p>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-[#FAF8F3] dark:text-[#383734]">
                        All Projects
                    </h1>
                    <p className="text-[#D6CFC7] dark:text-[#4A4946] max-w-lg text-lg leading-relaxed">
                        A complete list of things I&apos;ve built, shipped, and
                        tinkered with.
                    </p>
                </motion.header>

                {/* Card grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {projects.map((project, index) => (
                        <motion.article
                            key={project.id}
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.45,
                                delay: 0.25 + index * 0.07,
                                ease: "easeOut",
                            }}
                            className="group relative flex flex-col bg-[#383734] dark:bg-[#2C2B29] border border-[#FAF8F3]/10 dark:border-[#E8E4DB]/10 rounded-xl p-6 hover:border-[#FAF8F3]/20 dark:hover:border-[#E8E4DB]/20 hover:shadow-xl transition-all duration-300"
                        >
                            {/* Top row: number + status */}
                            <div className="flex items-center justify-between mb-5">
                                <span className="text-xs font-mono text-[#D6CFC7]/50 dark:text-[#A8A49E]/50 tracking-wide">
                                    {String(index + 1).padStart(2, "0")}
                                </span>
                                <span
                                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${project.status === "Live"
                                            ? "bg-emerald-400/10 text-emerald-400 border-emerald-400/20"
                                            : "bg-amber-400/10 text-amber-400 border-amber-400/20"
                                        }`}
                                >
                                    <span
                                        className={`w-1.5 h-1.5 rounded-full ${project.status === "Live"
                                                ? "bg-emerald-400"
                                                : "bg-amber-400"
                                            }`}
                                    />
                                    {project.status}
                                </span>
                            </div>

                            {/* Title */}
                            <h2 className="text-xl font-semibold text-[#FAF8F3] dark:text-[#E8E4DB] mb-2 leading-tight">
                                {project.title}
                            </h2>

                            {/* Description */}
                            <p className="text-sm text-[#D6CFC7] dark:text-[#A8A49E] leading-relaxed mb-6 line-clamp-3 flex-1">
                                {project.description}
                            </p>

                            {/* Tech tags */}
                            <div className="flex flex-wrap gap-1.5 mb-6">
                                {project.tech.map((t) => (
                                    <span
                                        key={t}
                                        className="text-xs text-[#FAF8F3] dark:text-[#E8E4DB] bg-[#FAF8F3]/10 dark:bg-[#E8E4DB]/10 px-2 py-0.5 rounded"
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>

                            {/* Divider + links */}
                            <div className="border-t border-[#FAF8F3]/10 dark:border-[#E8E4DB]/10 pt-4 mt-auto flex items-center gap-3">
                                {project.liveUrl && (
                                    <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 text-sm text-[#D6CFC7] dark:text-[#4A4946] hover:text-[#FAF8F3] dark:hover:text-[#E8E4DB] transition-colors"
                                    >
                                        <ArrowUpRight size={15} />
                                        <span>Visit</span>
                                    </a>
                                )}
                                {project.liveUrl && project.repoUrl && (
                                    <span className="w-px h-3.5 bg-[#FAF8F3]/10 dark:bg-[#E8E4DB]/10" />
                                )}
                                {project.repoUrl && (
                                    <a
                                        href={project.repoUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 text-sm text-[#D6CFC7] dark:text-[#4A4946] hover:text-[#FAF8F3] dark:hover:text-[#383734] transition-colors"
                                    >
                                        <Github size={15} />
                                        <span>Code</span>
                                    </a>
                                )}
                            </div>
                        </motion.article>
                    ))}
                </div>

                {/* Footer note */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        duration: 0.4,
                        delay: 0.25 + projects.length * 0.07 + 0.3,
                    }}
                    className="mt-16 pt-8 border-t border-[#FAF8F3]/10 dark:border-[#383734]/10 text-center"
                >
                    <p className="text-sm text-[#D6CFC7]/60 dark:text-[#4A4946]/60">
                        {projects.length} projects and counting.
                    </p>
                </motion.div>
            </div>
        </main>
    );
}
