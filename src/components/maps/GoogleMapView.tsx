"use client";

import Link from "next/link";
import type { ReporteZonaOscura } from "@prisma/client";
import { Map, MapControls, MapMarker, MarkerContent, MarkerPopup, MarkerTooltip } from "@/components/ui/map";
import { centroLimaSur } from "@/lib/googleMaps";
import { etiquetasEstadoReporte, etiquetasTipoProblema } from "@/lib/utils";

const prioridadStyles = {
  BAJA: "bg-emerald-500 ring-emerald-100",
  MEDIA: "bg-amber-400 ring-amber-100",
  ALTA: "bg-rose-500 ring-rose-100"
};

export function GoogleMapView({ reportes }: { reportes: ReporteZonaOscura[] }) {
  return (
    <div className="relative h-full min-h-[420px] overflow-hidden rounded-lg bg-slate-100">
      <Map center={[centroLimaSur.lng, centroLimaSur.lat]} zoom={11.4} theme="light">
        <MapControls position="top-right" showZoom showCompass showLocate showFullscreen />
        {reportes.map((reporte) => (
          <MapMarker key={reporte.id} longitude={reporte.longitud} latitude={reporte.latitud}>
            <MarkerContent>
              <div className="group relative flex items-center justify-center">
                <span className={`h-5 w-5 rounded-full border-2 border-white shadow-lg ring-4 ${prioridadStyles[reporte.prioridad]}`} />
                <span className="absolute h-9 w-9 animate-ping rounded-full bg-amber-300/20 group-hover:bg-amber-300/30" />
              </div>
            </MarkerContent>
            <MarkerTooltip>
              <div className="rounded-lg bg-blue-700 px-sm py-xs text-xs font-semibold text-white shadow-lg">
                {reporte.direccion}
              </div>
            </MarkerTooltip>
            <MarkerPopup className="w-[260px] p-0">
              <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl">
                <div className="bg-blue-700 p-sm text-white">
                  <p className="text-xs font-bold text-amber-200">{reporte.codigo}</p>
                  <h3 className="mt-xs line-clamp-2 text-sm font-semibold">{reporte.direccion}</h3>
                </div>
                <div className="space-y-sm p-sm text-sm">
                  <p className="text-on-surface-variant">{reporte.distrito} · {etiquetasTipoProblema[reporte.tipoProblema]}</p>
                  <div className="flex items-center justify-between gap-sm">
                    <span className="rounded-full bg-blue-50 px-sm py-xs text-xs font-semibold text-safety-blue">
                      {etiquetasEstadoReporte[reporte.estado]}
                    </span>
                    <span className="rounded-full bg-amber-50 px-sm py-xs text-xs font-semibold capitalize text-amber-700">
                      {reporte.prioridad.toLowerCase()}
                    </span>
                  </div>
                  <Link href={`/reportes/${reporte.id}`} className="inline-flex w-full items-center justify-center rounded-lg bg-primary px-sm py-xs font-semibold text-white">
                    Ver detalle
                  </Link>
                </div>
              </div>
            </MarkerPopup>
          </MapMarker>
        ))}
      </Map>
      <div className="absolute bottom-sm left-sm z-10 flex flex-wrap gap-xs rounded-lg border border-slate-200 bg-white/92 p-sm text-xs shadow-sm backdrop-blur">
        <Legend color="bg-emerald-500" label="Baja" />
        <Legend color="bg-amber-400" label="Media" />
        <Legend color="bg-rose-500" label="Alta" />
      </div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-xs text-slate-600">
      <span className={`h-2.5 w-2.5 rounded-full ${color}`} />
      Prioridad {label}
    </span>
  );
}
