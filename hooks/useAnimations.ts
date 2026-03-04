"use client";

import { useEffect, useRef, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

/* ── Split Text Reveal ─────────────────────────────────── */
export function useSplitTextReveal(
    ref: RefObject<HTMLElement | null>,
    options?: { delay?: number; stagger?: number; duration?: number }
) {
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const text = el.textContent || "";
        const words = text.split(" ");
        el.innerHTML = "";
        words.forEach((word, i) => {
            const span = document.createElement("span");
            span.style.display = "inline-block";
            span.style.overflow = "hidden";
            const inner = document.createElement("span");
            inner.textContent = word;
            inner.style.display = "inline-block";
            inner.style.transform = "translateY(110%)";
            inner.style.opacity = "0";
            inner.className = "split-word";
            span.appendChild(inner);
            if (i < words.length - 1) {
                const space = document.createTextNode("\u00A0");
                el.appendChild(span);
                el.appendChild(space);
            } else {
                el.appendChild(span);
            }
        });

        const inners = el.querySelectorAll(".split-word");
        gsap.to(inners, {
            y: 0,
            opacity: 1,
            duration: options?.duration ?? 0.8,
            stagger: options?.stagger ?? 0.05,
            delay: options?.delay ?? 0.2,
            ease: "power3.out",
        });
    }, [ref, options?.delay, options?.stagger, options?.duration]);
}

/* ── Scroll-triggered stagger ──────────────────────────── */
export function useScrollStagger(
    containerRef: RefObject<HTMLElement | null>,
    childSelector: string,
    options?: { y?: number; stagger?: number; duration?: number }
) {
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const children = el.querySelectorAll(childSelector);
        if (!children.length) return;

        gsap.set(children, { y: options?.y ?? 40, opacity: 0 });
        ScrollTrigger.batch(children, {
            onEnter: (batch) =>
                gsap.to(batch, {
                    y: 0,
                    opacity: 1,
                    duration: options?.duration ?? 0.7,
                    stagger: options?.stagger ?? 0.1,
                    ease: "power3.out",
                    overwrite: true,
                }),
            start: "top 88%",
        });

        return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    }, [containerRef, childSelector, options?.y, options?.stagger, options?.duration]);
}

/* ── Magnetic button effect ────────────────────────────── */
export function useMagneticButton(ref: RefObject<HTMLElement | null>, strength = 0.3) {
    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            gsap.to(el, {
                x: x * strength,
                y: y * strength,
                duration: 0.4,
                ease: "power2.out",
            });
        };

        const handleMouseLeave = () => {
            gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
        };

        el.addEventListener("mousemove", handleMouseMove);
        el.addEventListener("mouseleave", handleMouseLeave);
        return () => {
            el.removeEventListener("mousemove", handleMouseMove);
            el.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [ref, strength]);
}

/* ── Parallax on scroll (lightweight, no lax dep) ──────── */
export function useScrollParallax(ref: RefObject<HTMLElement | null>, speed = 0.15) {
    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        gsap.to(el, {
            y: () => speed * ScrollTrigger.maxScroll(window),
            ease: "none",
            scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
                invalidateOnRefresh: true,
            },
        });

        return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    }, [ref, speed]);
}

/* ── Line draw animation ───────────────────────────────── */
export function useLineDraw(ref: RefObject<SVGElement | null>, delay = 0) {
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const paths = el.querySelectorAll("path, line, polyline, circle");
        paths.forEach((path) => {
            const p = path as SVGGeometryElement;
            const length = p.getTotalLength?.() ?? 100;
            gsap.set(p, { strokeDasharray: length, strokeDashoffset: length });
            gsap.to(p, {
                strokeDashoffset: 0,
                duration: 1.2,
                delay,
                ease: "power2.inOut",
                scrollTrigger: { trigger: el, start: "top 85%", once: true },
            });
        });
    }, [ref, delay]);
}
