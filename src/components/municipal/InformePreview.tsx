import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export function InformePreview() {
  return (
    <Card className="p-lg">
      <h2 className="border-b border-outline-variant pb-sm font-subtitulo text-subtitulo text-primary">Informe operativo</h2>
      <div className="mt-md space-y-md">
        <input className="w-full rounded border border-outline-variant p-sm" placeholder="Nombre del informe" defaultValue="Informe operativo de zonas oscuras" />
        <select className="w-full rounded border border-outline-variant p-sm" defaultValue="pdf">
          <option value="pdf">PDF Documento (.pdf)</option>
        </select>
        <div className="space-y-sm text-sm">
          <label className="flex gap-sm"><input type="checkbox" defaultChecked /> Resumen ejecutivo</label>
          <label className="flex gap-sm"><input type="checkbox" defaultChecked /> Tabla de prioridades</label>
          <label className="flex gap-sm"><input type="checkbox" defaultChecked /> Reportes pendientes y atendidos</label>
          <label className="flex gap-sm"><input type="checkbox" /> Evidencia fotográfica</label>
        </div>
        <a href="/api/informes" target="_blank">
          <Button className="w-full" type="button">
            <span className="material-symbols-outlined">download</span>
            Descargar PDF
          </Button>
        </a>
      </div>
    </Card>
  );
}
