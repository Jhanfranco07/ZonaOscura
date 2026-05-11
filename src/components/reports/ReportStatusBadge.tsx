import type { EstadoReporte, NivelPrioridad } from "@prisma/client";
import { cn, etiquetasEstadoReporte, etiquetasPrioridad } from "@/lib/utils";

const estadoStyles: Record<EstadoReporte, string> = {
  PENDIENTE: "theme-badge-pending bg-amber-50 text-amber-800 ring-amber-200",
  EN_EVALUACION: "theme-badge-evaluation bg-blue-50 text-blue-700 ring-blue-200",
  EN_PROCESO: "theme-badge-process bg-cyan-50 text-cyan-700 ring-cyan-200",
  ATENDIDO: "theme-badge-done bg-emerald-50 text-emerald-700 ring-emerald-200",
  RECHAZADO: "theme-badge-rejected bg-rose-50 text-rose-700 ring-rose-200"
};

const prioridadStyles: Record<NivelPrioridad, string> = {
  BAJA: "theme-badge-low bg-emerald-50 text-emerald-700 ring-emerald-200",
  MEDIA: "theme-badge-medium bg-blue-50 text-blue-700 ring-blue-200",
  ALTA: "theme-badge-high bg-orange-50 text-orange-700 ring-orange-200"
};

export function ReportStatusBadge({ estado, prioridad }: { estado?: EstadoReporte; prioridad?: NivelPrioridad }) {
  const style = prioridad ? prioridadStyles[prioridad] : estado ? estadoStyles[estado] : "theme-badge-neutral bg-slate-100 text-slate-700 ring-slate-200";
  const label = prioridad === "ALTA" ? "Prioridad alta" : prioridad ? etiquetasPrioridad[prioridad] : estado ? etiquetasEstadoReporte[estado] : "Sin estado";

  return (
    <span className={cn("inline-flex items-center rounded-lg px-sm py-xs text-[12px] font-bold leading-4 ring-1", style)}>
      {label}
    </span>
  );
}
