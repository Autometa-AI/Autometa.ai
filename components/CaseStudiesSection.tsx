"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsMobile } from "@/hooks/useIsMobile";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const results = [
    { client: "Metro Realty Group", industry: "Brokerage", challenge: "Agents spending 15+ hours/week on manual lead follow-ups, losing 40% of inbound leads.", solution: "AI lead scoring with instant auto-response and automated showing scheduling across 120 agents.", metrics: [{ val: 85, suffix: "%", label: "Faster Response" }, { val: 3.2, suffix: "x", label: "Conversion" }, { val: 1.8, suffix: "M", prefix: "$", label: "Added Revenue" }] },
    { client: "Pinnacle Property Mgmt", industry: "Property Mgmt", challenge: "Managing 2,400 units with paper-based maintenance and manual rent collection.", solution: "End-to-end property ops automation — tenant portal, auto-collections, and maintenance routing.", metrics: [{ val: 94, suffix: "%", label: "On-Time Rent" }, { val: 70, suffix: "%", label: "Less Delays" }, { val: 8, suffix: "x", label: "First-Year ROI" }] },
    { client: "Horizon Development", industry: "Development", challenge: "Closings averaging 52 days with doc errors causing 20% of deals to miss deadlines.", solution: "Automated transaction pipeline with doc generation, e-signatures, and deadline alerts.", metrics: [{ val: 58, suffix: "%", label: "Faster Close" }, { val: 99.4, suffix: "%", label: "Doc Accuracy" }, { val: 2.4, suffix: "M", prefix: "$", label: "Cost Savings" }] },
    { client: "LuxeHomes Intl.", industry: "Luxury", challenge: "High-value clients expecting instant, personalized communication at scale.", solution: "AI concierge chatbot with property matching and virtual tour scheduling — 24/7.", metrics: [{ val: 78, suffix: "%", label: "Auto-Handled" }, { val: 4, suffix: "min", label: "Response Time" }, { val: 240, suffix: "%", label: "More Showings" }] },
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
            gsap.fromTo(card, { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.7, delay: i * 0.1, ease: "power3.out",
                    scrollTrigger: { trigger: card, start: "top 88%", once: true } });
        });
        return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    }, [isMobile]);

    return (
        <section id="results" ref={containerRef} style={{ padding: "6rem 0" }}>
            <div className="container-wide">
                <div style={{ marginBottom: "3rem" }}>
                    <span className="section-eyebrow">Proof of Work</span>
                    <h2 className="font-display" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 700, letterSpacing: "-0.03em", color: "var(--text)", lineHeight: 1.1 }}>
                        Results that <span className="gradient-text">speak</span>
                    </h2>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: 14 }}>
                    {results.map((r) => (
                        <div key={r.client} className="case-card glass-card" style={{ padding: "1.5rem", overflow: "hidden" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "1rem" }}>
                                <span style={{ fontSize: "0.6rem", fontWeight: 700, color: "var(--accent)", padding: "3px 8px", background: "var(--tag-bg)", border: "1px solid var(--tag-border)", borderRadius: 6, fontFamily: "'JetBrains Mono', monospace" }}>{r.industry}</span>
                                <h3 style={{ fontSize: "0.975rem", fontWeight: 700, color: "var(--text)" }}>{r.client}</h3>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: "1.25rem" }}>
                                <div>
                                    <span style={{ fontSize: "0.575rem", fontWeight: 700, color: "var(--text-faint)", letterSpacing: "0.08em", textTransform: "uppercase" }}>Problem</span>
                                    <p style={{ fontSize: "0.85rem", color: "var(--text-subtle)", lineHeight: 1.65, marginTop: 2 }}>{r.challenge}</p>
                                </div>
                                <div>
                                    <span style={{ fontSize: "0.575rem", fontWeight: 700, color: "var(--text-faint)", letterSpacing: "0.08em", textTransform: "uppercase" }}>Solution</span>
                                    <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.65, marginTop: 2 }}>{r.solution}</p>
                                </div>
                            </div>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
                                {r.metrics.map(m => (
                                    <div key={m.label} style={{
                                        background: "var(--surface-solid)", borderRadius: 12, padding: "0.75rem",
                                        textAlign: "center", border: "1px solid var(--border)",
                                    }}>
                                        <div style={{ fontSize: "1.25rem", fontWeight: 900, letterSpacing: "-0.02em", lineHeight: 1 }}>
                                            <span className="gradient-text"><Counter target={m.val} suffix={m.suffix} prefix={m.prefix} active={inView} /></span>
                                        </div>
                                        <div style={{ fontSize: "0.575rem", color: "var(--text-faint)", marginTop: 3, fontWeight: 500 }}>{m.label}</div>
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
