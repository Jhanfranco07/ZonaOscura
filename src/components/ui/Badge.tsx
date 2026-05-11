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
        "inline-flex items-center rounded-lg px-sm py-xs font-etiqueta text-[12px] font-bold leading-4 ring-1",
        destacado
          ? "theme-badge-high bg-orange-50 text-orange-700 ring-orange-200"
          : "theme-badge-neutral bg-slate-100 text-slate-700 ring-slate-200",
        className
      )}
    >
      {children}
    </span>
  );
}
