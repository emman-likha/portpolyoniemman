"use client";

import { Github, Linkedin, Twitter, Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer className="w-full py-8 mt-20 border-t border-border bg-card">
            <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
                <div className="mb-4 md:mb-0">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} Portfolio. All rights reserved.
                    </p>
                </div>

                <div className="flex space-x-6">
                    <a href="https://github.com/emman-likha" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                        <Github size={20} />
                        <span className="sr-only">GitHub</span>
                    </a>
                    <a href="https://www.linkedin.com/in/john-emmanuel-bulaon/" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                        <Linkedin size={20} />
                        <span className="sr-only">LinkedIn</span>
                    </a>
                    <a href="mailto:bulaonjohnemm4nuel.21@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                        <Mail size={20} />
                        <span className="sr-only">Email</span>
                    </a>
                </div>
            </div>
        </footer>
    );
}
