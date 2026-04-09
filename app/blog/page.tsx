"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock, Tag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useIsMobile } from "@/hooks/useIsMobile";

const categories = ["All", "Lead Management", "Automation", "CRM", "AI", "Operations"];

const featuredPost = {
    title: "The Complete Guide to Real Estate Lead Management in 2025",
    excerpt: "Learn how top-performing teams capture, track, and convert every lead with structured systems and automation.",
    category: "Lead Management",
    readTime: "8 min read",
    date: "Apr 2, 2025",
};

const posts = [
    { title: "5 Follow-Up Sequences That Convert Real Estate Leads", excerpt: "Proven email and WhatsApp templates that keep leads engaged from first contact to closing.", category: "Automation", readTime: "5 min", date: "Mar 28, 2025" },
    { title: "How to Set Up a CRM That Your Agents Will Actually Use", excerpt: "A practical guide to CRM implementation that focuses on adoption, not just features.", category: "CRM", readTime: "6 min", date: "Mar 22, 2025" },
    { title: "AI in Real Estate: What Actually Works (And What Doesn't)", excerpt: "Cutting through the hype to show you which AI tools deliver real ROI for real estate teams.", category: "AI", readTime: "7 min", date: "Mar 15, 2025" },
    { title: "From Chaos to System: A Real Estate Team's Automation Journey", excerpt: "How a 30-agent brokerage went from spreadsheets to a fully automated lead pipeline.", category: "Operations", readTime: "8 min", date: "Mar 8, 2025" },
    { title: "The Hidden Cost of Slow Lead Response Times", excerpt: "Data-backed analysis of how response time impacts conversion rates in real estate.", category: "Lead Management", readTime: "4 min", date: "Mar 1, 2025" },
    { title: "Building Custom Dashboards for Real Estate Teams", excerpt: "Why off-the-shelf reporting fails and how custom dashboards change the game.", category: "Operations", readTime: "6 min", date: "Feb 22, 2025" },
];

export default function BlogPage() {
    const isMobile = useIsMobile();

    return (
        <main style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text)", overflowX: "hidden" }}>
            <Navbar />

            {/* Hero */}
            <section style={{ padding: "8rem 0 3rem", position: "relative" }}>
                <div className="mesh-bg" />
                <div className="container-wide" style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 680 }}>
                    <span className="section-eyebrow">Blog</span>
                    <h1 className="font-display" style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)", fontWeight: 700, letterSpacing: "-0.04em", color: "var(--text)", lineHeight: 1.08, marginBottom: 16 }}>
                        Insights for <span className="gradient-text">Real Estate Teams</span>
                    </h1>
                    <p style={{ fontSize: "1rem", color: "var(--text-subtle)", lineHeight: 1.75 }}>
                        Practical guides, system blueprints, and automation strategies for modern real estate operations.
                    </p>
                </div>
            </section>

            {/* Categories */}
            <section style={{ padding: "0 0 2rem" }}>
                <div className="container-wide">
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
                        {categories.map((cat, i) => (
                            <motion.button
                                key={cat}
                                whileHover={{ scale: 1.05 }}
                                style={{
                                    padding: "0.5rem 1rem",
                                    borderRadius: 10,
                                    border: i === 0 ? "1px solid var(--accent)" : "1px solid var(--border)",
                                    background: i === 0 ? "var(--tag-bg)" : "transparent",
                                    color: i === 0 ? "var(--accent)" : "var(--text-muted)",
                                    fontSize: "0.8rem", fontWeight: 600, cursor: "pointer",
                                }}
                            >
                                {cat}
                            </motion.button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Post */}
            <section style={{ padding: "1rem 0 3rem" }}>
                <div className="container-wide">
                    <motion.div
                        className="glass-card"
                        style={{ padding: isMobile ? "2rem 1.5rem" : "3rem 2.5rem", cursor: "pointer" }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        whileHover={{ borderColor: "rgba(255, 107, 53, 0.2)" }}
                    >
                        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                            <span className="tag">Featured</span>
                            <span className="tag">{featuredPost.category}</span>
                        </div>
                        <h2 className="font-display" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, color: "var(--text)", marginBottom: 12, letterSpacing: "-0.02em" }}>
                            {featuredPost.title}
                        </h2>
                        <p style={{ fontSize: "0.95rem", color: "var(--text-subtle)", lineHeight: 1.7, marginBottom: 16, maxWidth: 640 }}>
                            {featuredPost.excerpt}
                        </p>
                        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                            <span style={{ fontSize: "0.75rem", color: "var(--text-faint)", display: "flex", alignItems: "center", gap: 4 }}>
                                <Clock size={12} /> {featuredPost.readTime}
                            </span>
                            <span style={{ fontSize: "0.75rem", color: "var(--text-faint)" }}>{featuredPost.date}</span>
                            <span className="gradient-text" style={{ fontSize: "0.8rem", fontWeight: 600, marginLeft: "auto", display: "flex", alignItems: "center", gap: 4 }}>
                                Read More <ArrowRight size={12} />
                            </span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Posts Grid */}
            <section style={{ padding: "1rem 0 6rem" }}>
                <div className="container-wide">
                    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 16 }}>
                        {posts.map((post, i) => (
                            <motion.div
                                key={post.title}
                                className="glass-card"
                                style={{ padding: "1.5rem", cursor: "pointer" }}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.06 }}
                                whileHover={{ borderColor: "rgba(255, 107, 53, 0.15)" }}
                            >
                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                                    <span className="tag">{post.category}</span>
                                </div>
                                <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text)", marginBottom: 8, lineHeight: 1.3 }}>{post.title}</h3>
                                <p style={{ fontSize: "0.85rem", color: "var(--text-subtle)", lineHeight: 1.7, marginBottom: 12 }}>{post.excerpt}</p>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                        <span style={{ fontSize: "0.7rem", color: "var(--text-faint)", display: "flex", alignItems: "center", gap: 4 }}>
                                            <Clock size={11} /> {post.readTime}
                                        </span>
                                        <span style={{ fontSize: "0.7rem", color: "var(--text-faint)" }}>{post.date}</span>
                                    </div>
                                    <ArrowRight size={14} style={{ color: "var(--accent)" }} />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
