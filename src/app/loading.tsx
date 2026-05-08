import { Card } from "@/components/ui/Card";

export default function Loading() {
  return (
    <div className="flex flex-col gap-xl">
      <section className="rounded-2xl border border-white/70 bg-gradient-to-r from-primary via-slate-900 to-safety-blue p-lg text-white shadow-[0_18px_45px_rgba(15,23,42,0.18)] lg:p-xl">
        <div className="h-5 w-56 animate-pulse rounded-full bg-amber-300/30" />
        <div className="mt-md h-9 w-full max-w-xl animate-pulse rounded-lg bg-white/20" />
        <div className="mt-sm h-5 w-full max-w-2xl animate-pulse rounded-lg bg-blue-100/20" />
      </section>

      <section className="grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index} className="h-[140px] animate-pulse bg-white/80 p-md">
            <div className="h-4 w-28 rounded bg-slate-200" />
            <div className="mt-xl h-8 w-16 rounded bg-slate-200" />
          </Card>
        ))}
      </section>

      <div className="grid grid-cols-1 gap-gutter lg:grid-cols-12">
        <Card className="h-56 animate-pulse bg-white/80 lg:col-span-8" />
        <Card className="h-56 animate-pulse bg-white/80 lg:col-span-4" />
      </div>
    </div>
  );
}
