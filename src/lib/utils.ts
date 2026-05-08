import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatearFecha(fecha: Date | string) {
  return new Intl.DateTimeFormat("es-PE", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(new Date(fecha));
}

export function formatearFechaHora(fecha: Date | string) {
  return new Intl.DateTimeFormat("es-PE", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(fecha));
}

export const etiquetasTipoProblema: Record<string, string> = {
  LUZ_APAGADA: "Luz apagada",
  SIN_POSTE_LUZ: "Sin poste de luz",
  LUMINARIA_INTERMITENTE: "Luminaria intermitente",
  ZONA_COMPLETAMENTE_OSCURA: "Zona completamente oscura"
};

export const etiquetasEstadoReporte: Record<string, string> = {
  PENDIENTE: "Pendiente",
  EN_EVALUACION: "En evaluación",
  EN_PROCESO: "En proceso",
  ATENDIDO: "Atendido",
  RECHAZADO: "Rechazado"
};

export const etiquetasPrioridad: Record<string, string> = {
  BAJA: "Baja",
  MEDIA: "Media",
  ALTA: "Alta"
};
