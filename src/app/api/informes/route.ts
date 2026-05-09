import { generarInformeOperativo } from "@/lib/pdf";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const buffer = await generarInformeOperativo();
    return new Response(buffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=zonaoscura-informe-operativo.pdf",
        "Cache-Control": "no-store"
      }
    });
  } catch (error) {
    console.error("Error al generar informe PDF", error);
    return Response.json({ error: "No se pudo generar el informe operativo." }, { status: 500 });
  }
}
