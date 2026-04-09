"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FileText, Layout, Workflow, ArrowRight, Lock } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsMobile } from "@/hooks/useIsMobile";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const resources = [
    { icon: <FileText size={20} />, title: "Email & WhatsApp Templates", desc: "Proven follow-up sequences used by top-performing real estate teams." },
    { icon: <Layout size={20} />, title: "Lead Management Blueprints", desc: "Step-by-step system designs for capturing and tracking every lead." },
    { icon: <Workflow size={20} />, title: "Automation Workflows", desc: "Plug-and-play automation recipes for common real estate operations." },
];

export default function ResourceHubTeaser() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();

    useEffect(() => {
        if (!containerRef.current) return;
        const cards = containerRef.current.querySelectorAll(".resource-card");
        gsap.set(cards, { opacity: 0, y: 20 });
        ScrollTrigger.batch(cards, {
            onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power3.out", overwrite: true }),
            start: "top 90%",
        });
        return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    }, []);

    return (
        <section id="resources-teaser" style={{ padding: "6rem 0", position: "relative" }}>
            <div className="container-wide">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    style={{ marginBottom: "3rem", textAlign: "center", maxWidth: 640, marginLeft: "auto", marginRight: "auto" }}
                >
                    <span className="section-eyebrow">Resources</span>
                    <h2 className="font-display" style={{
                        fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                        fontWeight: 700, letterSpacing: "-0.03em",
                        color: "var(--text)", lineHeight: 1.1, marginBottom: 12,
                    }}>
                        Access Proven Systems, <span className="gradient-text">Playbooks &amp; Templates</span>
                    </h2>
                    <p style={{ fontSize: "0.95rem", color: "var(--text-subtle)", lineHeight: 1.7 }}>
                        Free resources to help you start optimizing your real estate operations today.
                    </p>
                </motion.div>

                <div ref={containerRef} style={{
                    display: "grid",
                    gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
                    gap: 16,
                }}>
                    {resources.map((item) => (
                        <div key={item.title} className="resource-card glass-card" style={{ padding: "1.75rem 1.5rem", textAlign: "center" }}>
                            <div style={{
                                width: 48, height: 48, borderRadius: 14,
                                background: "var(--tag-bg)", border: "1px solid var(--tag-border)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                color: "var(--accent)", margin: "0 auto 14px",
                            }}>
                                {item.icon}
                            </div>
                            <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text)", marginBottom: 6, letterSpacing: "-0.01em" }}>
                                {item.title}
                            </h3>
                            <p style={{ fontSize: "0.85rem", color: "var(--text-subtle)", lineHeight: 1.7 }}>
                                {item.desc}
                            </p>
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
                    <a href="/resources" className="btn-primary">
                        <Lock size={14} /> Unlock Free Resources <ArrowRight size={14} />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
