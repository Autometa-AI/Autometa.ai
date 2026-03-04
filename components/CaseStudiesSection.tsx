"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsMobile } from "@/hooks/useIsMobile";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const results = [
    { client: "Global Logistics Co.", industry: "Supply Chain", challenge: "Manual invoice processing causing 3-day delays and 12% error rate across 40,000 monthly transactions.", solution: "AI document intelligence with RPA orchestration across 14 enterprise systems.", metrics: [{ val: 94, suffix: "%", label: "Processing Time Reduced" }, { val: 99.6, suffix: "%", label: "Accuracy Rate" }, { val: 2.1, suffix: "M", prefix: "$", label: "Annual Savings" }] },
    { client: "FinTech Enterprise", industry: "Financial Services", challenge: "Regulatory compliance reporting consuming 200+ analyst hours monthly with rising audit exposure.", solution: "Autonomous compliance engine with real-time monitoring and auto-generated reports.", metrics: [{ val: 94, suffix: "%", label: "Hours Eliminated" }, { val: 100, suffix: "%", label: "Audit Pass Rate" }, { val: 5.8, suffix: "M", prefix: "$", label: "Risk Cost Avoided" }] },
    { client: "Healthcare Network", industry: "Healthcare", challenge: "Patient onboarding taking 48 hours, resulting in 30% drop-off before first appointment.", solution: "Intelligent workflow system automating eligibility, scheduling, and intake processing.", metrics: [{ val: 85, suffix: "%", label: "Faster Onboarding" }, { val: 62, suffix: "%", label: "Drop-off Reduction" }, { val: 12, suffix: "×", label: "First-Year ROI" }] },
    { client: "E-Commerce Leader", industry: "Retail", challenge: "50,000+ support tickets/month with 72-hour average response time and falling CSAT scores.", solution: "Multi-agent AI triage system with context-aware resolution and escalation logic.", metrics: [{ val: 78, suffix: "%", label: "Auto-Resolved" }, { val: 4, suffix: "min", label: "Avg. Response Time" }, { val: 340, suffix: "%", label: "CSAT Improvement" }] },
];

function Counter({ target, suffix, prefix = "", active }: { target: number; suffix: string; prefix?: string; active: boolean }) {
    const [val, setVal] = useState(0);
    const isMobile = useIsMobile();

    useEffect(() => {
        if (!active) return;
        if (isMobile) { setVal(target); return; }
        const obj = { val: 0 };
        gsap.to(obj, { val: target, duration: 1.6, ease: "power2.out", onUpdate: () => setVal(Math.round(obj.val * 10) / 10) });
    }, [active, target, isMobile]);

    return <div>{prefix}{val}{suffix}</div>;
}

export default function CaseStudiesSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const inView = useInView(containerRef, { once: true, margin: "-80px" });
    const isMobile = useIsMobile();

    useEffect(() => {
        if (isMobile || !containerRef.current) return;
        const cards = containerRef.current.querySelectorAll(".case-card");
        cards.forEach((card, i) => {
            gsap.fromTo(card,
                { opacity: 0, clipPath: "inset(0 100% 0 0)" },
                {
                    opacity: 1, clipPath: "inset(0 0% 0 0)", duration: 0.8, delay: i * 0.15, ease: "power3.out",
                    scrollTrigger: { trigger: card, start: "top 85%", once: true }
                }
            );
        });
        return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    }, [isMobile]);

    return (
        <section id="results" ref={containerRef} style={{ background: "var(--surface)", padding: "5rem 0", borderTop: "1px solid var(--border-subtle)" }}>
            <div className="container-wide">
                <div style={{ marginBottom: "3rem" }}>
                    <span className="section-eyebrow">Proof of Work</span>
                    <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 800, letterSpacing: "-0.025em", color: "var(--text)", lineHeight: 1.15 }}>Results That Speak</h2>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(480px, 1fr))", gap: "1px", background: "var(--border)" }}>
                    {results.map((r) => (
                        <div key={r.client} className="case-card" style={{ background: "var(--card-bg)", padding: "2rem" }}>
                            <div style={{ marginBottom: "1.25rem" }}>
                                <div style={{ fontSize: "0.7rem", fontWeight: 600, color: "var(--text-faint)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>{r.industry}</div>
                                <h3 style={{ fontSize: "1.0625rem", fontWeight: 700, color: "var(--text)" }}>{r.client}</h3>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: "1.5rem" }}>
                                <div>
                                    <span style={{ fontSize: "0.625rem", fontWeight: 600, color: "var(--text-faint)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Problem</span>
                                    <p style={{ fontSize: "0.9375rem", color: "var(--text-subtle)", lineHeight: 1.65, marginTop: 3 }}>{r.challenge}</p>
                                </div>
                                <div>
                                    <span style={{ fontSize: "0.625rem", fontWeight: 600, color: "var(--text-faint)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Solution</span>
                                    <p style={{ fontSize: "0.9375rem", color: "var(--text-muted)", lineHeight: 1.65, marginTop: 3 }}>{r.solution}</p>
                                </div>
                            </div>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1px", background: "var(--border)" }}>
                                {r.metrics.map(m => (
                                    <div key={m.label} style={{ background: "var(--metric-bg)", padding: "0.875rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
                                        {!isMobile && (
                                            <motion.div
                                                initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.3 }}
                                                style={{
                                                    position: "absolute", bottom: 0, left: 0, right: 0, height: 2,
                                                    background: "linear-gradient(90deg, var(--accent)44, var(--accent2)44)", transformOrigin: "left"
                                                }}
                                            />
                                        )}
                                        <div style={{ fontSize: "1.375rem", fontWeight: 800, color: "var(--stat-val)", letterSpacing: "-0.02em", lineHeight: 1 }}>
                                            <Counter target={m.val} suffix={m.suffix} prefix={m.prefix} active={inView} />
                                        </div>
                                        <div style={{ fontSize: "0.625rem", color: "var(--text-faint)", marginTop: 4, fontWeight: 500 }}>{m.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
