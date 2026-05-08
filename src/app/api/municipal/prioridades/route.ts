import { NextResponse } from "next/server";
import { obtenerPrioridadesMunicipales } from "@/features/municipal/prioridad.service";
import { reportesDemo } from "@/lib/demoData";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const prioridades = await obtenerPrioridadesMunicipales();
    return NextResponse.json(prioridades);
  } catch {
    return NextResponse.json(reportesDemo.map((reporte) => ({ ...reporte, _count: { confirmaciones: 0 } })));
  }
}
