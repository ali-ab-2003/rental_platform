import { cn } from "@/lib/utils";
import React from "react";

interface ImageFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  aspectRatio?: "square" | "video" | "portrait" | "landscape" | "auto";
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  as?: React.ElementType;
}

const aspectRatios = {
  square: "aspect-square",
  video: "aspect-video",
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  auto: "aspect-auto",
};

const roundedStyles = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
};

export function ImageFrame({
  aspectRatio = "auto",
  rounded = "xl",
  as,
  className,
  children,
  ...props
}: ImageFrameProps) {
  const Component = as || "div";

  return (
    <Component
      className={cn(
        "overflow-hidden relative bg-muted",
        aspectRatios[aspectRatio],
        roundedStyles[rounded],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
