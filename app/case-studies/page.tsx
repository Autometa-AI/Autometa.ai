"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Clock, Users, BarChart3 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useIsMobile } from "@/hooks/useIsMobile";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const snapMetrics = [
    { value: "10+", label: "Hours Saved / Week", icon: <Clock size={18} /> },
    { value: "3x", label: "Lead Conversion Lift", icon: <TrendingUp size={18} /> },
    { value: "100%", label: "Pipeline Visibility", icon: <BarChart3 size={18} /> },
    { value: "50+", label: "Teams Served", icon: <Users size={18} /> },
];

const caseStudies = [
    {
        client: "Metro Realty Group",
        industry: "Residential Brokerage",
        problem: "Leads were scattered across WhatsApp, email, and spreadsheets. Agents had no system to track follow-ups, and response times averaged 4+ hours.",
        discovery: "Audit revealed 40% of leads received no follow-up within 24 hours. No centralized CRM — agents used personal tools.",
        design: "Built a centralized lead management system with auto-routing, CRM integration, and AI-powered instant responses on WhatsApp.",
        execution: "Implemented in 2 weeks. Trained 25 agents. Automated follow-up sequences for the first 7 days of every lead.",
        results: [
            { metric: "Response Time", before: "4+ hours", after: "< 2 minutes" },
            { metric: "Follow-up Rate", before: "60%", after: "100%" },
            { metric: "Monthly Conversions", before: "12", after: "31" },
        ],
    },
    {
        client: "Pinnacle Property Management",
        industry: "Property Management",
        problem: "Maintenance requests were handled via phone calls and paper forms. No tracking, no SLA adherence, tenant complaints rising.",
        discovery: "Average resolution time was 5 days. 30% of requests were lost or duplicated. No performance visibility for management.",
        design: "Created automated intake system with tenant portal, auto-assignment to vendors, SLA tracking, and management dashboards.",
        execution: "Rolled out across 3 properties (200+ units). Integrated with existing accounting software. Set up real-time KPI dashboards.",
        results: [
            { metric: "Resolution Time", before: "5 days", after: "1.5 days" },
            { metric: "Requests Lost", before: "30%", after: "0%" },
            { metric: "Tenant Satisfaction", before: "3.2/5", after: "4.7/5" },
        ],
    },
    {
        client: "Horizon Developments",
        industry: "Real Estate Development",
        problem: "Sales team managing 3 active projects with no unified pipeline. Manual reporting took 8+ hours per week.",
        discovery: "Each project used different tools. No consolidated view of inventory, leads, or sales progress. Management flying blind.",
        design: "Unified CRM across all projects with custom dashboards, automated inventory tracking, and weekly auto-generated reports.",
        execution: "Migrated all project data into one system. Built custom inventory management tool. Automated all reporting workflows.",
        results: [
            { metric: "Reporting Time", before: "8 hrs/week", after: "Automated" },
            { metric: "Sales Cycle", before: "45 days", after: "28 days" },
            { metric: "Pipeline Accuracy", before: "~60%", after: "99%" },
        ],
    },
];

