"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Twitter } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsMobile } from "@/hooks/useIsMobile";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const footerLinks: Record<string, string[]> = {
    Services: ["AI Automation", "Robotic Process Automation", "AI Agents & Workflows", "Enterprise Integration", "Custom Robotics"],
    Company: ["About", "Case Studies", "Process", "Technology", "Careers"],
    Resources: ["Blog", "Documentation", "ROI Calculator", "Support", "Privacy Policy"],
};

export default function Footer() {
    const footerRef = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();

    useEffect(() => {
        if (isMobile || !footerRef.current) return;
        const columns = footerRef.current.querySelectorAll(".footer-col");
        columns.forEach((col, i) => {
            const links = col.querySelectorAll("a, h4, p, span");
            gsap.fromTo(links, { opacity: 0, y: 16 },
                {
                    opacity: 1, y: 0, duration: 0.5, stagger: 0.04, delay: i * 0.1, ease: "power2.out",
                    scrollTrigger: { trigger: col, start: "top 92%", once: true }
                }
            );
        });
        return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    }, [isMobile]);

    return (
        <footer style={{ background: "var(--surface)", borderTop: "1px solid var(--border-subtle)", paddingTop: "3.5rem", paddingBottom: "2rem" }}>
            <div ref={footerRef} className="container-wide">
                <div style={{
                    display: "grid",
                    gridTemplateColumns: isMobile ? "1fr" : "260px repeat(3, 1fr)",
                    gap: isMobile ? "2rem" : "3rem",
                    marginBottom: "3rem",
                }}>
                    <div className="footer-col">
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "1rem" }}>
                            <motion.div
                                whileHover={isMobile ? undefined : { rotate: 90 }}
                                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                style={{ width: 20, height: 20, border: "1.5px solid var(--border)", borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center" }}
                            >
                                <div style={{ width: 7, height: 7, background: "var(--text)", borderRadius: 1 }} />
                            </motion.div>
                            <span style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text)", letterSpacing: "-0.01em" }}>Autometa</span>
                        </div>
                        <p style={{ fontSize: "0.9375rem", color: "var(--text-faint)", lineHeight: 1.65, marginBottom: "1.5rem", maxWidth: 220 }}>
                            Engineering intelligent automation for enterprises that demand precision and measurable ROI.
                        </p>
                        <a href="mailto:hello@autometa.ai" className="footer-link"
                            style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.8125rem", color: "var(--text-faint)", textDecoration: "none", marginBottom: "1.25rem" }}>
                            <Mail size={12} /> hello@autometa.ai
                        </a>
                        <div style={{ display: "flex", gap: 6 }}>
                            {[{ Icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" }, { Icon: Twitter, href: "https://twitter.com", label: "Twitter" }].map(({ Icon, href, label }) => (
                                <motion.a key={label} href={href} target="_blank" rel="noreferrer" title={label}
                                    whileHover={isMobile ? undefined : { scale: 1.15, y: -2 }}
                                    whileTap={isMobile ? undefined : { scale: 0.9 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                                    style={{
                                        width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center",
                                        border: "1px solid var(--border)", borderRadius: 4, color: "var(--text-faint)", textDecoration: "none"
                                    }}>
                                    <Icon size={12} />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {Object.entries(footerLinks).map(([cat, links]) => (
                        <div key={cat} className="footer-col">
                            <h4 style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-faint)", marginBottom: "1rem" }}>{cat}</h4>
                            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                                {links.map(link => (
                                    <li key={link}>
                                        <a href="#" className="footer-link"
                                            style={{ fontSize: "0.9375rem", color: "var(--text-faint)", textDecoration: "none", position: "relative" }}>
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-faint)" }}>© {new Date().getFullYear()} Autometa Inc. All rights reserved.</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <div className="pulse-dot" style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--accent)" }} />
                        <span style={{ fontSize: "0.75rem", color: "var(--text-faint)", fontWeight: 500 }}>All systems operational</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
