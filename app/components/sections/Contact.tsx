"use client";

import { useState, useRef, type FormEvent } from "react";
import { Mail, Send, Loader2, CheckCircle2 } from "lucide-react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import Button from "../ui/Button";
import Section from "../Section";

const WEB3FORMS_KEY = "19a69c5e-8a5a-454b-beda-09c7c17f1eef";
const HCAPTCHA_SITE_KEY = "60e6e688-cc0a-49e4-84f2-1df492e476cc";

export default function Contact() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [captchaToken, setCaptchaToken] = useState("");
    const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
    const captchaRef = useRef<HCaptcha>(null);

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();

        if (!captchaToken) {
            setStatus("error");
            setTimeout(() => setStatus("idle"), 4000);
            return;
        }

        setStatus("sending");

        try {
            const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    access_key: WEB3FORMS_KEY,
                    email,
                    message,
                    from_name: "Portfolio Contact Form",
                    subject: `New message from ${email}`,
                    botcheck: "",
                    "h-captcha-response": captchaToken,
                }),
            });

            if (res.ok) {
                setStatus("sent");
                setEmail("");
                setMessage("");
                setCaptchaToken("");
                captchaRef.current?.resetCaptcha();
                setTimeout(() => setStatus("idle"), 4000);
            } else {
                setStatus("error");
                setTimeout(() => setStatus("idle"), 4000);
            }
        } catch {
            setStatus("error");
            setTimeout(() => setStatus("idle"), 4000);
        }
    }

    return (
        <Section id="contact" className="bg-card/50">
            <div className="max-w-xl mx-auto text-center space-y-8">
                <h2 className="text-3xl md:text-4xl font-bold">Let&apos;s Work Together</h2>
                <p className="text-muted-foreground text-lg">
                    I&apos;m currently available for freelance projects and full-time opportunities. If you have a project that needs some creative touch, I&apos;d love to hear from you.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                            Your Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            required
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-sm border border-border bg-background text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors"
                        />
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1.5">
                            Message
                        </label>
                        <textarea
                            id="message"
                            required
                            rows={5}
                            placeholder="Tell me about your project or just say hello..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-sm border border-border bg-background text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors resize-none"
                        />
                    </div>

                    <div className="flex justify-center">
                        <HCaptcha
                            sitekey={HCAPTCHA_SITE_KEY}
                            onVerify={(token) => setCaptchaToken(token)}
                            onExpire={() => setCaptchaToken("")}
                            ref={captchaRef}
                        />
                    </div>

                    <div className="pt-2">
                        <Button
                            type="submit"
                            size="lg"
                            className="w-full gap-2"
                            disabled={status === "sending" || status === "sent" || !captchaToken}
                        >
                            {status === "sending" && (
                                <>
                                    <Loader2 size={18} className="animate-spin" /> Sending...
                                </>
                            )}
                            {status === "sent" && (
                                <>
                                    <CheckCircle2 size={18} /> Message Sent!
                                </>
                            )}
                            {status === "error" && (
                                <>
                                    <Mail size={18} /> Failed — Try Again
                                </>
                            )}
                            {status === "idle" && (
                                <>
                                    <Send size={18} /> Send Message
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </Section>
    );
}
