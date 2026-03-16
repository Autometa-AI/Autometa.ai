"use client";

import { useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useTheme } from "@/context/ThemeContext";

interface Building {
    x: number; w: number; h: number;
    windows: { row: number; col: number; lit: boolean }[];
}

export default function GlobalCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouse = useRef({ x: -9999, y: -9999 });
    const isMobile = useIsMobile();
    const { theme } = useTheme();

    useEffect(() => {
        if (isMobile) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let W = 0, H = 0, buildings: Building[] = [], animId: number, t = 0;

        function createBuildings() {
            buildings = [];
            let x = 0;
            while (x < W + 80) {
                const w = 25 + Math.random() * 45;
                const h = 50 + Math.random() * 200;
                const windows: Building["windows"] = [];
                const cols = Math.floor(w / 13);
                const rows = Math.floor(h / 16);
                for (let r = 0; r < rows; r++)
                    for (let c = 0; c < cols; c++)
                        windows.push({ row: r, col: c, lit: Math.random() > 0.5 });
                buildings.push({ x, w, h, windows });
                x += w + 2 + Math.random() * 6;
            }
        }

        function init() {
            W = canvas!.width = window.innerWidth;
            H = canvas!.height = window.innerHeight;
            createBuildings();
        }

        function draw() {
            animId = requestAnimationFrame(draw);
            t += 0.004;
            ctx!.clearRect(0, 0, W, H);
            const isDark = theme === "dark";
            const buildAlpha = isDark ? 0.045 : 0.025;
            const winOn = isDark ? "rgba(255, 107, 53, 0.12)" : "rgba(255, 107, 53, 0.1)";
            const winOff = isDark ? "rgba(255,255,255,0.015)" : "rgba(0,0,0,0.012)";
            const mx = mouse.current.x, my = mouse.current.y;

            for (const b of buildings) {
                const baseY = H - b.h;
                ctx!.fillStyle = isDark ? `rgba(255,255,255,${buildAlpha})` : `rgba(0,0,0,${buildAlpha})`;
                ctx!.fillRect(b.x, baseY, b.w, b.h);

                // Roof accent line
                ctx!.fillStyle = isDark ? "rgba(255, 107, 53, 0.06)" : "rgba(255, 107, 53, 0.05)";
                ctx!.fillRect(b.x, baseY, b.w, 1.5);

                for (const win of b.windows) {
                    const wx = b.x + 4 + win.col * 13;
                    const wy = baseY + 6 + win.row * 16;
                    const distX = mx - (wx + 3), distY = my - (wy + 4);
                    const dist = Math.sqrt(distX * distX + distY * distY);
                    const mouseNear = dist < 140;
                    const flicker = Math.sin(t * 1.5 + win.row * 0.4 + win.col * 0.6 + b.x * 0.01) > 0.6;
                    const isLit = win.lit !== flicker;

                    if (isLit || mouseNear) {
                        const a = mouseNear ? Math.min(1, (1 - dist / 140) * 0.5 + 0.3) : 1;
                        ctx!.globalAlpha = a;
                        ctx!.fillStyle = winOn;
                        ctx!.fillRect(wx, wy, 7, 9);
                        if (mouseNear && dist < 70) {
                            ctx!.fillStyle = isDark ? "rgba(255, 107, 53, 0.05)" : "rgba(255, 107, 53, 0.03)";
                            ctx!.fillRect(wx - 2, wy - 2, 11, 13);
                        }
                        ctx!.globalAlpha = 1;
                    } else {
                        ctx!.fillStyle = winOff;
                        ctx!.fillRect(wx, wy, 7, 9);
                    }
                }
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

    if (isMobile) return null;
    return <canvas ref={canvasRef} style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", pointerEvents: "none", zIndex: 0 }} />;
}
