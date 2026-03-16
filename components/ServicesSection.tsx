"use client";

import { useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Home, Wrench, FileText, Database, MessageSquare } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsMobile } from "@/hooks/useIsMobile";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const services = [
    { icon: <Home size={20} />, number: "01", title: "Lead Capture & Nurture", description: "AI-powered lead scoring, instant response bots, and drip campaigns that convert inquiries into showings — capturing leads from Zillow, Realtor.com, and your website 24/7.", tags: ["Lead Scoring", "Auto-Respond", "Drip Campaigns", "Multi-Channel"] },
    { icon: <Wrench size={20} />, number: "02", title: "Property Management", description: "Automate rent collection, maintenance requests, lease renewals, and tenant communications. Zero manual follow-ups across your entire portfolio.", tags: ["Rent Collection", "Maintenance", "Lease Tracking", "Tenant Portal"] },
    { icon: <FileText size={20} />, number: "03", title: "Transaction & Closing", description: "From offer to close in half the time. Automated document generation, e-signatures, compliance checks, and deadline tracking across every deal.", tags: ["Doc Generation", "E-Signatures", "Compliance", "Deadlines"] },
    { icon: <Database size={20} />, number: "04", title: "CRM & MLS Integration", description: "Seamless sync between your CRM, MLS feeds, marketing tools, and accounting systems. One source of truth for every listing, contact, and transaction.", tags: ["MLS Sync", "CRM Auto", "Data Pipes", "Real-Time"] },
    { icon: <MessageSquare size={20} />, number: "05", title: "AI Virtual Assistants", description: "24/7 AI agents that answer property questions, schedule tours, qualify buyers, and hand off warm leads to your team — on web, SMS, and social.", tags: ["Chatbots", "Tours", "Qualification", "Omnichannel"] },
];

function TiltCard({ children }: { children: React.ReactNode }) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [2, -2]), { stiffness: 300, damping: 30 });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-2, 2]), { stiffness: 300, damping: 30 });

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
    const isMobile = useIsMobile();

    useEffect(() => {
        if (!containerRef.current) return;
        const cards = containerRef.current.querySelectorAll(".service-card");
        gsap.set(cards, { opacity: 0, y: 30 });
        ScrollTrigger.batch(cards, {
            onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power3.out", overwrite: true }),
            start: "top 90%",
        });
        return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    }, []);

    return (
        <section id="services" style={{ padding: "6rem 0", position: "relative" }}>
            <div className="container-wide">
                <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ marginBottom: "3rem" }}>
                    <span className="section-eyebrow">What We Automate</span>
                    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
                        <h2 className="font-display" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 700, letterSpacing: "-0.03em", color: "var(--text)", lineHeight: 1.1 }}>
                            Every workflow.<br /><span className="gradient-text">Automated.</span>
                        </h2>
                        <motion.a href="#contact" className="btn-secondary" style={{ fontSize: "0.8rem" }} whileHover={{ scale: 1.03 }}>
                            Get a free audit <ArrowRight size={13} />
                        </motion.a>
                    </div>
                </motion.div>

                <div ref={containerRef} className="bento-grid">
                    {services.map((s) => (
                        <TiltCard key={s.title}>
                            <div className="service-card glass-card" style={{ padding: "1.5rem", cursor: "default", height: "100%" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                                    <div style={{
                                        width: 36, height: 36, borderRadius: 10,
                                        background: "var(--tag-bg)", border: "1px solid var(--tag-border)",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        color: "var(--accent)",
                                    }}>
                                        {s.icon}
                                    </div>
                                    <span style={{ fontSize: "0.65rem", fontWeight: 600, color: "var(--text-faint)", fontFamily: "'JetBrains Mono', monospace" }}>{s.number}</span>
                                </div>
                                <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text)", marginBottom: 8, letterSpacing: "-0.01em" }}>{s.title}</h3>
                                <p style={{ fontSize: "0.875rem", color: "var(--text-subtle)", lineHeight: 1.7, marginBottom: 12 }}>{s.description}</p>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                                    {s.tags.map(t => (
                                        <motion.span key={t} className="tag" whileHover={{ scale: 1.06 }}>{t}</motion.span>
                                    ))}
                                </div>
                            </div>
                        </TiltCard>
                    ))}
                </div>
            </div>
        </section>
    );
}
