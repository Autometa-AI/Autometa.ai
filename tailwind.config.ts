import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
                mono: ["JetBrains Mono", "monospace"],
            },
            colors: {
                silver: {
                    300: "#E6E6E6",
                    400: "#C0C0C0",
                    500: "#6E6E6E",
                },
                glow: {
                    400: "#66F2FF",
                    500: "#00CFFF",
                    600: "#0066FF",
                },
            },
            borderRadius: {
                "2xl": "20px",
                "3xl": "24px",
            },
        },
    },
    plugins: [],
};

export default config;
