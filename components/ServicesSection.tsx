"use client";

import { useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const services = [
    { number: "01", title: "AI Automation", description: "Deploy production-grade ML pipelines that automate complex cognitive tasks — document intelligence, predictive analytics, classification at enterprise scale.", tags: ["ML Pipelines", "NLP", "Computer Vision", "Predictive AI"] },
    { number: "02", title: "Robotic Process Automation", description: "Precision bots that handle high-volume rule-based processes across any enterprise system — ERP, CRM, finance, HR — 24/7 with zero error rate.", tags: ["UiPath", "Power Automate", "Custom RPA", "Attended / Unattended"] },
    { number: "03", title: "AI Agents & Workflows", description: "Autonomous agents that plan, reason, and execute multi-step workflows across tools, APIs, and databases without human intervention.", tags: ["LangChain", "Multi-Agent", "Tool Use", "Orchestration"] },
    { number: "04", title: "Enterprise Integration", description: "Seamless connectivity across your full tech stack. We integrate automation into existing ERP, CRM, data warehouses, and legacy infrastructure.", tags: ["API Design", "ETL Pipelines", "Middleware", "Data Sync"] },
    { number: "05", title: "Custom Robotics Systems", description: "End-to-end robotics system design for physical automation — sensor integration, motion planning, control software, and deployment.", tags: ["Embedded Systems", "Motion Control", "Sensor Fusion", "IIoT"] },
];

function TiltCard({ children }: { children: React.ReactNode }) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [3, -3]), { stiffness: 300, damping: 30 });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-3, 3]), { stiffness: 300, damping: 30 });

    function handleMouse(e: React.MouseEvent) {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    }

    function resetMouse() { x.set(0); y.set(0); }

    return (
        <motion.div ref={ref} onMouseMove={handleMouse} onMouseLeave={resetMouse}
            style={{ rotateX, rotateY, transformPerspective: 800, transformStyle: "preserve-3d" }}>
            {children}
        </motion.div>
    );
}

export default function ServicesSection() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;
        const rows = containerRef.current.querySelectorAll(".service-row");
        gsap.set(rows, { opacity: 0, y: 30 });

        ScrollTrigger.batch(rows, {
            onEnter: (batch) =>
                gsap.to(batch, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out", overwrite: true }),
            start: "top 90%",
        });

        const dividers = containerRef.current.querySelectorAll(".service-divider");
        dividers.forEach((div) => {
            gsap.fromTo(div, { scaleX: 0 }, {
                scaleX: 1, duration: 0.8, ease: "power2.out",
                scrollTrigger: { trigger: div, start: "top 90%", once: true },
            });
        });

        return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    }, []);

    return (
        <section id="services" style={{ background: "var(--surface)", padding: "5rem 0", borderTop: "1px solid var(--border-subtle)" }}>
            <div className="container-wide">
                <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ marginBottom: "3rem" }}>
                    <span className="section-eyebrow">What We Build</span>
                    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
                        <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 800, letterSpacing: "-0.025em", color: "var(--text)", lineHeight: 1.15 }}>Automation Services</h2>
                        <motion.a href="#contact" className="btn-secondary" style={{ fontSize: "0.875rem" }} whileHover={{ scale: 1.03, x: 4 }}>
                            Discuss your project <ArrowRight size={13} />
                        </motion.a>
                    </div>
                </motion.div>

                <div ref={containerRef} style={{ borderTop: "1px solid var(--border)" }}>
                    {services.map((s) => (
                        <TiltCard key={s.title}>
                            <div className="service-row" style={{
                                display: "grid", gridTemplateColumns: "60px 1fr auto",
                                gap: "0 2rem", padding: "1.75rem 0",
                                alignItems: "start", cursor: "default", position: "relative",
                            }}>
                                <div className="service-divider" style={{
                                    position: "absolute", bottom: 0, left: 0, right: 0,
                                    height: 1, background: "var(--border)", transformOrigin: "left",
                                }} />
                                <span style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.08em", color: "var(--text-faint)", paddingTop: 3, fontFamily: "monospace" }}>{s.number}</span>
                                <div>
                                    <h3 style={{ fontSize: "1.0625rem", fontWeight: 700, color: "var(--text)", marginBottom: 6, letterSpacing: "-0.01em" }}>{s.title}</h3>
                                    <p style={{ fontSize: "0.9375rem", color: "var(--text-subtle)", lineHeight: 1.7, maxWidth: 560, marginBottom: 10 }}>{s.description}</p>
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                                        {s.tags.map(t => (
                                            <motion.span key={t} className="tag" whileHover={{ scale: 1.08 }}>{t}</motion.span>
                                        ))}
                                    </div>
                                </div>
                                <motion.div whileHover={{ x: 4 }} style={{ marginTop: 3 }}>
                                    <ArrowRight size={14} color="var(--text-faint)" className="service-arrow" />
                                </motion.div>
                            </div>
                        </TiltCard>
                    ))}
                </div>
            </div>
        </section>
    );
}
