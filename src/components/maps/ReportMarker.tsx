export function ReportMarker({ prioridad = "BAJA" }: { prioridad?: "BAJA" | "MEDIA" | "ALTA" }) {
  const color = prioridad === "ALTA" ? "bg-safety-rose" : prioridad === "MEDIA" ? "bg-amber-500" : "bg-safety-blue";
  return <span className={`block h-4 w-4 rounded-full border-2 border-white shadow ${color}`} />;
}
