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
        variante === "primario" && "bg-primary text-on-primary hover:bg-primary/85",
        variante === "secundario" &&
          "border border-outline-variant bg-surface-container-lowest text-primary hover:bg-surface-container-low",
        variante === "fantasma" && "text-on-surface-variant hover:bg-surface-container-low hover:text-primary",
        className
      )}
      {...props}
    />
  );
}
