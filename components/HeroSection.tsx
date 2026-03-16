"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, Users, Building2, Calendar, Zap, Home, Key, FileText } from "lucide-react";
import gsap from "gsap";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function HeroSection() {
    const headingRef = useRef<HTMLHeadingElement>(null);
    const subRef = useRef<HTMLParagraphElement>(null);
    const isMobile = useIsMobile();

    const stats = [
        { val: 500, suffix: "+", label: "Properties Automated" },
        { val: 98, suffix: "%", label: "Client Retention" },
        { val: 12, suffix: "x", label: "Faster Closings" },
        { val: 75, suffix: "+", label: "Brokerages Served" },
    ];

    useEffect(() => {
        if (isMobile) return;
        const el = headingRef.current;
        if (!el) return;
        const html = el.innerHTML;
        // Split by <br>, <span ...>...</span>, and plain text chunks
        const tokens = html.split(/(<br\s*\/?>|<span[^>]*>.*?<\/span>)/gi).filter(Boolean);
        el.innerHTML = "";

        tokens.forEach((token) => {
            if (token.match(/<br\s*\/?>/i)) {
                el.appendChild(document.createElement("br"));
                return;
            }
            // Check if it's a span element (e.g. gradient-text)
            const spanMatch = token.match(/^<span([^>]*)>(.*?)<\/span>$/i);
            if (spanMatch) {
                const attrs = spanMatch[1];
                const content = spanMatch[2].trim();
                const words = content.split(/\s+/).filter(Boolean);
                words.forEach((word, wi) => {
                    const wrapper = document.createElement("span");
                    wrapper.style.display = "inline-block";
                    wrapper.style.overflow = "hidden";
                    wrapper.style.verticalAlign = "top";
                    // Create a span that preserves the original class
                    const inner = document.createElement("span");
                    const classMatch = attrs.match(/class="([^"]*)"/);
                    if (classMatch) inner.className = classMatch[1] + " hero-word";
                    else inner.className = "hero-word";
                    inner.textContent = word;
                    inner.style.display = "inline-block";
                    inner.style.transform = "translateY(120%)";
                    inner.style.opacity = "0";
                    wrapper.appendChild(inner);
                    el.appendChild(wrapper);
                    if (wi < words.length - 1) el.appendChild(document.createTextNode("\u00A0"));
                });
            } else {
                // Plain text
                const words = token.trim().split(/\s+/).filter(Boolean);
                words.forEach((word, wi) => {
                    const wrapper = document.createElement("span");
                    wrapper.style.display = "inline-block";
                    wrapper.style.overflow = "hidden";
                    wrapper.style.verticalAlign = "top";
                    const inner = document.createElement("span");
                    inner.textContent = word;
                    inner.style.display = "inline-block";
                    inner.style.transform = "translateY(120%)";
                    inner.style.opacity = "0";
                    inner.className = "hero-word";
                    wrapper.appendChild(inner);
                    el.appendChild(wrapper);
                    if (wi < words.length - 1) el.appendChild(document.createTextNode("\u00A0"));
                });
            }
        });
        const wordEls = el.querySelectorAll(".hero-word");
        gsap.to(wordEls, { y: 0, opacity: 1, duration: 1, stagger: 0.08, delay: 0.2, ease: "power3.out" });
    }, [isMobile]);

    useEffect(() => {
        if (isMobile || !subRef.current) return;
        gsap.fromTo(subRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.9, ease: "power2.out" });
    }, [isMobile]);

    return (
        <section id="hero" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
            <div className="mesh-bg" />
            <div className="dot-grid" />

            <div className="container-wide" style={{ position: "relative", zIndex: 1, paddingTop: 100, paddingBottom: 80 }}>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1.1fr 0.9fr", gap: "3rem", alignItems: "center" }}>
                    <div>
                        <motion.div
                            initial={isMobile ? undefined : { opacity: 0, y: 10 }}
                            animate={isMobile ? undefined : { opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.05 }}
                            style={{
                                display: "inline-flex", alignItems: "center", gap: 8,
                                marginBottom: 28, borderRadius: 10, padding: "6px 14px",
                                background: "var(--tag-bg)", border: "1px solid var(--tag-border)",
                            }}
                        >
                            <Home size={12} style={{ color: "var(--accent)" }} />
                            <span style={{ fontSize: "0.7rem", fontWeight: 600, color: "var(--tag-text)", fontFamily: "'JetBrains Mono', monospace" }}>
                                Real Estate Automation
                            </span>
                        </motion.div>

                        <h1 ref={headingRef} className="font-display" style={{
                            fontSize: "clamp(2.5rem, 5.5vw, 4.25rem)",
                            fontWeight: 700, lineHeight: 1.05,
                            letterSpacing: "-0.04em", color: "var(--text)",
                            marginBottom: 24,
                        }}>
                            Automate your<br /><span className="gradient-text">real estate</span> empire
                        </h1>

                        <p ref={subRef} style={{
                            fontSize: "1rem", color: "var(--text-subtle)", lineHeight: 1.8,
                            maxWidth: 460, marginBottom: 36,
                            opacity: isMobile ? 1 : 0,
                        }}>
                            From lead capture to closing day — AI-powered systems that automate
                            every workflow in your brokerage, property management, and dev operations.
                        </p>

                        <motion.div
                            initial={isMobile ? undefined : { opacity: 0, y: 16 }}
                            animate={isMobile ? undefined : { opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 1.1 }}
                            style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 48 }}
                        >
                            <a href="#contact" className="btn-primary">Book a Demo <ArrowRight size={14} /></a>
                            <a href="#services" className="btn-secondary">See How It Works <ChevronRight size={14} /></a>
                        </motion.div>

                        <div style={{
                            display: "grid",
                            gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : `repeat(${stats.length}, 1fr)`,
                            gap: 10,
                        }}>
                            {stats.map((s, i) => (
                                <CounterStat key={s.label} {...s} delay={isMobile ? 0 : 1.3 + i * 0.12} isMobile={isMobile} />
                            ))}
                        </div>
                    </div>

                    {!isMobile && (
                        <motion.div
                            initial={{ opacity: 0, y: 50, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <DashboardMockup />
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    );
}

function DashboardMockup() {
    return (
        <div className="dashboard-mockup">
            <div className="dashboard-bar">
                <div className="dashboard-dot" style={{ background: "#ff5f57" }} />
                <div className="dashboard-dot" style={{ background: "#febc2e" }} />
                <div className="dashboard-dot" style={{ background: "#28c840" }} />
                <span style={{ marginLeft: 12, fontSize: "0.675rem", color: "var(--text-faint)", fontWeight: 500, fontFamily: "'JetBrains Mono', monospace" }}>autometa.app/dashboard</span>
            </div>
            <div style={{ padding: "1rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {/* KPIs */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
                    {[
                        { icon: <Users size={13} />, label: "Active Leads", value: "2,847", change: "+23%" },
                        { icon: <Building2 size={13} />, label: "Listings", value: "184", change: "+12%" },
                        { icon: <Key size={13} />, label: "Closings/mo", value: "32", change: "+8%" },
                    ].map((kpi) => (
                        <div key={kpi.label} style={{ background: "var(--surface-solid)", borderRadius: 12, padding: "0.65rem", border: "1px solid var(--border)" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 4 }}>
                                <span style={{ color: "var(--accent)" }}>{kpi.icon}</span>
                                <span style={{ fontSize: "0.6rem", color: "var(--text-faint)", fontWeight: 500 }}>{kpi.label}</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "baseline", gap: 5 }}>
                                <span style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--text)", letterSpacing: "-0.03em" }}>{kpi.value}</span>
                                <span style={{ fontSize: "0.6rem", fontWeight: 700, color: "#22c55e" }}>{kpi.change}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Live feed */}
                <div style={{ background: "var(--surface-solid)", borderRadius: 12, padding: "0.75rem", border: "1px solid var(--border)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                        <Zap size={10} style={{ color: "var(--accent)" }} />
                        <span style={{ fontSize: "0.6rem", fontWeight: 700, color: "var(--text-faint)", letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: "'JetBrains Mono', monospace" }}>Live Feed</span>
                    </div>
                    {[
                        { action: "Lead auto-responded", detail: "Sarah M. — 42 Oak Lane", time: "2s", dot: "#22c55e" },
                        { action: "Tour scheduled", detail: "John P. — 18 Elm St, 4B", time: "14s", dot: "var(--accent)" },
                        { action: "Lease sent", detail: "Unit 7A — Parkview Apts", time: "1m", dot: "#3b82f6" },
                        { action: "Maintenance routed", detail: "HVAC -> TechPro Services", time: "3m", dot: "#f59e0b" },
                    ].map((item, i) => (
                        <motion.div key={item.action}
                            initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1 + i * 0.15, duration: 0.4 }}
                            style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 0", borderTop: i > 0 ? "1px solid var(--border-subtle)" : "none" }}>
                            <div style={{ width: 5, height: 5, borderRadius: "50%", background: item.dot, flexShrink: 0 }} />
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontSize: "0.675rem", fontWeight: 600, color: "var(--text-secondary)" }}>{item.action}</div>
                                <div style={{ fontSize: "0.575rem", color: "var(--text-faint)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.detail}</div>
                            </div>
                            <span style={{ fontSize: "0.55rem", color: "var(--text-faint)", flexShrink: 0, fontFamily: "'JetBrains Mono', monospace" }}>{item.time}</span>
                        </motion.div>
                    ))}
                </div>

                {/* Mini property cards row */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }}>
                    {[
                        { addr: "42 Oak Lane", price: "$485K", status: "Hot Lead", statusColor: "#ef4444" },
                        { addr: "18 Elm St #4B", price: "$2,100/mo", status: "Tour Set", statusColor: "var(--accent)" },
                        { addr: "7A Parkview", price: "$1,850/mo", status: "Renewed", statusColor: "#22c55e" },
                    ].map((p, i) => (
                        <motion.div key={p.addr}
                            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.6 + i * 0.1, duration: 0.4 }}
                            style={{ background: "var(--surface-solid)", borderRadius: 10, padding: "0.5rem 0.6rem", border: "1px solid var(--border)" }}>
                            <div style={{ width: "100%", height: 28, borderRadius: 6, background: "var(--border)", marginBottom: 5, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <Home size={10} style={{ color: "var(--text-faint)" }} />
                            </div>
                            <div style={{ fontSize: "0.575rem", fontWeight: 600, color: "var(--text-secondary)", lineHeight: 1.2 }}>{p.addr}</div>
                            <div style={{ fontSize: "0.65rem", fontWeight: 800, color: "var(--text)", marginTop: 1 }}>{p.price}</div>
                            <div style={{ fontSize: "0.5rem", fontWeight: 700, color: p.statusColor, marginTop: 2, textTransform: "uppercase", letterSpacing: "0.05em" }}>{p.status}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function CounterStat({ val, suffix, label, delay, isMobile }: {
    val: number; suffix: string; label: string; delay: number; isMobile: boolean;
}) {
    const [count, setCount] = useState(isMobile ? val : 0);

    useEffect(() => {
        if (isMobile) { setCount(val); return; }
        const timer = setTimeout(() => {
            const steps = 40;
            const inc = val / steps;
            let cur = 0;
            const interval = setInterval(() => {
                cur += inc;
                if (cur >= val) { setCount(val); clearInterval(interval); }
                else setCount(Math.round(cur));
            }, 1200 / steps);
            return () => clearInterval(interval);
        }, delay * 1000);
        return () => clearTimeout(timer);
    }, [val, delay, isMobile]);

    return (
        <motion.div
            initial={isMobile ? undefined : { opacity: 0, y: 10 }}
            animate={isMobile ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            style={{
                padding: "0.875rem 1rem", borderRadius: 14, textAlign: "center",
                background: "var(--card-bg)", border: "1px solid var(--card-border)",
                backdropFilter: "blur(12px)",
            }}
        >
            <div style={{ fontSize: "1.5rem", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1 }}>
                <span className="gradient-text">{count}{suffix}</span>
            </div>
            <div style={{ fontSize: "0.65rem", color: "var(--text-faint)", marginTop: 4, fontWeight: 500 }}>{label}</div>
        </motion.div>
    );
}
