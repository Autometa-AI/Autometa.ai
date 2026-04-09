"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Users, Database, Workflow, Bot, BarChart3, Wrench, MessageSquare, Phone, Zap, Settings, Monitor, Smartphone, Link2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useIsMobile } from "@/hooks/useIsMobile";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const coreServices = [
    {
        icon: <Users size={24} />, title: "Lead Management Systems",
        features: ["Centralized lead capture from all sources", "Automated pipeline tracking & scoring", "Intelligent lead routing to agents"],
        outcome: "Never lose a lead again",
    },
    {
        icon: <Database size={24} />, title: "CRM Setup & Optimization",
        features: ["CRM implementation & configuration", "Workflow setup & automation rules", "Data migration & cleanup"],
        outcome: "Full pipeline visibility from day one",
    },
    {
        icon: <Workflow size={24} />, title: "Workflow Automation",
        features: ["Automated follow-up sequences", "Task triggers & assignment rules", "Deadline & notification systems"],
        outcome: "Eliminate manual repetitive work",
    },
];

const aiServices = [
    {
        icon: <Bot size={24} />, title: "AI Follow-Up Systems",
        desc: "Automated WhatsApp, email, and SMS responses that engage leads instantly and nurture them through your pipeline.",
        outcome: "Consistent, timely communication on autopilot",
    },
    {
        icon: <Phone size={24} />, title: "Communication Tracking",
        desc: "Complete logs of every call, message, and interaction — tied to each lead and deal for full accountability.",
        outcome: "Full visibility on every conversation",
    },
    {
        icon: <Zap size={24} />, title: "Smart Automation",
        desc: "Behavior-based triggers that respond to lead actions — site visits, form fills, message opens — without manual intervention.",
        outcome: "Self-running systems that scale with you",
    },
];

const customSolutions = [
    { icon: <BarChart3 size={20} />, label: "Custom Dashboards" },
    { icon: <Wrench size={20} />, label: "Internal Tools" },
    { icon: <Smartphone size={20} />, label: "Mobile Apps" },
    { icon: <Link2 size={20} />, label: "Integrations" },
];

const systemFlow = ["Lead Sources", "Lead Management", "CRM", "Automation", "Execution", "Insights"];

const engagementModels = [
    { title: "System Setup", desc: "One-time implementation of your complete system — CRM, automations, dashboards, and integrations.", tag: "Most Popular" },
    { title: "Ongoing Support", desc: "Continuous optimization, monitoring, and support to keep your systems running at peak performance.", tag: "Recommended" },
    { title: "Custom Development", desc: "Bespoke tools, apps, and integrations built from scratch for your unique operational needs.", tag: "Enterprise" },
];

