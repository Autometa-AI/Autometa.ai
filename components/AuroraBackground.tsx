"use client";

import { useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useTheme } from "@/context/ThemeContext";

export default function AuroraBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const isMobile = useIsMobile();
    const { theme } = useTheme();

    useEffect(() => {
        if (isMobile) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let W = 0, H = 0, animId: number, t = 0;

        function resize() { W = canvas!.width = window.innerWidth; H = canvas!.height = window.innerHeight; }

        function draw() {
            animId = requestAnimationFrame(draw);
            t += 0.0008;
            ctx!.clearRect(0, 0, W, H);
            const isDark = theme === "dark";
            const a1 = isDark ? 0.05 : 0.035;
            const a2 = isDark ? 0.04 : 0.025;

            const blobs = [
                { x: W * 0.15 + Math.sin(t * 0.4) * W * 0.05, y: H * 0.3 + Math.cos(t * 0.3) * H * 0.04, r: Math.max(W, H) * 0.32, color: `rgba(255, 107, 53, ${a1})` },
                { x: W * 0.8 + Math.cos(t * 0.3) * W * 0.04, y: H * 0.6 + Math.sin(t * 0.2) * H * 0.04, r: Math.max(W, H) * 0.28, color: `rgba(255, 143, 94, ${a2})` },
            ];

            for (const b of blobs) {
                const grad = ctx!.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
                grad.addColorStop(0, b.color);
                grad.addColorStop(1, "transparent");
                ctx!.fillStyle = grad;
                ctx!.beginPath();
                ctx!.arc(b.x, b.y, b.r, 0, Math.PI * 2);
                ctx!.fill();
            }
        }

        resize(); draw();
        window.addEventListener("resize", resize);
        return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
    }, [isMobile, theme]);

    if (isMobile) return null;
    return <canvas ref={canvasRef} style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", pointerEvents: "none", zIndex: 0 }} />;
}
