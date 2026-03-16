"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Twitter, Home } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsMobile } from "@/hooks/useIsMobile";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const footerLinks: Record<string, string[]> = {
    Solutions: ["Lead Automation", "Property Management", "Transaction Workflows", "CRM & MLS Integration", "AI Virtual Assistants"],
    Company: ["About", "Case Studies", "Process", "Integrations", "Careers"],
    Resources: ["Blog", "ROI Calculator", "Automation Guides", "Support", "Privacy Policy"],
};

export default function Footer() {
    const footerRef = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();

    useEffect(() => {
        if (isMobile || !footerRef.current) return;
        const columns = footerRef.current.querySelectorAll(".footer-col");
        columns.forEach((col, i) => {
            const links = col.querySelectorAll("a, h4, p, span");
            gsap.fromTo(links, { opacity: 0, y: 12 },
                { opacity: 1, y: 0, duration: 0.4, stagger: 0.03, delay: i * 0.08, ease: "power2.out",
                    scrollTrigger: { trigger: col, start: "top 92%", once: true } });
        });
        return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    }, [isMobile]);

    return (
        <footer style={{ borderTop: "1px solid var(--border)", paddingTop: "3.5rem", paddingBottom: "2rem" }}>
            <div ref={footerRef} className="container-wide">
                <div style={{
                    display: "grid",
                    gridTemplateColumns: isMobile ? "1fr" : "260px repeat(3, 1fr)",
                    gap: isMobile ? "2rem" : "3rem",
                    marginBottom: "3rem",
                }}>
                    <div className="footer-col">
                        <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: "1rem" }}>
                            <div style={{
                                width: 28, height: 28, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
                                background: "var(--accent)",
                            }}>
                                <Home size={13} color="#fff" />
                            </div>
                            <span className="font-display" style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text)", letterSpacing: "-0.03em" }}>autometa</span>
                        </div>
                        <p style={{ fontSize: "0.875rem", color: "var(--text-faint)", lineHeight: 1.65, marginBottom: "1.5rem", maxWidth: 220 }}>
                            AI-powered automation built exclusively for real estate teams.
                        </p>
                        <a href="mailto:hello@autometa.ai" className="footer-link"
                            style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.8rem", color: "var(--text-faint)", textDecoration: "none", marginBottom: "1.25rem" }}>
                            <Mail size={12} /> hello@autometa.ai
                        </a>
                        <div style={{ display: "flex", gap: 6 }}>
                            {[{ Icon: Linkedin, label: "LinkedIn" }, { Icon: Twitter, label: "Twitter" }].map(({ Icon, label }) => (
                                <motion.a key={label} href="#" title={label}
                                    whileHover={isMobile ? undefined : { scale: 1.1 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                                    style={{
                                        width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center",
                                        border: "1px solid var(--border)", borderRadius: 8, color: "var(--text-faint)", textDecoration: "none"
                                    }}>
                                    <Icon size={12} />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {Object.entries(footerLinks).map(([cat, links]) => (
                        <div key={cat} className="footer-col">
                            <h4 style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-faint)", marginBottom: "1rem", fontFamily: "'JetBrains Mono', monospace" }}>{cat}</h4>
                            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                                {links.map(link => (
                                    <li key={link}>
                                        <a href="#" className="footer-link"
                                            style={{ fontSize: "0.875rem", color: "var(--text-faint)", textDecoration: "none" }}>
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                    <span style={{ fontSize: "0.7rem", color: "var(--text-faint)" }}>&copy; {new Date().getFullYear()} Autometa Inc.</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <div className="pulse-dot" style={{ width: 5, height: 5, borderRadius: "50%", background: "#22c55e" }} />
                        <span style={{ fontSize: "0.7rem", color: "var(--text-faint)", fontWeight: 500 }}>All systems operational</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
