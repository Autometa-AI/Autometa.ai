"use client";

import { Children, ReactNode, useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, MotionValue } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

type Props = {
    children: ReactNode;
    heightPerCard?: number;
    maxWidth?: number;
    gap?: number;
};

export default function ScrollStack({
    children,
    heightPerCard = 90,
    maxWidth = 1200,
    gap = 18,
}: Props) {
    const isMobile = useIsMobile();
    const reduced = useReducedMotion();
    const ref = useRef<HTMLDivElement>(null);

    const items = Children.toArray(children);
    const total = items.length;

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end end"],
    });

    if (isMobile || reduced || total <= 1) {
        return (
            <div style={{ display: "flex", flexDirection: "column", gap }}>
                {items}
            </div>
        );
    }

    return (
        <div ref={ref} style={{ position: "relative", height: `${total * heightPerCard}vh` }}>
            <div
                style={{
                    position: "sticky",
                    top: 0,
                    height: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                }}
            >
                {items.map((child, i) => (
                    <StackItem
                        key={i}
                        index={i}
                        total={total}
                        progress={scrollYProgress}
                        maxWidth={maxWidth}
                    >
                        {child}
                    </StackItem>
                ))}
            </div>
        </div>
    );
}

function StackItem({
    index,
    total,
    progress,
    maxWidth,
    children,
}: {
    index: number;
    total: number;
    progress: MotionValue<number>;
    maxWidth: number;
    children: ReactNode;
}) {
    const isFirst = index === 0;
    const isLast = index === total - 1;

    const start = index / total;
    const end = (index + 1) / total;
    const span = 1 / total;
    const inTime = start + span * 0.45;
    const outTime = end - span * 0.45;

    const stops: number[] = [];
    const xs: string[] = [];
    const os: number[] = [];

    if (isFirst) {
        stops.push(0);
        xs.push("0%");
        os.push(1);
    } else {
        stops.push(0, start);
        xs.push("100%", "100%");
        os.push(0, 0);
    }

    stops.push(inTime, outTime);
    xs.push("0%", "0%");
    os.push(1, 1);

    if (isLast) {
        stops.push(1);
        xs.push("0%");
        os.push(1);
    } else {
        stops.push(end, 1);
        xs.push("-100%", "-100%");
        os.push(0, 0);
    }

    const x = useTransform(progress, stops, xs);
    const opacity = useTransform(progress, stops, os);

    return (
        <motion.div
            style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0 clamp(1rem, 4vw, 3rem)",
                x,
                opacity,
                willChange: "transform, opacity",
            }}
        >
            <div style={{ width: "100%", maxWidth }}>{children}</div>
        </motion.div>
    );
}
