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
        const tokens = html.split(/(<br\s*\/?>|<span[^>]*>.*?<\/span>)/gi).filter(Boolean);
        el.innerHTML = "";

        tokens.forEach((token) => {
            if (token.match(/<br\s*\/?>/i)) {
                el.appendChild(document.createElement("br"));
                return;
            }
            const spanMatch = token.match(/^<span([^>]*)>(.*?)<\/span>$/i);
            if (spanMatch) {
                const attrs = spanMatch[1];
                const content = spanMatch[2].trim();
                const words = content.split(/\s+/).filter(Boolean);
                words.forEach((word, wi) => {
                    const wrapper = document.createElement("span");
                    wrapper.style.display = "inline-block";
                    wrapper.style.overflow = "hidden";
                    wrapper.style.verticalAlign = "top";
                    const inner = document.createElement("span");
                    const classMatch = attrs.match(/class="([^"]*)"/);
                    if (classMatch) inner.className = classMatch[1] + " cta-word";
                    else inner.className = "cta-word";
                    inner.textContent = word;
                    inner.style.display = "inline-block";
                    inner.style.transform = "translateY(110%)";
                    inner.style.opacity = "0";
                    wrapper.appendChild(inner);
                    el.appendChild(wrapper);
                    if (wi < words.length - 1) el.appendChild(document.createTextNode("\u00A0"));
                });
            } else {
                const words = token.trim().split(/\s+/).filter(Boolean);
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
            }
        });
        const wordEls = el.querySelectorAll(".cta-word");
        ScrollTrigger.create({
            trigger: el, start: "top 80%", once: true,
            onEnter: () => { gsap.to(wordEls, { y: 0, opacity: 1, duration: 0.8, stagger: 0.06, ease: "power3.out" }); },
        });
        return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    }, [isMobile]);

    return (
        <section id="contact" style={{ padding: "6rem 0", position: "relative", overflow: "hidden" }}>
            <div className="mesh-bg" />

            <div className="container-wide">
                <div className="glass-card" style={{ padding: isMobile ? "2.5rem 1.5rem" : "4rem 3rem", position: "relative", zIndex: 1 }}>
                    <span className="section-eyebrow">Get Started</span>
                    <h2 ref={headingRef} className="font-display" style={{
                        fontSize: "clamp(2rem, 4.5vw, 3.25rem)",
                        fontWeight: 700, letterSpacing: "-0.04em",
                        color: "var(--text)", lineHeight: 1.08, marginBottom: "1.25rem",
                    }}>
                        Put your real estate<br />business on <span className="gradient-text">autopilot.</span>
                    </h2>
                    <p style={{ fontSize: "1rem", color: "var(--text-subtle)", lineHeight: 1.75, marginBottom: "2rem", maxWidth: 480 }}>
                        Book a free 30-minute demo. We&apos;ll walk through your current workflows and show you exactly which tasks we can automate.
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: "2rem" }}>
                        <motion.a href="mailto:hello@autometa.ai" className="btn-primary cta-glow-btn"
                            whileHover={isMobile ? undefined : { scale: 1.04 }} whileTap={isMobile ? undefined : { scale: 0.97 }}>
                            Book a Free Demo <ArrowRight size={14} />
                        </motion.a>
                        <motion.a href="mailto:hello@autometa.ai" className="btn-secondary"
                            whileHover={isMobile ? undefined : { scale: 1.03 }} whileTap={isMobile ? undefined : { scale: 0.97 }}>
                            Get Free Workflow Audit
                        </motion.a>
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                        {["Free workflow audit", "Same-day response", "No obligation", "Works with your tools"].map(t => (
                            <span key={t} style={{ fontSize: "0.7rem", color: "var(--text-faint)", fontWeight: 500, display: "flex", alignItems: "center", gap: 4 }}>
                                <span style={{ color: "var(--accent)", fontSize: "0.8rem" }}>&#10003;</span> {t}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
