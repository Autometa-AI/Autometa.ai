"use client";

import { useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function AuroraBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const isMobile = useIsMobile();

    useEffect(() => {
        if (isMobile) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let W = 0, H = 0, animId: number, t = 0;

        function resize() {
            W = canvas!.width = window.innerWidth;
            H = canvas!.height = window.innerHeight;
        }

        function draw() {
            animId = requestAnimationFrame(draw);
            t += 0.0015;
            ctx!.clearRect(0, 0, W, H);

            const blobs = [
                { x: W * 0.25 + Math.sin(t * 0.5) * W * 0.06, y: H * 0.3 + Math.cos(t * 0.35) * H * 0.04, r: Math.max(W, H) * 0.35, color: "rgba(0, 212, 255, 0.04)" },
                { x: W * 0.7 + Math.cos(t * 0.4) * W * 0.05, y: H * 0.6 + Math.sin(t * 0.3) * H * 0.04, r: Math.max(W, H) * 0.3, color: "rgba(124, 58, 237, 0.035)" },
                { x: W * 0.5 + Math.sin(t * 0.3) * W * 0.08, y: H * 0.45 + Math.cos(t * 0.25) * H * 0.05, r: Math.max(W, H) * 0.32, color: "rgba(0, 245, 212, 0.03)" },
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
    }, [isMobile]);

    if (isMobile) return null;

    return (
        <canvas ref={canvasRef} style={{
            position: "fixed", top: 0, left: 0,
            width: "100vw", height: "100vh",
            pointerEvents: "none", zIndex: 0,
        }} />
    );
}
