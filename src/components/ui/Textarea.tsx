import * as React from "react";
import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "min-h-[112px] w-full resize-y rounded-lg border border-outline-variant bg-surface-container-lowest px-md py-sm font-texto-general text-texto-general text-primary placeholder:text-on-surface-variant focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary",
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";
