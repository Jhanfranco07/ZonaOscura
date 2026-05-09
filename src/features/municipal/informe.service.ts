import { jsPDF } from "jspdf";
import { obtenerPrioridadesMunicipales } from "@/features/municipal/prioridad.service";
import { reportesDemo } from "@/lib/demoData";
import { etiquetasEstadoReporte, etiquetasPrioridad, etiquetasTipoProblema, formatearFecha } from "@/lib/utils";

type ReporteInforme = Awaited<ReturnType<typeof obtenerPrioridadesMunicipales>>[number];

export async function generarInformeOperativo() {
  let reportes: ReporteInforme[] = [];
  let origen = "Base de datos Supabase";

  try {
    reportes = await obtenerPrioridadesMunicipales();
  } catch {
    origen = "Datos demostrativos del prototipo";
    reportes = reportesDemo.map((reporte) => ({ ...reporte, _count: { confirmaciones: reporte.prioridad === "ALTA" ? 8 : 3 } })) as ReporteInforme[];
  }

  return crearPdfInforme(reportes, origen);
}

function crearPdfInforme(reportes: ReporteInforme[], origen: string) {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;
  let y = 16;

  const total = reportes.length;
  const pendientes = reportes.filter((r) => r.estado === "PENDIENTE").length;
  const evaluacion = reportes.filter((r) => r.estado === "EN_EVALUACION").length;
  const proceso = reportes.filter((r) => r.estado === "EN_PROCESO").length;
  const atendidos = reportes.filter((r) => r.estado === "ATENDIDO").length;
  const criticos = reportes.filter((r) => r.prioridad === "ALTA" || r.nivelRiesgo === "ALTO").length;

  doc.setFillColor(16, 33, 63);
  doc.rect(0, 0, pageWidth, 40, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("ZonaOscura", margin, y);
  y += 8;
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("Informe operativo de zonas oscuras", margin, y);
  y += 7;
  doc.setFontSize(9);
  doc.text(`Generado: ${new Date().toLocaleString("es-PE")} | Fuente: ${origen}`, margin, y);

  y = 50;
  doc.setTextColor(16, 33, 63);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("1. Resumen ejecutivo", margin, y);
  y += 7;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  y = addParagraph(
    doc,
    `El presente informe consolida los reportes ciudadanos registrados en ZonaOscura para apoyar la toma de decisiones municipales sobre mantenimiento e instalación de luminarias. Se priorizan las zonas con mayor nivel de riesgo, mayor cantidad de confirmaciones ciudadanas y estado pendiente de atención.`,
    margin,
    y,
    contentWidth
  );

  y += 5;
  y = drawMetricGrid(doc, [
    ["Reportes", String(total)],
    ["Pendientes", String(pendientes)],
    ["En evaluación", String(evaluacion)],
    ["En proceso", String(proceso)],
    ["Atendidos", String(atendidos)],
    ["Críticos", String(criticos)]
  ], margin, y);
  y += 10;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("2. Criterios de priorización", margin, y);
  y += 7;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const criterios = [
    "Nivel de riesgo reportado por el ciudadano.",
    "Cantidad de confirmaciones de vecinos o usuarios.",
    "Estado actual del reporte y fecha de registro.",
    "Tipo de problema de alumbrado público identificado."
  ];
  criterios.forEach((criterio) => {
    doc.text(`- ${criterio}`, margin + 2, y);
    y += 6;
  });

  y += 4;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("3. Reportes priorizados", margin, y);
  y += 7;
  y = drawReportsTable(doc, reportes.slice(0, 14), margin, y, contentWidth);

  if (y > 230) {
    doc.addPage();
    y = 18;
  }

  y += 6;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("4. Recomendación operativa", margin, y);
  y += 7;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  y = addParagraph(
    doc,
    `Se recomienda iniciar la intervención por los reportes de prioridad alta, especialmente aquellos en estado pendiente o en evaluación. Para evitar duplicidad de trabajo, el equipo municipal debe contrastar este listado con el historial de zonas atendidas antes de programar cuadrillas.`,
    margin,
    y,
    contentWidth
  );

  y += 8;
  doc.setFillColor(254, 243, 199);
  doc.roundedRect(margin, y, contentWidth, 22, 2, 2, "F");
  doc.setTextColor(120, 53, 15);
  doc.setFont("helvetica", "bold");
  doc.text("Nota para la actividad", margin + 4, y + 7);
  doc.setFont("helvetica", "normal");
  doc.text("Este documento evidencia la funcionalidad US04: generación de informe priorizado.", margin + 4, y + 14);

  addFooter(doc);
  return Buffer.from(doc.output("arraybuffer"));
}

function drawMetricGrid(doc: jsPDF, metrics: [string, string][], x: number, y: number) {
  const cardWidth = 50;
  const cardHeight = 18;
  const gapX = 8;
  const gapY = 6;
  metrics.forEach(([label, value], index) => {
    const col = index % 3;
    const row = Math.floor(index / 3);
    const left = x + col * (cardWidth + gapX);
    const top = y + row * (cardHeight + gapY);
    doc.setFillColor(241, 245, 249);
    doc.roundedRect(left, top, cardWidth, cardHeight, 2, 2, "F");
    doc.setTextColor(82, 96, 113);
    doc.setFontSize(8);
    doc.text(label, left + 3, top + 6);
    doc.setTextColor(16, 33, 63);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text(value, left + 3, top + 14);
    doc.setFont("helvetica", "normal");
  });
  const rows = Math.ceil(metrics.length / 3);
  return y + rows * cardHeight + (rows - 1) * gapY;
}

function drawReportsTable(doc: jsPDF, reportes: ReporteInforme[], x: number, y: number, width: number) {
  const col = [22, 54, 28, 28, 24, 24];
  const headers = ["Código", "Dirección", "Distrito", "Problema", "Estado", "Prioridad"];

  doc.setFillColor(16, 33, 63);
  doc.rect(x, y, width, 8, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  let cx = x + 2;
  headers.forEach((header, index) => {
    doc.text(header, cx, y + 5.5);
    cx += col[index];
  });
  y += 8;

  reportes.forEach((reporte, index) => {
    if (y > 270) {
      doc.addPage();
      y = 18;
    }

    doc.setFillColor(index % 2 === 0 ? 248 : 241, index % 2 === 0 ? 250 : 245, index % 2 === 0 ? 252 : 249);
    doc.rect(x, y, width, 11, "F");
    doc.setTextColor(23, 32, 51);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    const values = [
      reporte.codigo,
      truncate(reporte.direccion, 34),
      truncate(reporte.distrito, 16),
      truncate(etiquetasTipoProblema[reporte.tipoProblema], 18),
      truncate(etiquetasEstadoReporte[reporte.estado], 14),
      etiquetasPrioridad[reporte.prioridad]
    ];
    cx = x + 2;
    values.forEach((value, valueIndex) => {
      doc.text(value, cx, y + 6.8);
      cx += col[valueIndex];
    });
    y += 11;
  });

  y += 4;
  doc.setFontSize(9);
  doc.setTextColor(82, 96, 113);
  doc.text(`Total listado: ${reportes.length} reportes | Fecha más reciente: ${reportes[0] ? formatearFecha(reportes[0].fechaCreacion) : "Sin datos"}`, x, y);
  return y;
}

function addParagraph(doc: jsPDF, text: string, x: number, y: number, width: number) {
  const lines = doc.splitTextToSize(text, width);
  doc.text(lines, x, y);
  return y + lines.length * 5;
}

function addFooter(doc: jsPDF) {
  const pages = doc.getNumberOfPages();
  for (let page = 1; page <= pages; page += 1) {
    doc.setPage(page);
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text(`ZonaOscura | Informe operativo | Página ${page} de ${pages}`, 14, 290);
  }
}

function truncate(value: string, max: number) {
  return value.length > max ? `${value.slice(0, max - 1)}…` : value;
}
