"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/", label: "Inicio", icon: "home" },
  { href: "/mapa", label: "Mapa", icon: "map" },
  { href: "/reportes/nuevo", label: "Reportar", icon: "add_circle" },
  { href: "/reportes/mis-reportes", label: "Mis reportes", icon: "description" },
  { href: "/municipal", label: "Perfil", icon: "person" }
];

export function MobileNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [pendingHref, setPendingHref] = useState<string | null>(null);

  useEffect(() => {
    items.forEach((item) => router.prefetch(item.href));
  }, [router]);

  useEffect(() => {
    setPendingHref(null);
  }, [pathname]);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 grid grid-cols-5 border-t border-slate-800 bg-slate-950 px-xs pb-2 pt-xs shadow-[0_-8px_28px_rgba(15,23,42,0.22)] lg:hidden">
      {items.map((item) => {
        const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
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
              "flex min-h-[56px] flex-col items-center justify-center gap-1 rounded-lg px-1 text-[11px] font-semibold",
              active || pending ? "bg-amber-400 text-primary" : "text-blue-100/80"
            )}
          >
            <span className={cn("material-symbols-outlined text-[22px]", (active || pending) && "fill")}>
              {pending ? "hourglass_top" : item.icon}
            </span>
            <span className="leading-tight">{pending ? "..." : item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
