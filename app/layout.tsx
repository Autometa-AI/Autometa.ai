import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

export const metadata: Metadata = {
    title: "Autometa – Intelligent Automation for Real Estate",
    description:
        "Autometa automates the real estate lifecycle — from lead capture and property management to closing workflows and tenant operations — powered by AI.",
    keywords: [
        "real estate automation",
        "property management AI",
        "real estate CRM automation",
        "tenant onboarding automation",
        "closing workflow automation",
        "real estate lead management",
        "Autometa",
    ],
    openGraph: {
        title: "Autometa – Intelligent Automation for Real Estate",
        description:
            "AI-powered automation for real estate brokerages, property managers, and developers. Streamline every workflow from lead to lease.",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
                    rel="stylesheet"
                />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            (function() {
                                try {
                                    var theme = localStorage.getItem('autometa-theme');
                                    var supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches === true;
                                    if (!theme && supportDarkMode) theme = 'dark';
                                    if (theme === 'dark') {
                                        document.documentElement.classList.add('dark');
                                        document.documentElement.setAttribute('data-theme', 'dark');
                                    }
                                } catch (e) {}
                            })();
                        `,
                    }}
                />
            </head>
            <body>
                <ThemeProvider>{children}</ThemeProvider>
            </body>
        </html>
    );
}
