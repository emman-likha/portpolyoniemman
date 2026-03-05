"use client";

import { ChevronDown } from "lucide-react";
import Button from "../ui/Button";
import Section from "../Section";

export default function Hero() {
    return (
        <Section id="hero" className="text-center pt-32">
            <div className="space-y-6 max-w-5xl mx-auto px-4">
                <p className="text-primary font-medium tracking-wide uppercase text-sm md:text-base">Hello, I'm a Developer</p>
                <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-bold tracking-tighter text-foreground leading-[1.1]">
                    Building digital <span className="text-primary text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary pb-2 pr-2">experiences</span> with purpose.
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    I craft accessible, pixel-perfect, and performant web experiences that blend form and function.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                    <Button size="lg" className="min-w-[160px]">
                        Hire Me
                    </Button>
                    <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="lg" className="min-w-[160px]">
                            View Resume
                        </Button>
                    </a>
                </div>
            </div>

            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-muted-foreground">
                <ChevronDown size={24} />
            </div>
        </Section>
    );
}
