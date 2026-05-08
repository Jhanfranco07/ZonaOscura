import bcrypt from "bcryptjs";
import { RolUsuario } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export async function registrarUsuario(data: {
  nombres: string;
  apellidos?: string;
  correo: string;
  clave: string;
  distrito?: string;
  rol?: RolUsuario;
}) {
  const claveHash = await bcrypt.hash(data.clave, 10);
  return prisma.usuario.create({
    data: {
      nombres: data.nombres,
      apellidos: data.apellidos,
      correo: data.correo,
      claveHash,
      distrito: data.distrito,
      rol: data.rol ?? "CIUDADANO"
    }
  });
}
