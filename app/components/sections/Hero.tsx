"use client";

import { ArrowRight, Download, ChevronDown } from "lucide-react";
import Button from "../ui/Button";
import Section from "../Section";

export default function Hero() {
    return (
        <Section id="hero" className="text-center pt-32">
            <div className="space-y-6 max-w-3xl mx-auto">
                <p className="text-primary font-medium tracking-wide uppercase text-sm">Hello, I'm a Developer</p>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-tight">
                    Building digital <span className="text-primary text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">experiences</span> with purpose.
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    I craft accessible, pixel-perfect, and performant web experiences that blend form and function.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                    <Button size="lg" className="group">
                        View My Work
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                    <Button variant="outline" size="lg">
                        <Download className="mr-2 h-4 w-4" /> Download Resume
                    </Button>
                </div>
            </div>

            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-muted-foreground">
                <ChevronDown size={24} />
            </div>
        </Section>
    );
}
