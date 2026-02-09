"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, AlertCircle } from "lucide-react";

interface MicrolinkPreviewProps {
    url?: string;
    title: string;
}

export default function MicrolinkPreview({ url, title }: MicrolinkPreviewProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        if (!url) {
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        setError(false);

        // Microlink API to get screenshot
        // We use the screenshot.url directly via embed
        const microlinkUrl = `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url`;

        setPreviewUrl(microlinkUrl);
    }, [url]);

    const handleLoad = () => {
        setIsLoading(false);
    };

    const handleError = () => {
        setIsLoading(false);
        setError(true);
    };

    if (!url) {
        return (
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/30 to-background flex items-center justify-center">
                <span className="text-muted-foreground/50 font-medium">No Live URL Provided</span>
            </div>
        );
    }

    return (
        <div className="relative w-full h-full bg-muted">
            <AnimatePresence mode="wait">
                {isLoading && (
                    <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-muted gap-3"
                    >
                        <Loader2 className="w-8 h-8 text-primary animate-spin" />
                        <span className="text-sm text-muted-foreground animate-pulse">Generating preview...</span>
                    </motion.div>
                )}

                {error && (
                    <motion.div
                        key="error"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-muted gap-2 px-4 text-center"
                    >
                        <AlertCircle className="w-8 h-8 text-destructive/50" />
                        <span className="text-sm text-muted-foreground italic">Could not load preview</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {previewUrl && (
                <img
                    src={previewUrl}
                    alt={`Screenshot of ${title}`}
                    className={`w-full h-full object-cover transition-opacity duration-700 ${isLoading ? "opacity-0" : "opacity-100"}`}
                    onLoad={handleLoad}
                    onError={handleError}
                />
            )}
        </div>
    );
}
