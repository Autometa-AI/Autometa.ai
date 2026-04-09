"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock, Bell, TrendingUp, Eye, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsMobile } from "@/hooks/useIsMobile";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const outcomes = [
    { icon: <Clock size={24} />, value: "10+", suffix: "hrs/week", label: "Time Saved", desc: "Eliminate repetitive manual tasks and free up your team to focus on closing deals." },
    { icon: <Bell size={24} />, value: "0", suffix: " missed", label: "Follow-ups Missed", desc: "Automated sequences ensure every lead gets timely, consistent communication." },
    { icon: <TrendingUp size={24} />, value: "2-3x", suffix: "", label: "More Conversions", desc: "Faster response times and structured pipelines dramatically increase close rates." },
    { icon: <Eye size={24} />, value: "100%", suffix: "", label: "Pipeline Visibility", desc: "See every lead, every stage, and every agent's performance in real time." },
];

export default function ResultsSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();

    useEffect(() => {
        if (!containerRef.current) return;
        const cards = containerRef.current.querySelectorAll(".result-card");
        gsap.set(cards, { opacity: 0, y: 24 });
        ScrollTrigger.batch(cards, {
            onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power3.out", overwrite: true }),
            start: "top 90%",
        });
        return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    }, []);

    return (
        <section id="results" style={{ padding: "6rem 0", position: "relative" }}>
            <div className="container-wide">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    style={{ marginBottom: "3rem", textAlign: "center", maxWidth: 640, marginLeft: "auto", marginRight: "auto" }}
                >
                    <span className="section-eyebrow">Results</span>
                    <h2 className="font-display" style={{
                        fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                        fontWeight: 700, letterSpacing: "-0.03em",
                        color: "var(--text)", lineHeight: 1.1,
                    }}>
                        What You Can <span className="gradient-text">Expect</span>
                    </h2>
                </motion.div>

                <div ref={containerRef} style={{
                    display: "grid",
                    gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
                    gap: 16,
                }}>
                    {outcomes.map((item) => (
                        <div key={item.label} className="result-card glass-card" style={{ padding: "2rem 1.5rem", display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
                            <div style={{
                                width: 52, height: 52, borderRadius: 14, flexShrink: 0,
                                background: "var(--tag-bg)", border: "1px solid var(--tag-border)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                color: "var(--accent)",
                            }}>
                                {item.icon}
                            </div>
                            <div>
                                <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 4 }}>
                                    <span className="font-display gradient-text" style={{ fontSize: "1.75rem", fontWeight: 800, letterSpacing: "-0.03em" }}>
                                        {item.value}{item.suffix}
                                    </span>
                                </div>
                                <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text)", marginBottom: 4 }}>{item.label}</h3>
                                <p style={{ fontSize: "0.85rem", color: "var(--text-subtle)", lineHeight: 1.7 }}>{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    style={{ textAlign: "center", marginTop: "2.5rem" }}
                >
                    <a href="/contact" className="btn-primary">
                        Book Free System Audit <ArrowRight size={14} />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
