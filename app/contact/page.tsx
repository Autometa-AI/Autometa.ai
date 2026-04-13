"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Phone, MapPin, Clock, Calendar, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useIsMobile } from "@/hooks/useIsMobile";

const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM",
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM",
];

export default function ContactPage() {
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [company, setCompany] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const isMobile = useIsMobile();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name && email && selectedSlot) {
            setSubmitted(true);
        }
    };

    const inputStyle: React.CSSProperties = {
        width: "100%", padding: "0.75rem 1rem",
        background: "var(--surface-solid)", border: "1px solid var(--border)",
        borderRadius: 12, color: "var(--text)", fontSize: "0.875rem",
        outline: "none",
    };

    return (
        <main style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text)", overflowX: "hidden" }}>
            <Navbar />

            {/* Hero */}
            <section style={{ padding: "8rem 0 3rem", position: "relative" }}>
                <div className="mesh-bg" />
                <div className="container-wide" style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 600 }}>
                    <span className="section-eyebrow">Book a Call</span>
                    <h1 className="font-display" style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)", fontWeight: 700, letterSpacing: "-0.04em", color: "var(--text)", lineHeight: 1.08, marginBottom: 16 }}>
                        Book Your Free <span className="gradient-text">System Audit</span>
                    </h1>
                    <p style={{ fontSize: "1rem", color: "var(--text-subtle)", lineHeight: 1.75 }}>
                        Pick a time that works for you. We&apos;ll analyze your current systems and show you exactly how to improve.
                    </p>
                </div>
            </section>

            {/* Booking Form */}
            <section style={{ padding: "2rem 0 6rem" }}>
                <div className="container-wide">
                    {!submitted ? (
                        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 24, maxWidth: 900, margin: "0 auto" }}>
                            {/* Time Slots */}
                            <div className="glass-card" style={{ padding: "2rem 1.5rem" }}>
                                <h3 className="font-display" style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--text)", marginBottom: 4 }}>Select a Time</h3>
                                <p style={{ fontSize: "0.8rem", color: "var(--text-faint)", marginBottom: 20 }}>
                                    <Calendar size={12} style={{ display: "inline", verticalAlign: "middle", marginRight: 4 }} />
                                    30-minute free consultation
                                </p>
                                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8 }}>
                                    {timeSlots.map(slot => (
                                        <motion.button
                                            key={slot}
                                            onClick={() => setSelectedSlot(slot)}
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.97 }}
                                            style={{
                                                padding: "0.75rem",
                                                borderRadius: 10,
                                                border: selectedSlot === slot ? "2px solid var(--accent)" : "1px solid var(--border)",
                                                background: selectedSlot === slot ? "var(--tag-bg)" : "var(--surface-solid)",
                                                color: selectedSlot === slot ? "var(--accent)" : "var(--text-muted)",
                                                fontSize: "0.85rem", fontWeight: 600, cursor: "pointer",
                                                display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                                            }}
                                        >
                                            <Clock size={13} /> {slot}
                                        </motion.button>
                                    ))}
                                </div>
                            </div>

                            {/* Contact Form */}
                            <div className="glass-card" style={{ padding: "2rem 1.5rem" }}>
                                <h3 className="font-display" style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>Your Details</h3>
                                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                                    <input type="text" placeholder="Full Name" required value={name} onChange={e => setName(e.target.value)} style={inputStyle} />
                                    <input type="email" placeholder="Work Email" required value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} />
                                    <input type="text" placeholder="Company (optional)" value={company} onChange={e => setCompany(e.target.value)} style={inputStyle} />
                                    <select style={{ ...inputStyle, appearance: "none" }}>
                                        <option value="">Team Size</option>
                                        <option value="1-5">1-5 agents</option>
                                        <option value="6-20">6-20 agents</option>
                                        <option value="21-50">21-50 agents</option>
                                        <option value="50+">50+ agents</option>
                                    </select>
                                    <textarea
                                        placeholder="Tell us about your current systems and challenges..."
                                        rows={3}
                                        style={{ ...inputStyle, resize: "vertical" }}
                                    />
                                    <button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: 4 }}>
                                        Book Audit <ArrowRight size={14} />
                                    </button>
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", marginTop: 4 }}>
                                        {["Free audit", "No obligation", "Same-day response"].map(t => (
                                            <span key={t} style={{ fontSize: "0.7rem", color: "var(--text-faint)", display: "flex", alignItems: "center", gap: 4 }}>
                                                <span style={{ color: "var(--accent)" }}>&#10003;</span> {t}
                                            </span>
                                        ))}
                                    </div>
                                </form>
                            </div>
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            style={{ textAlign: "center", maxWidth: 500, margin: "0 auto" }}
                        >
                            <div className="glass-card" style={{ padding: "3rem 2rem" }}>
                                <CheckCircle size={48} style={{ color: "#66F2FF", margin: "0 auto 16px", display: "block" }} />
                                <h2 className="font-display" style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text)", marginBottom: 8 }}>
                                    You&apos;re Booked!
                                </h2>
                                <p style={{ fontSize: "0.95rem", color: "var(--text-subtle)", lineHeight: 1.7, marginBottom: 8 }}>
                                    We&apos;ll send a confirmation to <strong style={{ color: "var(--text)" }}>{email}</strong> shortly.
                                </p>
                                <p style={{ fontSize: "0.85rem", color: "var(--text-faint)" }}>
                                    Selected time: <strong style={{ color: "var(--accent)" }}>{selectedSlot}</strong>
                                </p>
                            </div>
                        </motion.div>
                    )}

                    {/* Contact Info */}
                    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 16, marginTop: 40, maxWidth: 900, marginLeft: "auto", marginRight: "auto" }}>
                        {[
                            { icon: <Mail size={18} />, label: "Email", value: "hello@autometa.ai" },
                            { icon: <Phone size={18} />, label: "Phone", value: "+91-XXXX-XXXXXX" },
                            { icon: <MapPin size={18} />, label: "Location", value: "India" },
                        ].map(info => (
                            <div key={info.label} className="glass-card" style={{ padding: "1.25rem", textAlign: "center" }}>
                                <div style={{ color: "var(--accent)", marginBottom: 8, display: "flex", justifyContent: "center" }}>{info.icon}</div>
                                <div style={{ fontSize: "0.7rem", fontWeight: 600, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4, fontFamily: "'JetBrains Mono', monospace" }}>{info.label}</div>
                                <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text)" }}>{info.value}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
