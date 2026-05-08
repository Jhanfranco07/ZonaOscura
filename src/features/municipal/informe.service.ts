import { jsPDF } from "jspdf";
import { obtenerPrioridadesMunicipales } from "@/features/municipal/prioridad.service";
import { etiquetasEstadoReporte, etiquetasTipoProblema } from "@/lib/utils";

export async function generarInformeOperativo() {
  const reportes = await obtenerPrioridadesMunicipales();
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text("ZonaOscura", 14, 16);
  doc.setFontSize(13);
  doc.text("Informe operativo de zonas oscuras", 14, 26);
  doc.setFontSize(10);
  doc.text(`Fecha: ${new Date().toLocaleDateString("es-PE")}`, 14, 34);
  doc.text(`Total de reportes: ${reportes.length}`, 14, 42);
  doc.text(`Pendientes: ${reportes.filter((r) => r.estado === "PENDIENTE").length}`, 14, 50);
  doc.text(`Atendidos: ${reportes.filter((r) => r.estado === "ATENDIDO").length}`, 14, 58);
  doc.text("Tabla de prioridades", 14, 70);

  let y = 80;
  reportes.slice(0, 12).forEach((reporte) => {
    doc.text(
      `${reporte.codigo} - ${reporte.direccion} - ${etiquetasTipoProblema[reporte.tipoProblema]} - ${etiquetasEstadoReporte[reporte.estado]} - ${reporte.prioridad}`,
      14,
      y
    );
    y += 8;
  });

  return Buffer.from(doc.output("arraybuffer"));
}
