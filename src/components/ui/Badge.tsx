import { cn } from "@/lib/utils";

type BadgeProps = {
  children: React.ReactNode;
  destacado?: boolean;
  className?: string;
};

export function Badge({ children, destacado, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-sm py-xs font-etiqueta text-etiqueta font-semibold",
        destacado
          ? "border-amber-400 bg-amber-100 text-amber-600"
          : "border-slate-200 bg-slate-100 text-slate-700",
        className
      )}
    >
      {children}
    </span>
  );
}
