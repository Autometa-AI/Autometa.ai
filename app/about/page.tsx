"use client";

import { motion } from "framer-motion";
import { ArrowRight, Target, Eye, Lightbulb, Users, Shield, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useIsMobile } from "@/hooks/useIsMobile";

const values = [
    { icon: <Target size={22} />, title: "Results-Driven", desc: "We measure success by the impact on your operations — hours saved, leads converted, revenue grown." },
    { icon: <Shield size={22} />, title: "Reliability", desc: "Systems that work 24/7 without breaking. We build for stability, not just speed." },
    { icon: <Lightbulb size={22} />, title: "Innovation", desc: "We stay ahead of the curve with the latest in AI, automation, and real estate technology." },
    { icon: <Users size={22} />, title: "Partnership", desc: "We don't just deliver and leave. We partner with your team for ongoing optimization and growth." },
    { icon: <Zap size={22} />, title: "Simplicity", desc: "Complex problems, simple solutions. We design systems your team will actually use." },
    { icon: <Eye size={22} />, title: "Transparency", desc: "Clear communication, honest timelines, and full visibility into every step of the process." },
];

export default function AboutPage() {
    const isMobile = useIsMobile();

    return (
        <main style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text)", overflowX: "hidden" }}>
            <Navbar />

            {/* Hero */}
            <section style={{ padding: "8rem 0 4rem", position: "relative" }}>
                <div className="mesh-bg" />
                <div className="container-wide" style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 680 }}>
                    <span className="section-eyebrow">About Us</span>
                    <h1 className="font-display" style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)", fontWeight: 700, letterSpacing: "-0.04em", color: "var(--text)", lineHeight: 1.08, marginBottom: 16 }}>
                        Building the <span className="gradient-text">Operating System</span> for Real Estate
                    </h1>
                    <p style={{ fontSize: "1rem", color: "var(--text-subtle)", lineHeight: 1.75, maxWidth: 560, margin: "0 auto" }}>
                        We&apos;re a team of system architects, automation engineers, and AI specialists obsessed with making real estate operations run effortlessly.
                    </p>
                </div>
            </section>

            {/* Mission & Vision */}
            <section style={{ padding: "4rem 0" }}>
                <div className="container-wide">
                    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: 20 }}>
                        <motion.div className="glass-card" style={{ padding: "2.5rem 2rem" }}
                            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                            <div style={{ width: 48, height: 48, borderRadius: 14, background: "var(--tag-bg)", border: "1px solid var(--tag-border)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent)", marginBottom: 16 }}>
                                <Target size={24} />
                            </div>
                            <h2 className="font-display" style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text)", marginBottom: 12 }}>Our Mission</h2>
                            <p style={{ fontSize: "0.95rem", color: "var(--text-subtle)", lineHeight: 1.8 }}>
                                To empower every real estate team with intelligent systems and automation — so they can stop chasing tasks and start closing deals. We believe no lead should be lost to a broken process.
                            </p>
                        </motion.div>

                        <motion.div className="glass-card" style={{ padding: "2.5rem 2rem" }}
                            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
                            <div style={{ width: 48, height: 48, borderRadius: 14, background: "var(--tag-bg)", border: "1px solid var(--tag-border)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent)", marginBottom: 16 }}>
                                <Eye size={24} />
                            </div>
                            <h2 className="font-display" style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text)", marginBottom: 12 }}>Our Vision</h2>
                            <p style={{ fontSize: "0.95rem", color: "var(--text-subtle)", lineHeight: 1.8 }}>
                                A world where every real estate operation runs like a well-oiled machine — automated, intelligent, and scalable. Where technology handles the repetitive work and humans focus on what they do best: building relationships and closing deals.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Story */}
            <section style={{ padding: "4rem 0" }}>
                <div className="container-wide" style={{ maxWidth: 720 }}>
                    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                        <span className="section-eyebrow">Our Story</span>
                        <h2 className="font-display" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.25rem)", fontWeight: 700, letterSpacing: "-0.03em", color: "var(--text)", lineHeight: 1.1, marginBottom: 20 }}>
                            Born From <span className="gradient-text">Real Problems</span>
                        </h2>
                        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                            <p style={{ fontSize: "0.95rem", color: "var(--text-subtle)", lineHeight: 1.8 }}>
                                We started Autometa after seeing the same problem across dozens of real estate teams: talented agents losing deals not because of skill, but because of broken systems. Leads slipping through cracks. Follow-ups forgotten. Hours wasted on manual data entry.
                            </p>
                            <p style={{ fontSize: "0.95rem", color: "var(--text-subtle)", lineHeight: 1.8 }}>
                                We knew there was a better way. By combining deep real estate industry knowledge with cutting-edge automation and AI, we&apos;ve built systems that actually work — systems that capture every lead, automate every follow-up, and give teams full visibility into their pipeline.
                            </p>
                            <p style={{ fontSize: "0.95rem", color: "var(--text-subtle)", lineHeight: 1.8 }}>
                                Today, we work with brokerages, property management companies, and real estate developers across the industry — helping them turn chaotic operations into scalable, automated systems.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Team Expertise */}
            <section style={{ padding: "4rem 0" }}>
                <div className="container-wide">
                    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ textAlign: "center", marginBottom: "2.5rem" }}>
                        <span className="section-eyebrow">Expertise</span>
                        <h2 className="font-display" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.25rem)", fontWeight: 700, letterSpacing: "-0.03em", color: "var(--text)", lineHeight: 1.1 }}>
                            What We <span className="gradient-text">Bring</span>
                        </h2>
                    </motion.div>
                    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 16 }}>
                        {[
                            { title: "System Architecture", desc: "Deep expertise in designing end-to-end operational systems for real estate businesses of all sizes." },
                            { title: "AI & Automation", desc: "Specialists in AI integrations, workflow automation, and intelligent lead management systems." },
                            { title: "Real Estate Domain", desc: "We understand the industry — from lead generation and CRM workflows to compliance and closing processes." },
                        ].map((item, i) => (
                            <motion.div key={item.title} className="glass-card" style={{ padding: "2rem 1.5rem" }}
                                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                                <div style={{ fontSize: "2rem", marginBottom: 12 }}>{["🏗️", "🤖", "🏠"][i]}</div>
                                <h3 className="font-display" style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--text)", marginBottom: 8 }}>{item.title}</h3>
                                <p style={{ fontSize: "0.85rem", color: "var(--text-subtle)", lineHeight: 1.7 }}>{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section style={{ padding: "4rem 0" }}>
                <div className="container-wide">
                    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ textAlign: "center", marginBottom: "2.5rem" }}>
                        <span className="section-eyebrow">Values</span>
                        <h2 className="font-display" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.25rem)", fontWeight: 700, letterSpacing: "-0.03em", color: "var(--text)", lineHeight: 1.1 }}>
                            What We <span className="gradient-text">Stand For</span>
                        </h2>
                    </motion.div>
                    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 12 }}>
                        {values.map((v, i) => (
                            <motion.div key={v.title} className="glass-card" style={{ padding: "1.5rem" }}
                                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }}>
                                <div style={{ width: 40, height: 40, borderRadius: 12, background: "var(--tag-bg)", border: "1px solid var(--tag-border)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent)", marginBottom: 12 }}>
                                    {v.icon}
                                </div>
                                <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>{v.title}</h3>
                                <p style={{ fontSize: "0.85rem", color: "var(--text-subtle)", lineHeight: 1.7 }}>{v.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section style={{ padding: "4rem 0 6rem" }}>
                <div className="container-wide" style={{ textAlign: "center" }}>
                    <div className="glass-card" style={{ padding: isMobile ? "2.5rem 1.5rem" : "3.5rem 3rem", maxWidth: 640, margin: "0 auto" }}>
                        <h2 className="font-display" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, color: "var(--text)", marginBottom: 12, letterSpacing: "-0.03em" }}>
                            Let&apos;s Build Your <span className="gradient-text">System</span>
                        </h2>
                        <p style={{ fontSize: "0.95rem", color: "var(--text-subtle)", lineHeight: 1.7, marginBottom: 24 }}>
                            Ready to transform your operations? Let&apos;s talk.
                        </p>
                        <a href="/contact" className="btn-primary">Book Audit <ArrowRight size={14} /></a>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
