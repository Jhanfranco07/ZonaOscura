import Link from "next/link";
import type { ReporteZonaOscura } from "@prisma/client";
import { Card } from "@/components/ui/Card";
import { ReportStatusBadge } from "@/components/reports/ReportStatusBadge";
import { etiquetasTipoProblema, formatearFecha } from "@/lib/utils";

export function ReportCard({ reporte }: { reporte: ReporteZonaOscura }) {
  return (
    <Card className="p-md">
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
  );
}
