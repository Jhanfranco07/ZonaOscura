import { EstadoReporte, NivelPrioridad, NivelRiesgo, RolUsuario, TipoProblema, type ReporteZonaOscura } from "@prisma/client";

type DemoReporteInput = {
  id: string;
  codigo: string;
  direccion: string;
  referencia: string;
  distrito: string;
  latitud: number;
  longitud: number;
  tipoProblema: TipoProblema;
  nivelRiesgo: NivelRiesgo;
  estado: EstadoReporte;
  prioridad: NivelPrioridad;
  descripcion: string;
  confirmaciones: number;
  fecha: string;
};

export const reportesDemoSeed: DemoReporteInput[] = [
  {
    id: "demo-1",
    codigo: "ZO-2026-0001",
    direccion: "Av. Próceres de la Independencia cdra. 18",
    referencia: "Paradero Las Flores, salida de estación San Carlos",
    distrito: "San Juan de Lurigancho",
    latitud: -12.0087,
    longitud: -77.0055,
    tipoProblema: TipoProblema.LUZ_APAGADA,
    nivelRiesgo: NivelRiesgo.ALTO,
    estado: EstadoReporte.PENDIENTE,
    prioridad: NivelPrioridad.ALTA,
    descripcion: "Cuatro luminarias apagadas en una avenida con alto tránsito peatonal nocturno. Vecinos reportan baja visibilidad al salir del transporte público.",
    confirmaciones: 12,
    fecha: "2026-05-18T20:40:00-05:00"
  },
  {
    id: "demo-2",
    codigo: "ZO-2026-0002",
    direccion: "Av. Aviación con Jr. Humboldt",
    referencia: "Cruce cercano a zona comercial de Gamarra",
    distrito: "La Victoria",
    latitud: -12.0686,
    longitud: -77.0128,
    tipoProblema: TipoProblema.ZONA_COMPLETAMENTE_OSCURA,
    nivelRiesgo: NivelRiesgo.ALTO,
    estado: EstadoReporte.EN_EVALUACION,
    prioridad: NivelPrioridad.ALTA,
    descripcion: "Tramo con iluminación muy baja durante cierre de comercios. Trabajadores y estudiantes usan esta ruta en horario nocturno.",
    confirmaciones: 9,
    fecha: "2026-05-17T21:10:00-05:00"
  },
  {
    id: "demo-3",
    codigo: "ZO-2026-0003",
    direccion: "Av. Túpac Amaru cdra. 42",
    referencia: "Frente a losa deportiva vecinal",
    distrito: "Comas",
    latitud: -11.9392,
    longitud: -77.0598,
    tipoProblema: TipoProblema.SIN_POSTE_LUZ,
    nivelRiesgo: NivelRiesgo.ALTO,
    estado: EstadoReporte.EN_PROCESO,
    prioridad: NivelPrioridad.ALTA,
    descripcion: "Sector sin poste operativo en zona residencial. La junta vecinal solicita instalación por acumulación de reportes similares.",
    confirmaciones: 11,
    fecha: "2026-05-16T19:25:00-05:00"
  },
  {
    id: "demo-4",
    codigo: "ZO-2026-0004",
    direccion: "Av. Universitaria con Av. Antúnez de Mayolo",
    referencia: "Cruce peatonal hacia paraderos",
    distrito: "Los Olivos",
    latitud: -11.9913,
    longitud: -77.0724,
    tipoProblema: TipoProblema.LUMINARIA_INTERMITENTE,
    nivelRiesgo: NivelRiesgo.MEDIO,
    estado: EstadoReporte.PENDIENTE,
    prioridad: NivelPrioridad.MEDIA,
    descripcion: "Luminaria intermitente en cruce vehicular y peatonal. La falla aumenta en horas de la noche y afecta la visibilidad del semáforo.",
    confirmaciones: 5,
    fecha: "2026-05-15T22:05:00-05:00"
  },
  {
    id: "demo-5",
    codigo: "ZO-2026-0005",
    direccion: "Jr. Huancavelica cdra. 6",
    referencia: "Cerca a ingreso posterior de galería comercial",
    distrito: "Lima",
    latitud: -12.0503,
    longitud: -77.0365,
    tipoProblema: TipoProblema.LUZ_APAGADA,
    nivelRiesgo: NivelRiesgo.MEDIO,
    estado: EstadoReporte.ATENDIDO,
    prioridad: NivelPrioridad.MEDIA,
    descripcion: "Reporte atendido con reposición de luminaria LED. Se mantiene en historial para evitar duplicidad de intervención.",
    confirmaciones: 4,
    fecha: "2026-05-14T18:50:00-05:00"
  },
  {
    id: "demo-6",
    codigo: "ZO-2026-0006",
    direccion: "Av. Revolución cdra. 12",
    referencia: "Ingreso a zona de comercio vecinal",
    distrito: "Villa El Salvador",
    latitud: -12.2135,
    longitud: -76.9363,
    tipoProblema: TipoProblema.ZONA_COMPLETAMENTE_OSCURA,
    nivelRiesgo: NivelRiesgo.ALTO,
    estado: EstadoReporte.PENDIENTE,
    prioridad: NivelPrioridad.ALTA,
    descripcion: "Zona oscura cerca de ruta de transporte público y comercio local. Vecinos organizados piden priorizar mantenimiento.",
    confirmaciones: 14,
    fecha: "2026-05-13T21:35:00-05:00"
  },
  {
    id: "demo-7",
    codigo: "ZO-2026-0007",
    direccion: "Av. Perú cdra. 31",
    referencia: "Paradero principal y cruce peatonal",
    distrito: "San Martín de Porres",
    latitud: -12.0145,
    longitud: -77.0882,
    tipoProblema: TipoProblema.SIN_POSTE_LUZ,
    nivelRiesgo: NivelRiesgo.MEDIO,
    estado: EstadoReporte.ATENDIDO,
    prioridad: NivelPrioridad.MEDIA,
    descripcion: "Intervención municipal registrada con instalación de luminaria. El caso queda cerrado y visible en historial.",
    confirmaciones: 6,
    fecha: "2026-05-12T20:15:00-05:00"
  },
  {
    id: "demo-8",
    codigo: "ZO-2026-0008",
    direccion: "Av. Nicolás Ayllón con Separadora Industrial",
    referencia: "Puente peatonal y zona industrial",
    distrito: "Ate",
    latitud: -12.0614,
    longitud: -76.9331,
    tipoProblema: TipoProblema.LUZ_APAGADA,
    nivelRiesgo: NivelRiesgo.MEDIO,
    estado: EstadoReporte.EN_EVALUACION,
    prioridad: NivelPrioridad.MEDIA,
    descripcion: "Vecinos y trabajadores reportan poca visibilidad durante recorridos nocturnos en zona industrial.",
    confirmaciones: 7,
    fecha: "2026-05-11T19:45:00-05:00"
  },
  {
    id: "demo-9",
    codigo: "ZO-2026-0009",
    direccion: "Malecón Grau cdra. 4",
    referencia: "Ingreso a zona de caminata costera",
    distrito: "Chorrillos",
    latitud: -12.1648,
    longitud: -77.0253,
    tipoProblema: TipoProblema.LUMINARIA_INTERMITENTE,
    nivelRiesgo: NivelRiesgo.BAJO,
    estado: EstadoReporte.ATENDIDO,
    prioridad: NivelPrioridad.BAJA,
    descripcion: "Luminaria reparada en zona de tránsito recreativo. Se verificó funcionamiento en inspección posterior.",
    confirmaciones: 2,
    fecha: "2026-05-10T18:30:00-05:00"
  },
  {
    id: "demo-10",
    codigo: "ZO-2026-0010",
    direccion: "Jr. Cajamarca con Av. Francisco Pizarro",
    referencia: "Cerca a mercado barrial",
    distrito: "Rímac",
    latitud: -12.0337,
    longitud: -77.0348,
    tipoProblema: TipoProblema.LUZ_APAGADA,
    nivelRiesgo: NivelRiesgo.MEDIO,
    estado: EstadoReporte.RECHAZADO,
    prioridad: NivelPrioridad.BAJA,
    descripcion: "Reporte rechazado por duplicidad. La intervención ya estaba registrada por otro código municipal.",
    confirmaciones: 1,
    fecha: "2026-05-09T20:00:00-05:00"
  },
  {
    id: "demo-11",
    codigo: "ZO-2026-0011",
    direccion: "Av. Los Héroes con Av. San Juan",
    referencia: "Salida de estación y zona de mototaxis",
    distrito: "San Juan de Miraflores",
    latitud: -12.1576,
    longitud: -76.9728,
    tipoProblema: TipoProblema.ZONA_COMPLETAMENTE_OSCURA,
    nivelRiesgo: NivelRiesgo.ALTO,
    estado: EstadoReporte.PENDIENTE,
    prioridad: NivelPrioridad.ALTA,
    descripcion: "Corredor peatonal con baja iluminación y alta circulación nocturna. Se solicita inspección prioritaria por riesgo percibido.",
    confirmaciones: 10,
    fecha: "2026-05-08T21:55:00-05:00"
  },
  {
    id: "demo-12",
    codigo: "ZO-2026-0012",
    direccion: "Av. Javier Prado Este cdra. 52",
    referencia: "Paradero cercano a zona empresarial",
    distrito: "La Molina",
    latitud: -12.0874,
    longitud: -76.9419,
    tipoProblema: TipoProblema.LUMINARIA_INTERMITENTE,
    nivelRiesgo: NivelRiesgo.BAJO,
    estado: EstadoReporte.EN_PROCESO,
    prioridad: NivelPrioridad.BAJA,
    descripcion: "Luminaria intermitente en zona de espera de transporte. Equipo técnico programó revisión de cableado.",
    confirmaciones: 3,
    fecha: "2026-05-07T19:20:00-05:00"
  }
];

export const reportesDemo: ReporteZonaOscura[] = reportesDemoSeed.map((item) => ({
  id: item.id,
  codigo: item.codigo,
  titulo: null,
  direccion: item.direccion,
  referencia: item.referencia,
  distrito: item.distrito,
  latitud: item.latitud,
  longitud: item.longitud,
  tipoProblema: item.tipoProblema,
  nivelRiesgo: item.nivelRiesgo,
  descripcion: item.descripcion,
  estado: item.estado,
  prioridad: item.prioridad,
  ciudadanoId: "demo-ciudadano",
  funcionarioAsignadoId: item.estado === EstadoReporte.PENDIENTE ? null : "demo-municipal",
  fechaSolucion: item.estado === EstadoReporte.ATENDIDO ? new Date("2026-05-19T10:00:00-05:00") : null,
  fechaCreacion: new Date(item.fecha),
  fechaActualizacion: new Date(item.fecha)
}));

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
  const seed = reportesDemoSeed.find((item) => item.id === id || item.codigo === id);
  if (!reporte || !seed) return null;

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
    confirmaciones: Array.from({ length: seed.confirmaciones }, (_, index) => ({
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
