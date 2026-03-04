"use client";

import { motion } from "framer-motion";

const clients = ["Siemens", "Honeywell", "Accenture", "Deloitte", "SAP", "Bosch", "ABB", "Capgemini"];

export default function TrustSection() {
    const doubled = [...clients, ...clients];

    return (
        <section style={{
            background: "var(--surface)",
            borderTop: "1px solid var(--border-subtle)",
            borderBottom: "1px solid var(--border-subtle)",
            padding: "2.5rem 0",
            overflow: "hidden",
        }}>
            <motion.p
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                style={{
                    fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em",
                    textTransform: "uppercase", color: "var(--text-faint)", textAlign: "center",
                    marginBottom: "1.75rem",
                }}
            >
                Trusted by forward-thinking enterprises
            </motion.p>

            <div className="marquee-container">
                <div className="marquee-track">
                    {doubled.map((c, i) => (
                        <motion.span
                            key={`${c}-${i}`}
                            whileHover={{ scale: 1.15, color: "var(--text-secondary)" }}
                            transition={{ type: "spring", stiffness: 400, damping: 20 }}
                            style={{
                                fontSize: "0.875rem",
                                fontWeight: 700,
                                letterSpacing: "0.12em",
                                textTransform: "uppercase",
                                color: "var(--text-faint)",
                                cursor: "default",
                                flexShrink: 0,
                                padding: "0 2rem",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {c}
                        </motion.span>
                    ))}
                </div>
            </div>
        </section>
    );
}
