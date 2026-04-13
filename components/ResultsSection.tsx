"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Play, Quote } from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";

type Stat = {
    value: string;
    label: string;
    sub: string;
    accent: string;
};

const stats: Stat[] = [
    { value: "$8.2M+", label: "Pipeline Generated", sub: "Across all client systems", accent: "var(--accent)" },
    { value: "15%+", label: "Savings Every Year", sub: "Operational cost reduction", accent: "#66F2FF" },
    { value: "40+", label: "Agencies Served", sub: "Across UAE & GCC", accent: "#0066FF" },
    { value: "14", label: "Days to Launch", sub: "From kickoff to live system", accent: "#C0C0C0" },
];

type Testimonial = {
    name: string;
    role: string;
    company: string;
    quote: string;
    avatar: string;
    accent: string;
};

const testimonials: Testimonial[] = [
    {
        name: "Nick Barnard",
        role: "Managing Director",
        company: "Prime Properties Dubai",
        quote:
            "Autometa rebuilt our entire lead pipeline in 3 weeks. We went from missing half our inquiries to responding to every lead within 60 seconds. Our conversion rate doubled.",
        avatar: "NB",
        accent: "#00CFFF",
    },
    {
        name: "Fatima Khalifa",
        role: "Head of Sales",
        company: "Skyline Real Estate",
        quote:
            "The AI WhatsApp bot they built handles 80% of our first-touch conversations. My agents now only talk to qualified, ready-to-buy leads. Game changer for our team.",
        avatar: "FK",
        accent: "#0066FF",
    },
    {
        name: "Omar Hassan",
        role: "Founder",
        company: "Gulf Estates Group",
        quote:
            "We used to lose deals because our follow-ups were inconsistent. Autometa's automation system made sure every lead gets the right message at the right time. Pipeline is up 38%.",
        avatar: "OH",
        accent: "#66F2FF",
    },
];

