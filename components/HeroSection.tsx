"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function HeroSection() {
    const headingRef = useRef<HTMLHeadingElement>(null);
    const subRef = useRef<HTMLParagraphElement>(null);
    const btnPrimaryRef = useRef<HTMLAnchorElement>(null);
    const btnSecondaryRef = useRef<HTMLAnchorElement>(null);
    const isMobile = useIsMobile();

    const stats = [
        { val: 200, suffix: "+", label: "Automations Deployed" },
        { val: 98, suffix: "%", label: "Client Retention" },
        { val: 10, suffix: "×", label: "Efficiency Gain" },
        { val: 50, suffix: "+", label: "Enterprise Clients" },
    ];

    // GSAP split-text — desktop only
    useEffect(() => {
        if (isMobile) return;
        const el = headingRef.current;
        if (!el) return;

        const html = el.innerHTML;
        const parts = html.split(/(<br\s*\/?>)/gi);
        el.innerHTML = "";

        parts.forEach((part) => {
            if (part.match(/<br\s*\/?>/i)) { el.appendChild(document.createElement("br")); return; }
            const words = part.trim().split(/\s+/).filter(Boolean);
            words.forEach((word, wi) => {
                const wrapper = document.createElement("span");
                wrapper.style.display = "inline-block";
                wrapper.style.overflow = "hidden";
                wrapper.style.verticalAlign = "top";
                const inner = document.createElement("span");
                inner.textContent = word;
                inner.style.display = "inline-block";
                inner.style.transform = "translateY(115%)";
                inner.style.opacity = "0";
                inner.className = "hero-word";
                wrapper.appendChild(inner);
                el.appendChild(wrapper);
                if (wi < words.length - 1) el.appendChild(document.createTextNode("\u00A0"));
            });
        });

        const wordEls = el.querySelectorAll(".hero-word");
        gsap.to(wordEls, { y: 0, opacity: 1, duration: 0.9, stagger: 0.07, delay: 0.3, ease: "power3.out" });
    }, [isMobile]);

    // Sub-text fade — desktop only
    useEffect(() => {
        if (isMobile || !subRef.current) return;
        gsap.fromTo(subRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.9, ease: "power2.out" });
    }, [isMobile]);

    // Magnetic buttons — desktop only
    useEffect(() => {
        if (isMobile) return;
        const btns = [btnPrimaryRef.current, btnSecondaryRef.current].filter(Boolean) as HTMLElement[];
        const handlers: Array<{ el: HTMLElement; move: (e: MouseEvent) => void; leave: () => void }> = [];
        btns.forEach((el) => {
            const move = (e: MouseEvent) => {
                const rect = el.getBoundingClientRect();
                gsap.to(el, { x: (e.clientX - rect.left - rect.width / 2) * 0.25, y: (e.clientY - rect.top - rect.height / 2) * 0.25, duration: 0.3, ease: "power2.out" });
            };
            const leave = () => { gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" }); };
            el.addEventListener("mousemove", move);
            el.addEventListener("mouseleave", leave);
            handlers.push({ el, move, leave });
        });
        return () => { handlers.forEach(({ el, move, leave }) => { el.removeEventListener("mousemove", move); el.removeEventListener("mouseleave", leave); }); };
    }, [isMobile]);

    return (
        <section id="hero" style={{
            position: "relative", minHeight: "100vh",
            display: "flex", alignItems: "center",
            background: "transparent", overflow: "hidden",
        }}>
            <div className="container-wide" style={{ position: "relative", zIndex: 1, paddingTop: 80, paddingBottom: 80 }}>
                <div style={{ maxWidth: 760 }}>
                    {/* Eyebrow */}
                    <motion.div
                        initial={isMobile ? undefined : { opacity: 0, x: -20 }}
                        animate={isMobile ? undefined : { opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        style={{
                            display: "inline-flex", alignItems: "center", gap: 8,
                            marginBottom: 28, border: "1px solid var(--border)",
                            borderRadius: 4, padding: "4px 14px",
                            background: "var(--surface)", backdropFilter: "blur(4px)",
                        }}
                    >
                        <div className="pulse-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)" }} />
                        <span style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)" }}>
                            AI Automation & Robotics Agency
                        </span>
                    </motion.div>

                    <h1 ref={headingRef} style={{
                        fontSize: "clamp(2.25rem, 6vw, 4.5rem)",
                        fontWeight: 800, lineHeight: 1.05,
                        letterSpacing: "-0.035em", color: "var(--text)",
                        marginBottom: 24,
                    }}>
                        Engineering<br />Intelligent Automation
                    </h1>

                    <p ref={subRef} style={{
                        fontSize: "1.125rem", color: "var(--text-subtle)", lineHeight: 1.75,
                        maxWidth: 520, marginBottom: 40,
                        opacity: isMobile ? 1 : 0,
                    }}>
                        We design and deploy AI-powered automation systems, robotic workflows,
                        and enterprise-grade RPA that transform how organizations operate at scale.
                    </p>

                    <motion.div
                        initial={isMobile ? undefined : { opacity: 0, y: 16 }}
                        animate={isMobile ? undefined : { opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.1 }}
                        style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 56 }}
                    >
                        <a ref={isMobile ? undefined : btnPrimaryRef} href="#contact" className="btn-primary magnetic-btn">
                            Book a Strategy Call <ArrowRight size={14} />
                        </a>
                        <a ref={isMobile ? undefined : btnSecondaryRef} href="#services" className="btn-secondary magnetic-btn">
                            Explore Solutions <ChevronRight size={14} />
                        </a>
                    </motion.div>

                    {/* Stats */}
                    <div style={{
                        borderTop: "1px solid var(--border-subtle)",
                        paddingTop: 28,
                        display: "grid",
                        gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : `repeat(${stats.length}, auto)`,
                        gap: isMobile ? "1.5rem" : "0",
                    }}>
                        {stats.map((s, i) => (
                            <CounterStat key={s.label} {...s} delay={isMobile ? 0 : 1.4 + i * 0.15} index={i} total={stats.length} isMobile={isMobile} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function CounterStat({ val, suffix, label, delay, index, total, isMobile }: {
    val: number; suffix: string; label: string; delay: number; index: number; total: number; isMobile: boolean;
}) {
    const [count, setCount] = useState(isMobile ? val : 0);

    useEffect(() => {
        if (isMobile) { setCount(val); return; }
        const timer = setTimeout(() => {
            const steps = 40;
            const increment = val / steps;
            let current = 0;
            const interval = setInterval(() => {
                current += increment;
                if (current >= val) { setCount(val); clearInterval(interval); }
                else setCount(Math.round(current));
            }, 1200 / steps);
            return () => clearInterval(interval);
        }, delay * 1000);
        return () => clearTimeout(timer);
    }, [val, delay, isMobile]);

    return (
        <motion.div
            initial={isMobile ? undefined : { opacity: 0, y: 10 }}
            animate={isMobile ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            style={{
                paddingRight: isMobile ? 0 : "2.5rem",
                paddingTop: "0.25rem",
                borderRight: !isMobile && index < total - 1 ? "1px solid var(--border-subtle)" : "none",
                marginRight: !isMobile && index < total - 1 ? "2.5rem" : "0",
            }}
        >
            <div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--stat-val)", letterSpacing: "-0.03em", lineHeight: 1 }}>
                {count}{suffix}
            </div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-faint)", marginTop: 5, fontWeight: 500 }}>{label}</div>
        </motion.div>
    );
}
