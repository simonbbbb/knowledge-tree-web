"use client";
import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

export type Theme = "enterprise" | "nexus";

const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (t: Theme) => void;
}>({ theme: "enterprise", setTheme: () => {} });

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("enterprise");

  useEffect(() => {
    const stored = localStorage.getItem("kt-theme") as Theme | null;
    if (stored === "enterprise" || stored === "nexus") {
      setThemeState(stored);
    }
  }, []);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    localStorage.setItem("kt-theme", t);
    document.documentElement.setAttribute("data-theme", t);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
