"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, Home, TrendingUp, Shield, HeartHandshake } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsMobile } from "@/hooks/useIsMobile";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const differentiators = [
    { icon: <Home size={18} />, title: "Built for Real Estate", points: ["We only serve real estate — brokerages, managers, developers", "Pre-built templates for common RE workflows", "Deep MLS, CRM, and transaction platform expertise"] },
    { icon: <TrendingUp size={18} />, title: "Scales With You", points: ["Handles 10 units or 10,000 without rewrites", "Add new agents, offices, or markets — zero manual setup", "Volume-based pricing that grows with your business"] },
    { icon: <Shield size={18} />, title: "Compliance Built-In", points: ["Fair Housing Act-aware communication guardrails", "SOC 2-aligned data handling for PII", "Full audit trails for every automated step"] },
    { icon: <HeartHandshake size={18} />, title: "White-Glove Launch", points: ["Dedicated RE automation specialist on your account", "Team training sessions + recorded walkthroughs", "Live support during your first 30 days"] },
];

export default function WhyAutometaSection() {
    const cardsRef = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();

    useEffect(() => {
        if (isMobile || !cardsRef.current) return;
        const cards = cardsRef.current.querySelectorAll(".why-card");
        cards.forEach((card, i) => {
            gsap.fromTo(card, { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.6, delay: i * 0.1, ease: "power3.out",
                    scrollTrigger: { trigger: card, start: "top 88%", once: true } });
        });
        return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    }, [isMobile]);

    return (
        <section id="why" style={{ padding: "6rem 0" }}>
            <div className="container-wide">
                <div style={{ marginBottom: "3rem" }}>
                    <span className="section-eyebrow">The Difference</span>
                    <h2 className="font-display" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 700, letterSpacing: "-0.03em", color: "var(--text)", lineHeight: 1.1 }}>
                        Why <span className="gradient-text">autometa</span>
                    </h2>
                    <p style={{ fontSize: "0.875rem", color: "var(--text-faint)", maxWidth: 380, lineHeight: 1.65, marginTop: 8 }}>Not a generic automation shop — we live and breathe real estate.</p>
                </div>

                <div ref={cardsRef} style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: 14 }}>
                    {differentiators.map((d) => (
                        <div key={d.title} className="why-card glass-card" style={{ padding: "1.5rem" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1rem" }}>
                                <div style={{
                                    width: 34, height: 34, borderRadius: 10,
                                    background: "var(--tag-bg)", border: "1px solid var(--tag-border)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    color: "var(--accent)",
                                }}>{d.icon}</div>
                                <h3 style={{ fontSize: "0.975rem", fontWeight: 700, color: "var(--text)", letterSpacing: "-0.01em" }}>{d.title}</h3>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                                {d.points.map(p => (
                                    <div key={p} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                                        <div style={{ flexShrink: 0, marginTop: 4, width: 16, height: 16, borderRadius: 5, background: "var(--tag-bg)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                            <Check size={10} color="var(--accent)" />
                                        </div>
                                        <span style={{ fontSize: "0.85rem", color: "var(--text-subtle)", lineHeight: 1.6 }}>{p}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: 10 }}>
                    {[{ val: "1 week", label: "Proof of Concept" }, { val: "99.9%", label: "Uptime SLA" }, { val: "< 15 min", label: "Support Response" }, { val: "50+", label: "RE Integrations" }].map(m => (
                        <div key={m.label} className="glass-card" style={{ padding: "1.25rem", textAlign: "center" }}>
                            <div style={{ fontSize: "1.125rem", fontWeight: 900, letterSpacing: "-0.02em" }}>
                                <span className="gradient-text">{m.val}</span>
                            </div>
                            <div style={{ fontSize: "0.65rem", color: "var(--text-faint)", marginTop: 3, fontWeight: 500 }}>{m.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
