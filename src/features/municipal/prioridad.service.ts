import { obtenerReportes } from "@/features/reportes/reporte.service";

const pesoPrioridad = { ALTA: 3, MEDIA: 2, BAJA: 1 };

export async function obtenerPrioridadesMunicipales() {
  const reportes = await obtenerReportes();
  return reportes.sort((a, b) => {
    const prioridad = pesoPrioridad[b.prioridad] - pesoPrioridad[a.prioridad];
    if (prioridad !== 0) return prioridad;
    return b._count.confirmaciones - a._count.confirmaciones;
  });
}
