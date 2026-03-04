"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsMobile } from "@/hooks/useIsMobile";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
    const headingRef = useRef<HTMLHeadingElement>(null);
    const isMobile = useIsMobile();

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
                inner.style.transform = "translateY(110%)";
                inner.style.opacity = "0";
                inner.className = "cta-word";
                wrapper.appendChild(inner);
                el.appendChild(wrapper);
                if (wi < words.length - 1) el.appendChild(document.createTextNode("\u00A0"));
            });
        });

        const wordEls = el.querySelectorAll(".cta-word");
        ScrollTrigger.create({
            trigger: el, start: "top 80%", once: true,
            onEnter: () => { gsap.to(wordEls, { y: 0, opacity: 1, duration: 0.8, stagger: 0.06, ease: "power3.out" }); },
        });

        return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    }, [isMobile]);

    return (
        <section id="contact" style={{
            background: "var(--surface)", padding: "6rem 0",
            borderTop: "1px solid var(--border-subtle)", position: "relative", overflow: "hidden",
        }}>
            {!isMobile && (
                <>
                    <div className="blob-a" style={{
                        position: "absolute", top: "10%", right: "15%", width: 300, height: 300, borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)", pointerEvents: "none"
                    }} />
                    <div className="blob-b" style={{
                        position: "absolute", bottom: "5%", left: "10%", width: 250, height: 250, borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(124,58,237,0.05) 0%, transparent 70%)", pointerEvents: "none"
                    }} />
                </>
            )}

            <div className="container-wide">
                <div style={{ maxWidth: 640, position: "relative", zIndex: 1 }}>
                    <span className="section-eyebrow">Get Started</span>
                    <h2 ref={headingRef} style={{
                        fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
                        fontWeight: 800, letterSpacing: "-0.035em",
                        color: "var(--text)", lineHeight: 1.05, marginBottom: "1.25rem",
                    }}>
                        Build Intelligent<br />Systems That Scale.
                    </h2>
                    <p style={{ fontSize: "1.0625rem", color: "var(--text-subtle)", lineHeight: 1.75, marginBottom: "2rem", maxWidth: 520 }}>
                        Book a 30-minute strategy call. We&apos;ll audit your processes and identify your highest-ROI automation opportunities — no commitment needed.
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: "2.5rem" }}>
                        <motion.a href="mailto:hello@autometa.ai" className="btn-primary cta-glow-btn"
                            whileHover={isMobile ? undefined : { scale: 1.04, y: -2 }} whileTap={isMobile ? undefined : { scale: 0.97 }}>
                            Book a Strategy Call <ArrowRight size={14} />
                        </motion.a>
                        <motion.a href="mailto:hello@autometa.ai" className="btn-secondary"
                            whileHover={isMobile ? undefined : { scale: 1.03 }} whileTap={isMobile ? undefined : { scale: 0.97 }}>
                            Get Free Process Audit
                        </motion.a>
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "1.25rem" }}>
                        {["Free 48-hour audit", "4-hour response time", "No obligation", "NDA on request"].map(t => (
                            <span key={t} style={{ fontSize: "0.75rem", color: "var(--text-faint)", fontWeight: 500 }}>✓ {t}</span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
