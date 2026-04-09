"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsMobile } from "@/hooks/useIsMobile";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const steps = [
    { num: "01", title: "Audit", desc: "We analyze your current tools, workflows, and gaps — mapping out exactly where leads are lost and time is wasted.", deliverable: "Gap Analysis + ROI Report", emoji: "🔍" },
    { num: "02", title: "Design", desc: "We create a tailored system blueprint — including CRM workflows, automation sequences, and tool integrations — designed around your team.", deliverable: "Custom System Blueprint", emoji: "📐" },
    { num: "03", title: "Build & Automate", desc: "We implement your system end-to-end — CRM setup, automation workflows, AI integrations, dashboards — and optimize until it runs on autopilot.", deliverable: "Live System + Ongoing Support", emoji: "⚡" },
];

export default function ProcessSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();

    useEffect(() => {
        if (isMobile) return;
        const section = sectionRef.current;
        const track = trackRef.current;
        if (!section || !track) return;

        const totalWidth = track.scrollWidth - window.innerWidth;

        const scrollTween = gsap.to(track, {
            x: -totalWidth, ease: "none",
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
            gsap.fromTo(card, { opacity: 0, y: 30, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 0.6, scrollTrigger: { trigger: card, containerAnimation: scrollTween, start: "left 80%", end: "left 40%", scrub: 1 } });
        });
        return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    }, [isMobile]);

    return (
        <section id="process" ref={sectionRef} style={{ overflow: "hidden", position: "relative" }}>
            {!isMobile && (
                <div ref={progressRef} style={{
                    position: "absolute", top: 0, left: 0, width: "100%", height: 3,
                    background: "var(--gradient-primary)", borderRadius: 2,
                    transformOrigin: "left", transform: "scaleX(0)", zIndex: 2,
                }} />
            )}
            <div style={{ padding: "5rem 0" }}>
                <div className="container-wide" style={{ marginBottom: "3rem" }}>
                    <motion.div initial={isMobile ? undefined : { opacity: 0, y: 16 }} whileInView={isMobile ? undefined : { opacity: 1, y: 0 }}
                        viewport={{ once: true }} transition={{ duration: 0.5 }}>
                        <span className="section-eyebrow">How We Work</span>
                        <h2 className="font-display" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 700, letterSpacing: "-0.03em", color: "var(--text)", lineHeight: 1.1 }}>
                            A Simple 3-Step Process to <span className="gradient-text">Fix Your Systems</span>
                        </h2>
                        {!isMobile && <p style={{ fontSize: "0.875rem", color: "var(--text-faint)", marginTop: 6 }}>Scroll to explore each phase →</p>}
                    </motion.div>
                </div>

                <div ref={trackRef} style={isMobile ? {
                    display: "grid", gridTemplateColumns: "1fr", gap: 12, margin: "0 1.5rem",
                } : {
                    display: "flex", gap: 16, paddingLeft: "3rem", paddingRight: "50vw", willChange: "transform",
                }}>
                    {steps.map((step, i) => (
                        <div key={step.num} className={`glass-card ${isMobile ? "" : "process-card"}`} style={{
                            padding: "2rem 1.5rem",
                            minWidth: isMobile ? "auto" : 320, maxWidth: isMobile ? "none" : 360,
                            flexShrink: 0,
                        }}>
                            <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>{step.emoji}</div>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "0.75rem" }}>
                                <span style={{ fontSize: "0.65rem", fontWeight: 700, color: "var(--accent)", fontFamily: "'JetBrains Mono', monospace" }}>{step.num}</span>
                                <h3 className="font-display" style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--text)", letterSpacing: "-0.01em" }}>{step.title}</h3>
                            </div>
                            <p style={{ fontSize: "0.875rem", color: "var(--text-subtle)", lineHeight: 1.7, marginBottom: "1.25rem" }}>{step.desc}</p>
                            <div style={{
                                fontSize: "0.7rem", color: "var(--accent)", fontWeight: 600,
                                padding: "0.4rem 0.75rem", background: "var(--tag-bg)", borderRadius: 8, border: "1px solid var(--tag-border)",
                                display: "inline-block", fontFamily: "'JetBrains Mono', monospace",
                            }}>↳ {step.deliverable}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
