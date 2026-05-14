"use client";

import { useState } from "react";

export function EvidenceUploader({ onUploaded }: { onUploaded?: (url: string) => void }) {
  const [preview, setPreview] = useState<string>("");
  const [mensaje, setMensaje] = useState("");

  async function handleFile(file?: File) {
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setMensaje("Subiendo imagen...");
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await fetch("/api/upload", { method: "POST", body: formData });
      const json = await response.json().catch(() => null);
      if (!response.ok) {
        onUploaded?.("");
        setMensaje(`${json?.error ?? "No se pudo subir la imagen."} Puedes enviar el reporte sin foto.`);
        return;
      }
      setMensaje("Imagen cargada correctamente.");
      onUploaded?.(json.urlImagen);
    } catch {
      onUploaded?.("");
      setMensaje("No se pudo subir la imagen por un problema de conexión. Puedes enviar el reporte sin foto.");
      return;
    }
  }

  return (
    <div className="space-y-sm">
      <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-outline-variant bg-surface-container-lowest p-xl text-center transition-colors hover:bg-surface-container-low">
        <input className="sr-only" type="file" accept="image/jpeg,image/png,image/webp,image/heic,image/heif" capture="environment" onChange={(e) => handleFile(e.target.files?.[0])} />
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="Vista previa" className="mb-sm aspect-video w-full rounded-lg object-cover grayscale" />
        ) : (
          <span className="material-symbols-outlined mb-sm text-[40px] text-on-surface-variant">cloud_upload</span>
        )}
        <p className="font-subtitulo text-[16px] text-primary">Haz clic para subir evidencia</p>
        <p className="font-etiqueta text-etiqueta text-on-surface-variant">JPG, PNG o WEBP. Máximo 5 MB.</p>
      </label>
      {mensaje ? <p className="text-sm text-on-surface-variant">{mensaje}</p> : null}
    </div>
  );
}
