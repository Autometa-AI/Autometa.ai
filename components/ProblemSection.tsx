"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    Clock,
    Database,
    MessageSquareOff,
    EyeOff,
    Cog,
    TrendingDown,
} from "lucide-react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

gsap.registerPlugin(ScrollTrigger);

type Pain = {
    num: string;
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    desc: string;
    stat: string;
    statLabel: string;
    accent: string;
};

const painPoints: Pain[] = [
    {
        num: "01",
        icon: <Clock size={24} />,
        title: "Slow response, lost deals",
        subtitle: "The 5-minute rule is broken",
        desc: "Leads that aren't contacted in the first 5 minutes are 21x less likely to convert. Most teams respond in hours — competitors close those deals instead.",
        stat: "72%",
        statLabel: "of leads go unresponded within 1 hour",
        accent: "#0066FF",
    },
    {
        num: "02",
        icon: <Database size={24} />,
        title: "Leads scattered everywhere",
        subtitle: "WhatsApp, calls, spreadsheets, DMs",
        desc: "Without a centralized pipeline, leads fall through cracks. Agents waste hours reconciling contacts. Hot prospects go cold.",
        stat: "$12K+",
        statLabel: "deal value lost every month per agent",
        accent: "#00CFFF",
    },
    {
        num: "03",
        icon: <MessageSquareOff size={24} />,
        title: "Missed follow-ups",
        subtitle: "Manual work can't scale",
        desc: "Your team forgets to follow up. Leads that needed 7 touches only got 2. Revenue leaks quietly — you only notice at quarter end.",
        stat: "48%",
        statLabel: "of salespeople never follow up after first contact",
        accent: "#66F2FF",
    },
    {
        num: "04",
        icon: <EyeOff size={24} />,
        title: "Zero visibility on agents",
        subtitle: "You can't improve what you can't see",
        desc: "Who's calling? Who's closing? Without tracking, top performers go unrecognized and bottom performers drag the pipeline down.",
        stat: "3 in 5",
        statLabel: "agency owners can't track agent performance",
        accent: "#C0C0C0",
    },
    {
        num: "05",
        icon: <Cog size={24} />,
        title: "Manual work eats the day",
        subtitle: "Your team is a human API",
        desc: "Agents spend 60% of their day on admin: copying data, scheduling, same emails, same docs. That's 60% of payroll burned on bot-worthy work.",
        stat: "10+ hrs",
        statLabel: "per week wasted on repetitive tasks",
        accent: "#E6E6E6",
    },
];

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];
const vp = { once: true, amount: 0.15 as const };

