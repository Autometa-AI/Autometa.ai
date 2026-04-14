"use client";

import { motion } from "framer-motion";
import {
    PhoneCall,
    Search,
    PencilRuler,
    Rocket,
    TrendingUp,
    ArrowRight,
} from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";

type Step = {
    num: string;
    icon: React.ReactNode;
    title: string;
    desc: string;
    deliverables: string[];
};

const steps: Step[] = [
    {
        num: "01",
        icon: <PhoneCall size={22} />,
        title: "Discovery Call",
        desc: "We start with a free 30-minute call to understand your operations, pain points, and growth goals. No pitch — just clarity on what's actually broken.",
        deliverables: ["Free 30-min consultation", "Operations snapshot", "Quick-win opportunities"],
    },
    {
        num: "02",
        icon: <Search size={22} />,
        title: "System Audit",
        desc: "We dive deep into your current tools, workflows, and data. We map every lead journey and identify exactly where revenue leaks.",
        deliverables: ["Workflow map", "Gap analysis report", "ROI projection"],
    },
    {
        num: "03",
        icon: <PencilRuler size={22} />,
        title: "System Design",
        desc: "We design a tailored blueprint — CRM schemas, automation flows, AI integrations, and custom tools — built around your real estate workflow.",
        deliverables: ["Custom blueprint", "Tool stack plan", "Automation diagrams"],
    },
    {
        num: "04",
        icon: <Rocket size={22} />,
        title: "Build & Deploy",
        desc: "We build, integrate, and launch the entire system. CRM setup, automations, dashboards, AI — delivered end-to-end and tested with your team.",
        deliverables: ["Live CRM + automations", "Team training", "Docs + playbooks"],
    },
    {
        num: "05",
        icon: <TrendingUp size={22} />,
        title: "Optimize & Scale",
        desc: "We monitor, optimize, and iterate. New features, new integrations, ongoing improvements — so your system compounds in value every month.",
        deliverables: ["Monthly reviews", "Continuous optimization", "New feature rollouts"],
    },
];

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];
const vp = { once: true, amount: 0.15 as const };

export default function ProcessSection() {
    const isMobile = useIsMobile();

    return (
        <section id="process" style={{ padding: "6rem 0 7rem", position: "relative" }}>
            <div className="container-wide">
                {/* Header */}
                <div style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 4rem" }}>
                    <motion.span
                        className="section-eyebrow"
                        style={{ justifyContent: "center" }}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={vp}
                        transition={{ duration: 0.6, ease }}
                    >
                        How We Work
                    </motion.span>
                    <motion.h2
                        className="font-display"
                        style={{
                            fontSize: "clamp(2.2rem, 4.2vw, 3.25rem)",
                            fontWeight: 700,
                            letterSpacing: "-0.035em",
                            color: "var(--text)",
                            lineHeight: 1.08,
                            marginBottom: 16,
                        }}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={vp}
                        transition={{ duration: 0.7, delay: 0.1, ease }}
                    >
                        From the <span className="gradient-text">First Call</span> to Project Delivery
                    </motion.h2>
                    <motion.p
                        style={{ fontSize: "1.15rem", color: "var(--text-muted)", lineHeight: 1.65 }}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={vp}
                        transition={{ duration: 0.6, delay: 0.2, ease }}
                    >
                        A proven 5-step process that turns fragmented operations into a scalable, AI-powered system — with zero guesswork.
                    </motion.p>
                </div>

                {/* Vertical Steps */}
                <div style={{ position: "relative", maxWidth: 900, margin: "0 auto" }}>
                    {/* Vertical line */}
                    {!isMobile && (
                        <div
                            style={{
                                position: "absolute", left: 39, top: 40, bottom: 40,
                                width: 2,
                                background: "linear-gradient(to bottom, transparent, var(--border) 10%, var(--border) 90%, transparent)",
                                zIndex: 0,
                            }}
                        />
                    )}

                    {steps.map((step, i) => (
                        <motion.div
                            key={step.num}
                            style={{
                                display: "flex",
                                gap: isMobile ? 16 : 28,
                                position: "relative",
                                zIndex: 1,
                                marginBottom: i === steps.length - 1 ? 0 : 28,
                            }}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.15 }}
                            transition={{ duration: 0.7, ease }}
                        >
                            {/* Number bubble */}
                            <motion.div
                                style={{
                                    flexShrink: 0, width: 80, height: 80, borderRadius: 20,
                                    background: "var(--surface-solid)", border: "1px solid var(--border)",
                                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                                    gap: 4, boxShadow: "0 6px 24px rgba(0,0,0,0.3)",
                                }}
                                initial={{ opacity: 0, scale: 0.85 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.1, ease }}
                            >
                                <div style={{ color: "var(--accent)" }}>{step.icon}</div>
                                <div style={{
                                    fontSize: "0.66rem", fontWeight: 700, color: "var(--text-faint)",
                                    fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.05em",
                                }}>
                                    STEP {step.num}
                                </div>
                            </motion.div>

                            {/* Content card */}
                            <motion.div
                                className="glass-card"
                                style={{ flex: 1, padding: isMobile ? "1.5rem 1.25rem" : "1.85rem 2rem", minWidth: 0 }}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.15, ease }}
                            >
                                <h3
                                    className="font-display"
                                    style={{
                                        fontSize: isMobile ? "1.35rem" : "1.6rem",
                                        fontWeight: 700, color: "var(--text)",
                                        letterSpacing: "-0.02em", marginBottom: 10,
                                    }}
                                >
                                    {step.title}
                                </h3>
                                <p style={{ fontSize: "1.05rem", color: "var(--text-muted)", lineHeight: 1.65, marginBottom: 16 }}>
                                    {step.desc}
                                </p>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                                    {step.deliverables.map((d) => (
                                        <span key={d} className="tag" style={{ fontSize: "0.78rem" }}>{d}</span>
                                    ))}
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    style={{ textAlign: "center", marginTop: "3.5rem" }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={vp}
                    transition={{ duration: 0.6, ease }}
                >
                    <a href="/contact" className="btn-primary">
                        Start with a Discovery Call <ArrowRight size={15} />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
