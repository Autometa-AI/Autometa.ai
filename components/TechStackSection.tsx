"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsMobile } from "@/hooks/useIsMobile";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const stack = [
    { name: "Python", cat: "AI / ML" }, { name: "TensorFlow", cat: "AI / ML" },
    { name: "PyTorch", cat: "AI / ML" }, { name: "LangChain", cat: "AI Agents" },
    { name: "OpenAI", cat: "AI Agents" }, { name: "Hugging Face", cat: "AI / ML" },
    { name: "UiPath", cat: "RPA" }, { name: "Power Automate", cat: "RPA" },
    { name: "Automation Anywhere", cat: "RPA" }, { name: "Apache Kafka", cat: "Data" },
    { name: "Apache Spark", cat: "Data" }, { name: "Databricks", cat: "Data" },
    { name: "AWS", cat: "Cloud" }, { name: "Azure", cat: "Cloud" },
    { name: "Google Cloud", cat: "Cloud" }, { name: "Kubernetes", cat: "Infra" },
    { name: "Docker", cat: "Infra" }, { name: "Terraform", cat: "Infra" },
    { name: "FastAPI", cat: "Backend" }, { name: "PostgreSQL", cat: "Backend" },
    { name: "n8n", cat: "Workflow" }, { name: "Airflow", cat: "Workflow" },
    { name: "ROS 2", cat: "Robotics" }, { name: "LabVIEW", cat: "Robotics" },
];

export default function TechStackSection() {
    const gridRef = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();

    useEffect(() => {
        if (isMobile || !gridRef.current) return;
        const cells = gridRef.current.querySelectorAll(".tech-cell");
        cells.forEach((cell) => {
            const delay = Math.random() * 0.3;
            gsap.fromTo(cell,
                { opacity: 0, y: 20 },
                {
                    opacity: 1, y: 0, duration: 0.5, delay, ease: "power2.out",
                    scrollTrigger: { trigger: cell, start: "top 92%", once: true }
                }
            );
        });
        return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    }, [isMobile]);

    return (
        <section id="technology" style={{ background: "var(--surface)", padding: "5rem 0", borderTop: "1px solid var(--border-subtle)" }}>
            <div className="container-wide">
                <div style={{ marginBottom: "3rem" }}>
                    <span className="section-eyebrow">Tools & Platforms</span>
                    <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 800, letterSpacing: "-0.025em", color: "var(--text)", lineHeight: 1.15 }}>Technology Stack</h2>
                    <p style={{ fontSize: "0.9375rem", color: "var(--text-faint)", marginTop: 6, maxWidth: 420 }}>Battle-tested platforms powering enterprise automation at scale.</p>
                </div>

                <div ref={gridRef} style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(auto-fill, minmax(150px, 1fr))", gap: "1px", background: "var(--border)" }}>
                    {stack.map((t) => (
                        <motion.div
                            key={t.name}
                            className="tech-cell"
                            whileHover={isMobile ? undefined : {
                                scale: 1.04,
                                boxShadow: "0 0 20px rgba(0,212,255,0.1)",
                            }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            style={{
                                background: "var(--bg-alt)", padding: "1rem 1.25rem",
                                cursor: "default", border: "1px solid transparent",
                                position: "relative", overflow: "hidden",
                            }}
                        >
                            <div className="tech-glow" />
                            <div style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: 3, position: "relative", zIndex: 1 }}>{t.name}</div>
                            <div style={{ fontSize: "0.7rem", color: "var(--text-faint)", fontWeight: 500, position: "relative", zIndex: 1 }}>{t.cat}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