export default function CaseStudiesPage() {
    const cardsRef = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();

    useEffect(() => {
        if (!cardsRef.current) return;
        const cards = cardsRef.current.querySelectorAll(".case-card");
        gsap.set(cards, { opacity: 0, y: 30 });
        ScrollTrigger.batch(cards, {
            onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out", overwrite: true }),
            start: "top 90%",
        });
        return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    }, []);

    return (
        <main style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text)", overflowX: "hidden" }}>
            <Navbar />

            {/* Hero */}
            <section style={{ padding: "8rem 0 4rem", position: "relative" }}>
                <div className="mesh-bg" />
                <div className="container-wide" style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 680 }}>
                    <span className="section-eyebrow">Case Studies</span>
                    <h1 className="font-display" style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)", fontWeight: 700, letterSpacing: "-0.04em", color: "var(--text)", lineHeight: 1.08, marginBottom: 16 }}>
                        Real Results from <span className="gradient-text">Real Systems</span>
                    </h1>
                    <p style={{ fontSize: "1rem", color: "var(--text-subtle)", lineHeight: 1.75 }}>
                        See how we&apos;ve helped real estate teams fix broken workflows and dramatically improve performance.
                    </p>
                </div>
            </section>

            {/* Results Snapshot */}
            <section style={{ padding: "2rem 0 4rem" }}>
                <div className="container-wide">
                    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: 12 }}>
                        {snapMetrics.map(m => (
                            <div key={m.label} className="glass-card" style={{ padding: "1.5rem", textAlign: "center" }}>
                                <div style={{ color: "var(--accent)", marginBottom: 8, display: "flex", justifyContent: "center" }}>{m.icon}</div>
                                <div className="font-display gradient-text" style={{ fontSize: "1.75rem", fontWeight: 800, letterSpacing: "-0.03em" }}>{m.value}</div>
                                <div style={{ fontSize: "0.75rem", color: "var(--text-faint)", fontWeight: 500, marginTop: 4 }}>{m.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Case Studies */}
            <section style={{ padding: "2rem 0 4rem" }}>
                <div ref={cardsRef} className="container-wide" style={{ display: "flex", flexDirection: "column", gap: 32 }}>
                    {caseStudies.map((cs) => (
                        <div key={cs.client} className="case-card glass-card" style={{ padding: isMobile ? "1.5rem" : "2.5rem" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                                <span className="tag">{cs.industry}</span>
                            </div>
                            <h3 className="font-display" style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text)", marginBottom: 20, letterSpacing: "-0.02em" }}>{cs.client}</h3>

                            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: 16, marginBottom: 24 }}>
                                {[
                                    { label: "Problem", text: cs.problem, color: "#0066FF" },
                                    { label: "Discovery", text: cs.discovery, color: "#E6E6E6" },
                                    { label: "Design", text: cs.design, color: "#0066FF" },
                                    { label: "Execution", text: cs.execution, color: "#66F2FF" },
                                ].map(phase => (
                                    <div key={phase.label}>
                                        <div style={{ fontSize: "0.7rem", fontWeight: 700, color: phase.color, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6, fontFamily: "'JetBrains Mono', monospace" }}>
                                            {phase.label}
                                        </div>
                                        <p style={{ fontSize: "0.85rem", color: "var(--text-subtle)", lineHeight: 1.7 }}>{phase.text}</p>
                                    </div>
                                ))}
                            </div>

                            <div style={{ borderTop: "1px solid var(--border)", paddingTop: 16 }}>
                                <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12, fontFamily: "'JetBrains Mono', monospace" }}>Results</div>
                                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 12 }}>
                                    {cs.results.map(r => (
                                        <div key={r.metric} style={{ background: "var(--tag-bg)", borderRadius: 12, padding: "1rem", border: "1px solid var(--tag-border)" }}>
                                            <div style={{ fontSize: "0.7rem", fontWeight: 600, color: "var(--text-faint)", marginBottom: 6 }}>{r.metric}</div>
                                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                                <span style={{ fontSize: "0.8rem", color: "var(--text-faint)", textDecoration: "line-through" }}>{r.before}</span>
                                                <ArrowRight size={12} style={{ color: "var(--accent)" }} />
                                                <span className="gradient-text" style={{ fontSize: "1.125rem", fontWeight: 800 }}>{r.after}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Approach */}
            <section style={{ padding: "4rem 0" }}>
                <div className="container-wide" style={{ textAlign: "center", maxWidth: 640, margin: "0 auto" }}>
                    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                        <span className="section-eyebrow">Our Approach</span>
                        <h2 className="font-display" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 700, letterSpacing: "-0.03em", color: "var(--text)", lineHeight: 1.1, marginBottom: 12 }}>
                            We Focus on <span className="gradient-text">Systems</span>, Not Just Tools
                        </h2>
                        <p style={{ fontSize: "0.95rem", color: "var(--text-subtle)", lineHeight: 1.7, marginBottom: 28 }}>
                            Tools are commodities. What matters is how they connect, automate, and work together as a system. That&apos;s what we build.
                        </p>
                        <a href="/contact" className="btn-primary">Book Audit <ArrowRight size={14} /></a>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
