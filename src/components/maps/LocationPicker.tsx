"use client";

import { useState } from "react";
import { Map, MapControls, MapMarker, MarkerContent, MarkerPopup } from "@/components/ui/map";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { limaDistrictQuickPoints } from "@/lib/limaDistricts";

export function LocationPicker({
  latitud,
  longitud,
  onChange,
  onDistrictChange
}: {
  latitud?: number;
  longitud?: number;
  onChange?: (latitud: number, longitud: number) => void;
  onDistrictChange?: (district: string) => void;
}) {
  const [lat, setLat] = useState(latitud ?? -12.0614);
  const [lng, setLng] = useState(longitud ?? -76.9331);

  function setLocation(nextLat: number, nextLng: number) {
    setLat(nextLat);
    setLng(nextLng);
    onChange?.(nextLat, nextLng);
  }

  function usarUbicacionActual() {
    navigator.geolocation?.getCurrentPosition((position) => {
      setLocation(position.coords.latitude, position.coords.longitude);
    });
  }

  return (
    <div className="space-y-md">
      <div className="grid grid-cols-1 gap-md sm:grid-cols-[auto_1fr_1fr]">
        <Button type="button" variante="secundario" onClick={usarUbicacionActual}>
          <span className="material-symbols-outlined text-[18px]">my_location</span>
          Detectar ubicación
        </Button>
        <Input
          name="latitud"
          value={lat}
          onChange={(e) => setLocation(Number(e.target.value), lng)}
          aria-label="Latitud"
        />
        <Input
          name="longitud"
          value={lng}
          onChange={(e) => setLocation(lat, Number(e.target.value))}
          aria-label="Longitud"
        />
      </div>

      <div className="relative h-[300px] overflow-hidden rounded-lg border border-outline-variant bg-slate-100">
        <Map center={[lng, lat]} zoom={12} theme="light">
          <MapControls position="top-right" showZoom showCompass showLocate />
          <MapMarker
            longitude={lng}
            latitude={lat}
            draggable
            onDragEnd={(position) => setLocation(position.lat, position.lng)}
          >
            <MarkerContent>
              <div className="cursor-move">
                <span className="material-symbols-outlined fill text-[38px] text-amber-500 drop-shadow-lg">location_on</span>
              </div>
            </MarkerContent>
            <MarkerPopup>
              <div className="space-y-xs rounded-lg border border-slate-200 bg-white p-sm text-sm shadow-xl">
                <p className="font-semibold text-primary">Ubicación del reporte</p>
                <p className="text-xs text-on-surface-variant">{lat.toFixed(5)}, {lng.toFixed(5)}</p>
              </div>
            </MarkerPopup>
          </MapMarker>
        </Map>
        <div className="absolute bottom-sm left-sm z-10 flex max-w-[calc(100%-16px)] flex-wrap gap-xs rounded-lg border border-slate-200 bg-white/92 p-xs shadow-sm backdrop-blur">
          {limaDistrictQuickPoints.map((point) => (
            <button
              key={point.label}
              type="button"
              className="rounded-md px-sm py-xs text-xs font-semibold text-primary hover:bg-blue-50"
              onClick={() => {
                setLocation(point.lat, point.lng);
                onDistrictChange?.(point.label);
              }}
            >
              {point.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
