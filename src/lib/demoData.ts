import { EstadoReporte, NivelPrioridad, NivelRiesgo, RolUsuario, TipoProblema, type ReporteZonaOscura } from "@prisma/client";

export const reportesDemo: ReporteZonaOscura[] = [
  reporte("demo-1", "ZO-2026-0001", "Av. Próceres de la Independencia cdra. 18", "San Juan de Lurigancho", -12.0087, -77.0055, TipoProblema.LUZ_APAGADA, NivelRiesgo.ALTO, EstadoReporte.PENDIENTE, NivelPrioridad.ALTA, "Zona con tránsito peatonal nocturno y luminarias apagadas cerca de paradero."),
  reporte("demo-2", "ZO-2026-0002", "Av. Aviación con Jr. Humboldt", "La Victoria", -12.0686, -77.0128, TipoProblema.ZONA_COMPLETAMENTE_OSCURA, NivelRiesgo.ALTO, EstadoReporte.EN_EVALUACION, NivelPrioridad.ALTA, "Tramo oscuro usado por estudiantes y trabajadores al salir de la estación cercana."),
  reporte("demo-3", "ZO-2026-0003", "Av. Túpac Amaru cdra. 42", "Comas", -11.9392, -77.0598, TipoProblema.SIN_POSTE_LUZ, NivelRiesgo.ALTO, EstadoReporte.EN_PROCESO, NivelPrioridad.ALTA, "Sector sin poste operativo en zona residencial con alto flujo vecinal."),
  reporte("demo-4", "ZO-2026-0004", "Av. Universitaria con Av. Antúnez de Mayolo", "Los Olivos", -11.9913, -77.0724, TipoProblema.LUMINARIA_INTERMITENTE, NivelRiesgo.MEDIO, EstadoReporte.PENDIENTE, NivelPrioridad.MEDIA, "Luminaria intermitente en cruce vehicular y peatonal."),
  reporte("demo-5", "ZO-2026-0005", "Jr. Huancavelica cdra. 6", "Cercado de Lima", -12.0503, -77.0365, TipoProblema.LUZ_APAGADA, NivelRiesgo.MEDIO, EstadoReporte.ATENDIDO, NivelPrioridad.MEDIA, "Reporte atendido con reposición de luminaria LED."),
  reporte("demo-6", "ZO-2026-0006", "Av. Revolución cdra. 12", "Villa El Salvador", -12.2135, -76.9363, TipoProblema.ZONA_COMPLETAMENTE_OSCURA, NivelRiesgo.ALTO, EstadoReporte.PENDIENTE, NivelPrioridad.ALTA, "Zona oscura cerca de ruta de transporte público y comercio local."),
  reporte("demo-7", "ZO-2026-0007", "Av. Perú cdra. 31", "San Martín de Porres", -12.0145, -77.0882, TipoProblema.SIN_POSTE_LUZ, NivelRiesgo.MEDIO, EstadoReporte.ATENDIDO, NivelPrioridad.MEDIA, "Intervención municipal registrada para evitar duplicidad de atención."),
  reporte("demo-8", "ZO-2026-0008", "Av. Nicolás Ayllón con Separadora Industrial", "Ate", -12.0614, -76.9331, TipoProblema.LUZ_APAGADA, NivelRiesgo.MEDIO, EstadoReporte.EN_EVALUACION, NivelPrioridad.MEDIA, "Vecinos reportan poca visibilidad durante recorridos nocturnos."),
  reporte("demo-9", "ZO-2026-0009", "Malecón Grau cdra. 4", "Chorrillos", -12.1648, -77.0253, TipoProblema.LUMINARIA_INTERMITENTE, NivelRiesgo.BAJO, EstadoReporte.ATENDIDO, NivelPrioridad.BAJA, "Luminaria reparada en zona de tránsito recreativo."),
  reporte("demo-10", "ZO-2026-0010", "Jr. Cajamarca con Av. Francisco Pizarro", "Rímac", -12.0337, -77.0348, TipoProblema.LUZ_APAGADA, NivelRiesgo.MEDIO, EstadoReporte.RECHAZADO, NivelPrioridad.BAJA, "Reporte descartado por duplicidad con intervención registrada.")
];

