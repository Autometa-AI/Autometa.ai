"use client";

import { useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Users, Database, Workflow, Bot, BarChart3, Wrench } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsMobile } from "@/hooks/useIsMobile";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const services = [
    { icon: <Users size={20} />, number: "01", title: "Lead Management Systems", description: "Centralized lead capture from all sources. Track, score, and route leads automatically so your team focuses on the hottest opportunities.", tags: ["Lead Capture", "Pipeline Tracking", "Auto-Routing", "Scoring"] },
    { icon: <Database size={20} />, number: "02", title: "CRM Setup & Optimization", description: "Implement and optimize your CRM with structured workflows, automated data entry, and full pipeline visibility from first touch to close.", tags: ["CRM Setup", "Data Sync", "Pipeline Views", "Reporting"] },
    { icon: <Workflow size={20} />, number: "03", title: "Workflow Automation", description: "Automate follow-ups, task assignments, notifications, and handoffs. Eliminate manual work and ensure nothing falls through the cracks.", tags: ["Auto Follow-ups", "Task Triggers", "Notifications", "Handoffs"] },
    { icon: <Bot size={20} />, number: "04", title: "AI Integrations", description: "AI-powered responses on WhatsApp, email, and SMS. Intelligent lead qualification, sentiment analysis, and predictive scoring.", tags: ["AI Responses", "WhatsApp Bot", "Lead Scoring", "Smart Routing"] },
    { icon: <BarChart3 size={20} />, number: "05", title: "Custom Dashboards", description: "Real-time dashboards that show pipeline health, agent performance, conversion rates, and revenue forecasts at a glance.", tags: ["Real-Time Data", "Agent KPIs", "Conversion Tracking", "Forecasting"] },
    { icon: <Wrench size={20} />, number: "06", title: "Internal Tools", description: "Custom-built tools for your specific workflows — inventory trackers, commission calculators, document generators, and more.", tags: ["Custom Tools", "Inventory", "Calculators", "Doc Gen"] },
];

function TiltCard({ children }: { children: React.ReactNode }) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [2, -2]), { stiffness: 300, damping: 30 });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-2, 2]), { stiffness: 300, damping: 30 });

    function handleMouse(e: React.MouseEvent) {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    }
    function resetMouse() { x.set(0); y.set(0); }

    return (
        <motion.div ref={ref} onMouseMove={handleMouse} onMouseLeave={resetMouse}
            style={{ rotateX, rotateY, transformPerspective: 800, transformStyle: "preserve-3d" }}>
            {children}
        </motion.div>
    );
}

export default function ServicesSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();

    useEffect(() => {
        if (!containerRef.current) return;
        const cards = containerRef.current.querySelectorAll(".service-card");
        gsap.set(cards, { opacity: 0, y: 30 });
        ScrollTrigger.batch(cards, {
            onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power3.out", overwrite: true }),
            start: "top 90%",
        });
        return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    }, []);

    return (
        <section id="services" style={{ padding: "6rem 0", position: "relative" }}>
            <div className="container-wide">
                <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ marginBottom: "3rem" }}>
                    <span className="section-eyebrow">Services</span>
                    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
                        <h2 className="font-display" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 700, letterSpacing: "-0.03em", color: "var(--text)", lineHeight: 1.1, maxWidth: 560 }}>
                            Everything You Need for a <span className="gradient-text">High-Performance</span> Operation
                        </h2>
                        <motion.a href="/services" className="btn-secondary" style={{ fontSize: "0.8rem" }} whileHover={{ scale: 1.03 }}>
                            Explore Services <ArrowRight size={13} />
                        </motion.a>
                    </div>
                </motion.div>

                <div ref={containerRef} style={{
                    display: "grid",
                    gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
                    gap: 12,
                }}>
                    {services.map((s) => (
                        <TiltCard key={s.title}>
                            <div className="service-card glass-card" style={{ padding: "1.5rem", cursor: "default", height: "100%" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                                    <div style={{
                                        width: 36, height: 36, borderRadius: 10,
                                        background: "var(--tag-bg)", border: "1px solid var(--tag-border)",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        color: "var(--accent)",
                                    }}>
                                        {s.icon}
                                    </div>
                                    <span style={{ fontSize: "0.65rem", fontWeight: 600, color: "var(--text-faint)", fontFamily: "'JetBrains Mono', monospace" }}>{s.number}</span>
                                </div>
                                <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text)", marginBottom: 8, letterSpacing: "-0.01em" }}>{s.title}</h3>
                                <p style={{ fontSize: "0.875rem", color: "var(--text-subtle)", lineHeight: 1.7, marginBottom: 12 }}>{s.description}</p>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                                    {s.tags.map(t => (
                                        <motion.span key={t} className="tag" whileHover={{ scale: 1.06 }}>{t}</motion.span>
                                    ))}
                                </div>
                            </div>
                        </TiltCard>
                    ))}
                </div>
            </div>
        </section>
    );
}
