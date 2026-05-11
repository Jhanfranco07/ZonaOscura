import Link from "next/link";
import { Card } from "@/components/ui/Card";

const stories = [
  {
    code: "US01",
    title: "Reportar calle sin iluminación",
    user: "Vecina o junta vecinal",
    path: "/reportes/nuevo",
    icon: "add_location_alt",
    tone: "theme-us-report bg-blue-50 text-blue-700 ring-blue-200",
    iconTone: "theme-us-report-icon text-blue-600"
  },
  {
    code: "US02",
    title: "Visualizar zonas oscuras en mapa",
    user: "Trabajador que transita de noche",
    path: "/mapa",
    icon: "map",
    tone: "theme-us-map bg-cyan-50 text-cyan-700 ring-cyan-200",
    iconTone: "theme-us-map-icon text-cyan-600"
  },
  {
    code: "US03",
    title: "Ver historial de zonas atendidas",
    user: "Servicios públicos municipales",
    path: "/municipal/historial",
    icon: "history",
    tone: "theme-us-history bg-emerald-50 text-emerald-700 ring-emerald-200",
    iconTone: "theme-us-history-icon text-emerald-600"
  },
  {
    code: "US04",
    title: "Generar informe priorizado",
    user: "Representante municipal",
    path: "/municipal/informes",
    icon: "assignment",
    tone: "theme-us-reporting bg-violet-50 text-violet-700 ring-violet-200",
    iconTone: "theme-us-reporting-icon text-violet-600"
  }
];

export function UserStoriesMatrix() {
  return (
    <section className="flex flex-col gap-md">
      <div>
        <h2 className="theme-text-primary font-titulo-seccion text-titulo-seccion text-primary">Cobertura de historias de usuario</h2>
        <p className="theme-text-muted mt-xs text-sm text-on-surface-variant">Trazabilidad directa entre la actividad académica y las pantallas del prototipo.</p>
      </div>
      <div className="grid grid-cols-1 gap-md md:grid-cols-2 xl:grid-cols-4">
        {stories.map((story) => (
          <Card key={story.code} className="theme-surface p-md transition-all hover:-translate-y-0.5 hover:border-blue-200">
            <div className="flex items-start justify-between gap-md">
              <span className={`rounded-full px-sm py-xs text-xs font-bold ring-1 ${story.tone}`}>{story.code}</span>
              <span className={`material-symbols-outlined ${story.iconTone}`}>{story.icon}</span>
            </div>
            <h3 className="theme-text-primary mt-md min-h-[48px] font-subtitulo text-[17px] font-semibold text-primary">{story.title}</h3>
            <p className="theme-text-muted mt-xs text-sm text-on-surface-variant">{story.user}</p>
            <Link href={story.path} className="theme-accent mt-md inline-flex items-center gap-xs text-sm font-semibold text-safety-blue hover:text-primary">
              Ver pantalla
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </Card>
        ))}
      </div>
    </section>
  );
}
