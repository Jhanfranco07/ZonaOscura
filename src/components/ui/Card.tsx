import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-lg border border-white/80 bg-white/95 shadow-[0_12px_32px_rgba(15,23,42,0.07)] ring-1 ring-slate-200/75 backdrop-blur",
        className
      )}
      {...props}
    />
  );
}
