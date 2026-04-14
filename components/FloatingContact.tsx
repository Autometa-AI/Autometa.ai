"use client";

import { motion } from "framer-motion";
import { Phone, MessageCircle, Video } from "lucide-react";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function FloatingContact() {
    return (
        <div className="floating-contact">
            {[
                { href: "/contact", className: "floating-contact-btn video", title: "Book Video Call", Icon: Video, label: "Video Call" },
                { href: "tel:+971000000000", className: "floating-contact-btn phone", title: "Phone Call", Icon: Phone, label: "Phone Call" },
                { href: "https://wa.me/971000000000", className: "floating-contact-btn whatsapp", title: "WhatsApp", Icon: MessageCircle, label: "WhatsApp", external: true },
            ].map((item, i) => (
                <motion.div
                    key={item.title}
                    className="floating-contact-item"
                    initial={{ opacity: 0, x: 20, scale: 0.8 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1.2 + i * 0.12, ease }}
                >
                    <a
                        href={item.href}
                        className={item.className}
                        title={item.title}
                        {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                        <item.Icon size={20} />
                    </a>
                    <span className="floating-label">{item.label}</span>
                </motion.div>
            ))}
        </div>
    );
}
