import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variante?: "primario" | "secundario" | "fantasma";
};

export function Button({ className, variante = "primario", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-sm rounded-lg px-md py-sm font-subtitulo text-[16px] transition-colors disabled:cursor-not-allowed disabled:opacity-60",
        variante === "primario" && "bg-safety-blue text-white shadow-[0_10px_24px_rgba(37,99,235,0.22)] hover:bg-blue-700",
        variante === "secundario" &&
          "border border-outline-variant bg-surface-container-lowest text-primary hover:bg-surface-container-low",
        variante === "fantasma" && "text-on-surface-variant hover:bg-surface-container-low hover:text-primary",
        className
      )}
      {...props}
    />
  );
}
