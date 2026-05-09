import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        secondary: "#475569",
        "on-primary": "#ffffff",
        "surface-container": "#e8eef5",
        "on-background": "#172033",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f1f5f9",
        primary: "#10213f",
        "outline-variant": "#cbd5e1",
        outline: "#64748b",
        "surface-bright": "#f8fafc",
        "surface-container-high": "#e2e8f0",
        "surface-variant": "#dbeafe",
        background: "#f4f7fb",
        foreground: "#172033",
        popover: "#ffffff",
        "popover-foreground": "#172033",
        muted: "#e2e8f0",
        "muted-foreground": "#526071",
        ring: "#2563eb",
        surface: "#f8fafc",
        "primary-container": "#172554",
        "on-primary-container": "#dbeafe",
        "on-surface": "#172033",
        "on-surface-variant": "#526071",
        "surface-container-highest": "#dbeafe",
        error: "#be123c",
        "error-container": "#ffe4e6",
        amber: {
          50: "#fffbeb",
          100: "#fef3c7",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706"
        },
        safety: {
          blue: "#2563eb",
          cyan: "#0891b2",
          green: "#16a34a",
          rose: "#e11d48",
          night: "#0f172a"
        }
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px"
      },
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        gutter: "24px"
      },
      fontFamily: {
        "texto-general": ["Inter", "sans-serif"],
        subtitulo: ["Inter", "sans-serif"],
        etiqueta: ["Inter", "sans-serif"],
        "titulo-principal": ["Inter", "sans-serif"],
        "titulo-seccion": ["Inter", "sans-serif"]
      },
      fontSize: {
        "texto-general": ["16px", { lineHeight: "1.5", fontWeight: "400" }],
        subtitulo: ["18px", { lineHeight: "1.4", fontWeight: "600" }],
        etiqueta: ["13px", { lineHeight: "1.2", fontWeight: "400" }],
        "titulo-principal": ["32px", { lineHeight: "1.2", letterSpacing: "0", fontWeight: "700" }],
        "titulo-seccion": ["24px", { lineHeight: "1.3", fontWeight: "600" }]
      }
    }
  },
  plugins: [require("@tailwindcss/forms")]
};

export default config;
