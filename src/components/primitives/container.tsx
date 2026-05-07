import { cn } from "@/lib/utils";
import React from "react";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "default" | "narrow" | "wide";
  as?: React.ElementType;
}

const containerVariants: Record<NonNullable<ContainerProps["size"]>, string> = {
  default: "max-w-7xl",
  narrow: "max-w-5xl",
  wide: "max-w-screen-2xl",
};

export function Container({
  size = "default",
  as,
  className,
  children,
  ...props
}: ContainerProps) {
  const Component = as || "div";
  const defaultClass = containerVariants[size];

  return (
    <Component
      className={cn("mx-auto w-full px-6 md:px-8", defaultClass, className)}
      {...props}
    >
      {children}
    </Component>
  );
}
