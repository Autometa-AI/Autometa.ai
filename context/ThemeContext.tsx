"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({ theme: "light", toggleTheme: () => { } });

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>("light");

    // Initialize theme from localStorage or system preference
    useEffect(() => {
        const saved = localStorage.getItem("autometa-theme") as Theme | null;
        if (saved) {
            setTheme(saved);
            updateDOM(saved);
        } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            setTheme("dark");
            updateDOM("dark");
        }
    }, []);

    function updateDOM(t: Theme) {
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(t);
        document.documentElement.setAttribute("data-theme", t);
        document.documentElement.style.colorScheme = t;
    }

    const toggleTheme = () => {
        const next = theme === "light" ? "dark" : "light";
        setTheme(next);
        localStorage.setItem("autometa-theme", next);
        updateDOM(next);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}
