import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Autometa – AI Systems for Real Estate Agencies",
    description:
        "Autometa builds AI-powered systems for real estate agencies — from lead capture and property management to closing workflows and tenant operations.",
    keywords: [
        "real estate automation",
        "property management AI",
        "real estate CRM automation",
        "tenant onboarding automation",
        "closing workflow automation",
        "real estate lead management",
        "Autometa",
        "AI for real estate",
    ],
    openGraph: {
        title: "Autometa – AI Systems for Real Estate Agencies",
        description:
            "AI-powered systems for real estate agencies. Streamline every workflow from lead to lease.",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" data-theme="dark" className="dark" style={{ colorScheme: "dark" }}>
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
            </head>
            <body>{children}</body>
        </html>
    );
}
