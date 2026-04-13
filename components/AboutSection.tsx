"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, Cpu, Globe, Shield } from "lucide-react";

const pillars = [
    {
        icon: Cpu,
        title: "AI-First Architecture",
        desc: "Every system we build is designed around intelligence — not retrofitted.",
    },
    {
        icon: TrendingUp,
        title: "Measurable ROI",
        desc: "We define success metrics upfront and engineer to exceed them.",
    },
    {
        icon: Globe,
        title: "Enterprise Scale",
        desc: "From pilot to production across thousands of processes simultaneously.",
    },
    {
        icon: Shield,
        title: "Security by Design",
        desc: "Enterprise-grade compliance and data governance baked in from day one.",
    },
];

const pipeline = [
    { step: "01", label: "Data Ingestion", color: "#00CFFF" },
    { step: "02", label: "AI Processing", color: "#0066FF" },
    { step: "03", label: "Decision Engine", color: "#66F2FF" },
    { step: "04", label: "Action Output", color: "#E6E6E6" },
];

export default function AboutSection() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="about" className="py-24 md:py-32 relative overflow-hidden">
            {/* Subtle horizontal glow line */}
            <div className="glow-line w-full absolute top-0" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8" ref={ref}>
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left: text */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7 }}
                    >
                        <p className="section-label mb-4">About Autometa</p>
                        <h2 className="text-4xl md:text-5xl font-black leading-tight mb-6">
                            Built by Engineers.{" "}
                            <span className="gradient-text">Driven by Intelligence.</span>
                        </h2>
                        <p className="text-[#C0C0C0] text-lg leading-relaxed mb-6">
                            Autometa was founded by a team of robotics engineers, AI researchers, and
                            enterprise architects with a singular mission: to make intelligent automation
                            accessible, reliable, and transformative for every organization.
                        </p>
                        <p className="text-[#C0C0C0] leading-relaxed mb-8">
                            We don&apos;t sell software. We engineer systems. Every engagement begins
                            with deep process discovery, culminating in precision-built automation
                            that creates lasting operational advantage.
                        </p>

                        {/* Pillars */}
                        <div className="grid grid-cols-2 gap-4">
                            {pillars.map((p, i) => (
                                <motion.div
                                    key={p.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={inView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                                    className="glass glass-hover p-4 rounded-xl"
                                >
                                    <p.icon className="w-5 h-5 text-[#00CFFF] mb-2 icon-glow" />
                                    <h4 className="text-sm font-bold mb-1">{p.title}</h4>
                                    <p className="text-xs text-[#C0C0C0] leading-relaxed">{p.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right: animated pipeline infographic */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="relative"
                    >
                        <div
                            className="glass rounded-2xl p-8 relative overflow-hidden"
                            style={{ border: "1px solid rgba(0,207,255,0.15)" }}
                        >
                            {/* Background glow */}
                            <div
                                className="absolute inset-0 opacity-5 pointer-events-none"
                                style={{
                                    background: "radial-gradient(circle at 60% 40%, #00CFFF, transparent 60%)",
                                }}
                            />

                            <p className="section-label mb-6">Automation Pipeline</p>

                            {/* Pipeline steps */}
                            <div className="space-y-4">
                                {pipeline.map((step, i) => (
                                    <motion.div
                                        key={step.step}
                                        initial={{ opacity: 0, x: 30 }}
                                        animate={inView ? { opacity: 1, x: 0 } : {}}
                                        transition={{ duration: 0.5, delay: 0.4 + i * 0.15 }}
                                        className="flex items-center gap-4 group"
                                    >
                                        {/* Step badge */}
                                        <div
                                            className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 font-mono text-xs font-bold"
                                            style={{
                                                background: `${step.color}18`,
                                                border: `1px solid ${step.color}40`,
                                                color: step.color,
                                            }}
                                        >
                                            {step.step}
                                        </div>

                                        {/* Progress bar */}
                                        <div className="flex-1">
                                            <div className="text-sm font-semibold mb-1.5">{step.label}</div>
                                            <div className="h-1.5 bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden">
                                                <motion.div
                                                    className="h-full rounded-full"
                                                    style={{ background: `linear-gradient(90deg, ${step.color}, ${step.color}88)` }}
                                                    initial={{ width: 0 }}
                                                    animate={inView ? { width: `${85 - i * 10}%` } : { width: 0 }}
                                                    transition={{ duration: 1, delay: 0.7 + i * 0.2, ease: "easeOut" }}
                                                />
                                            </div>
                                        </div>

                                        {/* Connector dot */}
                                        <div
                                            className="w-2 h-2 rounded-full animate-pulse"
                                            style={{ background: step.color }}
                                        />
                                    </motion.div>
                                ))}
                            </div>

                            {/* Bottom info */}
                            <div className="mt-8 pt-6 border-t border-[rgba(0,207,255,0.1)] grid grid-cols-3 gap-4">
                                {[
                                    { value: "< 50ms", label: "Latency" },
                                    { value: "99.9%", label: "Uptime SLA" },
                                    { value: "∞", label: "Scalability" },
                                ].map((m) => (
                                    <div key={m.label} className="text-center">
                                        <div className="text-lg font-black gradient-text">{m.value}</div>
                                        <div className="text-xs text-[#6E6E6E] mt-0.5">{m.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
