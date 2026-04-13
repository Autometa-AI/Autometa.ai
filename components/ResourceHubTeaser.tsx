"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, FileText, Layout, Workflow, BookOpen, TrendingUp, Zap } from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";

type Tab = "blogs" | "resources";

type Card = {
    category: string;
    title: string;
    desc: string;
    icon: React.ReactNode;
    tag: string;
    gradient: string;
};

const blogs: Card[] = [
    {
        category: "AI Automation",
        title: "The 5 Levels of Real Estate Automation Maturity",
        desc: "A practical framework for agency founders to assess where their operations stand — and why most get stuck at Level 2.",
        icon: <TrendingUp size={18} />,
        tag: "5 min read",
        gradient: "linear-gradient(135deg, #00CFFF 0%, #0066FF 100%)",
    },
    {
        category: "Lead Management",
        title: "How to Build a Lead Pipeline That Actually Converts",
        desc: "The exact structure top-performing agencies use to route, score, and follow up on every lead within 60 seconds.",
        icon: <Workflow size={18} />,
        tag: "7 min read",
        gradient: "linear-gradient(135deg, #0066FF 0%, #66F2FF 100%)",
    },
    {
        category: "AI Technology",
        title: "Why WhatsApp AI Bots Are Transforming Real Estate",
        desc: "Real examples of how AI-powered chat is qualifying leads, booking viewings, and closing deals 24/7 for UAE agencies.",
        icon: <Zap size={18} />,
        tag: "6 min read",
        gradient: "linear-gradient(135deg, #66F2FF 0%, #0066FF 100%)",
    },
    {
        category: "Strategy",
        title: "The Complete Playbook for AI in Real Estate 2026",
        desc: "A 40-page deep-dive into the tools, tactics, and systems your agency needs to stay ahead in the next 12 months.",
        icon: <BookOpen size={18} />,
        tag: "40+ pages",
        gradient: "linear-gradient(135deg, #C0C0C0 0%, #E6E6E6 100%)",
    },
];

const resources: Card[] = [
    {
        category: "Templates",
        title: "Email & WhatsApp Follow-Up Templates",
        desc: "Proven sequences used by top UAE real estate teams. Copy, paste, adapt. Free.",
        icon: <FileText size={18} />,
        tag: "24 templates",
        gradient: "linear-gradient(135deg, #00CFFF 0%, #E6E6E6 100%)",
    },
    {
        category: "Blueprints",
        title: "Lead Management System Blueprint",
        desc: "Step-by-step Notion template for building your own lead capture and routing system.",
        icon: <Layout size={18} />,
        tag: "Notion template",
        gradient: "linear-gradient(135deg, #0066FF 0%, #66F2FF 100%)",
    },
    {
        category: "Playbooks",
        title: "Automation Workflow Recipes",
        desc: "Plug-and-play Make.com and Zapier recipes for common real estate operations.",
        icon: <Workflow size={18} />,
        tag: "12 workflows",
        gradient: "linear-gradient(135deg, #0066FF 0%, #C0C0C0 100%)",
    },
];

