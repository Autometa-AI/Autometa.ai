"use client";

import {
    ArrowRight,
    Users,
    Database,
    Workflow,
    Bot,
    BarChart3,
    Wrench,
    Settings,
    Zap,
    Code,
} from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";

type Service = {
    icon: React.ReactNode;
    title: string;
    desc: string;
    features: string[];
    accent: string;
};

type Category = {
    id: string;
    eyebrow: string;
    title: string;
    tagline: string;
    items: Service[];
};

const categories: Category[] = [
    {
        id: "systems",
        eyebrow: "01 / Core Systems",
        title: "Systems That Capture Every Lead",
        tagline: "Centralized pipelines, structured data, and full visibility — so no opportunity slips away.",
        items: [
            {
                icon: <Users size={24} />,
                title: "Lead Management Systems",
                desc: "Every lead from every channel — WhatsApp, calls, portals, Meta ads — captured and scored in a single pipeline.",
                features: ["Multi-channel capture", "Auto-routing", "Lead scoring", "SLA alerts"],
                accent: "#00CFFF",
            },
            {
                icon: <Database size={24} />,
                title: "CRM Setup & Optimization",
                desc: "Your CRM, configured around your exact workflow. Structured deal stages, automated data entry, clean reporting.",
                features: ["CRM implementation", "Data migration", "Pipeline design", "Custom fields"],
                accent: "#0066FF",
            },
            {
                icon: <BarChart3 size={24} />,
                title: "Custom Dashboards",
                desc: "Real-time dashboards that show pipeline health, agent performance, and revenue forecasts at a glance.",
                features: ["Live KPIs", "Agent leaderboards", "Forecasting", "Exec reports"],
                accent: "#66F2FF",
            },
        ],
    },
    {
        id: "ai",
        eyebrow: "02 / AI & Automation",
        title: "AI That Works While You Sleep",
        tagline: "Intelligent responses, smart routing, and workflows that never miss a beat.",
        items: [
            {
                icon: <Bot size={24} />,
                title: "AI Integrations",
                desc: "GPT-powered responses on WhatsApp, email, and SMS. Qualify leads, schedule viewings, and answer questions 24/7.",
                features: ["WhatsApp AI bot", "Email auto-replies", "Lead qualification", "Smart routing"],
                accent: "#C0C0C0",
            },
            {
                icon: <Workflow size={24} />,
                title: "Workflow Automation",
                desc: "Automate follow-ups, task handoffs, document generation, and notifications. Let systems handle the busywork.",
                features: ["Drip sequences", "Task triggers", "Doc automation", "Handoff rules"],
                accent: "#E6E6E6",
            },
            {
                icon: <Zap size={24} />,
                title: "Smart Triggers",
                desc: "Event-driven automations that fire the moment something happens — a new lead, a viewing booked, a deal stalled.",
                features: ["Webhooks", "Real-time triggers", "Conditional logic", "Multi-step flows"],
                accent: "#0066FF",
            },
        ],
    },
    {
        id: "custom",
        eyebrow: "03 / Custom Development",
        title: "Custom Tools, Built For Your Workflow",
        tagline: "When off-the-shelf won't cut it, we build exactly what your team needs.",
        items: [
            {
                icon: <Wrench size={24} />,
                title: "Internal Tools",
                desc: "Custom-built tools for your unique workflows — inventory trackers, deal rooms, commission calculators, doc generators.",
                features: ["Bespoke UI", "Role-based access", "Fast iterations", "Full ownership"],
                accent: "#00CFFF",
            },
            {
                icon: <Code size={24} />,
                title: "Custom Development",
                desc: "Full-stack builds when you need something no CRM or SaaS can give you — portals, apps, integrations, APIs.",
                features: ["Web apps", "Mobile apps", "API integrations", "Database design"],
                accent: "#0066FF",
            },
            {
                icon: <Settings size={24} />,
                title: "System Integrations",
                desc: "Connect everything: CRMs, portals, phone systems, payment processors, ad platforms. One unified flow.",
                features: ["Portal sync", "Call tracking", "Payment hooks", "Ad platforms"],
                accent: "#66F2FF",
            },
        ],
    },
];

