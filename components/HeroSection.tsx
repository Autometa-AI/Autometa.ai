"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowRight,
    ArrowLeft,
    ChevronRight,
    Users,
    BarChart3,
    MessageSquare,
    Zap,
    TrendingUp,
    Sparkles,
    Building2,
} from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";

type Slide = {
    id: string;
    title: string;
    caption: string;
    accent: string;
    render: () => React.ReactNode;
};

const slides: Slide[] = [
    {
        id: "lead",
        title: "Lead Intelligence Dashboard",
        caption: "Live pipeline view with AI-scored leads across every channel.",
        accent: "#00CFFF",
        render: () => (
            <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
                    {[
                        { icon: <Users size={14} />, label: "Active Leads", value: "2,847", change: "+23%" },
                        { icon: <BarChart3 size={14} />, label: "Conv. Rate", value: "34%", change: "+12%" },
                        { icon: <MessageSquare size={14} />, label: "Auto Replies", value: "1,204", change: "+45%" },
                    ].map((k) => (
                        <div key={k.label} style={{ background: "var(--surface-solid)", borderRadius: 12, padding: "0.7rem", border: "1px solid var(--border)" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 4 }}>
                                <span style={{ color: "var(--accent)" }}>{k.icon}</span>
                                <span style={{ fontSize: "0.65rem", color: "var(--text-faint)", fontWeight: 500 }}>{k.label}</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "baseline", gap: 5 }}>
                                <span style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text)", letterSpacing: "-0.03em" }}>{k.value}</span>
                                <span style={{ fontSize: "0.65rem", fontWeight: 700, color: "#66F2FF" }}>{k.change}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div style={{ background: "var(--surface-solid)", borderRadius: 12, padding: "0.85rem", border: "1px solid var(--border)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                        <Zap size={12} style={{ color: "var(--accent)" }} />
                        <span style={{ fontSize: "0.65rem", fontWeight: 700, color: "var(--text-faint)", letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: "'JetBrains Mono', monospace" }}>Automation Feed</span>
                    </div>
                    {[
                        { action: "Lead auto-responded via WhatsApp", detail: "Sarah M. — new inquiry", dot: "#66F2FF" },
                        { action: "Follow-up triggered", detail: "John P. — Day 3 drip", dot: "var(--accent)" },
                        { action: "Assigned to agent", detail: "Unit 7A — Score 92/100", dot: "#0066FF" },
                    ].map((item, i) => (
                        <div key={item.action} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 0", borderTop: i > 0 ? "1px solid var(--border-subtle)" : "none" }}>
                            <div style={{ width: 5, height: 5, borderRadius: "50%", background: item.dot, flexShrink: 0 }} />
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontSize: "0.72rem", fontWeight: 600, color: "var(--text-secondary)" }}>{item.action}</div>
                                <div style={{ fontSize: "0.62rem", color: "var(--text-faint)" }}>{item.detail}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        ),
    },
    {
        id: "analytics",
        title: "Analytics & Insights",
        caption: "Conversion funnels, agent KPIs, and forecast — refreshed in real time.",
        accent: "#66F2FF",
        render: () => (
            <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                <div style={{ background: "var(--surface-solid)", borderRadius: 12, padding: "1rem", border: "1px solid var(--border)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                        <span style={{ fontSize: "0.67rem", fontWeight: 700, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: "'JetBrains Mono', monospace" }}>Pipeline Revenue</span>
                        <span style={{ fontSize: "0.67rem", color: "#66F2FF", fontWeight: 700 }}>+38%</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 14 }}>
                        <span className="font-display" style={{ fontSize: "1.7rem", fontWeight: 800, color: "var(--text)", letterSpacing: "-0.03em" }}>$8.2M</span>
                        <span style={{ fontSize: "0.7rem", color: "var(--text-faint)" }}>Q4 forecast</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 60 }}>
                        {[30, 45, 38, 55, 48, 68, 62, 78, 72, 88, 80, 95].map((h, i) => (
                            <div key={i} style={{ flex: 1, height: `${h}%`, background: i >= 8 ? "var(--accent)" : "var(--border)", borderRadius: 3 }} />
                        ))}
                    </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                    <div style={{ background: "var(--surface-solid)", borderRadius: 10, padding: "0.7rem", border: "1px solid var(--border)" }}>
                        <TrendingUp size={13} style={{ color: "#66F2FF", marginBottom: 4 }} />
                        <div style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--text)", letterSpacing: "-0.02em" }}>41%</div>
                        <div style={{ fontSize: "0.62rem", color: "var(--text-faint)" }}>Close Rate</div>
                    </div>
                    <div style={{ background: "var(--surface-solid)", borderRadius: 10, padding: "0.7rem", border: "1px solid var(--border)" }}>
                        <Users size={13} style={{ color: "var(--accent)", marginBottom: 4 }} />
                        <div style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--text)", letterSpacing: "-0.02em" }}>128</div>
                        <div style={{ fontSize: "0.62rem", color: "var(--text-faint)" }}>Active Agents</div>
                    </div>
                </div>
            </div>
        ),
    },
    {
        id: "ai",
        title: "AI-Powered Automations",
        caption: "Intelligent responses on WhatsApp, email and SMS — 24/7.",
        accent: "#0066FF",
        render: () => (
            <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                <div style={{ background: "var(--surface-solid)", borderRadius: 12, padding: "1rem", border: "1px solid var(--border)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
                        <div style={{ width: 24, height: 24, borderRadius: "50%", background: "rgba(102,242,255,0.15)", border: "1px solid rgba(102,242,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <MessageSquare size={11} style={{ color: "#66F2FF" }} />
                        </div>
                        <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--text)" }}>WhatsApp Bot</div>
                        <span style={{ marginLeft: "auto", fontSize: "0.58rem", color: "#66F2FF", fontWeight: 700 }}>● LIVE</span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                        <div style={{ alignSelf: "flex-start", maxWidth: "82%", background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: "7px 11px", fontSize: "0.67rem", color: "var(--text-secondary)" }}>Hi, interested in Unit 7A. Is it available?</div>
                        <div style={{ alignSelf: "flex-end", maxWidth: "82%", background: "var(--accent)", borderRadius: 10, padding: "7px 11px", fontSize: "0.67rem", color: "#fff" }}>Yes! Unit 7A is available. Would you like a viewing tomorrow 2pm?</div>
                        <div style={{ alignSelf: "flex-start", maxWidth: "60%", background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: "7px 11px", fontSize: "0.67rem", color: "var(--text-secondary)" }}>Yes please</div>
                    </div>
                </div>
                <div style={{ background: "var(--surface-solid)", borderRadius: 10, padding: "0.75rem 0.9rem", border: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 10 }}>
                    <Sparkles size={15} style={{ color: "var(--accent)" }} />
                    <div style={{ flex: 1 }}>
                        <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--text)" }}>Meeting auto-scheduled</div>
                        <div style={{ fontSize: "0.62rem", color: "var(--text-faint)" }}>Tomorrow · 2:00 PM · Unit 7A</div>
                    </div>
                    <div style={{ fontSize: "0.58rem", fontWeight: 700, color: "#66F2FF" }}>+1 LEAD</div>
                </div>
            </div>
        ),
    },
    {
        id: "systems",
        title: "Custom Internal Tools",
        caption: "Tailored CRMs, commission calculators, and deal rooms.",
        accent: "#C0C0C0",
        render: () => (
            <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                <div style={{ background: "var(--surface-solid)", borderRadius: 12, padding: "1rem", border: "1px solid var(--border)" }}>
                    <div style={{ fontSize: "0.67rem", fontWeight: 700, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: "'JetBrains Mono', monospace", marginBottom: 10 }}>Deal Pipeline · Q4</div>
                    {[
                        { name: "Marina Heights 12B", stage: "Closing", pct: 92, color: "#66F2FF" },
                        { name: "Downtown Loft 4C", stage: "Negotiating", pct: 68, color: "var(--accent)" },
                        { name: "Palm Villa 03", stage: "Viewing", pct: 35, color: "#0066FF" },
                        { name: "JBR Penthouse", stage: "Qualified", pct: 18, color: "#C0C0C0" },
                    ].map((d, i) => (
                        <div key={d.name} style={{ marginTop: i > 0 ? 10 : 0 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                                <span style={{ fontSize: "0.67rem", fontWeight: 600, color: "var(--text-secondary)" }}>{d.name}</span>
                                <span style={{ fontSize: "0.58rem", fontWeight: 700, color: d.color }}>{d.stage}</span>
                            </div>
                            <div style={{ height: 4, background: "var(--border)", borderRadius: 4, overflow: "hidden" }}>
                                <div style={{ width: `${d.pct}%`, height: "100%", background: d.color, borderRadius: 4 }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        ),
    },
];

const clientLogos = [
    "Emaar", "Damac", "Nakheel", "Aldar", "Sobha", "Binghatti", "Dubai Holding", "Meraas", "Azizi", "Ellington",
];

export default function HeroSection() {
    const isMobile = useIsMobile();
    const [index, setIndex] = useState(0);

    const next = useCallback(() => setIndex((i) => (i + 1) % slides.length), []);
    const prev = useCallback(() => setIndex((i) => (i - 1 + slides.length) % slides.length), []);

    useEffect(() => {
        const t = setInterval(next, 4500);
        return () => clearInterval(t);
    }, [next]);

    const slide = slides[index];

    return (
        <section id="hero" style={{ position: "relative", minHeight: isMobile ? "auto" : "calc(100vh - 40px)", display: "flex", alignItems: "center", overflow: "hidden" }}>
            <div className="mesh-bg" />
            <div className="dot-grid" />

            <div className="container-wide" style={{ position: "relative", zIndex: 1, paddingTop: isMobile ? 60 : 72, paddingBottom: isMobile ? 40 : 32 }}>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1.05fr 0.95fr", gap: isMobile ? "2.5rem" : "3rem", alignItems: "center" }}>
                    {/* LEFT */}
                    <div>
                        <div
                            style={{
                                display: "inline-flex", alignItems: "center", gap: 8,
                                marginBottom: 22, borderRadius: 999, padding: "6px 14px",
                                background: "var(--tag-bg)", border: "1px solid var(--tag-border)",
                            }}
                        >
                            <Building2 size={13} style={{ color: "var(--accent)" }} />
                            <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--tag-text)", fontFamily: "'JetBrains Mono', monospace" }}>
                                Built for UAE real estate teams
                            </span>
                        </div>

                        <h1
                            className="font-display"
                            style={{
                                fontSize: "clamp(2.6rem, 5.5vw, 4.2rem)",
                                fontWeight: 700, lineHeight: 1.05,
                                letterSpacing: "-0.035em", color: "var(--text)",
                                marginBottom: 22,
                            }}
                        >
                            We Build <span className="gradient-text">AI Systems</span><br />
                            for Real Estate Agencies
                        </h1>

                        <p
                            style={{
                                fontSize: "1.2rem", color: "var(--text-secondary)", lineHeight: 1.65,
                                maxWidth: 540, marginBottom: 24,
                            }}
                        >
                            A strategic technological partner for real estate companies — from lead capture to closing.
                        </p>

                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
                            {["Agencies", "Brokers", "Agents", "Developers"].map((kw) => (
                                <span key={kw} className="tag" style={{ fontSize: "0.78rem" }}>{kw}</span>
                            ))}
                        </div>

                        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                            <a href="/contact" className="btn-primary">Book System Audit <ArrowRight size={15} /></a>
                            <a href="/services" className="btn-secondary">View Our Services <ChevronRight size={15} /></a>
                        </div>
                    </div>

                    {/* RIGHT — Image Carousel */}
                    {!isMobile && (
                        <div style={{ position: "relative" }}>
                            {/* Frame */}
                            <div style={{ position: "relative" }}>
                                <div className="dashboard-mockup" style={{ minHeight: 340 }}>
                                    <div className="dashboard-bar">
                                        <div className="dashboard-dot" style={{ background: "#6E6E6E" }} />
                                        <div className="dashboard-dot" style={{ background: "#9A9A9A" }} />
                                        <div className="dashboard-dot" style={{ background: "#C0C0C0" }} />
                                        <span style={{ marginLeft: 12, fontSize: "0.7rem", color: "var(--text-faint)", fontWeight: 500, fontFamily: "'JetBrains Mono', monospace" }}>
                                            autometa.app/{slide.id}
                                        </span>
                                    </div>
                                    <div style={{ position: "relative", minHeight: 300 }}>
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={slide.id}
                                                initial={{ opacity: 0, x: 30 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -30 }}
                                                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                            >
                                                {slide.render()}
                                            </motion.div>
                                        </AnimatePresence>
                                    </div>
                                </div>

                                {/* Arrows */}
                                <button
                                    onClick={prev}
                                    aria-label="Previous"
                                    style={{
                                        position: "absolute", left: -18, top: "50%", transform: "translateY(-50%)",
                                        width: 36, height: 36, borderRadius: "50%",
                                        background: "var(--surface-solid)", border: "1px solid var(--border)",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        color: "var(--text)", cursor: "pointer", zIndex: 3,
                                        boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
                                    }}
                                >
                                    <ArrowLeft size={16} />
                                </button>
                                <button
                                    onClick={next}
                                    aria-label="Next"
                                    style={{
                                        position: "absolute", right: -18, top: "50%", transform: "translateY(-50%)",
                                        width: 36, height: 36, borderRadius: "50%",
                                        background: "var(--surface-solid)", border: "1px solid var(--border)",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        color: "var(--text)", cursor: "pointer", zIndex: 3,
                                        boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
                                    }}
                                >
                                    <ArrowRight size={16} />
                                </button>
                            </div>

                            {/* Caption */}
                            <div style={{ marginTop: 18, minHeight: 52 }}>
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={slide.id + "-cap"}
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -8 }}
                                        transition={{ duration: 0.35 }}
                                    >
                                        <div style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text)", letterSpacing: "-0.01em", marginBottom: 2 }}>
                                            {slide.title}
                                        </div>
                                        <div style={{ fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
                                            {slide.caption}
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* Dots */}
                            <div className="carousel-dots" style={{ marginTop: 10 }}>
                                {slides.map((s, i) => (
                                    <button
                                        key={s.id}
                                        aria-label={`Go to ${s.title}`}
                                        className={`carousel-dot ${i === index ? "active" : ""}`}
                                        onClick={() => setIndex(i)}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Clients Marquee */}
                <div style={{ marginTop: isMobile ? 44 : 54 }}>
                    <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.12em", fontFamily: "'JetBrains Mono', monospace", textAlign: "center", marginBottom: 16 }}>
                        Trusted by teams across the UAE
                    </div>
                    <div className="marquee-container" style={{ maskImage: "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)" }}>
                        <div className="marquee-track">
                            {[...clientLogos, ...clientLogos].map((logo, i) => (
                                <div
                                    key={i}
                                    className="font-display"
                                    style={{
                                        flexShrink: 0,
                                        padding: "0 2.5rem",
                                        fontSize: "1.45rem",
                                        fontWeight: 700,
                                        color: "var(--text-faint)",
                                        letterSpacing: "-0.02em",
                                        opacity: 0.75,
                                        whiteSpace: "nowrap",
                                        transition: "color 0.3s, opacity 0.3s",
                                    }}
                                    onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text)"; e.currentTarget.style.opacity = "1"; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-faint)"; e.currentTarget.style.opacity = "0.75"; }}
                                >
                                    {logo}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
