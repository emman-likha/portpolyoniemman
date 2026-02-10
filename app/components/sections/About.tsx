"use client";

import Image from "next/image";
import Section from "../Section";

export default function About() {
    return (
        <Section id="about" className="bg-card/50">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div data-cursor="image" className="relative aspect-square md:aspect-auto md:h-[500px] w-full max-w-md mx-auto rounded-2xl overflow-hidden bg-muted group">
                    {/* Profile image — tinted by default, original color on hover */}
                    <Image
                        src="/images/profile_portpolyo.jpg"
                        alt="Profile photo"
                        fill
                        className="object-cover object-top transition-all duration-500 ease-out sepia-[0.5] saturate-[0.6] brightness-[0.9] contrast-[1.05] group-hover:sepia-0 group-hover:saturate-100 group-hover:brightness-100 group-hover:contrast-100 group-hover:scale-105"
                    />
                    {/* Warm brown overlay — fades out on hover */}
                    <div className="absolute inset-0 bg-[#8C8681]/25 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-0 pointer-events-none" />
                    {/* Noise/grain texture overlay */}
                    <div
                        className="absolute inset-0 opacity-[0.12] mix-blend-overlay pointer-events-none"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                            backgroundSize: "128px 128px",
                        }}
                    />
                    {/* Subtle vignette */}
                    <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(44,43,41,0.3)] rounded-2xl pointer-events-none" />
                </div>
                <div className="space-y-6">
                    <h2 className="text-3xl md:text-4xl font-bold">About Me</h2>
                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                        <p>
                            I'm a web developer focused on building modern, practical web applications that solve real-world problems. I work with JavaScript to create fast, scalable, and user-friendly experiences across the web.
                        </p>
                        <p>
                            My work includes developing dashboard systems, e-commerce platforms, and custom web applications — handling both frontend and backend. I put strong emphasis on clean code, intuitive interfaces, and building products that are easy to maintain and scale.
                        </p>
                        <p>
                            I leverage AI tools to accelerate my workflow and ship faster without cutting corners. I'm continuously learning and refining my skills, always exploring better ways to improve performance, usability, and overall product quality.
                        </p>
                    </div>
                    <div className="pt-4">
                        <h3 className="font-semibold text-foreground mb-4">Core Competencies</h3>
                        <div className="flex flex-wrap gap-2">
                            {["Frontend Architecture", "UI/UX Design", "Performance Optimization", "Accessibility"].map((item) => (
                                <span key={item} className="px-3 py-1 bg-background border border-border rounded-full text-xs font-medium">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
}
