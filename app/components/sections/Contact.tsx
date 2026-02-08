"use client";

import { Mail } from "lucide-react";
import Button from "../ui/Button";
import Section from "../Section";

export default function Contact() {
    return (
        <Section id="contact" className="bg-card/50">
            <div className="max-w-xl mx-auto text-center space-y-8">
                <h2 className="text-3xl md:text-4xl font-bold">Let's Work Together</h2>
                <p className="text-muted-foreground text-lg">
                    I'm currently available for freelance projects and full-time opportunities. If you have a project that needs some creative touch, I'd love to hear from you.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a href="mailto:hello@example.com">
                        <Button size="lg" className="w-full sm:w-auto gap-2">
                            <Mail size={18} /> Say Hello
                        </Button>
                    </a>
                </div>
            </div>
        </Section>
    );
}
