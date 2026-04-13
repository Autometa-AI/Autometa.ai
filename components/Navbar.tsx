"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, ArrowRight, X } from "lucide-react";

const servicesDropdown = [
    { label: "Lead Management Systems", href: "/services" },
    { label: "CRM Setup & Optimization", href: "/services" },
    { label: "Workflow Automation", href: "/services" },
    { label: "AI Integrations", href: "/services" },
    { label: "Custom Dashboards", href: "/services" },
    { label: "Internal Tools", href: "/services" },
];

const resourcesDropdown = [
    { label: "Blog", href: "/blog" },
    { label: "Playbooks & Templates", href: "/resources" },
    { label: "Automation Guides", href: "/resources" },
    { label: "Case Studies", href: "/case-studies" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [showBanner, setShowBanner] = useState(true);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 32);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <>
            {/* Announcement Bar */}
            {showBanner && (
                <div className="announcement-bar">
                    <span className="announcement-badge">NEW</span>
                    <span>The 2026 AI for Real Estate Agencies Playbook — Free Download</span>
                    <a href="/resources" style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                        Get it now <ArrowRight size={12} />
                    </a>
                    <button
                        onClick={() => setShowBanner(false)}
                        style={{ position: "absolute", right: 16, background: "none", border: "none", color: "#fff", cursor: "pointer", opacity: 0.7 }}
                    >
                        <X size={14} />
                    </button>
                </div>
            )}

            {/* Main Header */}
            <header
                style={{
                    position: "sticky", top: 0, left: 0, right: 0, zIndex: 50,
                    background: scrolled ? "var(--surface)" : "rgba(5,5,5,0.85)",
                    borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
                    backdropFilter: "blur(24px) saturate(1.6)",
                    WebkitBackdropFilter: "blur(24px) saturate(1.6)",
                    transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
            >
                <nav className="container-wide" style={{ height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    {/* Logo */}
                    <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
                        <div
                            style={{
                                width: 32, height: 32, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
                                background: "var(--accent)", boxShadow: "0 2px 12px var(--glow-primary)",
                                fontSize: "0.85rem", fontWeight: 800, color: "#fff", fontFamily: "'Space Grotesk', sans-serif",
                            }}
                        >
                            A
                        </div>
                        <span className="font-display" style={{ fontWeight: 700, fontSize: "1.15rem", color: "var(--text)", letterSpacing: "-0.03em" }}>autometa</span>
                        <span style={{ fontSize: "0.7rem", marginLeft: -4, marginTop: -8, opacity: 0.5 }}>🇦🇪</span>
                    </a>

                    {/* Nav Links — desktop only */}
                    <div style={{ display: "flex", alignItems: "center", gap: 28 }} className="hidden-mobile">
                        {/* Services Dropdown */}
                        <div className="nav-item" style={{ position: "relative" }}>
                            <span className="nav-link" style={{ fontSize: "0.9rem", fontWeight: 500, color: "var(--text-muted)", cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                                Services <ChevronDown size={12} />
                            </span>
                            <div className="nav-dropdown">
                                {servicesDropdown.map(item => (
                                    <a key={item.label} href={item.href}>{item.label}</a>
                                ))}
                            </div>
                        </div>

                        <a href="/case-studies" className="nav-link"
                            style={{ fontSize: "0.9rem", fontWeight: 500, color: "var(--text-muted)", textDecoration: "none", position: "relative" }}>
                            Case Studies
                            <span className="nav-underline" />
                        </a>

                        <a href="/about" className="nav-link"
                            style={{ fontSize: "0.9rem", fontWeight: 500, color: "var(--text-muted)", textDecoration: "none", position: "relative" }}>
                            About
                            <span className="nav-underline" />
                        </a>

                        {/* Resources Dropdown */}
                        <div className="nav-item" style={{ position: "relative" }}>
                            <span className="nav-link" style={{ fontSize: "0.9rem", fontWeight: 500, color: "var(--text-muted)", cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                                Resources <ChevronDown size={12} />
                            </span>
                            <div className="nav-dropdown">
                                {resourcesDropdown.map(item => (
                                    <a key={item.label} href={item.href}>{item.label}</a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Side Buttons — desktop */}
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }} className="hidden-mobile">
                        <a href="/resources" className="btn-outline" style={{ fontSize: "0.82rem", padding: "0.5rem 1rem" }}>
                            Free Playbook
                        </a>
                        <a href="/contact" className="btn-primary" style={{ fontSize: "0.82rem", padding: "0.5rem 1.25rem" }}>
                            Book Audit
                        </a>
                    </div>

                    {/* Mobile: just Book Audit button, no hamburger */}
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }} className="show-mobile">
                        <a href="/contact" className="btn-primary" style={{ fontSize: "0.82rem", padding: "0.5rem 1rem" }}>
                            Book Audit
                        </a>
                    </div>
                </nav>
            </header>
        </>
    );
}
