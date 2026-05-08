import { NextResponse } from "next/server";
import { obtenerReportes } from "@/features/reportes/reporte.service";
import { reportesDemo } from "@/lib/demoData";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const reportes = await obtenerReportes();
    return NextResponse.json(reportes);
  } catch {
    return NextResponse.json(reportesDemo);
  }
}
