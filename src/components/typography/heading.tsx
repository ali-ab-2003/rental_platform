import { cn } from "@/lib/utils";
import React from "react";

type HeadingLevel = "h1" | "h2" | "h3" | "h4";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: HeadingLevel;
  as?: HeadingLevel;
}

const headingVariants: Record<HeadingLevel, string> = {
  h1: "text-4xl md:text-5xl lg:text-6xl tracking-tight font-light leading-tight",
  h2: "text-3xl md:text-4xl tracking-tight font-light leading-snug",
  h3: "text-xl md:text-2xl tracking-tight font-normal leading-snug",
  h4: "text-sm md:text-base font-medium uppercase tracking-widest text-muted-foreground",
};

export function Heading({
  level = "h2",
  as,
  className,
  children,
  ...props
}: HeadingProps) {
  const Component = as || level;
  const defaultClass = headingVariants[level];

  return (
    <Component className={cn(defaultClass, className)} {...props}>
      {children}
    </Component>
  );
}
