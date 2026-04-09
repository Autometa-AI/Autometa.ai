"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, Users, Building2, Zap, Home, Key, FileText, MessageSquare, BarChart3 } from "lucide-react";
import gsap from "gsap";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function HeroSection() {
    const headingRef = useRef<HTMLHeadingElement>(null);
    const subRef = useRef<HTMLParagraphElement>(null);
    const isMobile = useIsMobile();

    useEffect(() => {
        if (isMobile) return;
        const el = headingRef.current;
        if (!el) return;
        const html = el.innerHTML;
        const tokens = html.split(/(<br\s*\/?>|<span[^>]*>.*?<\/span>)/gi).filter(Boolean);
        el.innerHTML = "";

        tokens.forEach((token) => {
            if (token.match(/<br\s*\/?>/i)) {
                el.appendChild(document.createElement("br"));
                return;
            }
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
                                Built for modern real estate teams
                            </span>
                        </motion.div>

                        <h1 ref={headingRef} className="font-display" style={{
                            fontSize: "clamp(2.2rem, 5vw, 3.75rem)",
                            fontWeight: 700, lineHeight: 1.08,
                            letterSpacing: "-0.04em", color: "var(--text)",
                            marginBottom: 24,
                        }}>
                            We Build &amp; Automate<br />Systems to <span className="gradient-text">Capture, Track<br />&amp; Convert</span> Every Lead
                        </h1>

                        <p ref={subRef} style={{
                            fontSize: "1rem", color: "var(--text-subtle)", lineHeight: 1.8,
                            maxWidth: 500, marginBottom: 36,
                            opacity: isMobile ? 1 : 0,
                        }}>
                            From lead management to AI-powered follow-ups and custom internal tools — we help real estate teams streamline operations and scale efficiently.
                        </p>

                        <motion.div
                            initial={isMobile ? undefined : { opacity: 0, y: 16 }}
                            animate={isMobile ? undefined : { opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 1.1 }}
                            style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 48 }}
                        >
                            <a href="/contact" className="btn-primary">Book Free System Audit <ArrowRight size={14} /></a>
                            <a href="#services" className="btn-secondary">Explore Our Systems <ChevronRight size={14} /></a>
                        </motion.div>
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
                {/* Lead Pipeline KPIs */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
                    {[
                        { icon: <Users size={13} />, label: "Active Leads", value: "2,847", change: "+23%" },
                        { icon: <BarChart3 size={13} />, label: "Conversion Rate", value: "34%", change: "+12%" },
                        { icon: <MessageSquare size={13} />, label: "Auto Follow-ups", value: "1,204", change: "+45%" },
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

                {/* Live Automation Feed */}
                <div style={{ background: "var(--surface-solid)", borderRadius: 12, padding: "0.75rem", border: "1px solid var(--border)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                        <Zap size={10} style={{ color: "var(--accent)" }} />
                        <span style={{ fontSize: "0.6rem", fontWeight: 700, color: "var(--text-faint)", letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: "'JetBrains Mono', monospace" }}>Automation Feed</span>
                    </div>
                    {[
                        { action: "Lead auto-responded via WhatsApp", detail: "Sarah M. — New inquiry", time: "2s", dot: "#22c55e" },
                        { action: "Follow-up sequence triggered", detail: "John P. — Day 3 drip", time: "14s", dot: "var(--accent)" },
                        { action: "Lead assigned to agent", detail: "Unit 7A — Score: 92/100", time: "1m", dot: "#3b82f6" },
                        { action: "Meeting auto-scheduled", detail: "Mike R. — Tomorrow 2PM", time: "3m", dot: "#f59e0b" },
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

                {/* Pipeline Status Cards */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }}>
                    {[
                        { label: "New Leads", count: "128", status: "Today", statusColor: "#22c55e" },
                        { label: "In Pipeline", count: "847", status: "Active", statusColor: "var(--accent)" },
                        { label: "Converted", count: "312", status: "This Month", statusColor: "#3b82f6" },
                    ].map((p, i) => (
                        <motion.div key={p.label}
                            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.6 + i * 0.1, duration: 0.4 }}
                            style={{ background: "var(--surface-solid)", borderRadius: 10, padding: "0.5rem 0.6rem", border: "1px solid var(--border)" }}>
                            <div style={{ fontSize: "0.575rem", fontWeight: 600, color: "var(--text-faint)", marginBottom: 2 }}>{p.label}</div>
                            <div style={{ fontSize: "1rem", fontWeight: 800, color: "var(--text)", letterSpacing: "-0.03em" }}>{p.count}</div>
                            <div style={{ fontSize: "0.5rem", fontWeight: 700, color: p.statusColor, marginTop: 2, textTransform: "uppercase", letterSpacing: "0.05em" }}>{p.status}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
