import Link from "next/link";
import { notFound } from "next/navigation";
import { ReportDetail } from "@/components/reports/ReportDetail";
import { obtenerReportePorId } from "@/features/reportes/reporte.service";
import { obtenerReporteDemoPorId } from "@/lib/demoData";

export const dynamic = "force-dynamic";

export default async function ReporteDetallePage({ params }: { params: { id: string } }) {
  let reporte = null;
  try {
    reporte = await obtenerReportePorId(params.id);
  } catch (error) {
    console.error("No se pudo obtener el detalle del reporte.", error);
  }

  if (!reporte) {
    reporte = obtenerReporteDemoPorId(params.id) as any;
  }

  if (!reporte) notFound();

  return (
    <div className="flex flex-col gap-lg">
      <Link href="/mapa" className="flex w-max items-center gap-xs font-subtitulo text-subtitulo text-on-surface-variant hover:text-primary">
        <span className="material-symbols-outlined text-[20px]">arrow_back</span>
        Volver al mapa
      </Link>
      <ReportDetail reporte={reporte} />
    </div>
  );
}
