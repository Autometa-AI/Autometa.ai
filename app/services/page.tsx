"use client";

import { ArrowRight, Users, Database, Workflow, Bot, Phone, Zap, BarChart3, Wrench, Smartphone, Link2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import { useIsMobile } from "@/hooks/useIsMobile";

const coreServices = [
    {
        icon: <Users size={26} />, title: "Lead Management Systems",
        desc: "Centralized lead capture from all sources with automated pipeline tracking, scoring, and intelligent routing to agents.",
        features: ["Multi-channel capture", "Auto-routing", "Lead scoring", "SLA alerts"],
        outcome: "Never lose a lead again",
        accent: "#00CFFF",
    },
    {
        icon: <Database size={26} />, title: "CRM Setup & Optimization",
        desc: "Your CRM, configured around your exact workflow. Structured deal stages, automated data entry, clean reporting.",
        features: ["CRM implementation", "Data migration", "Pipeline design", "Custom fields"],
        outcome: "Full pipeline visibility from day one",
        accent: "#0066FF",
    },
    {
        icon: <Workflow size={26} />, title: "Workflow Automation",
        desc: "Automate follow-up sequences, task triggers, assignment rules, deadline notifications, and handoff systems.",
        features: ["Drip sequences", "Task triggers", "Doc automation", "Handoff rules"],
        outcome: "Eliminate manual repetitive work",
        accent: "#66F2FF",
    },
];

const aiServices = [
    {
        icon: <Bot size={26} />, title: "AI Follow-Up Systems",
        desc: "Automated WhatsApp, email, and SMS responses that engage leads instantly and nurture them through your pipeline.",
        features: ["WhatsApp AI bot", "Email auto-replies", "Lead qualification", "Smart routing"],
        outcome: "Consistent, timely communication on autopilot",
        accent: "#C0C0C0",
    },
    {
        icon: <Phone size={26} />, title: "Communication Tracking",
        desc: "Complete logs of every call, message, and interaction — tied to each lead and deal for full accountability.",
        features: ["Call logging", "Message tracking", "Interaction history", "Full audit trail"],
        outcome: "Full visibility on every conversation",
        accent: "#E6E6E6",
    },
    {
        icon: <Zap size={26} />, title: "Smart Automation",
        desc: "Behavior-based triggers that respond to lead actions — site visits, form fills, message opens — without manual intervention.",
        features: ["Webhooks", "Real-time triggers", "Conditional logic", "Multi-step flows"],
        outcome: "Self-running systems that scale with you",
        accent: "#0066FF",
    },
];

const customSolutions = [
    {
        icon: <BarChart3 size={26} />, label: "Custom Dashboards",
        desc: "Real-time analytics dashboards showing pipeline health, agent performance, and revenue forecasts.",
        accent: "#00CFFF",
    },
    {
        icon: <Wrench size={26} />, label: "Internal Tools",
        desc: "Custom-built tools — inventory trackers, deal rooms, commission calculators, doc generators.",
        accent: "#0066FF",
    },
    {
        icon: <Smartphone size={26} />, label: "Mobile Apps",
        desc: "Native mobile applications for field agents to manage leads, log visits, and close deals on the go.",
        accent: "#66F2FF",
    },
    {
        icon: <Link2 size={26} />, label: "Integrations",
        desc: "Connect CRMs, portals, phone systems, payment processors, and ad platforms into one unified flow.",
        accent: "#C0C0C0",
    },
];

const howItWorks = [
    { num: "01", title: "Discovery", desc: "Free 30-min call to understand your operations and growth goals." },
    { num: "02", title: "Audit", desc: "We map your workflows and identify exactly where revenue leaks." },
    { num: "03", title: "Design", desc: "Tailored blueprint — CRM schemas, automation flows, AI integrations." },
    { num: "04", title: "Build & Deploy", desc: "End-to-end build, integration, launch, and team training." },
    { num: "05", title: "Optimize", desc: "Ongoing monitoring, optimization, and new feature rollouts." },
];

export default function ServicesPage() {
    const isMobile = useIsMobile();

    const renderServiceCard = (s: { icon: React.ReactNode; title: string; desc: string; features: string[]; outcome: string; accent: string }) => (
        <div key={s.title} className="glass-card" style={{ padding: isMobile ? "1.75rem" : "2rem 2.25rem", display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{
                    width: 56, height: 56, borderRadius: 16,
                    background: `${s.accent}14`, border: `1px solid ${s.accent}30`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: s.accent, flexShrink: 0,
                }}>
                    {s.icon}
                </div>
                <h3 className="font-display" style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--text)", letterSpacing: "-0.015em" }}>
                    {s.title}
                </h3>
            </div>
            <p style={{ fontSize: "1.05rem", color: "var(--text-muted)", lineHeight: 1.7 }}>{s.desc}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {s.features.map(f => (
                    <span key={f} className="tag" style={{ fontSize: "0.75rem" }}>{f}</span>
                ))}
            </div>
            <div style={{
                padding: "0.55rem 0.85rem", background: "var(--tag-bg)",
                border: "1px solid var(--tag-border)", borderRadius: 8,
                fontSize: "0.8rem", fontWeight: 600, color: "var(--accent)",
                fontFamily: "'JetBrains Mono', monospace",
            }}>
                {s.outcome}
            </div>
        </div>
    );

    return (
        <main style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text)", overflowX: "hidden" }}>
            <Navbar />

            {/* Hero */}
            <section style={{ padding: "8rem 0 4rem", position: "relative" }}>
                <div className="mesh-bg" />
                <div className="container-wide" style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 720 }}>
                    <span className="section-eyebrow">Our Services</span>
                    <h1 className="font-display" style={{
                        fontSize: "clamp(2.2rem, 4.8vw, 3.5rem)",
                        fontWeight: 700, letterSpacing: "-0.04em",
                        color: "var(--text)", lineHeight: 1.08, marginBottom: 18,
                    }}>
                        We Offer <span className="gradient-text">3 Types</span> of Services
                    </h1>
                    <p style={{ fontSize: "1.1rem", color: "var(--text-muted)", lineHeight: 1.75, marginBottom: 28 }}>
                        Core Systems, AI Integrations, and Custom Solutions — built together or independently to power high-performance real estate teams.
                    </p>
                    <a href="/contact" className="btn-primary">Book Audit <ArrowRight size={15} /></a>
                </div>
            </section>

            {/* Core Services */}
            <section style={{ padding: "4rem 0" }}>
                <div className="container-wide">
                    <div style={{ marginBottom: "2.5rem" }}>
                        <span className="section-eyebrow">Core Services</span>
                        <h2 className="font-display" style={{
                            fontSize: "clamp(2rem, 3.8vw, 2.8rem)",
                            fontWeight: 700, letterSpacing: "-0.03em",
                            color: "var(--text)", lineHeight: 1.1,
                        }}>
                            Build Your <span className="gradient-text">Foundation</span>
                        </h2>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        {coreServices.map(renderServiceCard)}
                    </div>
                </div>
            </section>

            {/* AI Integrations */}
            <section style={{ padding: "4rem 0" }}>
                <div className="container-wide">
                    <div style={{ marginBottom: "2.5rem" }}>
                        <span className="section-eyebrow">AI Integrations</span>
                        <h2 className="font-display" style={{
                            fontSize: "clamp(2rem, 3.8vw, 2.8rem)",
                            fontWeight: 700, letterSpacing: "-0.03em",
                            color: "var(--text)", lineHeight: 1.1,
                        }}>
                            Intelligent <span className="gradient-text">Automation</span>
                        </h2>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        {aiServices.map(renderServiceCard)}
                    </div>
                </div>
            </section>

            {/* Custom Solutions */}
            <section style={{ padding: "4rem 0" }}>
                <div className="container-wide">
                    <div style={{ marginBottom: "2.5rem" }}>
                        <span className="section-eyebrow">Custom Solutions</span>
                        <h2 className="font-display" style={{
                            fontSize: "clamp(2rem, 3.8vw, 2.8rem)",
                            fontWeight: 700, letterSpacing: "-0.03em",
                            color: "var(--text)", lineHeight: 1.1,
                        }}>
                            Built <span className="gradient-text">For You</span>
                        </h2>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: 16 }}>
                        {customSolutions.map(s => (
                            <div key={s.label} className="glass-card" style={{ padding: "2rem", display: "flex", gap: 18, alignItems: "flex-start" }}>
                                <div style={{
                                    width: 52, height: 52, borderRadius: 14,
                                    background: `${s.accent}14`, border: `1px solid ${s.accent}30`,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    color: s.accent, flexShrink: 0,
                                }}>
                                    {s.icon}
                                </div>
                                <div>
                                    <h3 className="font-display" style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>
                                        {s.label}
                                    </h3>
                                    <p style={{ fontSize: "0.98rem", color: "var(--text-muted)", lineHeight: 1.7 }}>{s.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section style={{ padding: "4rem 0" }}>
                <div className="container-wide">
                    <div style={{ marginBottom: "2.5rem", textAlign: "center" }}>
                        <span className="section-eyebrow" style={{ justifyContent: "center" }}>How It Works</span>
                        <h2 className="font-display" style={{
                            fontSize: "clamp(2rem, 3.8vw, 2.8rem)",
                            fontWeight: 700, letterSpacing: "-0.03em",
                            color: "var(--text)", lineHeight: 1.1,
                        }}>
                            Step by <span className="gradient-text">Step</span>
                        </h2>
                    </div>
                    <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: isMobile ? 16 : 0, alignItems: "stretch", justifyContent: "center" }}>
                        {howItWorks.map((step, i) => (
                            <div key={step.num} style={{ display: "flex", alignItems: "center", flex: 1 }}>
                                <div className="glass-card" style={{ padding: "1.5rem", textAlign: "center", flex: 1 }}>
                                    <div style={{
                                        fontSize: "0.7rem", fontWeight: 700, color: "var(--accent)",
                                        fontFamily: "'JetBrains Mono', monospace",
                                        letterSpacing: "0.08em", marginBottom: 8,
                                    }}>
                                        STEP {step.num}
                                    </div>
                                    <h4 className="font-display" style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>
                                        {step.title}
                                    </h4>
                                    <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.6 }}>{step.desc}</p>
                                </div>
                                {i < howItWorks.length - 1 && !isMobile && (
                                    <ArrowRight size={18} style={{ color: "var(--accent)", margin: "0 8px", flexShrink: 0 }} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section style={{ padding: "4rem 0 6rem" }}>
                <div className="container-wide" style={{ textAlign: "center" }}>
                    <div className="glass-card" style={{ padding: isMobile ? "2.5rem 1.5rem" : "3.5rem 3rem", maxWidth: 640, margin: "0 auto" }}>
                        <h2 className="font-display" style={{
                            fontSize: "clamp(1.6rem, 3.2vw, 2.2rem)",
                            fontWeight: 700, color: "var(--text)",
                            marginBottom: 12, letterSpacing: "-0.03em",
                        }}>
                            Ready to <span className="gradient-text">Scale?</span>
                        </h2>
                        <p style={{ fontSize: "1rem", color: "var(--text-muted)", lineHeight: 1.7, marginBottom: 24 }}>
                            Book a free system audit and see exactly how we can streamline your operations.
                        </p>
                        <a href="/contact" className="btn-primary">Book Audit <ArrowRight size={15} /></a>
                    </div>
                </div>
            </section>

            <Footer />
            <FloatingContact />
        </main>
    );
}
