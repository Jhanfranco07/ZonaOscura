"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import { NivelRiesgo, TipoProblema } from "@prisma/client";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { EvidenceUploader } from "@/components/reports/EvidenceUploader";
import { LocationPicker } from "@/components/maps/LocationPicker";
import { DistrictCombobox } from "@/components/reports/DistrictCombobox";
import { crearReporteAction } from "@/features/reportes/reporte.actions";
import { etiquetasTipoProblema } from "@/lib/utils";

export function ReportForm() {
  const [state, formAction] = useFormState(crearReporteAction, null);
  const [urlImagen, setUrlImagen] = useState("");
  const [distrito, setDistrito] = useState("");
  const [ubicacion, setUbicacion] = useState({ latitud: -12.0614, longitud: -76.9331 });

  return (
    <form action={formAction} className="grid grid-cols-1 gap-gutter lg:grid-cols-12">
      <input type="hidden" name="urlImagen" value={urlImagen} />
      <div className="flex flex-col gap-lg lg:col-span-8">
        <Card className="p-lg">
          <SectionTitle icon="location_on" title="Ubicación del punto oscuro" step="01" />
          <div className="grid grid-cols-1 gap-md sm:grid-cols-2">
            <Input className="sm:col-span-2" name="direccion" placeholder="Dirección (Ej. Av. Universitaria cuadra 12)" required />
            <Input name="referencia" placeholder="Referencia cercana" />
            <DistrictCombobox value={distrito} onChange={setDistrito} />
          </div>
          <div className="mt-md overflow-hidden rounded-lg border border-outline-variant bg-surface-container-low">
            <LocationPicker
              latitud={ubicacion.latitud}
              longitud={ubicacion.longitud}
              onChange={(latitud, longitud) => setUbicacion({ latitud, longitud })}
              onDistrictChange={setDistrito}
            />
          </div>
        </Card>

        <Card className="p-lg">
          <SectionTitle icon="report_problem" title="Detalle del problema" step="02" />
          <div className="grid grid-cols-1 gap-md sm:grid-cols-2">
            <Select name="tipoProblema" required>
              {Object.values(TipoProblema).map((tipo) => (
                <option key={tipo} value={tipo}>{etiquetasTipoProblema[tipo]}</option>
              ))}
            </Select>
            <Select name="nivelRiesgo" required>
              {Object.values(NivelRiesgo).map((riesgo) => (
                <option key={riesgo} value={riesgo}>{riesgo[0] + riesgo.slice(1).toLowerCase()}</option>
              ))}
            </Select>
            <Textarea className="sm:col-span-2" name="descripcion" placeholder="Describe qué ocurre, desde cuándo y si afecta el tránsito nocturno..." required />
          </div>
        </Card>

        <Card className="p-lg">
          <SectionTitle icon="photo_camera" title="Evidencia fotográfica" step="03" />
          <EvidenceUploader onUploaded={setUrlImagen} />
        </Card>

        {state && !state.ok ? <p className="rounded-lg bg-error-container p-md text-error">{state.mensaje}</p> : null}
        <div className="flex flex-col-reverse justify-end gap-md sm:flex-row">
          <Button type="reset" variante="secundario">Cancelar</Button>
          <Button type="submit">
            <span className="material-symbols-outlined text-[20px]">send</span>
            Enviar reporte
          </Button>
        </div>
      </div>

      <aside className="lg:col-span-4">
        <Card className="sticky top-[100px] overflow-hidden p-lg">
          <div className="rounded-lg bg-blue-700 p-md text-white">
            <p className="font-etiqueta text-etiqueta font-semibold uppercase text-amber-200">Vista previa</p>
            <h2 className="mt-xs font-titulo-seccion text-[20px] font-semibold">Reporte ciudadano</h2>
            <p className="mt-xs text-sm text-blue-100">Estado inicial: Pendiente de revisión municipal.</p>
          </div>
          <div className="mt-md aspect-video overflow-hidden rounded-lg border border-outline-variant bg-surface-variant">
            {urlImagen ? (
              <img src={urlImagen} alt="Evidencia" className="h-full w-full object-cover grayscale" />
            ) : (
              <div className="flex h-full items-center justify-center text-center text-sm text-on-surface-variant">
                La foto adjunta aparecerá aquí
              </div>
            )}
          </div>
          <div className="mt-md space-y-sm text-sm text-on-surface-variant">
            <p className="flex gap-sm"><span className="material-symbols-outlined text-[18px] text-safety-blue">map</span> Ubicación georreferenciada para el mapa.</p>
            <p className="flex gap-sm"><span className="material-symbols-outlined text-[18px] text-amber-600">location_city</span> Distrito oficial de Lima Metropolitana.</p>
            <p className="flex gap-sm"><span className="material-symbols-outlined text-[18px] text-amber-600">verified</span> Confirmaciones ciudadanas elevan la prioridad.</p>
          </div>
        </Card>
      </aside>
    </form>
  );
}

function SectionTitle({ icon, title, step }: { icon: string; title: string; step: string }) {
  return (
    <div className="mb-md flex items-center justify-between gap-md border-b border-surface-container pb-sm">
      <div className="flex min-w-0 items-center gap-sm">
        <span className="material-symbols-outlined text-primary">{icon}</span>
        <h2 className="truncate font-titulo-seccion text-[20px] font-semibold text-primary">{title}</h2>
      </div>
      <span className="rounded-full bg-blue-50 px-sm py-xs text-xs font-bold text-safety-blue ring-1 ring-blue-100">{step}</span>
    </div>
  );
}
