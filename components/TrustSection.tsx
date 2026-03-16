"use client";

import { motion } from "framer-motion";

const clients = ["RE/MAX", "Keller Williams", "Coldwell Banker", "Century 21", "Compass", "eXp Realty", "Sotheby's", "CBRE"];

export default function TrustSection() {
    const doubled = [...clients, ...clients];

    return (
        <section style={{
            borderTop: "1px solid var(--border)",
            borderBottom: "1px solid var(--border)",
            padding: "2.5rem 0",
            overflow: "hidden",
        }}>
            <motion.p
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                style={{
                    fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em",
                    textTransform: "uppercase", color: "var(--text-faint)", textAlign: "center",
                    marginBottom: "1.75rem", fontFamily: "'JetBrains Mono', monospace",
                }}
            >
                Trusted by leading real estate brands
            </motion.p>

            <div className="marquee-container">
                <div className="marquee-track">
                    {doubled.map((c, i) => (
                        <motion.span
                            key={`${c}-${i}`}
                            whileHover={{ scale: 1.12, color: "var(--accent)" }}
                            transition={{ type: "spring", stiffness: 400, damping: 20 }}
                            style={{
                                fontSize: "0.85rem", fontWeight: 700,
                                letterSpacing: "0.1em", textTransform: "uppercase",
                                color: "var(--text-faint)", cursor: "default",
                                flexShrink: 0, padding: "0 2rem", whiteSpace: "nowrap",
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