export default function ResultsSection() {
    const isMobile = useIsMobile();
    const [tIndex, setTIndex] = useState(0);

    const nextT = useCallback(() => setTIndex((i) => (i + 1) % testimonials.length), []);
    const prevT = useCallback(() => setTIndex((i) => (i - 1 + testimonials.length) % testimonials.length), []);

    useEffect(() => {
        const t = setInterval(nextT, 6000);
        return () => clearInterval(t);
    }, [nextT]);

    const currT = testimonials[tIndex];

    return (
        <>
            {/* RESULTS */}
            <section id="results" style={{ padding: "6rem 0 5rem", position: "relative" }}>
                <div className="container-wide">
                    <div style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 3.5rem" }}>
                        <span className="section-eyebrow" style={{ justifyContent: "center" }}>The Numbers</span>
                        <h2
                            className="font-display"
                            style={{
                                fontSize: "clamp(2.4rem, 4.6vw, 3.5rem)",
                                fontWeight: 700,
                                letterSpacing: "-0.035em",
                                color: "var(--text)",
                                lineHeight: 1.08,
                            }}
                        >
                            Results That <span className="gradient-text">Speak</span>
                        </h2>
                    </div>

                    {/* Bento Grid */}
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
                            gridTemplateRows: isMobile ? "auto" : "auto auto",
                            gap: 14,
                            maxWidth: 1080,
                            margin: "0 auto",
                        }}
                    >
                        {stats.map((s) => (
                            <div
                                key={s.label}
                                className="glass-card"
                                style={{
                                    padding: isMobile ? "1.75rem" : "2rem 2.25rem",
                                }}
                            >
                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: s.accent }} />
                                    <span style={{
                                        fontSize: "0.75rem", fontWeight: 700, color: "var(--text-faint)",
                                        textTransform: "uppercase", letterSpacing: "0.08em",
                                        fontFamily: "'JetBrains Mono', monospace",
                                    }}>
                                        {s.label}
                                    </span>
                                </div>
                                <div
                                    className="font-display"
                                    style={{
                                        fontSize: isMobile ? "3rem" : "clamp(3rem, 4.5vw, 3.8rem)",
                                        fontWeight: 800,
                                        letterSpacing: "-0.045em",
                                        color: "var(--text)",
                                        lineHeight: 1,
                                        marginBottom: 8,
                                    }}
                                >
                                    {s.value}
                                </div>
                                <div style={{ fontSize: "0.95rem", color: "var(--text-muted)" }}>{s.sub}</div>
                            </div>
                        ))}

                        {/* Video / Case Study tile */}
                        <div
                            className="glass-card"
                            style={{
                                padding: 0,
                                gridColumn: isMobile ? "span 1" : "span 2",
                                position: "relative",
                                overflow: "hidden",
                                minHeight: isMobile ? 200 : "auto",
                                background: "linear-gradient(135deg, rgba(0,207,255,0.12) 0%, rgba(0,0,0,0.5) 100%)",
                            }}
                        >
                            <div
                                style={{
                                    position: "absolute", inset: 0,
                                    backgroundImage:
                                        "radial-gradient(circle at 20% 30%, rgba(0,207,255,0.2) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(0,102,255,0.15) 0%, transparent 50%)",
                                }}
                            />
                            <div
                                style={{
                                    position: "relative", zIndex: 1,
                                    height: "100%", minHeight: 180,
                                    padding: isMobile ? "1.75rem" : "2rem 2.25rem",
                                    display: "flex", flexDirection: "column", justifyContent: "space-between",
                                    gap: 20,
                                }}
                            >
                                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                                    <button
                                        aria-label="Play case study"
                                        style={{
                                            width: 52, height: 52, borderRadius: "50%",
                                            background: "var(--accent)", border: "none", color: "#fff",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            cursor: "pointer", boxShadow: "0 8px 32px rgba(0,207,255,0.4)",
                                        }}
                                    >
                                        <Play size={20} fill="#fff" />
                                    </button>
                                    <div>
                                        <div style={{
                                            fontSize: "0.75rem", fontWeight: 700, color: "var(--accent)",
                                            textTransform: "uppercase", letterSpacing: "0.08em",
                                            fontFamily: "'JetBrains Mono', monospace",
                                        }}>
                                            Featured Case Study
                                        </div>
                                        <div style={{ fontSize: "0.95rem", color: "var(--text-muted)" }}>2:14 watch time</div>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-display" style={{
                                        fontSize: isMobile ? "1.45rem" : "1.85rem",
                                        fontWeight: 700, color: "var(--text)",
                                        letterSpacing: "-0.02em", marginBottom: 6, lineHeight: 1.15,
                                    }}>
                                        Prime Properties — Dubai Marina
                                    </h3>
                                    <div style={{ fontSize: "0.95rem", color: "var(--text-muted)" }}>
                                        72% reply rate · 2.3x conversion · 14 days to launch
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ textAlign: "center", marginTop: "3rem" }}>
                        <a href="/contact" className="btn-primary">
                            Book Strategy Call <ArrowRight size={15} />
                        </a>
                    </div>
                </div>
            </section>

            {/* TESTIMONIALS */}
            <section id="testimonials" style={{ padding: "4rem 0 6rem", position: "relative" }}>
                <div className="container-wide">
                    <div style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 3rem" }}>
                        <span className="section-eyebrow" style={{ justifyContent: "center" }}>Proven Results</span>
                        <h2
                            className="font-display"
                            style={{
                                fontSize: "clamp(2.4rem, 4.6vw, 3.5rem)",
                                fontWeight: 700,
                                letterSpacing: "-0.035em",
                                color: "var(--text)",
                                lineHeight: 1.08,
                            }}
                        >
                            What Our <span className="gradient-text">Clients Say</span>
                        </h2>
                    </div>

                    <div
                        className="glass-card"
                        style={{ maxWidth: 980, margin: "0 auto", padding: 0, overflow: "hidden" }}
                    >
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: isMobile ? "1fr" : "0.85fr 1.15fr",
                                minHeight: isMobile ? "auto" : 380,
                            }}
                        >
                            {/* Avatar side */}
                            <div
                                style={{
                                    position: "relative",
                                    background: `radial-gradient(circle at center, ${currT.accent}22 0%, transparent 60%), var(--surface-solid)`,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    padding: "2.5rem",
                                    borderRight: isMobile ? "none" : "1px solid var(--border)",
                                    borderBottom: isMobile ? "1px solid var(--border)" : "none",
                                    minHeight: isMobile ? 200 : "auto",
                                }}
                            >
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currT.name + "-avatar"}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.4 }}
                                        style={{
                                            width: isMobile ? 140 : 200,
                                            height: isMobile ? 140 : 200,
                                            borderRadius: 28,
                                            background: `linear-gradient(135deg, ${currT.accent}, ${currT.accent}80)`,
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            color: "#fff",
                                            fontSize: isMobile ? "3rem" : "4.5rem",
                                            fontWeight: 800,
                                            fontFamily: "'Space Grotesk', sans-serif",
                                            boxShadow: `0 20px 60px ${currT.accent}40`,
                                            letterSpacing: "-0.03em",
                                        }}
                                    >
                                        {currT.avatar}
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* Quote side */}
                            <div
                                style={{
                                    padding: isMobile ? "2rem 1.75rem" : "2.75rem 3rem",
                                    display: "flex", flexDirection: "column", justifyContent: "space-between",
                                    gap: 24,
                                }}
                            >
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currT.name + "-body"}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.35 }}
                                    >
                                        <Quote size={32} style={{ color: currT.accent, marginBottom: 18, opacity: 0.6 }} />
                                        <div style={{
                                            display: "inline-block", padding: "4px 10px",
                                            background: "var(--tag-bg)", border: "1px solid var(--tag-border)",
                                            borderRadius: 8,
                                            fontSize: "0.72rem", fontWeight: 700, color: "var(--tag-text)",
                                            letterSpacing: "0.08em", textTransform: "uppercase",
                                            fontFamily: "'JetBrains Mono', monospace", marginBottom: 14,
                                        }}>
                                            {currT.company}
                                        </div>
                                        <p style={{
                                            fontSize: isMobile ? "1.1rem" : "1.3rem",
                                            color: "var(--text)", lineHeight: 1.55,
                                            marginBottom: 20, fontWeight: 500, letterSpacing: "-0.005em",
                                        }}>
                                            &quot;{currT.quote}&quot;
                                        </p>
                                        <div>
                                            <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text)", letterSpacing: "-0.01em" }}>
                                                {currT.name}
                                            </div>
                                            <div style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
                                                {currT.role} · {currT.company}
                                            </div>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>

                                {/* Controls */}
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                    <div style={{ display: "flex", gap: 10 }}>
                                        <button
                                            onClick={prevT}
                                            aria-label="Previous"
                                            style={{
                                                width: 40, height: 40, borderRadius: "50%",
                                                background: "var(--surface-solid)", border: "1px solid var(--border)",
                                                color: "var(--text)", cursor: "pointer",
                                                display: "flex", alignItems: "center", justifyContent: "center",
                                            }}
                                        >
                                            <ArrowLeft size={16} />
                                        </button>
                                        <button
                                            onClick={nextT}
                                            aria-label="Next"
                                            style={{
                                                width: 40, height: 40, borderRadius: "50%",
                                                background: "var(--surface-solid)", border: "1px solid var(--border)",
                                                color: "var(--text)", cursor: "pointer",
                                                display: "flex", alignItems: "center", justifyContent: "center",
                                            }}
                                        >
                                            <ArrowRight size={16} />
                                        </button>
                                    </div>
                                    <div style={{
                                        fontSize: "0.78rem", color: "var(--text-faint)",
                                        fontFamily: "'JetBrains Mono', monospace",
                                    }}>
                                        {String(tIndex + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
