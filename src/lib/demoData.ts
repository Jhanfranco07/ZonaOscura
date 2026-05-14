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
    direccion: "Av. Paul Poblet Lind cdra. 7",
    referencia: "Frente al paradero de ingreso a la zona arqueologica de Pachacamac",
    distrito: "Pachacámac",
    latitud: -12.2301,
    longitud: -76.8617,
    tipoProblema: TipoProblema.ZONA_COMPLETAMENTE_OSCURA,
    nivelRiesgo: NivelRiesgo.ALTO,
    estado: EstadoReporte.PENDIENTE,
    prioridad: NivelPrioridad.ALTA,
    descripcion:
      "El tramo queda completamente oscuro desde las 7:00 p. m. y es usado por vecinos que regresan del paradero principal. La falta de iluminacion afecta el cruce peatonal, dificulta ver vehiculos que doblan hacia las calles internas y genera temor en estudiantes y adultos mayores que caminan por la zona.",
    confirmaciones: 12,
    fecha: "2026-05-18T20:40:00-05:00"
  },
  {
    id: "demo-2",
    codigo: "ZO-2026-0002",
    direccion: "Av. Victor Malasquez con Calle Los Ficus",
    referencia: "Ingreso a sector residencial de Pachacamac",
    distrito: "Pachacámac",
    latitud: -12.2096,
    longitud: -76.8878,
    tipoProblema: TipoProblema.SIN_POSTE_LUZ,
    nivelRiesgo: NivelRiesgo.ALTO,
    estado: EstadoReporte.EN_EVALUACION,
    prioridad: NivelPrioridad.ALTA,
    descripcion:
      "No existe poste operativo en la esquina y la iluminacion de viviendas cercanas no alcanza la vereda. En horas de la noche se forman zonas ciegas junto a un terreno sin cerco, por lo que los vecinos solicitan inspeccion tecnica y programacion de instalacion o reposicion de luminaria publica.",
    confirmaciones: 9,
    fecha: "2026-05-17T21:10:00-05:00"
  },
  {
    id: "demo-3",
    codigo: "ZO-2026-0003",
    direccion: "Av. Revolucion cdra. 12",
    referencia: "Ingreso a zona de comercio vecinal",
    distrito: "Villa El Salvador",
    latitud: -12.2135,
    longitud: -76.9363,
    tipoProblema: TipoProblema.LUZ_APAGADA,
    nivelRiesgo: NivelRiesgo.ALTO,
    estado: EstadoReporte.EN_PROCESO,
    prioridad: NivelPrioridad.ALTA,
    descripcion:
      "Tres luminarias permanecen apagadas en una cuadra con paraderos, bodegas y circulacion constante de mototaxis. El problema se repite desde hace varios dias y obliga a los peatones a caminar por la pista para evitar una zona sin visibilidad cerca de locales cerrados.",
    confirmaciones: 11,
    fecha: "2026-05-16T19:25:00-05:00"
  },
  {
    id: "demo-4",
    codigo: "ZO-2026-0004",
    direccion: "Av. Nicolas Ayllon con Separadora Industrial",
    referencia: "Puente peatonal cercano a zona industrial",
    distrito: "Ate",
    latitud: -12.0614,
    longitud: -76.9331,
    tipoProblema: TipoProblema.LUMINARIA_INTERMITENTE,
    nivelRiesgo: NivelRiesgo.MEDIO,
    estado: EstadoReporte.PENDIENTE,
    prioridad: NivelPrioridad.MEDIA,
    descripcion:
      "La luminaria del puente peatonal parpadea durante varios minutos y luego se apaga por completo. Trabajadores de turno noche reportan que el acceso queda con poca visibilidad, especialmente cuando hay buses detenidos que bloquean la luz de comercios cercanos.",
    confirmaciones: 6,
    fecha: "2026-05-15T22:05:00-05:00"
  },
  {
    id: "demo-5",
    codigo: "ZO-2026-0005",
    direccion: "Av. Proceres de la Independencia cdra. 18",
    referencia: "Paradero Las Flores, salida de estacion San Carlos",
    distrito: "San Juan de Lurigancho",
    latitud: -12.0087,
    longitud: -77.0055,
    tipoProblema: TipoProblema.ZONA_COMPLETAMENTE_OSCURA,
    nivelRiesgo: NivelRiesgo.ALTO,
    estado: EstadoReporte.PENDIENTE,
    prioridad: NivelPrioridad.ALTA,
    descripcion:
      "El paradero y el cruce lateral quedan con sombra intensa despues del cierre de comercios. Usuarios del transporte publico indican que deben usar la linterna del celular para identificar la vereda y los desniveles, lo que incrementa la percepcion de inseguridad.",
    confirmaciones: 14,
    fecha: "2026-05-14T18:50:00-05:00"
  },
  {
    id: "demo-6",
    codigo: "ZO-2026-0006",
    direccion: "Malecón Grau cdra. 4",
    referencia: "Ingreso a zona de caminata costera",
    distrito: "Chorrillos",
    latitud: -12.1648,
    longitud: -77.0253,
    tipoProblema: TipoProblema.LUMINARIA_INTERMITENTE,
    nivelRiesgo: NivelRiesgo.BAJO,
    estado: EstadoReporte.ATENDIDO,
    prioridad: NivelPrioridad.BAJA,
    descripcion:
      "La luminaria presentaba intermitencia en un tramo recreativo usado por familias y corredores. La cuadrilla municipal reemplazo el componente defectuoso y verifico el funcionamiento durante una inspeccion nocturna posterior.",
    confirmaciones: 3,
    fecha: "2026-05-13T21:35:00-05:00"
  },
  {
    id: "demo-7",
    codigo: "ZO-2026-0007",
    direccion: "Av. Aviacion con Jr. Humboldt",
    referencia: "Cruce cercano a zona comercial de Gamarra",
    distrito: "La Victoria",
    latitud: -12.0686,
    longitud: -77.0128,
    tipoProblema: TipoProblema.LUZ_APAGADA,
    nivelRiesgo: NivelRiesgo.MEDIO,
    estado: EstadoReporte.RECHAZADO,
    prioridad: NivelPrioridad.BAJA,
    descripcion:
      "El reporte fue revisado por el equipo municipal y se determino que corresponde a una incidencia duplicada ya registrada en otro codigo. Se mantiene visible para trazabilidad y para evitar que la misma solicitud vuelva a programarse como nueva intervencion.",
    confirmaciones: 2,
    fecha: "2026-05-12T20:15:00-05:00"
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
        nota: "Registro inicial del caso con informacion detallada para seguimiento ciudadano y municipal.",
        fechaCreacion: reporte.fechaCreacion,
        cambiadoPor: reporte.funcionarioAsignadoId ? municipal : ciudadano
      }
    ],
    intervenciones: []
  };
}
