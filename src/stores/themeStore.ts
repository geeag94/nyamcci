import { create } from "zustand";

type Theme = "light" | "dark" | "system";

interface ThemeState {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: "system",
  resolvedTheme: "light",
  setTheme: (theme) => {
    const resolved = theme === "system" ? getSystemTheme() : theme;
    set({ theme, resolvedTheme: resolved });
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", resolved === "dark");
    }
  },
  toggleTheme: () => {
    const current = get().resolvedTheme;
    const next = current === "light" ? "dark" : "light";
    set({ theme: next, resolvedTheme: next });
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", next === "dark");
    }
  },
}));
