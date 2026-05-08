"use client";

import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import type { ReporteZonaOscura } from "@prisma/client";
import { centroLimaSur } from "@/lib/googleMaps";

export function GoogleMapView({ reportes }: { reportes: ReporteZonaOscura[] }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ""
  });

  if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || !isLoaded) {
    return (
      <div className="relative h-full min-h-[420px] overflow-hidden rounded-lg bg-surface-variant">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#c6c6cd_1px,transparent_1px),linear-gradient(#c6c6cd_1px,transparent_1px)] bg-[size:44px_44px] opacity-70" />
        {reportes.slice(0, 7).map((reporte, index) => (
          <span
            key={reporte.id}
            className="material-symbols-outlined fill absolute text-[32px] text-primary"
            style={{ left: `${18 + index * 10}%`, top: `${28 + (index % 3) * 17}%` }}
            title={reporte.direccion}
          >
            location_on
          </span>
        ))}
      </div>
    );
  }

  return (
    <GoogleMap center={centroLimaSur} zoom={12} mapContainerClassName="h-full min-h-[420px] w-full rounded-lg">
      {reportes.map((reporte) => (
        <Marker key={reporte.id} position={{ lat: reporte.latitud, lng: reporte.longitud }} title={reporte.direccion} />
      ))}
    </GoogleMap>
  );
}
