import React from "react";
import { Button as BaseButton, buttonVariants } from "@/components/ui/button";
import { type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <BaseButton
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          // Override shadcn base sizing for a more generous luxury feel
          "rounded-pill transition-all duration-300",
          {
            "h-12 px-8 text-base": size === "lg",
            "h-10 px-6": size === "default",
            "h-8 px-4 text-xs": size === "sm",
          },
          // Ghost variant refinements (no background, just color change)
          variant === "ghost" && "hover:bg-transparent hover:opacity-70",
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
