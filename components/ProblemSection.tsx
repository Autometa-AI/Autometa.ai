"use client";

import {
    MessageSquareOff,
    Clock,
    EyeOff,
    Cog,
    Database,
    TrendingDown,
} from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";

type Pain = {
    num: string;
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    desc: string;
    stat: string;
    statLabel: string;
    gradient: string;
    accent: string;
};

const painPoints: Pain[] = [
    {
        num: "01",
        icon: <Clock size={24} />,
        title: "Slow response, lost deals",
        subtitle: "The 5-minute rule is broken",
        desc: "Leads that aren't contacted in the first 5 minutes are 21x less likely to convert. Most real estate teams respond in hours, not minutes — and their competitors close those deals instead.",
        stat: "72%",
        statLabel: "of leads go unresponded to within 1 hour",
        gradient: "linear-gradient(135deg, rgba(0,102,255,0.18) 0%, rgba(0,102,255,0.02) 100%)",
        accent: "#0066FF",
    },
    {
        num: "02",
        icon: <Database size={24} />,
        title: "Leads scattered everywhere",
        subtitle: "WhatsApp, calls, spreadsheets, DMs",
        desc: "Without a centralized pipeline, leads fall through the cracks between channels. Agents waste hours reconciling contacts. Hot prospects go cold while nobody owns the conversation.",
        stat: "$12K+",
        statLabel: "average deal value lost every month per agent",
        gradient: "linear-gradient(135deg, rgba(0,207,255,0.18) 0%, rgba(0,207,255,0.02) 100%)",
        accent: "#00CFFF",
    },
    {
        num: "03",
        icon: <MessageSquareOff size={24} />,
        title: "Missed follow-ups",
        subtitle: "Manual work can't scale",
        desc: "Your team forgets to follow up. Leads that needed 7 touches only got 2. Sequences break when agents go on leave. Revenue leaks quietly — and you only notice at the end of the quarter.",
        stat: "48%",
        statLabel: "of salespeople never follow up after the first contact",
        gradient: "linear-gradient(135deg, rgba(102,242,255,0.18) 0%, rgba(102,242,255,0.02) 100%)",
        accent: "#66F2FF",
    },
    {
        num: "04",
        icon: <EyeOff size={24} />,
        title: "Zero visibility on agents",
        subtitle: "You can't improve what you can't see",
        desc: "Who's calling? Who's closing? Who's dropping the ball? Without tracking, your top performers go unrecognized and your bottom performers drag the whole pipeline down invisibly.",
        stat: "3 in 5",
        statLabel: "agency owners can't track agent performance daily",
        gradient: "linear-gradient(135deg, rgba(192,192,192,0.18) 0%, rgba(192,192,192,0.02) 100%)",
        accent: "#C0C0C0",
    },
    {
        num: "05",
        icon: <Cog size={24} />,
        title: "Manual work eats the day",
        subtitle: "Your team is a human API",
        desc: "Agents spend 60% of their day on admin: copying data between tools, scheduling, sending the same emails, generating the same docs. That's 60% of your payroll burned on work a bot could do.",
        stat: "10+ hrs",
        statLabel: "per week wasted by every agent on repetitive tasks",
        gradient: "linear-gradient(135deg, rgba(230,230,230,0.18) 0%, rgba(230,230,230,0.02) 100%)",
        accent: "#E6E6E6",
    },
];

