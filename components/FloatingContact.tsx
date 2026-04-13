"use client";

import { Phone, MessageCircle, Video } from "lucide-react";

export default function FloatingContact() {
    return (
        <div className="floating-contact">
            <div className="floating-contact-item">
                <a
                    href="/contact"
                    className="floating-contact-btn video"
                    title="Book Video Call"
                >
                    <Video size={20} />
                </a>
                <span className="floating-label">Video Call</span>
            </div>
            <div className="floating-contact-item">
                <a
                    href="tel:+971000000000"
                    className="floating-contact-btn phone"
                    title="Phone Call"
                >
                    <Phone size={20} />
                </a>
                <span className="floating-label">Phone Call</span>
            </div>
            <div className="floating-contact-item">
                <a
                    href="https://wa.me/971000000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="floating-contact-btn whatsapp"
                    title="WhatsApp"
                >
                    <MessageCircle size={20} />
                </a>
                <span className="floating-label">WhatsApp</span>
            </div>
        </div>
    );
}
