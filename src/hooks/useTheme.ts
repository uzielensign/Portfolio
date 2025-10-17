"use client";
import { useCallback, useEffect, useState } from "react";

export default function useTheme() {
  // Start with null so SSR and initial client render match
  const [isDark, setIsDark] = useState<boolean | null>(null);

  useEffect(() => {
    // Determine theme on client only; do not manipulate DOM here
    try {
      const stored = localStorage.getItem("theme");
      if (stored === "dark") {
        setIsDark(true);
        return;
      }
      if (stored === "light") {
        setIsDark(false);
        return;
      }
      const prefersDark =
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDark(prefersDark);
    } catch {
      setIsDark(false);
    }
  }, []);

  useEffect(() => {
    if (isDark === null) return;
    try {
      // Apply class and persist preference after hydration
      document.documentElement.classList.toggle("dark", isDark);
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch {
      // ignore errors
    }
  }, [isDark]);

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => (prev === null ? true : !prev));
  }, []);

  const setTheme = useCallback((val: boolean) => setIsDark(val), []);

  return { isDark, toggleTheme, setTheme } as const;
}
