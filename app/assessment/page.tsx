"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowRight,
    ArrowLeft,
    CheckCircle,
    Building2,
    Users,
    AlertTriangle,
    Target,
    MessageSquare,
    Sparkles,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* ─── Types ─────────────────────────────────────────── */
type Step = {
    id: string;
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    fields: Field[];
};

type Field = {
    key: string;
    label: string;
    type: "text" | "email" | "url" | "tel" | "select" | "textarea" | "chips";
    placeholder?: string;
    required?: boolean;
    options?: string[]; // for select & chips
    hint?: string;
};

/* ─── Steps Configuration ───────────────────────────── */
const steps: Step[] = [
    {
        id: "company",
        icon: <Building2 size={22} />,
        title: "About Your Company",
        subtitle: "Help us understand your business so we can tailor our recommendations.",
        fields: [
            { key: "companyName", label: "Company Name", type: "text", placeholder: "e.g. Prime Properties Dubai", required: true },
            { key: "website", label: "Company Website", type: "url", placeholder: "https://yourcompany.com" },
            { key: "companySize", label: "Team Size", type: "select", options: ["1–5", "6–15", "16–50", "51–100", "100+"], required: true },
            { key: "role", label: "Your Role", type: "text", placeholder: "e.g. Managing Director, Head of Sales", required: true },
        ],
    },
    {
        id: "contact",
        icon: <Users size={22} />,
        title: "Your Contact Details",
        subtitle: "We'll use this to send you a personalised audit report.",
        fields: [
            { key: "fullName", label: "Full Name", type: "text", placeholder: "e.g. Sarah Ahmed", required: true },
            { key: "email", label: "Work Email", type: "email", placeholder: "sarah@company.com", required: true },
            { key: "phone", label: "Phone Number", type: "tel", placeholder: "+971 50 000 0000", hint: "Optional — we'll only call if it's relevant. No spam, ever." },
        ],
    },
    {
        id: "pain-points",
        icon: <AlertTriangle size={22} />,
        title: "Your Biggest Challenges",
        subtitle: "Select every pain point your team currently faces.",
        fields: [
            {
                key: "painPoints",
                label: "What problems are costing you the most?",
                type: "chips",
                options: [
                    "Slow lead response time",
                    "Leads falling through the cracks",
                    "Missed follow-ups",
                    "No visibility on agent performance",
                    "Manual data entry & admin work",
                    "Scattered tools & spreadsheets",
                    "No automated lead routing",
                    "Poor CRM adoption",
                    "Inconsistent sales process",
                    "Can't track ROI on marketing spend",
                ],
            },
        ],
    },
    {
        id: "goals",
        icon: <Target size={22} />,
        title: "What Are You Looking For?",
        subtitle: "What outcomes matter most to your team right now?",
        fields: [
            {
                key: "goals",
                label: "Select your top priorities",
                type: "chips",
                options: [
                    "Respond to leads faster",
                    "Centralise our pipeline",
                    "Automate follow-ups & sequences",
                    "Build custom dashboards",
                    "Integrate AI into our workflow",
                    "Reduce manual admin work",
                    "Improve agent accountability",
                    "Custom internal tools",
                    "Better reporting & forecasting",
                    "WhatsApp / SMS automation",
                ],
            },
        ],
    },
    {
        id: "context",
        icon: <MessageSquare size={22} />,
        title: "Anything Else?",
        subtitle: "Share any extra context that might help us prepare your audit.",
        fields: [
            {
                key: "currentTools",
                label: "What tools do you currently use?",
                type: "text",
                placeholder: "e.g. HubSpot, Zoho, Google Sheets, WhatsApp Business",
            },
            {
                key: "budget",
                label: "Estimated monthly budget for systems & automation",
                type: "select",
                options: ["Under $1,000", "$1,000 – $3,000", "$3,000 – $7,000", "$7,000 – $15,000", "$15,000+", "Not sure yet"],
            },
            {
                key: "timeline",
                label: "When do you want to get started?",
                type: "select",
                options: ["Immediately", "Within 2 weeks", "Within 1 month", "Within 3 months", "Just exploring"],
            },
            {
                key: "additionalNotes",
                label: "Anything else we should know?",
                type: "textarea",
                placeholder: "Share any specific challenges, goals, or questions...",
            },
        ],
    },
];