export default function ServicesSection() {
    const isMobile = useIsMobile();

    return (
        <section id="services" style={{ padding: "6rem 0 7rem", position: "relative" }}>
            <div className="container-wide">
                {/* Header */}
                <div style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 4rem" }}>
                    <span className="section-eyebrow" style={{ justifyContent: "center" }}>Services & Solutions</span>
                    <h2
                        className="font-display"
                        style={{
                            fontSize: "clamp(2.2rem, 4.2vw, 3.25rem)",
                            fontWeight: 700,
                            letterSpacing: "-0.035em",
                            color: "var(--text)",
                            lineHeight: 1.08,
                            marginBottom: 16,
                        }}
                    >
                        Everything You Need to <span className="gradient-text">Scale Your Agency</span>
                    </h2>
                    <p style={{ fontSize: "1.15rem", color: "var(--text-muted)", lineHeight: 1.65 }}>
                        Three categories of services — built together or independently — that turn your agency into a high-performance machine.
                    </p>
                </div>

                {/* Categories */}
                <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? 56 : 72 }}>
                    {categories.map((cat) => (
                        <div key={cat.id}>
                            {/* Category header */}
                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: isMobile ? "1fr" : "0.9fr 1.1fr",
                                    gap: isMobile ? 16 : 40,
                                    alignItems: "end",
                                    marginBottom: isMobile ? 24 : 32,
                                    paddingBottom: 20,
                                    borderBottom: "1px solid var(--border)",
                                }}
                            >
                                <div>
                                    <div style={{
                                        fontSize: "0.78rem", fontWeight: 700, color: "var(--accent)",
                                        fontFamily: "'JetBrains Mono', monospace",
                                        letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10,
                                    }}>
                                        {cat.eyebrow}
                                    </div>
                                    <h3
                                        className="font-display"
                                        style={{
                                            fontSize: isMobile ? "1.8rem" : "clamp(1.95rem, 2.8vw, 2.5rem)",
                                            fontWeight: 700, color: "var(--text)",
                                            letterSpacing: "-0.025em", lineHeight: 1.1,
                                        }}
                                    >
                                        {cat.title}
                                    </h3>
                                </div>
                                <p style={{ fontSize: "1.1rem", color: "var(--text-muted)", lineHeight: 1.65 }}>
                                    {cat.tagline}
                                </p>
                            </div>

                            {/* Individual service cards — full-width stacked */}
                            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                                {cat.items.map((item) => (
                                    <a
                                        key={item.title}
                                        href="/services"
                                        className="glass-card"
                                        style={{
                                            padding: isMobile ? "1.5rem" : "2rem 2.25rem",
                                            display: "grid",
                                            gridTemplateColumns: isMobile ? "1fr" : "auto 1fr auto",
                                            gap: isMobile ? 16 : 24,
                                            alignItems: "center",
                                            textDecoration: "none",
                                            color: "inherit",
                                            cursor: "pointer",
                                        }}
                                    >
                                        {/* Icon */}
                                        <div
                                            style={{
                                                width: 56, height: 56, borderRadius: 16,
                                                background: `${item.accent}14`,
                                                border: `1px solid ${item.accent}30`,
                                                display: "flex", alignItems: "center", justifyContent: "center",
                                                color: item.accent, flexShrink: 0,
                                            }}
                                        >
                                            {item.icon}
                                        </div>

                                        {/* Content */}
                                        <div style={{ minWidth: 0 }}>
                                            <h4
                                                className="font-display"
                                                style={{
                                                    fontSize: isMobile ? "1.2rem" : "1.35rem",
                                                    fontWeight: 700, color: "var(--text)",
                                                    letterSpacing: "-0.015em", marginBottom: 6,
                                                }}
                                            >
                                                {item.title}
                                            </h4>
                                            <p style={{ fontSize: "1rem", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: 10 }}>
                                                {item.desc}
                                            </p>
                                            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                                                {item.features.map((f) => (
                                                    <span key={f} className="tag" style={{ fontSize: "0.72rem" }}>{f}</span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Arrow */}
                                        {!isMobile && (
                                            <div style={{ color: "var(--text-faint)", flexShrink: 0 }}>
                                                <ArrowRight size={20} />
                                            </div>
                                        )}
                                    </a>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer CTA */}
                <div style={{ textAlign: "center", marginTop: "4rem" }}>
                    <a href="/services" className="btn-primary">
                        Explore All Services <ArrowRight size={15} />
                    </a>
                </div>
            </div>
        </section>
    );
}
