"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Inicio", icon: "home" },
  { href: "/mapa", label: "Mapa de zonas", icon: "map" },
  { href: "/reportes/nuevo", label: "Nuevo reporte", icon: "add_circle" },
  { href: "/reportes", label: "Reportes", icon: "description" },
  { href: "/municipal/historial", label: "Historial atendido", icon: "history" },
  { href: "/municipal", label: "Panel municipal", icon: "admin_panel_settings" },
  { href: "/municipal/prioridades", label: "Prioridades", icon: "priority_high" },
  { href: "/municipal/informes", label: "Informes", icon: "assessment" }
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href === "/municipal") return pathname === "/municipal";
  if (href === "/reportes/nuevo") return pathname === "/reportes/nuevo";
  if (href === "/reportes") {
    return pathname === "/reportes" || /^\/reportes\/(?!nuevo|mis-reportes)([^/]+)$/.test(pathname);
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [pendingHref, setPendingHref] = useState<string | null>(null);

  useEffect(() => {
    navItems.forEach((item) => router.prefetch(item.href));
  }, [router]);

  useEffect(() => {
    setPendingHref(null);
  }, [pathname]);

  return (
    <aside className="fixed left-0 top-0 z-20 hidden h-full w-[250px] flex-col gap-sm border-r border-slate-800/70 bg-slate-950 p-md text-white shadow-2xl lg:flex">
      <div className="mb-lg px-xs">
        <div className="mb-sm flex h-11 w-11 items-center justify-center rounded-lg bg-amber-400 text-primary shadow-lg shadow-amber-500/25">
          <span className="material-symbols-outlined fill">lightbulb</span>
        </div>
        <h1 className="font-titulo-seccion text-titulo-seccion font-bold text-white">ZonaOscura</h1>
        <p className="mt-xs font-etiqueta text-etiqueta text-blue-100/80">Gestión de alumbrado</p>
      </div>

      <nav className="flex flex-1 flex-col gap-xs overflow-y-auto">
        {navItems.map((item) => {
          const active = isActive(pathname, item.href);
          const pending = pendingHref === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              prefetch
              onClick={() => {
                if (!active) setPendingHref(item.href);
              }}
              className={cn(
                "flex items-center gap-md rounded-lg px-md py-sm font-texto-general text-texto-general transition-all",
                active || pending
                  ? "scale-[0.98] bg-amber-400 font-semibold text-primary shadow-lg shadow-amber-500/20"
                  : "text-blue-100/80 hover:bg-white/10 hover:text-white"
              )}
            >
              <span className={cn("material-symbols-outlined", (active || pending) && "fill")}>
                {pending ? "hourglass_top" : item.icon}
              </span>
              <span>{pending ? "Cargando..." : item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-lg border border-white/10 bg-white/[0.06] p-sm">
        <div className="flex items-center gap-sm">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white/10">
            <span className="material-symbols-outlined text-amber-300">person</span>
          </div>
          <div className="min-w-0">
            <p className="truncate font-etiqueta text-etiqueta font-semibold text-white">Jhan Pérez</p>
            <p className="truncate font-etiqueta text-[11px] text-blue-100/75">Usuario municipal</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
