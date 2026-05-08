import { ReportForm } from "@/components/reports/ReportForm";

export default function NuevoReportePage() {
  return (
    <div className="flex flex-col gap-lg">
      <section className="rounded-lg border border-amber-100 bg-white/85 p-lg shadow-sm">
        <p className="font-etiqueta text-etiqueta font-semibold uppercase text-amber-600">US01 · reporte colaborativo</p>
        <h1 className="mt-xs font-titulo-principal text-titulo-principal text-primary">Registrar nueva zona oscura</h1>
        <p className="mt-xs max-w-3xl text-on-surface-variant">
          Completa la ubicación, evidencia y descripción del problema para alertar a otros usuarios y apoyar la atención municipal.
        </p>
      </section>
      <ReportForm />
    </div>
  );
}
