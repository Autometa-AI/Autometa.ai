"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsMobile } from "@/hooks/useIsMobile";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const steps = [
    { num: "01", title: "Discover", desc: "Deep-dive audit of your processes — workflow mapping, bottleneck analysis, and ROI quantification across every automation opportunity.", deliverable: "Process Map + ROI Report" },
    { num: "02", title: "Architect", desc: "System topology, AI model selection, automation tooling, and a precise implementation blueprint before a single line of code.", deliverable: "System Architecture + Tech Spec" },
    { num: "03", title: "Build", desc: "Agile build sprints with weekly delivery checkpoints. Continuous integration testing, model training, and security validation at every layer.", deliverable: "Working System + Test Suite" },
    { num: "04", title: "Deploy", desc: "Production launch with full monitoring and optimization framework. 99.9% uptime SLA and continuous improvement included.", deliverable: "Live System + SLA Agreement" },
];

export default function ProcessSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();

    // GSAP horizontal scroll — desktop only
    useEffect(() => {
        if (isMobile) return;
        const section = sectionRef.current;
        const track = trackRef.current;
        if (!section || !track) return;

        const totalWidth = track.scrollWidth - window.innerWidth;

        const scrollTween = gsap.to(track, {
            x: -totalWidth,
            ease: "none",
            scrollTrigger: { trigger: section, pin: true, scrub: 1, end: () => `+=${totalWidth}`, invalidateOnRefresh: true },
        });

        if (progressRef.current) {
            gsap.to(progressRef.current, {
                scaleX: 1, ease: "none",
                scrollTrigger: { trigger: section, scrub: 1, start: "top top", end: () => `+=${totalWidth}` },
            });
        }

        const cards = track.querySelectorAll(".process-card");
        cards.forEach((card) => {
            gsap.fromTo(card,
                { opacity: 0, y: 30, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 0.6, scrollTrigger: { trigger: card, containerAnimation: scrollTween, start: "left 80%", end: "left 40%", scrub: 1 } }
            );
        });

        return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    }, [isMobile]);

    return (
        <section id="process" ref={sectionRef} style={{
            background: "var(--surface)", borderTop: "1px solid var(--border-subtle)", overflow: "hidden", position: "relative",
        }}>
            {/* Progress bar — desktop only */}
            {!isMobile && (
                <div ref={progressRef} style={{
                    position: "absolute", top: 0, left: 0, width: "100%", height: 2,
                    background: "linear-gradient(90deg, var(--accent), var(--accent2))",
                    transformOrigin: "left", transform: "scaleX(0)", zIndex: 2,
                }} />
            )}

            <div style={{ padding: "5rem 0" }}>
                <div className="container-wide" style={{ marginBottom: "3rem" }}>
                    <motion.div
                        initial={isMobile ? undefined : { opacity: 0, y: 16 }}
                        whileInView={isMobile ? undefined : { opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="section-eyebrow">How We Work</span>
                        <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 800, letterSpacing: "-0.025em", color: "var(--text)", lineHeight: 1.15 }}>From Discovery to Deployment</h2>
                        {!isMobile && <p style={{ fontSize: "0.9375rem", color: "var(--text-faint)", marginTop: 6 }}>Scroll to explore each phase →</p>}
                    </motion.div>
                </div>

                {/* Desktop: horizontal scroll track. Mobile: vertical grid */}
                <div
                    ref={trackRef}
                    style={isMobile ? {
                        display: "grid", gridTemplateColumns: "1fr", gap: "1px", background: "var(--border)",
                        margin: "0 2rem",
                    } : {
                        display: "flex", gap: "1px", paddingLeft: "3rem", paddingRight: "50vw", willChange: "transform",
                    }}
                >
                    {steps.map((step, i) => (
                        <div key={step.num} className={isMobile ? "" : "process-card"} style={{
                            background: "var(--bg-alt)", padding: "2.5rem 2rem",
                            minWidth: isMobile ? "auto" : 340, maxWidth: isMobile ? "none" : 380,
                            flexShrink: 0, position: "relative",
                            borderRight: isMobile ? "none" : "1px solid var(--border)",
                        }}>
                            <div style={{
                                position: "absolute", top: 0, left: 0, width: "100%", height: 2,
                                background: `linear-gradient(90deg, ${i % 2 === 0 ? 'var(--accent)' : 'var(--accent2)'}33, transparent)`,
                            }} />
                            <div style={{
                                display: "inline-flex", alignItems: "center", justifyContent: "center",
                                width: 36, height: 36, border: "1px solid var(--border)", borderRadius: 6, marginBottom: "1.5rem",
                                background: "var(--card-bg)",
                            }}>
                                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", fontFamily: "monospace" }}>{step.num}</span>
                            </div>
                            <h3 style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--text)", marginBottom: "0.75rem", letterSpacing: "-0.01em" }}>{step.title}</h3>
                            <p style={{ fontSize: "0.9375rem", color: "var(--text-subtle)", lineHeight: 1.7, marginBottom: "1.5rem" }}>{step.desc}</p>
                            <div style={{
                                fontSize: "0.75rem", color: "var(--text-faint)", fontWeight: 500, fontFamily: "monospace",
                                padding: "0.5rem 0.75rem", background: "var(--card-bg)", borderRadius: 4, border: "1px solid var(--border)",
                            }}>↳ {step.deliverable}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
