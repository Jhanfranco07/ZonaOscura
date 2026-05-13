import * as React from "react";
import { cn } from "@/lib/utils";

export const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, children, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        "theme-control h-10 w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-md py-sm font-texto-general text-texto-general text-primary focus:border-safety-blue focus:outline-none focus:ring-1 focus:ring-safety-blue",
        className
      )}
      {...props}
    >
      {children}
    </select>
  )
);
Select.displayName = "Select";
