import type { EstadoReporte, NivelPrioridad } from "@prisma/client";
import { Badge } from "@/components/ui/Badge";
import { etiquetasEstadoReporte, etiquetasPrioridad } from "@/lib/utils";

export function ReportStatusBadge({ estado, prioridad }: { estado?: EstadoReporte; prioridad?: NivelPrioridad }) {
  if (prioridad === "ALTA") return <Badge destacado>Prioridad alta</Badge>;
  return <Badge>{estado ? etiquetasEstadoReporte[estado] : prioridad ? etiquetasPrioridad[prioridad] : "Sin estado"}</Badge>;
}
