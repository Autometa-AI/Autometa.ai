"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X, Home } from "lucide-react";
import gsap from "gsap";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
    { label: "Services", href: "/services" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Resources", href: "/resources" },
    { label: "About", href: "/about" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const linksRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 32);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        if (!linksRef.current) return;
        const links = linksRef.current.querySelectorAll(".nav-link");
        gsap.fromTo(links, { y: -15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.06, delay: 0.3, ease: "power2.out" });
    }, []);

    return (
        <motion.header
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
                position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
                background: scrolled ? "var(--surface)" : "transparent",
                borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
                backdropFilter: scrolled ? "blur(24px) saturate(1.6)" : "none",
                WebkitBackdropFilter: scrolled ? "blur(24px) saturate(1.6)" : "none",
                transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
        >
            <nav className="container-wide" style={{ height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <a href="#hero" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
                    <motion.div
                        whileHover={{ scale: 1.08 }}
                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                        style={{
                            width: 32, height: 32, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
                            background: "var(--accent)", boxShadow: "0 2px 12px var(--glow-primary)",
                        }}
                    >
                        <Home size={15} color="#fff" />
                    </motion.div>
                    <span className="font-display" style={{ fontWeight: 700, fontSize: "1.05rem", color: "var(--text)", letterSpacing: "-0.03em" }}>autometa</span>
                </a>

                <div ref={linksRef} style={{ display: "flex", alignItems: "center", gap: 28 }} className="hidden-mobile">
                    {navLinks.map(link => (
                        <a key={link.label} href={link.href} className="nav-link"
                            style={{ fontSize: "0.8rem", fontWeight: 500, color: "var(--text-muted)", textDecoration: "none", position: "relative", opacity: 0 }}>
                            {link.label}
                            <span className="nav-underline" />
                        </a>
                    ))}
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 10 }} className="hidden-mobile">
                    <ThemeToggle />
                    <motion.a href="/contact" className="btn-primary" style={{ fontSize: "0.8rem", padding: "0.5rem 1.25rem" }}
                        whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                        Book Free Audit
                    </motion.a>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 8 }} className="show-mobile">
                    <ThemeToggle />
                    <button onClick={() => setMobileOpen(!mobileOpen)}
                        style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}>
                        {mobileOpen ? <X size={18} /> : <Menu size={18} />}
                    </button>
                </div>
            </nav>

            <AnimatePresence>
                {mobileOpen && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)", backdropFilter: "blur(24px)" }}>
                        <div style={{ padding: "1rem 2rem", display: "flex", flexDirection: "column", gap: 12 }}>
                            {navLinks.map((link, i) => (
                                <motion.a key={link.label} href={link.href} onClick={() => setMobileOpen(false)}
                                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05, duration: 0.3 }}
                                    style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "0.9375rem" }}>
                                    {link.label}
                                </motion.a>
                            ))}
                            <a href="/contact" className="btn-primary" style={{ marginTop: 4, justifyContent: "center" }}>Book Free Audit</a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
