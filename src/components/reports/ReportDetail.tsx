import type { Prisma } from "@prisma/client";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ReportStatusBadge } from "@/components/reports/ReportStatusBadge";
import { confirmarReporteAction } from "@/features/reportes/reporte.actions";
import { etiquetasTipoProblema, formatearFechaHora } from "@/lib/utils";

type ReporteDetalle = Prisma.ReporteZonaOscuraGetPayload<{
  include: {
    imagenes: true;
    comentarios: { include: { usuario: true } };
    confirmaciones: true;
    historialEstados: { include: { cambiadoPor: true } };
    intervenciones: true;
    ciudadano: true;
    funcionarioAsignado: true;
  };
}>;

export function ReportDetail({ reporte }: { reporte: ReporteDetalle }) {
  return (
    <div className="grid grid-cols-1 gap-gutter lg:grid-cols-12">
      <section className="flex flex-col gap-lg lg:col-span-7">
        <Card className="p-lg">
          <div className="flex flex-wrap items-start justify-between gap-md">
            <div>
              <p className="font-etiqueta text-etiqueta text-on-surface-variant">{reporte.codigo}</p>
              <h1 className="font-titulo-seccion text-titulo-seccion text-primary">{reporte.direccion}</h1>
            </div>
            <div className="flex items-center gap-sm">
              <ReportStatusBadge estado={reporte.estado} prioridad={reporte.prioridad} />
              <span className="rounded-full bg-surface-container-highest px-md py-xs font-subtitulo text-subtitulo">
                {reporte.confirmaciones.length} confirmaciones
              </span>
            </div>
          </div>
          <div className="mt-md h-[320px] overflow-hidden rounded-lg border border-outline-variant bg-surface-variant">
            {reporte.imagenes[0] ? (
              <img src={reporte.imagenes[0].urlImagen} alt="Fotografía del reporte" className="h-full w-full object-cover grayscale" />
            ) : (
              <div className="flex h-full items-center justify-center text-on-surface-variant">Sin fotografía</div>
            )}
          </div>
          <div className="mt-md grid grid-cols-1 gap-md sm:grid-cols-2">
            <Info label="Distrito" value={reporte.distrito} icon="location_city" />
            <Info label="Tipo" value={etiquetasTipoProblema[reporte.tipoProblema]} icon="report_problem" />
            <Info label="Riesgo" value={reporte.nivelRiesgo} icon="warning" />
            <Info label="Fecha" value={formatearFechaHora(reporte.fechaCreacion)} icon="schedule" />
          </div>
          <div className="mt-md rounded-r-lg border border-l-4 border-outline-variant border-l-primary bg-surface p-md">
            <p className="font-etiqueta text-etiqueta uppercase tracking-wide text-on-surface-variant">Comentario ciudadano</p>
            <p className="mt-xs text-on-surface">{reporte.descripcion}</p>
          </div>
          <form action={confirmarReporteAction.bind(null, reporte.id)} className="mt-md">
            <Button type="submit">Confirmar que sigue oscuro</Button>
          </form>
        </Card>
      </section>

      <aside className="flex flex-col gap-lg lg:col-span-5">
        <Card className="p-lg">
          <h2 className="font-titulo-seccion text-titulo-seccion text-primary">Seguimiento municipal</h2>
          <div className="mt-md rounded-lg bg-primary-container p-md text-on-primary-container">
            <div className="flex justify-between border-b border-white/20 pb-sm">
              <span className="font-etiqueta uppercase">Estado actual</span>
              <span className="font-subtitulo">{reporte.estado.replaceAll("_", " ")}</span>
            </div>
            <div className="flex justify-between pt-sm">
              <span className="font-etiqueta uppercase">Responsable</span>
              <span>{reporte.funcionarioAsignado?.nombres ?? "Por asignar"}</span>
            </div>
          </div>
          <div className="mt-md h-[200px] rounded-lg border border-outline-variant bg-[linear-gradient(90deg,#d9dadb_1px,transparent_1px),linear-gradient(#d9dadb_1px,transparent_1px)] bg-[size:32px_32px]" />
          <h3 className="mt-md font-subtitulo text-subtitulo">Historial de eventos</h3>
          <div className="mt-md space-y-md border-l-2 border-surface-container-highest pl-md">
            {reporte.historialEstados.map((item) => (
              <div key={item.id}>
                <p className="font-semibold text-primary">{item.estadoNuevo.replaceAll("_", " ")}</p>
                <p className="text-sm text-on-surface-variant">{formatearFechaHora(item.fechaCreacion)} · {item.cambiadoPor.nombres}</p>
                {item.nota ? <p className="text-sm">{item.nota}</p> : null}
              </div>
            ))}
          </div>
        </Card>
      </aside>
    </div>
  );
}

function Info({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <div className="rounded-lg border border-surface-container-highest bg-surface-container-low p-md">
      <span className="font-etiqueta text-etiqueta uppercase tracking-wide text-on-surface-variant">{label}</span>
      <div className="mt-xs flex items-center gap-sm">
        <span className="material-symbols-outlined text-secondary">{icon}</span>
        <span className="font-subtitulo text-subtitulo text-on-surface">{value}</span>
      </div>
    </div>
  );
}
