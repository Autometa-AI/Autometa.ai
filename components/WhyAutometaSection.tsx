"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsMobile } from "@/hooks/useIsMobile";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const differentiators = [
    { title: "Precision Engineering", points: ["Architecture blueprints before a line of code", "Every component built to documented specification", "Rigorous QA at every integration layer"] },
    { title: "Scalable by Design", points: ["Systems built to handle 10× current volume from day one", "Modular, cloud-native architecture that extends without rewrites", "Autoscaling infrastructure included by default"] },
    { title: "Enterprise-Ready", points: ["ISO 27001-aligned security controls", "Full audit trails and compliance documentation", "Integrates with your existing IAM systems"] },
    { title: "Accountable Delivery", points: ["Success metrics defined before we start", "Bi-weekly delivery with live demos", "Source code ownership — everything we build is yours"] },
];

export default function WhyAutometaSection() {
    const cardsRef = useRef<HTMLDivElement>(null);
    const metricsRef = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();

    useEffect(() => {
        if (isMobile || !cardsRef.current) return;
        const cards = cardsRef.current.querySelectorAll(".why-card");
        cards.forEach((card, i) => {
            gsap.fromTo(card,
                { opacity: 0, y: 40 },
                {
                    opacity: 1, y: 0, duration: 0.7, delay: i * 0.12, ease: "power3.out",
                    scrollTrigger: { trigger: card, start: "top 88%", once: true }
                }
            );
            const checks = card.querySelectorAll(".check-icon");
            checks.forEach((chk, ci) => {
                gsap.fromTo(chk, { scale: 0, opacity: 0 },
                    {
                        scale: 1, opacity: 1, duration: 0.4, delay: i * 0.12 + 0.3 + ci * 0.08, ease: "back.out(2)",
                        scrollTrigger: { trigger: card, start: "top 88%", once: true }
                    }
                );
            });
        });
        return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    }, [isMobile]);

    useEffect(() => {
        if (isMobile || !metricsRef.current) return;
        const items = metricsRef.current.querySelectorAll(".metric-item");
        gsap.fromTo(items, { x: 60, opacity: 0 },
            {
                x: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out",
                scrollTrigger: { trigger: metricsRef.current, start: "top 90%", once: true }
            }
        );
        return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    }, [isMobile]);

    return (
        <section id="why" style={{ background: "var(--surface)", padding: "5rem 0", borderTop: "1px solid var(--border-subtle)" }}>
            <div className="container-wide">
                <div style={{ marginBottom: "3rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
                    <div>
                        <span className="section-eyebrow">The Difference</span>
                        <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 800, letterSpacing: "-0.025em", color: "var(--text)", lineHeight: 1.15 }}>Why Autometa</h2>
                    </div>
                    <p style={{ fontSize: "0.9375rem", color: "var(--text-faint)", maxWidth: 340, lineHeight: 1.65 }}>Not every automation partner is built the same.</p>
                </div>

                <div ref={cardsRef} style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(240px, 1fr))", gap: "1px", background: "var(--border)" }}>
                    {differentiators.map((d) => (
                        <div key={d.title} className="why-card" style={{
                            background: "var(--card-bg)", padding: "2rem 1.5rem",
                            transition: "background 0.3s",
                        }}>
                            <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text)", marginBottom: "1rem", letterSpacing: "-0.01em" }}>{d.title}</h3>
                            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                {d.points.map(p => (
                                    <div key={p} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                                        <div className="check-icon" style={{ flexShrink: 0, marginTop: 3 }}>
                                            <Check size={12} color="var(--accent)" />
                                        </div>
                                        <span style={{ fontSize: "0.9375rem", color: "var(--text-subtle)", lineHeight: 1.6 }}>{p}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div ref={metricsRef} style={{ marginTop: "1px", display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(auto-fit, minmax(160px, 1fr))", gap: "1px", background: "var(--border)" }}>
                    {[{ val: "1 week", label: "Proof of Concept" }, { val: "99.9%", label: "Uptime SLA" }, { val: "< 15 min", label: "Support Response" }, { val: "100%", label: "Source Code Ownership" }].map(m => (
                        <div key={m.label} className="metric-item" style={{
                            background: "var(--metric-bg)", padding: "1.25rem 1.5rem",
                            position: "relative", overflow: "hidden",
                        }}>
                            {!isMobile && (
                                <motion.div
                                    initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
                                    style={{
                                        position: "absolute", bottom: 0, left: 0, right: 0, height: 2,
                                        background: "linear-gradient(90deg, var(--accent)33, var(--accent2)33)", transformOrigin: "left"
                                    }}
                                />
                            )}
                            <div style={{ fontSize: "1.1875rem", fontWeight: 800, color: "var(--stat-val)", letterSpacing: "-0.02em" }}>{m.val}</div>
                            <div style={{ fontSize: "0.7rem", color: "var(--text-faint)", marginTop: 3, fontWeight: 500 }}>{m.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
