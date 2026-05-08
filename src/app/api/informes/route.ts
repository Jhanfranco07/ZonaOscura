import { generarInformeOperativo } from "@/lib/pdf";

export const dynamic = "force-dynamic";

export async function GET() {
  const buffer = await generarInformeOperativo().catch(() => {
    return Buffer.from("%PDF-1.3\n% ZonaOscura: configure DATABASE_URL para generar informes reales.\n");
  });
  return new Response(buffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=zonaoscura-informe-operativo.pdf"
    }
  });
}
