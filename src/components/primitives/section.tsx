import { cn } from "@/lib/utils";
import React from "react";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  spacing?: "default" | "lg" | "xl" | "none";
  as?: React.ElementType;
}

const sectionVariants: Record<NonNullable<SectionProps["spacing"]>, string> = {
  default: "py-16 md:py-24",
  lg: "py-24 md:py-32",
  xl: "py-32 md:py-48",
  none: "py-0",
};

export function Section({
  spacing = "default",
  as,
  className,
  children,
  ...props
}: SectionProps) {
  const Component = as || "section";
  const defaultClass = sectionVariants[spacing];

  return (
    <Component className={cn(defaultClass, className)} {...props}>
      {children}
    </Component>
  );
}