export default function ResourceHubTeaser() {
    const isMobile = useIsMobile();
    const [tab, setTab] = useState<Tab>("blogs");
    const activeCards = tab === "blogs" ? blogs : resources;

    return (
        <section id="blogs-resources" style={{ padding: "6rem 0 7rem", position: "relative" }}>
            <div className="container-wide">
                {/* Header */}
                <div style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 2.5rem" }}>
                    <span className="section-eyebrow" style={{ justifyContent: "center" }}>From Our Hub</span>
                    <h2
                        className="font-display"
                        style={{
                            fontSize: "clamp(2.4rem, 4.6vw, 3.5rem)",
                            fontWeight: 700,
                            letterSpacing: "-0.035em",
                            color: "var(--text)",
                            lineHeight: 1.08,
                            marginBottom: 14,
                        }}
                    >
                        Insights & <span className="gradient-text">Strategies</span>
                    </h2>
                    <p style={{ fontSize: "1.15rem", color: "var(--text-muted)", lineHeight: 1.65 }}>
                        Actionable guides, playbooks, and templates on AI, automation, and real estate growth.
                    </p>
                </div>

                {/* Tab Switcher */}
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "2.5rem" }}>
                    <div
                        style={{
                            display: "inline-flex", gap: 4, padding: 5,
                            background: "var(--surface-solid)", border: "1px solid var(--border)", borderRadius: 12,
                        }}
                    >
                        {(["blogs", "resources"] as Tab[]).map((t) => (
                            <button
                                key={t}
                                onClick={() => setTab(t)}
                                style={{
                                    padding: "0.6rem 1.3rem",
                                    fontSize: "0.88rem", fontWeight: 600,
                                    borderRadius: 8, border: "none", cursor: "pointer",
                                    textTransform: "capitalize",
                                    color: tab === t ? "#fff" : "var(--text-muted)",
                                    background: tab === t ? "var(--accent)" : "transparent",
                                    transition: "all 0.25s",
                                }}
                            >
                                {t === "blogs" ? "Blog Posts" : "Free Resources"}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Cards Grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={tab}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            display: "grid",
                            gridTemplateColumns: isMobile
                                ? "1fr"
                                : tab === "blogs"
                                    ? "repeat(2, 1fr)"
                                    : "repeat(3, 1fr)",
                            gap: 16,
                        }}
                    >
                        {activeCards.map((card) => (
                            <a
                                key={card.title}
                                href={tab === "blogs" ? "/blog" : "/resources"}
                                className="glass-card"
                                style={{
                                    padding: 0,
                                    textDecoration: "none",
                                    color: "inherit",
                                    display: "flex",
                                    flexDirection: "column",
                                    overflow: "hidden",
                                    cursor: "pointer",
                                    transition: "transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
                                }}
                                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)"; }}
                                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
                            >
                                {/* Gradient cover */}
                                <div
                                    style={{
                                        height: 160, background: card.gradient,
                                        position: "relative", display: "flex",
                                        alignItems: "flex-end", padding: "1.25rem",
                                    }}
                                >
                                    <div style={{
                                        position: "absolute", inset: 0,
                                        background: "radial-gradient(circle at 70% 30%, rgba(255,255,255,0.18) 0%, transparent 60%)",
                                    }} />
                                    <div style={{
                                        position: "absolute", top: "1rem", left: "1.25rem",
                                        display: "inline-flex", alignItems: "center", gap: 6,
                                        padding: "5px 11px", background: "rgba(0,0,0,0.4)",
                                        backdropFilter: "blur(8px)", borderRadius: 6,
                                        fontSize: "0.68rem", fontWeight: 700, color: "#fff",
                                        textTransform: "uppercase", letterSpacing: "0.08em",
                                        fontFamily: "'JetBrains Mono', monospace",
                                    }}>
                                        {card.category}
                                    </div>
                                    <div style={{
                                        width: 44, height: 44, borderRadius: 12,
                                        background: "rgba(0,0,0,0.35)", backdropFilter: "blur(8px)",
                                        border: "1px solid rgba(255,255,255,0.15)",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        color: "#fff", position: "relative",
                                    }}>
                                        {card.icon}
                                    </div>
                                </div>

                                {/* Body */}
                                <div style={{ padding: "1.5rem 1.5rem 1.75rem", flex: 1, display: "flex", flexDirection: "column" }}>
                                    <h3
                                        className="font-display"
                                        style={{
                                            fontSize: "1.2rem", fontWeight: 700, color: "var(--text)",
                                            letterSpacing: "-0.015em", lineHeight: 1.25, marginBottom: 10,
                                        }}
                                    >
                                        {card.title}
                                    </h3>
                                    <p style={{
                                        fontSize: "0.98rem", color: "var(--text-muted)",
                                        lineHeight: 1.6, marginBottom: 16, flex: 1,
                                    }}>
                                        {card.desc}
                                    </p>
                                    <div style={{
                                        display: "flex", alignItems: "center", justifyContent: "space-between",
                                        paddingTop: 14, borderTop: "1px solid var(--border)",
                                    }}>
                                        <span style={{
                                            fontSize: "0.76rem", color: "var(--text-faint)",
                                            fontFamily: "'JetBrains Mono', monospace", fontWeight: 600,
                                        }}>
                                            {card.tag}
                                        </span>
                                        <span style={{
                                            display: "inline-flex", alignItems: "center", gap: 4,
                                            fontSize: "0.82rem", fontWeight: 600, color: "var(--accent)",
                                        }}>
                                            Read <ArrowRight size={13} />
                                        </span>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </motion.div>
                </AnimatePresence>

                {/* CTA */}
                <div style={{ textAlign: "center", marginTop: "3rem" }}>
                    <a
                        href={tab === "blogs" ? "/blog" : "/resources"}
                        className="btn-secondary"
                        style={{ fontSize: "0.9rem" }}
                    >
                        View all {tab === "blogs" ? "articles" : "resources"} <ArrowRight size={14} />
                    </a>
                </div>
            </div>
        </section>
    );
}
