"use client";

import { useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useTheme } from "@/context/ThemeContext";

interface Particle {
    x: number; y: number;
    vx: number; vy: number;
    r: number;
    baseR: number;
}

export default function GlobalCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouse = useRef({ x: -9999, y: -9999 });
    const isMobile = useIsMobile();
    const { theme } = useTheme();

    useEffect(() => {
        // Skip canvas animation entirely on mobile
        if (isMobile) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let W = 0, H = 0;
        let particles: Particle[] = [];
        let animId: number;
        let hue = 200;

        const COUNT = 80;
        const MAX_DIST = 180;
        const SPEED = 0.2;
        const MOUSE_RADIUS = 220;

        function init() {
            W = canvas!.width = window.innerWidth;
            H = canvas!.height = window.innerHeight;
            particles = Array.from({ length: COUNT }, () => {
                const r = Math.random() * 3 + 2; // Bigger: 2 to 5
                return {
                    x: Math.random() * W, y: Math.random() * H,
                    vx: (Math.random() - 0.5) * SPEED, vy: (Math.random() - 0.5) * SPEED,
                    r, baseR: r,
                };
            });
        }

        function draw() {
            animId = requestAnimationFrame(draw);
            ctx!.clearRect(0, 0, W, H);
            hue = (hue + 0.02) % 360;
            const mx = mouse.current.x, my = mouse.current.y;

            for (const p of particles) {
                const dxM = mx - p.x, dyM = my - p.y;
                const distSq = dxM * dxM + dyM * dyM;
                const radiusSq = MOUSE_RADIUS * MOUSE_RADIUS;
                if (distSq < radiusSq && distSq > 0) {
                    const dist = Math.sqrt(distSq);
                    const force = (1 - dist / MOUSE_RADIUS) * 0.015;
                    p.vx += dxM * force; p.vy += dyM * force;
                    p.r = p.baseR + (1 - dist / MOUSE_RADIUS) * 3;
                } else { p.r += (p.baseR - p.r) * 0.05; }
                p.vx *= 0.99; p.vy *= 0.99;
                p.x += p.vx; p.y += p.vy;
                if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
                if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
            }

            ctx!.lineWidth = 1.2;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const a = particles[i], b = particles[j];
                    const dx = a.x - b.x, dy = a.y - b.y;
                    const dSq = dx * dx + dy * dy;
                    if (dSq < MAX_DIST * MAX_DIST) {
                        const alpha = (1 - Math.sqrt(dSq) / MAX_DIST) * 0.4;
                        ctx!.beginPath();
                        const lightness = theme === "dark" ? 70 : 25;
                        const sat = theme === "dark" ? 15 : 40;
                        ctx!.strokeStyle = `hsla(${hue}, ${sat}%, ${lightness}%, ${alpha})`;
                        ctx!.moveTo(a.x, a.y); ctx!.lineTo(b.x, b.y); ctx!.stroke();
                    }
                }
            }

            for (const p of particles) {
                const lightness = theme === "dark" ? 90 : 15;
                const sat = theme === "dark" ? 10 : 40;
                ctx!.beginPath(); ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx!.fillStyle = `hsla(${hue}, ${sat}%, ${lightness}%, 0.7)`; ctx!.fill();
            }
        }

        const onMouseMove = (e: MouseEvent) => { mouse.current = { x: e.clientX, y: e.clientY }; };
        const onMouseLeave = () => { mouse.current = { x: -9999, y: -9999 }; };

        init(); draw();
        window.addEventListener("resize", init);
        window.addEventListener("mousemove", onMouseMove, { passive: true });
        window.addEventListener("mouseleave", onMouseLeave);

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener("resize", init);
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseleave", onMouseLeave);
        };
    }, [isMobile, theme]);

    // Render nothing on mobile
    if (isMobile) return null;

    return (
        <canvas ref={canvasRef} style={{
            position: "fixed", top: 0, left: 0,
            width: "100vw", height: "100vh",
            pointerEvents: "none", zIndex: 0,
        }} />
    );
}
