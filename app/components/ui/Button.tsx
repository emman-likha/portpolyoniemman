"use client";

import React from "react";
import { cn } from "../../utils/cn"; // We'll need a utility for class merging, or just template literals if simple

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
}

export default function Button({
    children,
    className = "",
    variant = "primary",
    size = "md",
    ...props
}: ButtonProps) {
    const baseStyles = "inline-flex items-center justify-center rounded-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer";

    const variants = {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
    };

    const sizes = {
        sm: "h-9 px-3 text-xs",
        md: "h-10 px-8 py-2",
        lg: "h-11 px-8 text-md",
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} // Simple concatenation for now
            {...props}
        >
            {children}
        </button>
    );
}
