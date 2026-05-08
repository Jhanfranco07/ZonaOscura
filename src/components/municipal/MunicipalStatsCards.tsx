import { StatsCard } from "@/components/dashboard/StatsCard";

export function MunicipalStatsCards({ data }: { data: { total: number; pendientes: number; evaluacion?: number; atendidos: number; criticos?: number } }) {
  return (
    <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-4">
      <StatsCard titulo="Reportes recibidos" valor={data.total} tono="azul" icono={<span className="material-symbols-outlined">inbox</span>} />
      <StatsCard titulo="Pendientes" valor={data.pendientes} tono="ambar" icono={<span className="material-symbols-outlined">pending_actions</span>} />
      <StatsCard titulo="Atendidos" valor={data.atendidos} tono="verde" icono={<span className="material-symbols-outlined">task_alt</span>} />
      <StatsCard titulo="Zonas críticas" valor={data.criticos ?? data.evaluacion ?? 0} destacado icono={<span className="material-symbols-outlined">warning</span>} />
    </div>
  );
}
