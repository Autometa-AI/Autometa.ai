"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Mail, FileText, Layout, Workflow, BookOpen, CheckCircle, Lock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useIsMobile } from "@/hooks/useIsMobile";

const resources = [
    { icon: <FileText size={24} />, title: "Email & WhatsApp Follow-Up Templates", desc: "Battle-tested message sequences that keep leads engaged from first contact to conversion.", category: "Templates", locked: true },
    { icon: <Layout size={24} />, title: "Lead Management System Blueprint", desc: "Step-by-step guide to building a centralized lead capture and tracking system.", category: "Blueprint", locked: true },
    { icon: <Workflow size={24} />, title: "7-Day Automation Workflow", desc: "A plug-and-play automation recipe for the first week of lead nurturing.", category: "Workflow", locked: true },
    { icon: <BookOpen size={24} />, title: "CRM Setup Playbook", desc: "Complete guide to setting up and optimizing your CRM for real estate operations.", category: "Playbook", locked: true },
    { icon: <Layout size={24} />, title: "Agent Performance Dashboard Template", desc: "Track agent KPIs, conversion rates, and pipeline health with this ready-to-use template.", category: "Template", locked: true },
    { icon: <Workflow size={24} />, title: "Property Management Automation Guide", desc: "Automate maintenance requests, rent collection, and tenant communications.", category: "Guide", locked: true },
];

export default function ResourcesPage() {
    const [email, setEmail] = useState("");
    const [unlocked, setUnlocked] = useState(false);
    const isMobile = useIsMobile();

    const handleUnlock = (e: React.FormEvent) => {
        e.preventDefault();
        if (email.includes("@")) {
            setUnlocked(true);
        }
    };

    return (
        <main style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text)", overflowX: "hidden" }}>
            <Navbar />

            {/* Hero */}
            <section style={{ padding: "8rem 0 4rem", position: "relative" }}>
                <div className="mesh-bg" />
                <div className="container-wide" style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 680 }}>
                    <span className="section-eyebrow">Resource Hub</span>
                    <h1 className="font-display" style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)", fontWeight: 700, letterSpacing: "-0.04em", color: "var(--text)", lineHeight: 1.08, marginBottom: 16 }}>
                        Free Systems, <span className="gradient-text">Playbooks &amp; Templates</span>
                    </h1>
                    <p style={{ fontSize: "1rem", color: "var(--text-subtle)", lineHeight: 1.75 }}>
                        Proven resources to help you start optimizing your real estate operations today.
                    </p>
                </div>
            </section>

            {/* Email Gate / Resources */}
            <section style={{ padding: "2rem 0 6rem" }}>
                <div className="container-wide">
                    <AnimatePresence mode="wait">
                        {!unlocked ? (
                            <motion.div
                                key="gate"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                style={{ maxWidth: 480, margin: "0 auto", textAlign: "center" }}
                            >
                                <div className="glass-card" style={{ padding: "3rem 2rem" }}>
                                    <div style={{ width: 56, height: 56, borderRadius: 16, background: "var(--tag-bg)", border: "1px solid var(--tag-border)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent)", margin: "0 auto 20px" }}>
                                        <Lock size={24} />
                                    </div>
                                    <h2 className="font-display" style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text)", marginBottom: 8 }}>
                                        Unlock All Resources
                                    </h2>
                                    <p style={{ fontSize: "0.9rem", color: "var(--text-subtle)", lineHeight: 1.7, marginBottom: 24 }}>
                                        Enter your email to get instant access to all templates, playbooks, and automation guides.
                                    </p>
                                    <form onSubmit={handleUnlock} style={{ display: "flex", gap: 8, flexDirection: isMobile ? "column" : "row" }}>
                                        <div style={{ flex: 1, position: "relative" }}>
                                            <Mail size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--text-faint)" }} />
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="you@company.com"
                                                required
                                                style={{
                                                    width: "100%", padding: "0.75rem 0.75rem 0.75rem 2.5rem",
                                                    background: "var(--surface-solid)", border: "1px solid var(--border)",
                                                    borderRadius: 12, color: "var(--text)", fontSize: "0.875rem",
                                                    outline: "none",
                                                }}
                                            />
                                        </div>
                                        <button type="submit" className="btn-primary" style={{ whiteSpace: "nowrap" }}>
                                            Unlock Resources <ArrowRight size={14} />
                                        </button>
                                    </form>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="resources"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 32 }}>
                                    <CheckCircle size={18} style={{ color: "#66F2FF" }} />
                                    <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "#66F2FF" }}>Resources unlocked! Download any resource below.</span>
                                </div>
                                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 16 }}>
                                    {resources.map((r, i) => (
                                        <motion.div
                                            key={r.title}
                                            className="glass-card"
                                            style={{ padding: "1.75rem 1.5rem" }}
                                            initial={{ opacity: 0, y: 16 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.06 }}
                                        >
                                            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                                                <div style={{ width: 40, height: 40, borderRadius: 12, background: "var(--tag-bg)", border: "1px solid var(--tag-border)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent)" }}>
                                                    {r.icon}
                                                </div>
                                                <span className="tag">{r.category}</span>
                                            </div>
                                            <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>{r.title}</h3>
                                            <p style={{ fontSize: "0.85rem", color: "var(--text-subtle)", lineHeight: 1.7, marginBottom: 16 }}>{r.desc}</p>
                                            <button className="btn-secondary" style={{ width: "100%", justifyContent: "center", fontSize: "0.8rem" }}>
                                                Download <ArrowRight size={12} />
                                            </button>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>

            <Footer />
        </main>
    );
}
