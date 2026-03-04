import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

export const metadata: Metadata = {
    title: "Autometa – Engineering Intelligent Automation",
    description:
        "Autometa is a premium AI automation and robotics agency specializing in intelligent systems, RPA, AI agents, and enterprise digital transformation.",
    keywords: [
        "AI automation",
        "robotics process automation",
        "AI agents",
        "enterprise automation",
        "workflow optimization",
        "digital transformation",
        "Autometa",
    ],
    openGraph: {
        title: "Autometa – Engineering Intelligent Automation",
        description:
            "Premium AI automation and robotics agency focused on intelligent systems and enterprise digital transformation.",
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
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap"
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
