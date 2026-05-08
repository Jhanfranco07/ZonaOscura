import Link from "next/link";
import type { Prisma } from "@prisma/client";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { etiquetasTipoProblema, formatearFecha } from "@/lib/utils";

type ReportePrioridad = Prisma.ReporteZonaOscuraGetPayload<{ include: { _count: { select: { confirmaciones: true } } } }>;

export function PriorityList({ reportes }: { reportes: ReportePrioridad[] }) {
  return (
    <div className="flex flex-col gap-md">
      {reportes.map((reporte, index) => (
        <Card key={reporte.id} className="relative overflow-hidden p-md transition-colors hover:bg-surface-container-low">
          {reporte.prioridad === "ALTA" ? <div className="absolute bottom-0 left-0 top-0 w-1 bg-safety-rose" /> : null}
          <div className="flex flex-col gap-md md:flex-row md:items-center">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-slate-950 text-amber-300">
              <span className="font-bold">{String(index + 1).padStart(2, "0")}</span>
            </div>
            <div className="flex-1">
              <div className="mb-xs flex flex-wrap items-center gap-sm">
                <Badge destacado={reporte.prioridad === "ALTA"}>Prioridad {reporte.prioridad.toLowerCase()}</Badge>
                <span className="font-etiqueta text-etiqueta text-on-surface-variant">{reporte.codigo}</span>
              </div>
              <h3 className="font-subtitulo text-[17px] font-semibold text-primary">{reporte.direccion}</h3>
              <p className="mt-xs text-on-surface-variant">
                {etiquetasTipoProblema[reporte.tipoProblema]} · {reporte._count.confirmaciones} confirmaciones · {formatearFecha(reporte.fechaCreacion)}
              </p>
            </div>
            <Link href={`/reportes/${reporte.id}`} className="rounded-lg border border-outline-variant bg-white px-md py-sm text-center font-semibold text-primary hover:bg-surface-container-lowest">
              Ver detalle
            </Link>
          </div>
        </Card>
      ))}
    </div>
  );
}
