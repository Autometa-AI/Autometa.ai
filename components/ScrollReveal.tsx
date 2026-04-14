"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

type ScrollRevealProps = {
    children: React.ReactNode;
    delay?: number;
    duration?: number;
    y?: number;
    x?: number;
    once?: boolean;
    className?: string;
    style?: React.CSSProperties;
    as?: "div" | "section" | "article" | "span" | "p" | "h1" | "h2" | "h3" | "h4" | "li";
    margin?: string;
};

export default function ScrollReveal({
    children,
    delay = 0,
    duration = 0.7,
    y = 24,
    x = 0,
    once = true,
    className,
    style,
    as = "div",
    margin = "-80px",
}: ScrollRevealProps) {
    const ref = useRef(null);
    const inView = useInView(ref, { once, margin: margin as any });

    const Component = motion[as] || motion.div;

    return (
        <Component
            ref={ref}
            initial={{ opacity: 0, y, x }}
            animate={inView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y, x }}
            transition={{
                duration,
                delay,
                ease: [0.16, 1, 0.3, 1],
            }}
            className={className}
            style={style}
        >
            {children}
        </Component>
    );
}

/**
 * Wrapper for staggering children in a grid/list.
 * Each child gets an incremental delay.
 */
export function ScrollRevealStagger({
    children,
    stagger = 0.1,
    baseDelay = 0,
    y = 24,
    duration = 0.6,
    className,
    style,
}: {
    children: React.ReactNode[];
    stagger?: number;
    baseDelay?: number;
    y?: number;
    duration?: number;
    className?: string;
    style?: React.CSSProperties;
}) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-60px" as any });

    return (
        <div ref={ref} className={className} style={style}>
            {children.map((child, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
                    transition={{
                        duration,
                        delay: baseDelay + i * stagger,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                >
                    {child}
                </motion.div>
            ))}
        </div>
    );
}