export default function ProblemSection() {
    const isMobile = useIsMobile();
    const sectionRef = useRef<HTMLElement>(null);
    const pinnedRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const counterRef = useRef<HTMLSpanElement>(null);

    useLayoutEffect(() => {
        if (isMobile) return;

        const ctx = gsap.context(() => {
            const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
            const numCards = cards.length;

            // Set up 3D perspective on each card for page-flip effect
            cards.forEach((card) => {
                gsap.set(card, { transformStyle: "preserve-3d", transformOrigin: "left center" });
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    pin: pinnedRef.current,
                    start: "top top",
                    end: `+=${numCards * 100}vh`,
                    scrub: 0.6,
                    anticipatePin: 1,
                },
            });

            cards.forEach((card, i) => {
                const counterEl = counterRef.current;

                // Enter: page flips in (rotateY 90 → 0, like opening a book page)
                tl.fromTo(
                    card,
                    { opacity: 0, rotateY: 90 },
                    { opacity: 1, rotateY: 0, duration: 0.3, ease: "power2.out" },
                    i * 1
                );

                // Update counter
                if (counterEl) {
                    tl.to(counterEl, {
                        textContent: String(i + 1).padStart(2, "0"),
                        duration: 0.01,
                        snap: { textContent: 1 },
                    }, i * 1 + 0.01);
                }

                // Hold: stay visible for reading
                tl.to(card, { duration: 0.45 }, i * 1 + 0.3);

                // Exit: page flips out (rotateY 0 → -90, like turning the page)
                if (i < numCards - 1) {
                    tl.to(
                        card,
                        { opacity: 0, rotateY: -90, duration: 0.25, ease: "power2.in" },
                        i * 1 + 0.75
                    );
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [isMobile]);

    // Mobile: simple stacked layout with whileInView
    if (isMobile) {
        return (
            <section id="problem" style={{ padding: "5rem 0", position: "relative", background: "var(--bg)" }}>
                <div className="container-wide" style={{ marginBottom: "2.5rem" }}>
                    <div style={{ maxWidth: 780 }}>
                        <motion.span className="section-eyebrow"
                            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp}
                            transition={{ duration: 0.6, ease }}>
                            The Problem
                        </motion.span>
                        <motion.h2 className="font-display"
                            style={{ fontSize: "clamp(2.2rem, 4.4vw, 3.5rem)", fontWeight: 700, letterSpacing: "-0.035em", color: "var(--text)", lineHeight: 1.08, marginBottom: 16 }}
                            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp}
                            transition={{ duration: 0.7, delay: 0.1, ease }}>
                            Problems That Cost a <span className="gradient-text">Huge Price</span>...
                        </motion.h2>
                    </div>
                </div>
                <div className="container-wide">
                    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                        {painPoints.map((p) => (
                            <motion.div key={p.num} className="glass-card"
                                style={{ padding: "1.75rem", border: "1px solid var(--card-border)" }}
                                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.7, ease }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                                    <div style={{ width: 44, height: 44, borderRadius: 12, background: `${p.accent}1a`, border: `1px solid ${p.accent}40`, display: "flex", alignItems: "center", justifyContent: "center", color: p.accent }}>
                                        {p.icon}
                                    </div>
                                    <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-faint)", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.08em" }}>
                                        PROBLEM / {p.num}
                                    </span>
                                </div>
                                <h3 className="font-display" style={{ fontSize: "1.6rem", fontWeight: 700, color: "var(--text)", letterSpacing: "-0.025em", lineHeight: 1.1, marginBottom: 8 }}>
                                    {p.title}
                                </h3>
                                <p style={{ fontSize: "0.95rem", color: p.accent, fontWeight: 600, marginBottom: 12 }}>{p.subtitle}</p>
                                <p style={{ fontSize: "1rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 18 }}>{p.desc}</p>
                                <div style={{ padding: "0.85rem 1rem", background: "rgba(0,0,0,0.35)", borderRadius: 12, border: `1px solid ${p.accent}33`, display: "flex", alignItems: "center", gap: 12 }}>
                                    <TrendingDown size={18} style={{ color: p.accent, flexShrink: 0 }} />
                                    <div>
                                        <div className="font-display" style={{ fontSize: "1.6rem", fontWeight: 800, color: p.accent, lineHeight: 1 }}>{p.stat}</div>
                                        <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{p.statLabel}</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    // Desktop: pinned scroll-driven sequential cards
    return (
        <section
            id="problem"
            ref={sectionRef}
            style={{ position: "relative", background: "var(--bg)" }}
        >
            <div ref={pinnedRef} style={{ minHeight: "100vh", display: "flex", flexDirection: "column", overflow: "hidden" }}>
                {/* Header — always visible at top */}
                <div className="container-wide" style={{ paddingTop: "5rem", paddingBottom: "1.5rem", flexShrink: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 28 }}>
                        <div style={{ maxWidth: 660 }}>
                            <span className="section-eyebrow">The Problem</span>
                            <h2
                                className="font-display"
                                style={{
                                    fontSize: "clamp(2.2rem, 4.4vw, 3.5rem)",
                                    fontWeight: 700,
                                    letterSpacing: "-0.035em",
                                    color: "var(--text)",
                                    lineHeight: 1.08,
                                    marginBottom: 12,
                                }}
                            >
                                Problems That Cost Real Estate Companies a{" "}
                                <span className="gradient-text">Huge Price</span>...
                            </h2>
                            <p style={{ fontSize: "1.1rem", color: "var(--text-muted)", lineHeight: 1.6, maxWidth: 540 }}>
                                Broken systems aren&apos;t just frustrating — they&apos;re quietly draining revenue every day.
                            </p>
                        </div>
                        {/* Counter */}
                        <div style={{ flexShrink: 0, textAlign: "right" }}>
                            <div className="font-display" style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                                <span
                                    ref={counterRef}
                                    style={{
                                        fontSize: "4.5rem",
                                        fontWeight: 800,
                                        color: "var(--accent)",
                                        lineHeight: 1,
                                        letterSpacing: "-0.04em",
                                    }}
                                >
                                    01
                                </span>
                                <span style={{ fontSize: "1.4rem", fontWeight: 600, color: "var(--text-faint)" }}>
                                    / {String(painPoints.length).padStart(2, "0")}
                                </span>
                            </div>
                            <div style={{
                                fontSize: "0.7rem", fontWeight: 700, color: "var(--text-faint)",
                                fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.08em",
                                textTransform: "uppercase", marginTop: 4,
                            }}>
                                Scroll to explore
                            </div>
                        </div>
                    </div>
                </div>

                {/* Card Stage — centered area where cards animate in/out */}
                <div
                    className="container-wide"
                    style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                        paddingBottom: "3rem",
                    }}
                >
                    <div style={{ position: "relative", width: "100%", maxWidth: 1000, perspective: 1200 }}>
                        {painPoints.map((p, i) => (
                            <div
                                key={p.num}
                                ref={(el) => { cardsRef.current[i] = el; }}
                                style={{
                                    position: i === 0 ? "relative" : "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    opacity: i === 0 ? 1 : 0,
                                }}
                            >
                                <div
                                    className="glass-card"
                                    style={{
                                        padding: 0,
                                        overflow: "hidden",
                                        background: `linear-gradient(135deg, ${p.accent}18 0%, ${p.accent}02 100%), var(--card-bg)`,
                                        border: "1px solid var(--card-border)",
                                    }}
                                >
                                    <div style={{ display: "grid", gridTemplateColumns: "1.15fr 0.85fr", minHeight: 340 }}>
                                        {/* Text Side */}
                                        <div style={{ padding: "2.5rem 2.75rem", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 20 }}>
                                            <div>
                                                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
                                                    <div style={{
                                                        width: 48, height: 48, borderRadius: 14,
                                                        background: `${p.accent}1a`, border: `1px solid ${p.accent}40`,
                                                        display: "flex", alignItems: "center", justifyContent: "center",
                                                        color: p.accent,
                                                    }}>
                                                        {p.icon}
                                                    </div>
                                                    <span style={{
                                                        fontSize: "0.78rem", fontWeight: 700, color: "var(--text-faint)",
                                                        letterSpacing: "0.08em", fontFamily: "'JetBrains Mono', monospace",
                                                    }}>
                                                        PROBLEM / {p.num}
                                                    </span>
                                                </div>
                                                <h3 className="font-display" style={{
                                                    fontSize: "clamp(1.95rem, 2.8vw, 2.5rem)",
                                                    fontWeight: 700, color: "var(--text)",
                                                    letterSpacing: "-0.025em", lineHeight: 1.1, marginBottom: 10,
                                                }}>
                                                    {p.title}
                                                </h3>
                                                <p style={{ fontSize: "1.05rem", color: p.accent, fontWeight: 600, marginBottom: 14, letterSpacing: "-0.005em" }}>
                                                    {p.subtitle}
                                                </p>
                                                <p style={{ fontSize: "1.08rem", color: "var(--text-secondary)", lineHeight: 1.65, maxWidth: 480 }}>
                                                    {p.desc}
                                                </p>
                                            </div>

                                            {/* Stat */}
                                            <div style={{
                                                padding: "1rem 1.2rem", background: "rgba(0,0,0,0.35)",
                                                borderRadius: 14, border: `1px solid ${p.accent}33`,
                                                display: "flex", alignItems: "center", gap: 16,
                                            }}>
                                                <TrendingDown size={22} style={{ color: p.accent, flexShrink: 0 }} />
                                                <div>
                                                    <div className="font-display" style={{
                                                        fontSize: "2rem", fontWeight: 800, color: p.accent,
                                                        lineHeight: 1, letterSpacing: "-0.03em", marginBottom: 4,
                                                    }}>
                                                        {p.stat}
                                                    </div>
                                                    <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.4 }}>
                                                        {p.statLabel}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Visual Side */}
                                        <div style={{
                                            position: "relative",
                                            background: `radial-gradient(circle at 30% 30%, ${p.accent}22 0%, transparent 60%), var(--surface-solid)`,
                                            borderLeft: "1px solid var(--border)",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            overflow: "hidden",
                                        }}>
                                            <div style={{
                                                position: "absolute", inset: 0,
                                                backgroundImage: `radial-gradient(circle, ${p.accent}15 1px, transparent 1px)`,
                                                backgroundSize: "22px 22px", opacity: 0.5,
                                            }} />
                                            <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
                                                <div style={{
                                                    width: 120, height: 120, borderRadius: "50%",
                                                    background: `${p.accent}0f`, border: `1px dashed ${p.accent}55`,
                                                    display: "flex", alignItems: "center", justifyContent: "center",
                                                    margin: "0 auto 14px", color: p.accent,
                                                }}>
                                                    <div style={{ transform: "scale(2.4)" }}>{p.icon}</div>
                                                </div>
                                                <div style={{
                                                    fontSize: "0.72rem", fontWeight: 700, color: "var(--text-faint)",
                                                    textTransform: "uppercase", letterSpacing: "0.12em",
                                                    fontFamily: "'JetBrains Mono', monospace",
                                                }}>
                                                    {p.num} / 05 · Real Estate Pain
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Scroll progress dots */}
                <div style={{
                    position: "absolute", right: "2rem", top: "50%", transform: "translateY(-50%)",
                    display: "flex", flexDirection: "column", gap: 10, zIndex: 10,
                }}>
                    {painPoints.map((_, i) => (
                        <div
                            key={i}
                            className="problem-dot"
                            data-index={i}
                            style={{
                                width: 8, height: 8, borderRadius: "50%",
                                background: i === 0 ? "var(--accent)" : "var(--text-faint)",
                                opacity: i === 0 ? 1 : 0.3,
                                transition: "all 0.3s ease",
                            }}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
