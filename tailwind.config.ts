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
                violet: {
                    400: "#a78bfa",
                    500: "#8b5cf6",
                    600: "#7c3aed",
                },
                cyan: {
                    400: "#22d3ee",
                    500: "#06b6d4",
                },
                lime: {
                    400: "#a3e635",
                    500: "#84cc16",
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
