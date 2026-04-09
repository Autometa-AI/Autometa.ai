"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Settings, Zap, Code, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsMobile } from "@/hooks/useIsMobile";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const pillars = [
    {
        icon: <Settings size={24} />,
        title: "System Design",
        desc: "We audit your current workflows, identify bottlenecks, and design a structured system tailored to your operations.",
        tags: ["Workflow Audit", "Gap Analysis", "System Blueprint"],
    },
    {
        icon: <Zap size={24} />,
        title: "Automation & AI",
        desc: "Automate follow-ups, task assignments, lead routing, and communication — so nothing falls through the cracks.",
        tags: ["AI Follow-ups", "Task Automation", "Smart Triggers"],
    },
    {
        icon: <Code size={24} />,
        title: "Custom Development",
        desc: "Custom CRMs, dashboards, internal tools, and integrations built specifically for your real estate workflow.",
        tags: ["Custom CRM", "Dashboards", "Internal Tools"],
    },
];

export default function SolutionSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();

    useEffect(() => {
        if (!containerRef.current) return;
        const cards = containerRef.current.querySelectorAll(".solution-card");
        gsap.set(cards, { opacity: 0, y: 28 });
        ScrollTrigger.batch(cards, {
            onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out", overwrite: true }),
            start: "top 88%",
        });
        return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    }, []);

    return (
        <section id="solution" style={{ padding: "6rem 0", position: "relative" }}>
            <div className="container-wide">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    style={{ marginBottom: "3rem", textAlign: "center", maxWidth: 640, marginLeft: "auto", marginRight: "auto" }}
                >
                    <span className="section-eyebrow">The Solution</span>
                    <h2 className="font-display" style={{
                        fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                        fontWeight: 700, letterSpacing: "-0.03em",
                        color: "var(--text)", lineHeight: 1.1, marginBottom: 12,
                    }}>
                        We Turn Your Operations Into a <span className="gradient-text">Scalable System</span>
                    </h2>
                    <p style={{ fontSize: "0.95rem", color: "var(--text-subtle)", lineHeight: 1.7 }}>
                        We design and implement structured workflows, automation, and custom tools tailored to your real estate business.
                    </p>
                </motion.div>

                <div ref={containerRef} style={{
                    display: "grid",
                    gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
                    gap: 16,
                }}>
                    {pillars.map((pillar) => (
                        <div key={pillar.title} className="solution-card glass-card" style={{ padding: "2rem 1.5rem", textAlign: "center" }}>
                            <div style={{
                                width: 56, height: 56, borderRadius: 16,
                                background: "var(--tag-bg)", border: "1px solid var(--tag-border)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                color: "var(--accent)", margin: "0 auto 16px",
                            }}>
                                {pillar.icon}
                            </div>
                            <h3 className="font-display" style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--text)", marginBottom: 8, letterSpacing: "-0.01em" }}>
                                {pillar.title}
                            </h3>
                            <p style={{ fontSize: "0.875rem", color: "var(--text-subtle)", lineHeight: 1.7, marginBottom: 16 }}>
                                {pillar.desc}
                            </p>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center" }}>
                                {pillar.tags.map(t => (
                                    <span key={t} className="tag">{t}</span>
                                ))}
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
                    <a href="#process" className="btn-secondary" style={{ fontSize: "0.8rem" }}>
                        See How It Works <ArrowRight size={13} />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
