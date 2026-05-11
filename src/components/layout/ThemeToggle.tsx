"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark";

export function ThemeToggle({ className, compact = false }: { className?: string; compact?: boolean }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const current = (document.documentElement.dataset.theme as Theme | undefined) ?? "dark";
    setTheme(current);
  }, []);

  function updateTheme(nextTheme: Theme) {
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem("zonaoscura-theme", nextTheme);
    setTheme(nextTheme);
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      title={isDark ? "Modo claro" : "Modo oscuro"}
      onClick={() => updateTheme(isDark ? "light" : "dark")}
      className={cn(
        "theme-toggle inline-flex items-center justify-center gap-xs rounded-2xl border border-slate-200 bg-white/90 text-primary shadow-[0_10px_28px_rgba(15,23,42,0.12)] transition hover:-translate-y-0.5 hover:bg-white",
        compact ? "h-11 w-11" : "h-10 px-sm",
        "max-lg:border-white/10 max-lg:bg-[#111827]/90 max-lg:text-amber-300 max-lg:backdrop-blur-xl",
        className
      )}
    >
      <span className="material-symbols-outlined text-[20px]">{isDark ? "light_mode" : "dark_mode"}</span>
      {compact ? null : <span className="text-[12px] font-bold">{isDark ? "Claro" : "Oscuro"}</span>}
    </button>
  );
}
