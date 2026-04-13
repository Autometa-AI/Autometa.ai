"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, ArrowLeft, Shield, Sparkles } from "lucide-react";

const POPUP_DELAY_MS = 90_000; // 1.5 minutes
const STORAGE_KEY = "autometa-lead-popup-dismissed";

type FormData = {
    name: string;
    email: string;
    companyWebsite: string;
    phone: string;
};

export default function LeadCapturePopup() {
    const [visible, setVisible] = useState(false);
    const [step, setStep] = useState(0); // 0 = step 1, 1 = step 2, 2 = success
    const [form, setForm] = useState<FormData>({
        name: "",
        email: "",
        companyWebsite: "",
        phone: "",
    });

    useEffect(() => {
        if (typeof window === "undefined") return;
        const dismissed = sessionStorage.getItem(STORAGE_KEY);
        if (dismissed) return;

        const timer = setTimeout(() => setVisible(true), POPUP_DELAY_MS);
        return () => clearTimeout(timer);
    }, []);

    const dismiss = useCallback(() => {
        setVisible(false);
        sessionStorage.setItem(STORAGE_KEY, "1");
    }, []);

    const handleChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const goNext = () => {
        if (step === 0 && (!form.name.trim() || !form.email.trim())) return;
        if (step === 1) {
            // Submit form
            console.log("Lead captured:", form);
            setStep(2);
            setTimeout(dismiss, 3000);
            return;
        }
        setStep((s) => s + 1);
    };

    const goBack = () => setStep((s) => Math.max(0, s - 1));

    const inputStyle: React.CSSProperties = {
        width: "100%",
        padding: "0.8rem 1rem",
        fontSize: "0.95rem",
        fontFamily: "'Inter', sans-serif",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid var(--border)",
        borderRadius: 10,
        color: "var(--text)",
        outline: "none",
        transition: "border-color 0.25s, box-shadow 0.25s",
    };

    const labelStyle: React.CSSProperties = {
        display: "block",
        fontSize: "0.82rem",
        fontWeight: 600,
        color: "var(--text-secondary)",
        marginBottom: 6,
        letterSpacing: "-0.01em",
    };

    return (
        <AnimatePresence>
            {visible && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={dismiss}
                        style={{
                            position: "fixed",
                            inset: 0,
                            background: "rgba(0,0,0,0.65)",
                            backdropFilter: "blur(6px)",
                            WebkitBackdropFilter: "blur(6px)",
                            zIndex: 9998,
                        }}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.92, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.92, y: 30 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                            position: "fixed",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: "min(480px, 92vw)",
                            zIndex: 9999,
                            background: "var(--surface-solid)",
                            border: "1px solid var(--border)",
                            borderRadius: 20,
                            overflow: "hidden",
                            boxShadow: "0 32px 80px rgba(0,0,0,0.5), 0 0 60px rgba(0,207,255,0.08)",
                        }}
                    >
                        {/* Top accent bar */}
                        <div
                            style={{
                                height: 3,
                                background: "var(--gradient-primary)",
                            }}
                        />

                        {/* Close button */}
                        <button
                            onClick={dismiss}
                            aria-label="Close"
                            style={{
                                position: "absolute",
                                top: 16,
                                right: 16,
                                width: 32,
                                height: 32,
                                borderRadius: "50%",
                                background: "rgba(255,255,255,0.05)",
                                border: "1px solid var(--border)",
                                color: "var(--text-muted)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                                transition: "all 0.2s",
                                zIndex: 2,
                            }}
                        >
                            <X size={14} />
                        </button>

                        {/* Content */}
                        <div style={{ padding: "2rem 2rem 1.75rem" }}>
                            {/* Progress dots */}
                            {step < 2 && (
                                <div style={{ display: "flex", gap: 6, marginBottom: 24 }}>
                                    {[0, 1].map((i) => (
                                        <div
                                            key={i}
                                            style={{
                                                height: 3,
                                                flex: 1,
                                                borderRadius: 2,
                                                background:
                                                    i <= step
                                                        ? "var(--accent)"
                                                        : "var(--border)",
                                                transition: "background 0.3s",
                                            }}
                                        />
                                    ))}
                                </div>
                            )}

                            <AnimatePresence mode="wait">
                                {step === 0 && (
                                    <motion.div
                                        key="step-0"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.25 }}
                                    >
                                        <div style={{ marginBottom: 20 }}>
                                            <div
                                                style={{
                                                    display: "inline-flex",
                                                    alignItems: "center",
                                                    gap: 6,
                                                    padding: "4px 10px",
                                                    background: "var(--tag-bg)",
                                                    border: "1px solid var(--tag-border)",
                                                    borderRadius: 6,
                                                    fontSize: "0.68rem",
                                                    fontWeight: 700,
                                                    color: "var(--tag-text)",
                                                    letterSpacing: "0.06em",
                                                    textTransform: "uppercase",
                                                    fontFamily: "'JetBrains Mono', monospace",
                                                    marginBottom: 14,
                                                }}
                                            >
                                                <Sparkles size={10} /> Free Audit
                                            </div>
                                            <h3
                                                className="font-display"
                                                style={{
                                                    fontSize: "1.55rem",
                                                    fontWeight: 700,
                                                    color: "var(--text)",
                                                    letterSpacing: "-0.03em",
                                                    lineHeight: 1.2,
                                                    marginBottom: 6,
                                                }}
                                            >
                                                Let&apos;s see how we can help
                                            </h3>
                                            <p
                                                style={{
                                                    fontSize: "0.92rem",
                                                    color: "var(--text-muted)",
                                                    lineHeight: 1.55,
                                                }}
                                            >
                                                Tell us a bit about you — we&apos;ll follow up with a
                                                tailored system audit.
                                            </p>
                                        </div>

                                        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                                            <div>
                                                <label style={labelStyle}>Full Name *</label>
                                                <input
                                                    type="text"
                                                    placeholder="e.g. Sarah Ahmed"
                                                    value={form.name}
                                                    onChange={handleChange("name")}
                                                    style={inputStyle}
                                                    onFocus={(e) => {
                                                        e.currentTarget.style.borderColor = "var(--accent)";
                                                        e.currentTarget.style.boxShadow = "0 0 0 3px var(--glow-primary)";
                                                    }}
                                                    onBlur={(e) => {
                                                        e.currentTarget.style.borderColor = "var(--border)";
                                                        e.currentTarget.style.boxShadow = "none";
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <label style={labelStyle}>Work Email *</label>
                                                <input
                                                    type="email"
                                                    placeholder="sarah@company.com"
                                                    value={form.email}
                                                    onChange={handleChange("email")}
                                                    style={inputStyle}
                                                    onFocus={(e) => {
                                                        e.currentTarget.style.borderColor = "var(--accent)";
                                                        e.currentTarget.style.boxShadow = "0 0 0 3px var(--glow-primary)";
                                                    }}
                                                    onBlur={(e) => {
                                                        e.currentTarget.style.borderColor = "var(--border)";
                                                        e.currentTarget.style.boxShadow = "none";
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <label style={labelStyle}>Company Website</label>
                                                <input
                                                    type="url"
                                                    placeholder="https://yourcompany.com"
                                                    value={form.companyWebsite}
                                                    onChange={handleChange("companyWebsite")}
                                                    style={inputStyle}
                                                    onFocus={(e) => {
                                                        e.currentTarget.style.borderColor = "var(--accent)";
                                                        e.currentTarget.style.boxShadow = "0 0 0 3px var(--glow-primary)";
                                                    }}
                                                    onBlur={(e) => {
                                                        e.currentTarget.style.borderColor = "var(--border)";
                                                        e.currentTarget.style.boxShadow = "none";
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 1 && (
                                    <motion.div
                                        key="step-1"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.25 }}
                                    >
                                        <div style={{ marginBottom: 20 }}>
                                            <h3
                                                className="font-display"
                                                style={{
                                                    fontSize: "1.55rem",
                                                    fontWeight: 700,
                                                    color: "var(--text)",
                                                    letterSpacing: "-0.03em",
                                                    lineHeight: 1.2,
                                                    marginBottom: 6,
                                                }}
                                            >
                                                One last thing
                                            </h3>
                                            <p
                                                style={{
                                                    fontSize: "0.92rem",
                                                    color: "var(--text-muted)",
                                                    lineHeight: 1.55,
                                                }}
                                            >
                                                A phone number helps us reach you faster — but it&apos;s
                                                totally optional.
                                            </p>
                                        </div>

                                        <div style={{ marginBottom: 20 }}>
                                            <label style={labelStyle}>
                                                Phone Number{" "}
                                                <span style={{ color: "var(--text-faint)", fontWeight: 400 }}>
                                                    (optional)
                                                </span>
                                            </label>
                                            <input
                                                type="tel"
                                                placeholder="+971 50 000 0000"
                                                value={form.phone}
                                                onChange={handleChange("phone")}
                                                style={inputStyle}
                                                onFocus={(e) => {
                                                    e.currentTarget.style.borderColor = "var(--accent)";
                                                    e.currentTarget.style.boxShadow = "0 0 0 3px var(--glow-primary)";
                                                }}
                                                onBlur={(e) => {
                                                    e.currentTarget.style.borderColor = "var(--border)";
                                                    e.currentTarget.style.boxShadow = "none";
                                                }}
                                            />
                                        </div>

                                        {/* Trust message */}
                                        <div
                                            style={{
                                                display: "flex",
                                                gap: 12,
                                                padding: "0.9rem 1rem",
                                                background: "rgba(0,207,255,0.04)",
                                                border: "1px solid rgba(0,207,255,0.1)",
                                                borderRadius: 12,
                                            }}
                                        >
                                            <Shield
                                                size={18}
                                                style={{
                                                    color: "var(--accent)",
                                                    flexShrink: 0,
                                                    marginTop: 2,
                                                }}
                                            />
                                            <div>
                                                <div
                                                    style={{
                                                        fontSize: "0.82rem",
                                                        fontWeight: 600,
                                                        color: "var(--text)",
                                                        marginBottom: 2,
                                                    }}
                                                >
                                                    We respect your time
                                                </div>
                                                <div
                                                    style={{
                                                        fontSize: "0.78rem",
                                                        color: "var(--text-muted)",
                                                        lineHeight: 1.5,
                                                    }}
                                                >
                                                    We&apos;ll only call if it&apos;s genuinely relevant to
                                                    your business. No cold calls, no spam — ever.
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 2 && (
                                    <motion.div
                                        key="step-2"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.35 }}
                                        style={{ textAlign: "center", padding: "1.5rem 0" }}
                                    >
                                        <div
                                            style={{
                                                width: 56,
                                                height: 56,
                                                borderRadius: "50%",
                                                background: "var(--tag-bg)",
                                                border: "1px solid var(--tag-border)",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                margin: "0 auto 16px",
                                            }}
                                        >
                                            <Sparkles size={24} style={{ color: "var(--accent)" }} />
                                        </div>
                                        <h3
                                            className="font-display"
                                            style={{
                                                fontSize: "1.45rem",
                                                fontWeight: 700,
                                                color: "var(--text)",
                                                letterSpacing: "-0.02em",
                                                marginBottom: 6,
                                            }}
                                        >
                                            You&apos;re in!
                                        </h3>
                                        <p
                                            style={{
                                                fontSize: "0.92rem",
                                                color: "var(--text-muted)",
                                                lineHeight: 1.55,
                                            }}
                                        >
                                            We&apos;ll review your info and reach out within 24 hours
                                            with a tailored audit plan.
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Actions */}
                            {step < 2 && (
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        marginTop: 24,
                                        gap: 10,
                                    }}
                                >
                                    {step > 0 ? (
                                        <button
                                            onClick={goBack}
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 4,
                                                padding: "0.7rem 1rem",
                                                fontSize: "0.88rem",
                                                fontWeight: 600,
                                                color: "var(--text-muted)",
                                                background: "transparent",
                                                border: "1px solid var(--border)",
                                                borderRadius: 10,
                                                cursor: "pointer",
                                                transition: "all 0.2s",
                                            }}
                                        >
                                            <ArrowLeft size={14} /> Back
                                        </button>
                                    ) : (
                                        <button
                                            onClick={dismiss}
                                            style={{
                                                padding: "0.7rem 1rem",
                                                fontSize: "0.85rem",
                                                fontWeight: 500,
                                                color: "var(--text-faint)",
                                                background: "transparent",
                                                border: "none",
                                                cursor: "pointer",
                                            }}
                                        >
                                            Maybe later
                                        </button>
                                    )}

                                    <button
                                        onClick={goNext}
                                        className="btn-primary"
                                        style={{
                                            fontSize: "0.88rem",
                                            padding: "0.7rem 1.5rem",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 6,
                                        }}
                                    >
                                        {step === 0 ? "Continue" : "Submit"}
                                        <ArrowRight size={14} />
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
