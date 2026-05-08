"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function LocationPicker({
  latitud,
  longitud,
  onChange
}: {
  latitud?: number;
  longitud?: number;
  onChange?: (latitud: number, longitud: number) => void;
}) {
  const [lat, setLat] = useState(latitud ?? -12.2296);
  const [lng, setLng] = useState(longitud ?? -76.8614);

  function usarUbicacionActual() {
    navigator.geolocation?.getCurrentPosition((position) => {
      const nextLat = position.coords.latitude;
      const nextLng = position.coords.longitude;
      setLat(nextLat);
      setLng(nextLng);
      onChange?.(nextLat, nextLng);
    });
  }

  return (
    <div className="space-y-md">
      <div className="grid grid-cols-1 gap-md sm:grid-cols-[auto_1fr_1fr]">
        <Button type="button" variante="secundario" onClick={usarUbicacionActual}>
          <span className="material-symbols-outlined text-[18px]">my_location</span>
          Detectar ubicación
        </Button>
        <Input name="latitud" value={lat} onChange={(e) => setLat(Number(e.target.value))} />
        <Input name="longitud" value={lng} onChange={(e) => setLng(Number(e.target.value))} />
      </div>
      <button
        type="button"
        className="relative h-[240px] w-full overflow-hidden rounded-lg border border-outline-variant bg-surface-variant"
        onClick={() => onChange?.(lat, lng)}
      >
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#d9dadb_1px,transparent_1px),linear-gradient(#d9dadb_1px,transparent_1px)] bg-[size:32px_32px] opacity-80" />
        <span className="material-symbols-outlined fill absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[40px] text-primary">
          location_on
        </span>
      </button>
    </div>
  );
}
