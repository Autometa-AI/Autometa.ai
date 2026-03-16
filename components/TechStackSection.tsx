"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsMobile } from "@/hooks/useIsMobile";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const stack = [
    { name: "Salesforce", cat: "CRM" }, { name: "HubSpot", cat: "CRM" },
    { name: "Follow Up Boss", cat: "CRM" }, { name: "Zillow API", cat: "MLS" },
    { name: "RETS / RESO", cat: "MLS" }, { name: "Realtor.com", cat: "MLS" },
    { name: "DocuSign", cat: "Transactions" }, { name: "Dotloop", cat: "Transactions" },
    { name: "SkySlope", cat: "Transactions" }, { name: "AppFolio", cat: "Prop Mgmt" },
    { name: "Buildium", cat: "Prop Mgmt" }, { name: "Yardi", cat: "Prop Mgmt" },
    { name: "Twilio", cat: "Comms" }, { name: "SendGrid", cat: "Comms" },
    { name: "OpenAI", cat: "AI" }, { name: "LangChain", cat: "AI" },
    { name: "Zapier", cat: "Workflow" }, { name: "n8n", cat: "Workflow" },
    { name: "Stripe", cat: "Payments" }, { name: "Plaid", cat: "Payments" },
    { name: "AWS", cat: "Cloud" }, { name: "Google Cloud", cat: "Cloud" },
    { name: "PostgreSQL", cat: "Data" }, { name: "Power BI", cat: "Analytics" },
];

export default function TechStackSection() {
    const gridRef = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();

    useEffect(() => {
        if (isMobile || !gridRef.current) return;
        const cells = gridRef.current.querySelectorAll(".tech-cell");
        cells.forEach((cell) => {
            gsap.fromTo(cell, { opacity: 0, y: 16 },
                { opacity: 1, y: 0, duration: 0.4, delay: Math.random() * 0.3, ease: "power2.out",
                    scrollTrigger: { trigger: cell, start: "top 92%", once: true } });
        });
        return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    }, [isMobile]);

    return (
        <section id="technology" style={{ padding: "6rem 0" }}>
            <div className="container-wide">
                <div style={{ marginBottom: "3rem" }}>
                    <span className="section-eyebrow">Integrations</span>
                    <h2 className="font-display" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 700, letterSpacing: "-0.03em", color: "var(--text)", lineHeight: 1.1 }}>
                        Connects to your <span className="gradient-text">entire stack</span>
                    </h2>
                    <p style={{ fontSize: "0.875rem", color: "var(--text-faint)", marginTop: 6, maxWidth: 400 }}>Seamless integrations with the tools real estate teams already use.</p>
                </div>
                <div ref={gridRef} style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(auto-fill, minmax(140px, 1fr))", gap: 10 }}>
                    {stack.map((t) => (
                        <motion.div key={t.name} className="tech-cell glass-card"
                            whileHover={isMobile ? undefined : { scale: 1.03 }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            style={{ padding: "0.875rem 1rem", cursor: "default", position: "relative", overflow: "hidden", borderRadius: 14 }}>
                            <div className="tech-glow" />
                            <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: 2, position: "relative", zIndex: 1 }}>{t.name}</div>
                            <div style={{ fontSize: "0.625rem", color: "var(--text-faint)", fontWeight: 500, position: "relative", zIndex: 1, fontFamily: "'JetBrains Mono', monospace" }}>{t.cat}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
