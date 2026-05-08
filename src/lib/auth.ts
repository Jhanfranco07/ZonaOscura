import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import type { RolUsuario } from "@prisma/client";
import { authOptions } from "@/features/auth/auth.config";

export async function obtenerSesion() {
  return getServerSession(authOptions);
}

export async function requerirRol(roles: RolUsuario[]) {
  const session = await obtenerSesion();
  if (!session?.user) redirect("/auth/login");
  if (!roles.includes(session.user.rol)) redirect("/");
  return session;
}
