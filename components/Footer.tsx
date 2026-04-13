"use client";

import { Mail, Linkedin, Twitter, Home } from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";

const footerLinks: Record<string, { label: string; href: string }[]> = {
    Services: [
        { label: "Lead Management Systems", href: "/services" },
        { label: "CRM Setup & Optimization", href: "/services" },
        { label: "Workflow Automation", href: "/services" },
        { label: "AI Integrations", href: "/services" },
        { label: "Custom Dashboards", href: "/services" },
    ],
    Company: [
        { label: "About", href: "/about" },
        { label: "Case Studies", href: "/case-studies" },
        { label: "Blog", href: "/blog" },
        { label: "Contact", href: "/contact" },
    ],
    Resources: [
        { label: "Resource Hub", href: "/resources" },
        { label: "Playbooks & Templates", href: "/resources" },
        { label: "Automation Guides", href: "/resources" },
        { label: "Privacy Policy", href: "#" },
    ],
};

export default function Footer() {
    const isMobile = useIsMobile();

    return (
        <footer style={{ borderTop: "1px solid var(--border)", paddingTop: "3.5rem", paddingBottom: "2rem" }}>
            <div className="container-wide">
                <div style={{
                    display: "grid",
                    gridTemplateColumns: isMobile ? "1fr" : "260px repeat(3, 1fr)",
                    gap: isMobile ? "2rem" : "3rem",
                    marginBottom: "3rem",
                }}>
                    <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: "1rem" }}>
                            <div style={{
                                width: 28, height: 28, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
                                background: "var(--accent)",
                            }}>
                                <Home size={13} color="#fff" />
                            </div>
                            <span className="font-display" style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text)", letterSpacing: "-0.03em" }}>autometa</span>
                        </div>
                        <p style={{ fontSize: "0.9rem", color: "var(--text-faint)", lineHeight: 1.65, marginBottom: "1.5rem", maxWidth: 220 }}>
                            AI-powered systems and automation for real estate teams.
                        </p>
                        <a href="mailto:hello@autometa.ai" className="footer-link"
                            style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.85rem", color: "var(--text-faint)", textDecoration: "none", marginBottom: "1.25rem" }}>
                            <Mail size={13} /> hello@autometa.ai
                        </a>
                        <div style={{ display: "flex", gap: 6 }}>
                            {[{ Icon: Linkedin, label: "LinkedIn" }, { Icon: Twitter, label: "Twitter" }].map(({ Icon, label }) => (
                                <a key={label} href="#" title={label}
                                    style={{
                                        width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center",
                                        border: "1px solid var(--border)", borderRadius: 8, color: "var(--text-faint)", textDecoration: "none",
                                        transition: "all 0.2s",
                                    }}>
                                    <Icon size={13} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {Object.entries(footerLinks).map(([cat, links]) => (
                        <div key={cat}>
                            <h4 style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-faint)", marginBottom: "1rem", fontFamily: "'JetBrains Mono', monospace" }}>{cat}</h4>
                            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                                {links.map(link => (
                                    <li key={link.label}>
                                        <a href={link.href} className="footer-link"
                                            style={{ fontSize: "0.9rem", color: "var(--text-faint)", textDecoration: "none" }}>
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-faint)" }}>&copy; {new Date().getFullYear()} Autometa Inc.</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <div className="pulse-dot" style={{ width: 5, height: 5, borderRadius: "50%", background: "#00CFFF" }} />
                        <span style={{ fontSize: "0.75rem", color: "var(--text-faint)", fontWeight: 500 }}>All systems operational</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
