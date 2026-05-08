import { NextResponse } from "next/server";
import { EstadoReporte } from "@prisma/client";
import { obtenerReportePorId } from "@/features/reportes/reporte.service";
import { actualizarEstadoReporte } from "@/features/municipal/municipal.service";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const reporte = await obtenerReportePorId(params.id);
  if (!reporte) return NextResponse.json({ error: "Reporte no encontrado." }, { status: 404 });
  return NextResponse.json(reporte);
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json();
  const funcionario = await prisma.usuario.findFirst({ where: { rol: { in: ["MUNICIPAL", "ADMIN"] } } });
  if (!funcionario) return NextResponse.json({ error: "No existe funcionario municipal." }, { status: 400 });
  const estadoNuevo = body.estadoNuevo as EstadoReporte;
  await actualizarEstadoReporte({
    reporteId: params.id,
    cambiadoPorId: funcionario.id,
    estadoNuevo,
    nota: body.nota,
    funcionarioAsignadoId: funcionario.id
  });
  return NextResponse.json({ mensaje: "Estado actualizado correctamente." });
}
