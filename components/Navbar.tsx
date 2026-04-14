"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
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

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

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
                <motion.div
                    className="announcement-bar"
                    initial={{ opacity: 0, y: -32 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease }}
                >
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
                </motion.div>
            )}

            {/* Main Header */}
            <motion.header
                style={{
                    position: "sticky", top: 0, left: 0, right: 0, zIndex: 50,
                    background: scrolled ? "var(--surface)" : "rgba(5,5,5,0.85)",
                    borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
                    backdropFilter: "blur(24px) saturate(1.6)",
                    WebkitBackdropFilter: "blur(24px) saturate(1.6)",
                    transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.05, ease }}
            >
                <nav className="container-wide" style={{ height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    {/* Logo */}
                    <motion.a
                        href="/"
                        style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.15, ease }}
                    >
                        <Image
                            src="/logo.svg"
                            alt="Autometa AI Logo"
                            width={34}
                            height={34}
                            priority
                            style={{ filter: "drop-shadow(0 0 8px rgba(0,170,255,0.4))" }}
                        />
                        <span className="font-display" style={{ fontWeight: 700, fontSize: "1.15rem", color: "var(--text)", letterSpacing: "-0.03em" }}>
                            autometa<span style={{ color: "var(--accent)", marginLeft: 4 }}>ai</span>
                        </span>
                        <span style={{ fontSize: "0.7rem", marginLeft: -4, marginTop: -8, opacity: 0.5 }}>🇦🇪</span>
                    </motion.a>

                    {/* Nav Links — desktop only */}
                    <motion.div
                        style={{ display: "flex", alignItems: "center", gap: 28 }}
                        className="hidden-mobile"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.25, ease }}
                    >
                        {/* Services Dropdown */}
                        <div className="nav-item" style={{ position: "relative" }}>
                            <span className="nav-link" style={{ fontSize: "0.9rem", fontWeight: 500, color: "var(--text-muted)", cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                                Services <ChevronDown size={12} className="dropdown-chevron" />
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
                                Resources <ChevronDown size={12} className="dropdown-chevron" />
                            </span>
                            <div className="nav-dropdown">
                                {resourcesDropdown.map(item => (
                                    <a key={item.label} href={item.href}>{item.label}</a>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side Buttons */}
                    <motion.div
                        style={{ display: "flex", alignItems: "center", gap: 10 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3, ease }}
                    >
                        <a
                            href="/resources"
                            className="btn-outline hidden-mobile"
                            style={{ fontSize: "0.82rem", padding: "0.5rem 1rem", display: "inline-flex", alignItems: "center", gap: 8 }}
                            aria-label="Free Playbook — UAE edition"
                        >
                            Free Playbook
                            <motion.span
                                aria-hidden="true"
                                style={{ fontSize: "1rem", lineHeight: 1, display: "inline-block", filter: "drop-shadow(0 0 6px rgba(0,170,255,0.35))" }}
                                animate={{ rotate: [0, -8, 0, 8, 0] }}
                                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                            >
                                🇦🇪
                            </motion.span>
                        </a>
                        <a href="/contact" className="btn-primary" style={{ fontSize: "0.82rem", padding: "0.5rem 1.25rem" }}>
                            Book Audit
                        </a>
                    </motion.div>
                </nav>
            </motion.header>
        </>
    );
}