export default function ServicesPage() {
    const coreRef = useRef<HTMLDivElement>(null);
    const aiRef = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();

    useEffect(() => {
        [coreRef, aiRef].forEach(ref => {
            if (!ref.current) return;
            const cards = ref.current.querySelectorAll(".srv-card");
            gsap.set(cards, { opacity: 0, y: 24 });
            ScrollTrigger.batch(cards, {
                onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power3.out", overwrite: true }),
                start: "top 90%",
            });
        });
        return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    }, []);

    return (
        <main style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text)", overflowX: "hidden" }}>
            <Navbar />

            {/* Hero */}
            <section style={{ padding: "8rem 0 4rem", position: "relative" }}>
                <div className="mesh-bg" />
                <div className="container-wide" style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 680 }}>
                    <span className="section-eyebrow">Our Services</span>
                    <h1 className="font-display" style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)", fontWeight: 700, letterSpacing: "-0.04em", color: "var(--text)", lineHeight: 1.08, marginBottom: 16 }}>
                        Everything You Need to <span className="gradient-text">Scale Operations</span>
                    </h1>
                    <p style={{ fontSize: "1rem", color: "var(--text-subtle)", lineHeight: 1.75, marginBottom: 28 }}>
                        From lead management to custom tools — we build the systems that power high-performance real estate teams.
                    </p>
                    <a href="/contact" className="btn-primary">Book Free System Audit <ArrowRight size={14} /></a>
                </div>
            </section>

            {/* Core Services */}
            <section style={{ padding: "4rem 0" }}>
                <div className="container-wide">
                    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ marginBottom: "2.5rem" }}>
                        <span className="section-eyebrow">Core Services</span>
                        <h2 className="font-display" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 700, letterSpacing: "-0.03em", color: "var(--text)", lineHeight: 1.1 }}>
                            Build Your <span className="gradient-text">Foundation</span>
                        </h2>
                    </motion.div>
                    <div ref={coreRef} style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 16 }}>
                        {coreServices.map(s => (
                            <div key={s.title} className="srv-card glass-card" style={{ padding: "2rem 1.5rem" }}>
                                <div style={{ width: 48, height: 48, borderRadius: 14, background: "var(--tag-bg)", border: "1px solid var(--tag-border)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent)", marginBottom: 16 }}>
                                    {s.icon}
                                </div>
                                <h3 className="font-display" style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--text)", marginBottom: 12 }}>{s.title}</h3>
                                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
                                    {s.features.map(f => (
                                        <li key={f} style={{ fontSize: "0.85rem", color: "var(--text-subtle)", display: "flex", alignItems: "center", gap: 8 }}>
                                            <span style={{ color: "var(--accent)", fontSize: "0.75rem" }}>&#10003;</span> {f}
                                        </li>
                                    ))}
                                </ul>
                                <div style={{ padding: "0.5rem 0.75rem", background: "var(--tag-bg)", border: "1px solid var(--tag-border)", borderRadius: 8, fontSize: "0.75rem", fontWeight: 600, color: "var(--accent)", fontFamily: "'JetBrains Mono', monospace" }}>
                                    {s.outcome}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Automation & AI */}
            <section style={{ padding: "4rem 0" }}>
                <div className="container-wide">
                    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ marginBottom: "2.5rem" }}>
                        <span className="section-eyebrow">Automation & AI</span>
                        <h2 className="font-display" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 700, letterSpacing: "-0.03em", color: "var(--text)", lineHeight: 1.1 }}>
                            Intelligent <span className="gradient-text">Automation</span>
                        </h2>
                    </motion.div>
                    <div ref={aiRef} style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 16 }}>
                        {aiServices.map(s => (
                            <div key={s.title} className="srv-card glass-card" style={{ padding: "2rem 1.5rem" }}>
                                <div style={{ width: 48, height: 48, borderRadius: 14, background: "var(--tag-bg)", border: "1px solid var(--tag-border)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent)", marginBottom: 16 }}>
                                    {s.icon}
                                </div>
                                <h3 className="font-display" style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--text)", marginBottom: 8 }}>{s.title}</h3>
                                <p style={{ fontSize: "0.85rem", color: "var(--text-subtle)", lineHeight: 1.7, marginBottom: 16 }}>{s.desc}</p>
                                <div style={{ padding: "0.5rem 0.75rem", background: "var(--tag-bg)", border: "1px solid var(--tag-border)", borderRadius: 8, fontSize: "0.75rem", fontWeight: 600, color: "var(--accent)", fontFamily: "'JetBrains Mono', monospace" }}>
                                    {s.outcome}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Custom Solutions */}
            <section style={{ padding: "4rem 0" }}>
                <div className="container-wide">
                    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ marginBottom: "2.5rem" }}>
                        <span className="section-eyebrow">Custom Solutions</span>
                        <h2 className="font-display" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 700, letterSpacing: "-0.03em", color: "var(--text)", lineHeight: 1.1 }}>
                            Built <span className="gradient-text">For You</span>
                        </h2>
                    </motion.div>
                    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: 12 }}>
                        {customSolutions.map(s => (
                            <motion.div key={s.label} className="glass-card" style={{ padding: "1.5rem", textAlign: "center" }}
                                whileHover={{ scale: 1.02 }}>
                                <div style={{ width: 44, height: 44, borderRadius: 12, background: "var(--tag-bg)", border: "1px solid var(--tag-border)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent)", margin: "0 auto 10px" }}>
                                    {s.icon}
                                </div>
                                <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text)" }}>{s.label}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* System Flow */}
            <section style={{ padding: "4rem 0" }}>
                <div className="container-wide">
                    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ marginBottom: "2.5rem", textAlign: "center" }}>
                        <span className="section-eyebrow">System Flow</span>
                        <h2 className="font-display" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 700, letterSpacing: "-0.03em", color: "var(--text)", lineHeight: 1.1 }}>
                            How It All <span className="gradient-text">Connects</span>
                        </h2>
                    </motion.div>
                    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: isMobile ? 8 : 0 }}>
                        {systemFlow.map((step, i) => (
                            <div key={step} style={{ display: "flex", alignItems: "center" }}>
                                <div className="glass-card" style={{ padding: "0.75rem 1.25rem", whiteSpace: "nowrap" }}>
                                    <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text)" }}>{step}</span>
                                </div>
                                {i < systemFlow.length - 1 && (
                                    <ArrowRight size={16} style={{ color: "var(--accent)", margin: "0 6px", flexShrink: 0 }} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Engagement Models */}
            <section style={{ padding: "4rem 0" }}>
                <div className="container-wide">
                    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ marginBottom: "2.5rem", textAlign: "center" }}>
                        <span className="section-eyebrow">Engagement</span>
                        <h2 className="font-display" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 700, letterSpacing: "-0.03em", color: "var(--text)", lineHeight: 1.1 }}>
                            Choose Your <span className="gradient-text">Model</span>
                        </h2>
                    </motion.div>
                    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 16 }}>
                        {engagementModels.map(m => (
                            <div key={m.title} className="glass-card" style={{ padding: "2rem 1.5rem", position: "relative" }}>
                                <span className="tag" style={{ marginBottom: 12, display: "inline-block" }}>{m.tag}</span>
                                <h3 className="font-display" style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text)", marginBottom: 8 }}>{m.title}</h3>
                                <p style={{ fontSize: "0.85rem", color: "var(--text-subtle)", lineHeight: 1.7 }}>{m.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section style={{ padding: "4rem 0 6rem" }}>
                <div className="container-wide" style={{ textAlign: "center" }}>
                    <div className="glass-card" style={{ padding: isMobile ? "2.5rem 1.5rem" : "3.5rem 3rem", maxWidth: 640, margin: "0 auto" }}>
                        <h2 className="font-display" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, color: "var(--text)", marginBottom: 12, letterSpacing: "-0.03em" }}>
                            Ready to <span className="gradient-text">Scale?</span>
                        </h2>
                        <p style={{ fontSize: "0.95rem", color: "var(--text-subtle)", lineHeight: 1.7, marginBottom: 24 }}>
                            Book a free system audit and see exactly how we can streamline your operations.
                        </p>
                        <a href="/contact" className="btn-primary">Book Free System Audit <ArrowRight size={14} /></a>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
