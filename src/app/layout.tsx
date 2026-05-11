import type { Metadata } from "next";
import "./globals.css";
import { ResponsiveShell } from "@/components/layout/ResponsiveShell";

export const metadata: Metadata = {
  title: "ZonaOscura",
  description: "Reporte colaborativo de zonas con iluminación pública deficiente."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(() => { try { const saved = localStorage.getItem('zonaoscura-theme'); const fallback = window.matchMedia('(max-width: 1023px)').matches ? 'dark' : 'light'; document.documentElement.dataset.theme = saved || fallback; } catch { document.documentElement.dataset.theme = 'dark'; } })();"
          }}
        />
        <ResponsiveShell>{children}</ResponsiveShell>
      </body>
    </html>
  );
}
