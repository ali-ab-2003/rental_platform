import { cn } from "@/lib/utils";
import React from "react";

interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: 2 | 4 | 6 | 8 | 12 | 16 | 24 | 32;
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between";
  as?: React.ElementType;
}

export function Stack({
  gap = 4,
  align = "stretch",
  justify = "start",
  as,
  className,
  children,
  ...props
}: StackProps) {
  const Component = as || "div";

  return (
    <Component
      className={cn(
        "flex flex-col",
        {
          "gap-2": gap === 2,
          "gap-4": gap === 4,
          "gap-6": gap === 6,
          "gap-8": gap === 8,
          "gap-12": gap === 12,
          "gap-16": gap === 16,
          "gap-24": gap === 24,
          "gap-32": gap === 32,
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
