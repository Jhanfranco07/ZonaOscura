import Link from "next/link";
import type { EstadoReporte, NivelPrioridad, ReporteZonaOscura } from "@prisma/client";
import { Card } from "@/components/ui/Card";
import { ReportStatusBadge } from "@/components/reports/ReportStatusBadge";
import { cn } from "@/lib/utils";
import { etiquetasEstadoReporte, etiquetasPrioridad, etiquetasTipoProblema, formatearFecha } from "@/lib/utils";

export function ReportCard({ reporte }: { reporte: ReporteZonaOscura }) {
  return (
    <>
      <MobileReportCard reporte={reporte} />
      <Card className="hidden p-md lg:block">
        <div className="flex items-start justify-between gap-md">
          <div>
            <p className="font-etiqueta text-etiqueta text-on-surface-variant">{reporte.codigo}</p>
            <h3 className="font-subtitulo text-subtitulo text-primary">{reporte.direccion}</h3>
            <p className="mt-xs text-sm text-on-surface-variant">
              {reporte.distrito} · {etiquetasTipoProblema[reporte.tipoProblema]} · {formatearFecha(reporte.fechaCreacion)}
            </p>
          </div>
          <ReportStatusBadge estado={reporte.estado} prioridad={reporte.prioridad} />
        </div>
        <Link className="mt-md inline-flex font-etiqueta text-etiqueta font-semibold text-primary underline" href={`/reportes/${reporte.id}`}>
          Ver detalle
        </Link>
      </Card>
    </>
  );
}

function MobileReportCard({ reporte }: { reporte: ReporteZonaOscura }) {
  return (
    <article className="relative overflow-hidden rounded-[18px] border border-slate-700/70 bg-[#111827]/88 p-md shadow-[0_18px_42px_rgba(2,6,23,0.34)] ring-1 ring-white/[0.04] backdrop-blur lg:hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-300/60 to-transparent" />
      <div className="flex items-start justify-between gap-md">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-xs">
            <span className="font-mono text-[12px] font-semibold tracking-wide text-slate-400">{reporte.codigo}</span>
            <span className="h-1 w-1 rounded-full bg-slate-600" />
            <span className="inline-flex items-center gap-1 text-[12px] font-medium text-slate-400">
              <span className="material-symbols-outlined text-[14px]">calendar_month</span>
              {formatearFecha(reporte.fechaCreacion)}
            </span>
          </div>
          <h3 className="mt-sm font-subtitulo text-[18px] font-bold leading-snug text-slate-50">
            {reporte.direccion}
          </h3>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-xs">
          <PriorityBadge prioridad={reporte.prioridad} />
          <StateBadge estado={reporte.estado} />
        </div>
      </div>

      <div className="mt-md grid gap-xs text-[13px] text-slate-300">
        <DetailRow icon="location_on" label={reporte.distrito} />
        <DetailRow icon="lightbulb" label={etiquetasTipoProblema[reporte.tipoProblema]} />
      </div>

      <Link
        href={`/reportes/${reporte.id}`}
        className="mt-md inline-flex h-10 items-center justify-center gap-xs rounded-xl border border-slate-600/80 bg-white/[0.06] px-md text-sm font-semibold text-slate-50 transition-colors hover:bg-white/[0.10]"
      >
        Ver detalle
        <span className="material-symbols-outlined text-[18px]">chevron_right</span>
      </Link>
    </article>
  );
}

function DetailRow({ icon, label }: { icon: string; label: string }) {
  return (
    <p className="flex min-w-0 items-center gap-sm">
      <span className="material-symbols-outlined text-[17px] text-amber-300/85">{icon}</span>
      <span className="truncate">{label}</span>
    </p>
  );
}

function PriorityBadge({ prioridad }: { prioridad: NivelPrioridad }) {
  return (
    <span
      className={cn(
        "rounded-xl px-sm py-xs text-[12px] font-bold",
        prioridad === "ALTA" && "bg-amber-400/18 text-amber-200 ring-1 ring-amber-300/35",
        prioridad === "MEDIA" && "bg-blue-400/16 text-blue-100 ring-1 ring-blue-300/30",
        prioridad === "BAJA" && "bg-emerald-400/14 text-emerald-100 ring-1 ring-emerald-300/25"
      )}
    >
      {prioridad === "ALTA" ? "Prioridad alta" : etiquetasPrioridad[prioridad]}
    </span>
  );
}

function StateBadge({ estado }: { estado: EstadoReporte }) {
  return (
    <span
      className={cn(
        "rounded-xl px-sm py-xs text-[12px] font-semibold",
        estado === "PENDIENTE" && "bg-slate-600/45 text-slate-100 ring-1 ring-slate-400/25",
        estado === "EN_EVALUACION" && "bg-blue-500/18 text-blue-100 ring-1 ring-blue-300/30",
        estado === "EN_PROCESO" && "bg-cyan-500/18 text-cyan-100 ring-1 ring-cyan-300/30",
        estado === "ATENDIDO" && "bg-emerald-500/18 text-emerald-100 ring-1 ring-emerald-300/30",
        estado === "RECHAZADO" && "bg-rose-500/18 text-rose-100 ring-1 ring-rose-300/30"
      )}
    >
      {etiquetasEstadoReporte[estado]}
    </span>
  );
}
