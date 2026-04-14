"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];
const vp = { once: true, amount: 0.15 as const };

export default function CTASection() {
    const isMobile = useIsMobile();

    return (
        <section id="contact" style={{ padding: "6rem 0", position: "relative", overflow: "hidden" }}>
            <div className="mesh-bg" />

            <div className="container-wide">
                <motion.div
                    className="glass-card"
                    style={{ padding: isMobile ? "2.5rem 1.5rem" : "4rem 3rem", position: "relative", zIndex: 1 }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={vp}
                    transition={{ duration: 0.7, ease }}
                >
                    <motion.span
                        className="section-eyebrow"
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1, ease }}
                    >
                        Get Started
                    </motion.span>
                    <motion.h2
                        className="font-display"
                        style={{
                            fontSize: "clamp(2.2rem, 4.8vw, 3.5rem)",
                            fontWeight: 700,
                            letterSpacing: "-0.04em",
                            color: "var(--text)",
                            lineHeight: 1.08,
                            marginBottom: "1.25rem",
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2, ease }}
                    >
                        Let&apos;s Fix Your Systems<br />
                        and <span className="gradient-text">Scale Your Operations</span>
                    </motion.h2>
                    <motion.p
                        style={{ fontSize: "1.1rem", color: "var(--text-subtle)", lineHeight: 1.75, marginBottom: "2rem", maxWidth: 480 }}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3, ease }}
                    >
                        Book a free system audit. We&apos;ll analyze your current workflows and show you exactly how to streamline and automate your operations.
                    </motion.p>
                    <motion.div
                        style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: "2rem" }}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4, ease }}
                    >
                        <a href="/contact" className="btn-primary cta-glow-btn">
                            Book Audit <ArrowRight size={15} />
                        </a>
                    </motion.div>
                    <motion.div
                        style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.5, ease }}
                    >
                        {["Free system audit", "Same-day response", "No obligation", "Works with your tools"].map((t) => (
                            <span
                                key={t}
                                style={{ fontSize: "0.75rem", color: "var(--text-faint)", fontWeight: 500, display: "flex", alignItems: "center", gap: 4 }}
                            >
                                <span style={{ color: "var(--accent)", fontSize: "0.85rem" }}>&#10003;</span> {t}
                            </span>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