export function obtenerMetricasDemo(reportes: ReporteZonaOscura[] = reportesDemo) {
  return {
    total: reportes.length,
    pendientes: reportes.filter((reporte) => reporte.estado === "PENDIENTE").length,
    atendidos: reportes.filter((reporte) => reporte.estado === "ATENDIDO").length,
    criticos: reportes.filter((reporte) => reporte.prioridad === "ALTA" || reporte.nivelRiesgo === "ALTO").length
  };
}

export function obtenerResumenDistritosDemo(reportes: ReporteZonaOscura[] = reportesDemo) {
  const counts = new Map<string, number>();
  reportes.forEach((reporte) => counts.set(reporte.distrito, (counts.get(reporte.distrito) ?? 0) + 1));
  return Array.from(counts.entries())
    .map(([distrito, count]) => ({ distrito, _count: count }))
    .sort((a, b) => b._count - a._count);
}

export function obtenerReporteDemoPorId(id: string) {
  const reporte = reportesDemo.find((item) => item.id === id || item.codigo === id);
  if (!reporte) return null;

  const ciudadano = {
    id: "demo-ciudadano",
    nombres: "María",
    apellidos: "Torres",
    correo: "ciudadano@zonaoscura.pe",
    claveHash: "",
    rol: RolUsuario.CIUDADANO,
    estado: "ACTIVO" as const,
    distrito: reporte.distrito,
    fechaCreacion: reporte.fechaCreacion,
    fechaActualizacion: reporte.fechaActualizacion
  };

  const municipal = {
    id: "demo-municipal",
    nombres: "Jhan",
    apellidos: "Pérez",
    correo: "municipal@zonaoscura.pe",
    claveHash: "",
    rol: RolUsuario.MUNICIPAL,
    estado: "ACTIVO" as const,
    distrito: null,
    fechaCreacion: reporte.fechaCreacion,
    fechaActualizacion: reporte.fechaActualizacion
  };

  return {
    ...reporte,
    ciudadano,
    funcionarioAsignado: reporte.funcionarioAsignadoId ? municipal : null,
    imagenes: [
      {
        id: `${reporte.id}-img`,
        reporteId: reporte.id,
        urlImagen: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?q=80&w=1200&auto=format&fit=crop",
        claveStorage: null,
        nombreArchivo: `${reporte.codigo}.jpg`,
        tipoArchivo: "image/jpeg",
        tamanioBytes: 240000,
        fechaCreacion: reporte.fechaCreacion
      }
    ],
    comentarios: [],
    confirmaciones: Array.from({ length: reporte.prioridad === "ALTA" ? 8 : reporte.prioridad === "MEDIA" ? 4 : 1 }, (_, index) => ({
      id: `${reporte.id}-conf-${index}`,
      reporteId: reporte.id,
      usuarioId: `demo-user-${index}`,
      fechaCreacion: reporte.fechaCreacion
    })),
    historialEstados: [
      {
        id: `${reporte.id}-hist-1`,
        reporteId: reporte.id,
        cambiadoPorId: reporte.funcionarioAsignadoId ?? ciudadano.id,
        estadoAnterior: null,
        estadoNuevo: reporte.estado,
        nota: "Registro de referencia para el prototipo académico.",
        fechaCreacion: reporte.fechaCreacion,
        cambiadoPor: reporte.funcionarioAsignadoId ? municipal : ciudadano
      }
    ],
    intervenciones: []
  };
}

function reporte(
  id: string,
  codigo: string,
  direccion: string,
  distrito: string,
  latitud: number,
  longitud: number,
  tipoProblema: TipoProblema,
  nivelRiesgo: NivelRiesgo,
  estado: EstadoReporte,
  prioridad: NivelPrioridad,
  descripcion: string
): ReporteZonaOscura {
  const numero = Number(id.replace("demo-", ""));
  const fechaCreacion = new Date(`2026-05-${String(20 - numero).padStart(2, "0")}T19:30:00-05:00`);
  return {
    id,
    codigo,
    titulo: null,
    direccion,
    referencia: null,
    distrito,
    latitud,
    longitud,
    tipoProblema,
    nivelRiesgo,
    descripcion,
    estado,
    prioridad,
    ciudadanoId: "demo-ciudadano",
    funcionarioAsignadoId: estado === EstadoReporte.PENDIENTE ? null : "demo-municipal",
    fechaSolucion: estado === EstadoReporte.ATENDIDO ? new Date("2026-05-08T10:00:00-05:00") : null,
    fechaCreacion,
    fechaActualizacion: fechaCreacion
  };
}
