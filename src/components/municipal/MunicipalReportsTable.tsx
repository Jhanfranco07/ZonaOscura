import { ReportsTable } from "@/components/reports/ReportsTable";
import type { ReporteZonaOscura } from "@prisma/client";

export function MunicipalReportsTable({ reportes }: { reportes: ReporteZonaOscura[] }) {
  return <ReportsTable reportes={reportes} />;
}
