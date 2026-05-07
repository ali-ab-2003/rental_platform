import React from "react";
import { Input as BaseInput } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<typeof BaseInput>
>(({ className, ...props }, ref) => (
  <BaseInput
    ref={ref}
    className={cn(
      // Override shadcn styles: taller, softer rounded, subtle border
      "h-12 rounded-xl px-4 border-input/60 focus-visible:ring-1 focus-visible:ring-ring focus-visible:border-ring transition-all bg-background",
      className
    )}
    {...props}
  />
));
Input.displayName = "Input";
