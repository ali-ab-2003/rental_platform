import { cn } from "@/lib/utils";
import React from "react";

interface InlineProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: 2 | 4 | 6 | 8 | 12 | 16;
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between";
  wrap?: boolean;
  as?: React.ElementType;
}

export function Inline({
  gap = 4,
  align = "center",
  justify = "start",
  wrap = true,
  as,
  className,
  children,
  ...props
}: InlineProps) {
  const Component = as || "div";

  return (
    <Component
      className={cn(
        "flex",
        {
          "flex-wrap": wrap,
          "gap-2": gap === 2,
          "gap-4": gap === 4,
          "gap-6": gap === 6,
          "gap-8": gap === 8,
          "gap-12": gap === 12,
          "gap-16": gap === 16,
          "items-start": align === "start",
          "items-center": align === "center",
          "items-end": align === "end",
          "items-stretch": align === "stretch",
          "justify-start": justify === "start",
          "justify-center": justify === "center",
          "justify-end": justify === "end",
          "justify-between": justify === "between",
        },
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
