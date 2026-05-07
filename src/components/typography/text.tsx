import { cn } from "@/lib/utils";
import React from "react";

type TextVariant = "body" | "muted" | "micro" | "lead";

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: TextVariant;
  as?: React.ElementType;
}

const textVariants: Record<TextVariant, string> = {
  body: "text-base leading-relaxed text-foreground",
  muted: "text-sm text-muted-foreground",
  micro: "text-xs uppercase tracking-widest text-muted-foreground",
  lead: "text-lg md:text-xl leading-relaxed text-muted-foreground",
};

export function Text({
  variant = "body",
  as,
  className,
  children,
  ...props
}: TextProps) {
  const Component = as || "p";
  const defaultClass = textVariants[variant];

  return (
    <Component className={cn(defaultClass, className)} {...props}>
      {children}
    </Component>
  );
}
