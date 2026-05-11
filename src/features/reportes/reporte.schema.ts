import { NivelRiesgo, TipoProblema } from "@prisma/client";
import { z } from "zod";
import { limaDistricts } from "@/lib/limaDistricts";

export const reporteSchema = z.object({
  direccion: z.string().min(1, "La dirección es obligatoria."),
  referencia: z.string().optional(),
  distrito: z.string().min(1, "El distrito es obligatorio.").refine((value) => limaDistricts.includes(value), {
    message: "Selecciona un distrito oficial de Lima Metropolitana."
  }),
  tipoProblema: z.nativeEnum(TipoProblema, { required_error: "El tipo de problema es obligatorio." }),
  nivelRiesgo: z.nativeEnum(NivelRiesgo, { required_error: "El nivel de riesgo es obligatorio." }),
  descripcion: z.string().min(10, "La descripción debe tener al menos 10 caracteres."),
  latitud: z.coerce.number({ required_error: "La latitud es obligatoria." }),
  longitud: z.coerce.number({ required_error: "La longitud es obligatoria." }),
  urlImagen: z.string().url().optional().or(z.literal(""))
});

export type ReporteFormValues = z.infer<typeof reporteSchema>;
