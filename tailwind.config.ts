import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Inter", "system-ui", "sans-serif"],
                mono: ["JetBrains Mono", "monospace"],
            },
            colors: {
                navy: {
                    950: "#020817",
                    900: "#040f24",
                    800: "#071733",
                    700: "#0a2040",
                },
                electric: {
                    400: "#38bdf8",
                    500: "#0ea5e9",
                    600: "#0284c7",
                },
                neon: {
                    blue: "#00d4ff",
                    cyan: "#00f5d4",
                    purple: "#7c3aed",
                },
            },
            animation: {
                "float": "float 6s ease-in-out infinite",
                "pulse-slow": "pulse 4s ease-in-out infinite",
                "glow": "glow 2s ease-in-out infinite alternate",
                "spin-slow": "spin 20s linear infinite",
                "counter": "counter 2s ease-out forwards",
            },
            keyframes: {
                float: {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-20px)" },
                },
                glow: {
                    "0%": { boxShadow: "0 0 5px #00d4ff44, 0 0 20px #00d4ff22" },
                    "100%": { boxShadow: "0 0 20px #00d4ff88, 0 0 60px #00d4ff44" },
                },
            },
            backgroundImage: {
                "grid-pattern":
                    "linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)",
            },
            backgroundSize: {
                "grid": "60px 60px",
            },
        },
    },
    plugins: [],
};

export default config;