export default function ProblemSection() {
    const isMobile = useIsMobile();

    return (
        <section
            id="problem"
            style={{
                position: "relative",
                overflow: "hidden",
                background: "var(--bg)",
                padding: isMobile ? "5rem 0" : "6rem 0 7rem",
            }}
        >
            {/* Header */}
            <div className="container-wide" style={{ marginBottom: isMobile ? "2.5rem" : "3.5rem" }}>
                <div style={{ maxWidth: 780 }}>
                    <span className="section-eyebrow">The Problem</span>
                    <h2
                        className="font-display"
                        style={{
                            fontSize: "clamp(2.2rem, 4.4vw, 3.5rem)",
                            fontWeight: 700,
                            letterSpacing: "-0.035em",
                            color: "var(--text)",
                            lineHeight: 1.08,
                            marginBottom: 16,
                        }}
                    >
                        Problems That Cost Real Estate Companies a <span className="gradient-text">Huge Price</span>...
                    </h2>
                    <p
                        style={{
                            fontSize: "1.15rem",
                            color: "var(--text-muted)",
                            lineHeight: 1.65,
                            maxWidth: 620,
                        }}
                    >
                        Broken systems aren&apos;t just frustrating — they&apos;re quietly draining revenue from your agency every single day. Here&apos;s what it really costs.
                    </p>
                </div>
            </div>

            {/* Cards — vertical stack */}
            <div className="container-wide">
                <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                    {painPoints.map((p) => (
                        <article
                            key={p.num}
                            className="glass-card"
                            style={{
                                padding: 0,
                                overflow: "hidden",
                                background: p.gradient + ", var(--card-bg)",
                                border: "1px solid var(--card-border)",
                            }}
                        >
                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: isMobile ? "1fr" : "1.1fr 0.9fr",
                                    minHeight: isMobile ? "auto" : 320,
                                }}
                            >
                                {/* TEXT SIDE */}
                                <div
                                    style={{
                                        padding: isMobile ? "2rem 1.5rem" : "2.5rem 2.75rem",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-between",
                                        gap: 22,
                                    }}
                                >
                                    <div>
                                        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                                            <div
                                                style={{
                                                    width: 48, height: 48, borderRadius: 14,
                                                    background: `${p.accent}1a`,
                                                    border: `1px solid ${p.accent}40`,
                                                    display: "flex", alignItems: "center", justifyContent: "center",
                                                    color: p.accent,
                                                }}
                                            >
                                                {p.icon}
                                            </div>
                                            <span style={{
                                                fontSize: "0.78rem", fontWeight: 700, color: "var(--text-faint)",
                                                letterSpacing: "0.08em", fontFamily: "'JetBrains Mono', monospace",
                                            }}>
                                                PROBLEM / {p.num}
                                            </span>
                                        </div>

                                        <h3
                                            className="font-display"
                                            style={{
                                                fontSize: isMobile ? "1.85rem" : "clamp(1.95rem, 2.8vw, 2.5rem)",
                                                fontWeight: 700, color: "var(--text)",
                                                letterSpacing: "-0.025em", lineHeight: 1.1, marginBottom: 10,
                                            }}
                                        >
                                            {p.title}
                                        </h3>
                                        <p style={{ fontSize: "1.05rem", color: p.accent, fontWeight: 600, marginBottom: 16, letterSpacing: "-0.005em" }}>
                                            {p.subtitle}
                                        </p>
                                        <p style={{ fontSize: "1.08rem", color: "var(--text-secondary)", lineHeight: 1.65, maxWidth: 480 }}>
                                            {p.desc}
                                        </p>
                                    </div>

                                    {/* Painful Stat */}
                                    <div
                                        style={{
                                            padding: "1.1rem 1.3rem",
                                            background: "rgba(0,0,0,0.35)",
                                            borderRadius: 14,
                                            border: `1px solid ${p.accent}33`,
                                            display: "flex", alignItems: "center", gap: 16,
                                        }}
                                    >
                                        <TrendingDown size={22} style={{ color: p.accent, flexShrink: 0 }} />
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div className="font-display" style={{
                                                fontSize: "2rem", fontWeight: 800, color: p.accent,
                                                lineHeight: 1, letterSpacing: "-0.03em", marginBottom: 4,
                                            }}>
                                                {p.stat}
                                            </div>
                                            <div style={{ fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: 1.4 }}>
                                                {p.statLabel}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* IMAGE / VISUAL SIDE */}
                                <div
                                    style={{
                                        position: "relative",
                                        minHeight: isMobile ? 180 : "auto",
                                        background: `radial-gradient(circle at 30% 30%, ${p.accent}22 0%, transparent 60%), var(--surface-solid)`,
                                        borderLeft: isMobile ? "none" : "1px solid var(--border)",
                                        borderTop: isMobile ? "1px solid var(--border)" : "none",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        overflow: "hidden",
                                    }}
                                >
                                    <div
                                        style={{
                                            position: "absolute", inset: 0,
                                            backgroundImage: `radial-gradient(circle, ${p.accent}15 1px, transparent 1px)`,
                                            backgroundSize: "22px 22px", opacity: 0.5,
                                        }}
                                    />
                                    <div style={{ position: "relative", zIndex: 1, padding: "2rem", textAlign: "center" }}>
                                        <div
                                            style={{
                                                width: 120, height: 120, borderRadius: "50%",
                                                background: `${p.accent}0f`, border: `1px dashed ${p.accent}55`,
                                                display: "flex", alignItems: "center", justifyContent: "center",
                                                margin: "0 auto 14px", color: p.accent,
                                            }}
                                        >
                                            <div style={{ transform: "scale(2.4)" }}>{p.icon}</div>
                                        </div>
                                        <div style={{
                                            fontSize: "0.72rem", fontWeight: 700, color: "var(--text-faint)",
                                            textTransform: "uppercase", letterSpacing: "0.12em",
                                            fontFamily: "'JetBrains Mono', monospace",
                                        }}>
                                            {p.num} / 05 · Real Estate Pain
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
