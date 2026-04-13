"use client";

import { ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function CTASection() {
    const isMobile = useIsMobile();

    return (
        <section id="contact" style={{ padding: "6rem 0", position: "relative", overflow: "hidden" }}>
            <div className="mesh-bg" />

            <div className="container-wide">
                <div className="glass-card" style={{ padding: isMobile ? "2.5rem 1.5rem" : "4rem 3rem", position: "relative", zIndex: 1 }}>
                    <span className="section-eyebrow">Get Started</span>
                    <h2
                        className="font-display"
                        style={{
                            fontSize: "clamp(2.2rem, 4.8vw, 3.5rem)",
                            fontWeight: 700,
                            letterSpacing: "-0.04em",
                            color: "var(--text)",
                            lineHeight: 1.08,
                            marginBottom: "1.25rem",
                        }}
                    >
                        Let&apos;s Fix Your Systems<br />
                        and <span className="gradient-text">Scale Your Operations</span>
                    </h2>
                    <p style={{ fontSize: "1.1rem", color: "var(--text-subtle)", lineHeight: 1.75, marginBottom: "2rem", maxWidth: 480 }}>
                        Book a free system audit. We&apos;ll analyze your current workflows and show you exactly how to streamline and automate your operations.
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: "2rem" }}>
                        <a href="/contact" className="btn-primary cta-glow-btn">
                            Book Audit <ArrowRight size={15} />
                        </a>
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                        {["Free system audit", "Same-day response", "No obligation", "Works with your tools"].map(t => (
                            <span key={t} style={{ fontSize: "0.75rem", color: "var(--text-faint)", fontWeight: 500, display: "flex", alignItems: "center", gap: 4 }}>
                                <span style={{ color: "var(--accent)", fontSize: "0.85rem" }}>&#10003;</span> {t}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