/* ─── Component ─────────────────────────────────────── */
export default function AssessmentPage() {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<Record<string, string | string[]>>({});
    const [submitted, setSubmitted] = useState(false);

    const step = steps[currentStep];
    const isLast = currentStep === steps.length - 1;

    const canProceed = () => {
        return step.fields.every((f) => {
            if (!f.required) return true;
            const val = formData[f.key];
            if (Array.isArray(val)) return val.length > 0;
            return typeof val === "string" && val.trim().length > 0;
        });
    };

    const handleNext = () => {
        if (!canProceed()) return;
        if (isLast) {
            console.log("Assessment submitted:", formData);
            setSubmitted(true);
            return;
        }
        setCurrentStep((s) => s + 1);
    };

    const handleBack = () => setCurrentStep((s) => Math.max(0, s - 1));

    const updateField = (key: string, value: string | string[]) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const toggleChip = (key: string, chip: string) => {
        const current = (formData[key] as string[]) || [];
        const next = current.includes(chip) ? current.filter((c) => c !== chip) : [...current, chip];
        updateField(key, next);
    };

    const inputStyle: React.CSSProperties = {
        width: "100%",
        padding: "0.85rem 1.1rem",
        fontSize: "0.95rem",
        fontFamily: "'Inter', sans-serif",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid var(--border)",
        borderRadius: 12,
        color: "var(--text)",
        outline: "none",
        transition: "border-color 0.25s, box-shadow 0.25s",
    };

    const focusHandlers = {
        onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
            e.currentTarget.style.borderColor = "var(--accent)";
            e.currentTarget.style.boxShadow = "0 0 0 3px var(--glow-primary)";
        },
        onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
            e.currentTarget.style.borderColor = "var(--border)";
            e.currentTarget.style.boxShadow = "none";
        },
    };

    return (
        <>
            <Navbar />
            <main style={{ minHeight: "100vh", paddingTop: 40, paddingBottom: 80 }}>
                <div className="container-wide" style={{ maxWidth: 720 }}>
                    {/* Page Header */}
                    <div style={{ textAlign: "center", marginBottom: 40 }}>
                        <span className="section-eyebrow" style={{ justifyContent: "center" }}>
                            Free System Audit
                        </span>
                        <h1
                            className="font-display"
                            style={{
                                fontSize: "clamp(2rem, 4vw, 2.8rem)",
                                fontWeight: 700,
                                letterSpacing: "-0.035em",
                                color: "var(--text)",
                                lineHeight: 1.1,
                                marginBottom: 10,
                            }}
                        >
                            Tell Us About Your{" "}
                            <span className="gradient-text">Agency</span>
                        </h1>
                        <p style={{ fontSize: "1.08rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
                            Answer a few questions and we&apos;ll prepare a tailored automation
                            audit — completely free.
                        </p>
                    </div>

                    {!submitted ? (
                        <>
                            {/* Progress bar */}
                            <div style={{ display: "flex", gap: 6, marginBottom: 36 }}>
                                {steps.map((s, i) => (
                                    <div
                                        key={s.id}
                                        style={{
                                            flex: 1,
                                            height: 4,
                                            borderRadius: 3,
                                            background: i <= currentStep ? "var(--accent)" : "var(--border)",
                                            transition: "background 0.4s",
                                        }}
                                    />
                                ))}
                            </div>

                            {/* Step Card */}
                            <div
                                className="glass-card"
                                style={{
                                    padding: "2.25rem 2rem",
                                    position: "relative",
                                    overflow: "hidden",
                                }}
                            >
                                {/* Step indicator */}
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 10,
                                        marginBottom: 8,
                                    }}
                                >
                                    <div
                                        style={{
                                            width: 42,
                                            height: 42,
                                            borderRadius: 12,
                                            background: "var(--tag-bg)",
                                            border: "1px solid var(--tag-border)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            color: "var(--accent)",
                                        }}
                                    >
                                        {step.icon}
                                    </div>
                                    <span
                                        style={{
                                            fontSize: "0.72rem",
                                            fontWeight: 700,
                                            color: "var(--text-faint)",
                                            letterSpacing: "0.08em",
                                            fontFamily: "'JetBrains Mono', monospace",
                                            textTransform: "uppercase",
                                        }}
                                    >
                                        Step {currentStep + 1} of {steps.length}
                                    </span>
                                </div>

                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={step.id}
                                        initial={{ opacity: 0, x: 30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -30 }}
                                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                    >
                                        <h2
                                            className="font-display"
                                            style={{
                                                fontSize: "1.65rem",
                                                fontWeight: 700,
                                                color: "var(--text)",
                                                letterSpacing: "-0.025em",
                                                lineHeight: 1.15,
                                                marginBottom: 6,
                                            }}
                                        >
                                            {step.title}
                                        </h2>
                                        <p
                                            style={{
                                                fontSize: "0.95rem",
                                                color: "var(--text-muted)",
                                                lineHeight: 1.55,
                                                marginBottom: 28,
                                            }}
                                        >
                                            {step.subtitle}
                                        </p>

                                        {/* Fields */}
                                        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                                            {step.fields.map((field) => (
                                                <div key={field.key}>
                                                    <label
                                                        style={{
                                                            display: "block",
                                                            fontSize: "0.85rem",
                                                            fontWeight: 600,
                                                            color: "var(--text-secondary)",
                                                            marginBottom: 8,
                                                        }}
                                                    >
                                                        {field.label}
                                                        {field.required && (
                                                            <span style={{ color: "var(--accent)", marginLeft: 3 }}>*</span>
                                                        )}
                                                    </label>

                                                    {field.type === "chips" ? (
                                                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                                                            {field.options?.map((opt) => {
                                                                const selected = ((formData[field.key] as string[]) || []).includes(opt);
                                                                return (
                                                                    <button
                                                                        key={opt}
                                                                        onClick={() => toggleChip(field.key, opt)}
                                                                        style={{
                                                                            padding: "0.55rem 1rem",
                                                                            fontSize: "0.85rem",
                                                                            fontWeight: 500,
                                                                            borderRadius: 10,
                                                                            border: selected
                                                                                ? "1px solid var(--accent)"
                                                                                : "1px solid var(--border)",
                                                                            background: selected
                                                                                ? "var(--tag-bg)"
                                                                                : "rgba(255,255,255,0.02)",
                                                                            color: selected
                                                                                ? "var(--accent)"
                                                                                : "var(--text-muted)",
                                                                            cursor: "pointer",
                                                                            transition: "all 0.2s",
                                                                        }}
                                                                    >
                                                                        {opt}
                                                                    </button>
                                                                );
                                                            })}
                                                        </div>
                                                    ) : field.type === "select" ? (
                                                        <select
                                                            value={(formData[field.key] as string) || ""}
                                                            onChange={(e) => updateField(field.key, e.target.value)}
                                                            style={{
                                                                ...inputStyle,
                                                                appearance: "none",
                                                                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%236E6E6E' viewBox='0 0 24 24'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                                                                backgroundRepeat: "no-repeat",
                                                                backgroundPosition: "right 14px center",
                                                                paddingRight: "2.5rem",
                                                            }}
                                                            {...focusHandlers}
                                                        >
                                                            <option value="" style={{ background: "var(--surface-solid)", color: "var(--text-faint)" }}>
                                                                Select...
                                                            </option>
                                                            {field.options?.map((opt) => (
                                                                <option key={opt} value={opt} style={{ background: "var(--surface-solid)", color: "var(--text)" }}>
                                                                    {opt}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    ) : field.type === "textarea" ? (
                                                        <textarea
                                                            rows={4}
                                                            placeholder={field.placeholder}
                                                            value={(formData[field.key] as string) || ""}
                                                            onChange={(e) => updateField(field.key, e.target.value)}
                                                            style={{
                                                                ...inputStyle,
                                                                resize: "vertical",
                                                                minHeight: 100,
                                                            }}
                                                            {...focusHandlers}
                                                        />
                                                    ) : (
                                                        <input
                                                            type={field.type}
                                                            placeholder={field.placeholder}
                                                            value={(formData[field.key] as string) || ""}
                                                            onChange={(e) => updateField(field.key, e.target.value)}
                                                            style={inputStyle}
                                                            {...focusHandlers}
                                                        />
                                                    )}

                                                    {field.hint && (
                                                        <p
                                                            style={{
                                                                fontSize: "0.78rem",
                                                                color: "var(--text-faint)",
                                                                marginTop: 6,
                                                                lineHeight: 1.4,
                                                            }}
                                                        >
                                                            {field.hint}
                                                        </p>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                </AnimatePresence>

                                {/* Navigation */}
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        marginTop: 32,
                                        paddingTop: 20,
                                        borderTop: "1px solid var(--border)",
                                    }}
                                >
                                    {currentStep > 0 ? (
                                        <button
                                            onClick={handleBack}
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 6,
                                                padding: "0.75rem 1.25rem",
                                                fontSize: "0.9rem",
                                                fontWeight: 600,
                                                color: "var(--text-muted)",
                                                background: "transparent",
                                                border: "1px solid var(--border)",
                                                borderRadius: 10,
                                                cursor: "pointer",
                                                transition: "all 0.2s",
                                            }}
                                        >
                                            <ArrowLeft size={15} /> Back
                                        </button>
                                    ) : (
                                        <div />
                                    )}

                                    <button
                                        onClick={handleNext}
                                        className="btn-primary"
                                        style={{
                                            fontSize: "0.9rem",
                                            padding: "0.75rem 1.5rem",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 6,
                                            opacity: canProceed() ? 1 : 0.5,
                                            pointerEvents: canProceed() ? "auto" : "none",
                                        }}
                                    >
                                        {isLast ? "Submit Assessment" : "Continue"}
                                        <ArrowRight size={15} />
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        /* ─── Success State ──────────────────────── */
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="glass-card"
                            style={{
                                padding: "3.5rem 2.5rem",
                                textAlign: "center",
                            }}
                        >
                            <div
                                style={{
                                    width: 72,
                                    height: 72,
                                    borderRadius: "50%",
                                    background: "var(--tag-bg)",
                                    border: "1px solid var(--tag-border)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    margin: "0 auto 20px",
                                }}
                            >
                                <CheckCircle size={32} style={{ color: "var(--accent)" }} />
                            </div>
                            <h2
                                className="font-display"
                                style={{
                                    fontSize: "2rem",
                                    fontWeight: 700,
                                    color: "var(--text)",
                                    letterSpacing: "-0.03em",
                                    marginBottom: 10,
                                }}
                            >
                                Assessment Received
                            </h2>
                            <p
                                style={{
                                    fontSize: "1.08rem",
                                    color: "var(--text-muted)",
                                    lineHeight: 1.6,
                                    maxWidth: 480,
                                    margin: "0 auto 28px",
                                }}
                            >
                                Thank you for taking the time. Our team will review your
                                answers and send you a personalised system audit within
                                24 hours.
                            </p>
                            <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
                                <a href="/" className="btn-secondary" style={{ fontSize: "0.9rem" }}>
                                    Back to Home
                                </a>
                                <a href="/services" className="btn-primary" style={{ fontSize: "0.9rem" }}>
                                    <Sparkles size={14} /> Explore Services
                                </a>
                            </div>
                        </motion.div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}
