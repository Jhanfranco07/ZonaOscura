import type { EstadoReporte, NivelPrioridad, NivelRiesgo, TipoProblema } from "@prisma/client";

export type ReporteResumen = {
  id: string;
  codigo: string;
  direccion: string;
  distrito: string;
  tipoProblema: TipoProblema;
  nivelRiesgo: NivelRiesgo;
  estado: EstadoReporte;
  prioridad: NivelPrioridad;
  fechaCreacion: Date;
  confirmaciones: number;
};

export type FiltrosReporte = {
  distrito?: string;
  estado?: EstadoReporte;
  tipoProblema?: TipoProblema;
  prioridad?: NivelPrioridad;
};
