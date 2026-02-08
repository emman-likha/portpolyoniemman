"use client";

import Section from "../Section";

export default function About() {
    return (
        <Section id="about" className="bg-card/50">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="relative aspect-square md:aspect-auto md:h-[500px] w-full max-w-md mx-auto rounded-2xl overflow-hidden bg-muted">
                    {/* Placeholder for profile image */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 flex items-center justify-center">
                        <span className="text-muted-foreground">Profile Image</span>
                    </div>
                    {/* <Image src="/profile.jpg" alt="Profile" fill className="object-cover" /> */}
                </div>
                <div className="space-y-6">
                    <h2 className="text-3xl md:text-4xl font-bold">About Me</h2>
                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                        <p>
                            I'm a passionate software engineer with a focus on frontend development. I enjoy turning complex problems into simple, beautiful, and intuitive designs.
                        </p>
                        <p>
                            With over 5 years of experience, I've had the privilege of working on diverse projects, from early-stage startups to large enterprise applications. My approach is user-centric, ensuring that every line of code serves a purpose.
                        </p>
                        <p>
                            When I'm not coding, you can find me exploring new coffee shops, reading about design systems, or hiking in nature.
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
