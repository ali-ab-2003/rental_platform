import React from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  iconClassName?: string;
  textClassName?: string;
}

export function Logo({ className, iconClassName, textClassName }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2.5 font-heading text-xl font-semibold tracking-[0.15em] text-foreground uppercase select-none", className)}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn("h-6 w-6 text-foreground", iconClassName)}
      >
        {/* Modern luxury geometric diamond structure with a clean 'H' inside */}
        <path d="M12 2L2 12l10 10 10-10L12 2z" />
        <path d="M9 12h6" />
        <path d="M9 8v8" />
        <path d="M15 8v8" />
      </svg>
      <span className={cn("font-medium", textClassName)}>Haven</span>
    </div>
  );
}
