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
    <aside className="theme-sidebar fixed left-0 top-0 z-20 hidden h-full w-[250px] flex-col gap-sm border-r border-slate-200/80 bg-white p-md text-slate-900 shadow-[10px_0_34px_rgba(15,23,42,0.08)] lg:flex">
      <div className="mb-lg px-xs">
        <div className="mb-sm flex h-11 w-11 items-center justify-center rounded-lg bg-amber-400 text-primary shadow-lg shadow-amber-500/25">
          <span className="material-symbols-outlined fill">lightbulb</span>
        </div>
        <h1 className="theme-sidebar-title font-titulo-seccion text-titulo-seccion font-bold text-primary">ZonaOscura</h1>
        <p className="theme-sidebar-muted mt-xs font-etiqueta text-etiqueta text-slate-500">Gestion de alumbrado</p>
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
                  : "theme-sidebar-link text-slate-600 hover:bg-blue-50 hover:text-primary"
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

      <div className="theme-sidebar-user mt-auto rounded-lg border border-slate-200 bg-slate-50 p-sm">
        <div className="flex items-center gap-sm">
          <div className="theme-sidebar-avatar flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-amber-200 bg-amber-50">
            <span className="material-symbols-outlined text-amber-600">person</span>
          </div>
          <div className="min-w-0">
            <p className="theme-sidebar-title truncate font-etiqueta text-etiqueta font-semibold text-primary">Jhan Perez</p>
            <p className="theme-sidebar-muted truncate font-etiqueta text-[11px] text-slate-500">Usuario municipal</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
