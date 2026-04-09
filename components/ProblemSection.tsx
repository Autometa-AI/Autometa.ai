"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, MessageSquareOff, Clock, EyeOff, Cog, Database } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsMobile } from "@/hooks/useIsMobile";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const painPoints = [
    { icon: <Database size={20} />, title: "Leads lost across channels", desc: "WhatsApp, calls, spreadsheets — leads fall through the cracks without a centralized system." },
    { icon: <Clock size={20} />, title: "Missed or delayed follow-ups", desc: "Slow response times cost you deals. Manual follow-ups can't keep up with volume." },
    { icon: <EyeOff size={20} />, title: "No visibility on agent performance", desc: "Without tracking, you can't see who's converting and who's dropping the ball." },
    { icon: <Cog size={20} />, title: "Manual work slows everything", desc: "Repetitive data entry, reporting, and scheduling eat up hours every day." },
    { icon: <MessageSquareOff size={20} />, title: "No centralized tracking system", desc: "Disconnected tools and no single source of truth for your pipeline." },
];

export default function ProblemSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();

    useEffect(() => {
        if (!containerRef.current) return;
        const cards = containerRef.current.querySelectorAll(".problem-card");
        gsap.set(cards, { opacity: 0, y: 24 });
        ScrollTrigger.batch(cards, {
            onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: "power3.out", overwrite: true }),
            start: "top 90%",
        });
        return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    }, []);

    return (
        <section id="problem" style={{ padding: "6rem 0", position: "relative" }}>
            <div className="container-wide">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    style={{ marginBottom: "3rem", textAlign: "center", maxWidth: 640, marginLeft: "auto", marginRight: "auto" }}
                >
                    <span className="section-eyebrow">The Problem</span>
                    <h2 className="font-display" style={{
                        fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                        fontWeight: 700, letterSpacing: "-0.03em",
                        color: "var(--text)", lineHeight: 1.1,
                    }}>
                        Most Real Estate Teams <span className="gradient-text">Lose Deals</span> Due to Broken Systems
                    </h2>
                </motion.div>

                <div ref={containerRef} style={{
                    display: "grid",
                    gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
                    gap: 12,
                }}>
                    {painPoints.map((point, i) => (
                        <div key={point.title} className="problem-card glass-card" style={{
                            padding: "1.5rem",
                            gridColumn: !isMobile && i >= 3 ? "span 1" : undefined,
                        }}>
                            <div style={{
                                width: 40, height: 40, borderRadius: 12,
                                background: "rgba(239, 68, 68, 0.08)", border: "1px solid rgba(239, 68, 68, 0.15)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                color: "#ef4444", marginBottom: 12,
                            }}>
                                {point.icon}
                            </div>
                            <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text)", marginBottom: 6, letterSpacing: "-0.01em" }}>
                                {point.title}
                            </h3>
                            <p style={{ fontSize: "0.85rem", color: "var(--text-subtle)", lineHeight: 1.7 }}>
                                {point.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
