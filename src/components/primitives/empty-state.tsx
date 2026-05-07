import { cn } from "@/lib/utils";
import React from "react";
import { Stack } from "./stack";
import { Heading, Text } from "../typography";

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export function EmptyState({
  title,
  description,
  icon,
  action,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <Stack
      align="center"
      justify="center"
      className={cn(
        "py-16 px-6 text-center border border-dashed rounded-xl border-border bg-muted/30",
        className
      )}
      {...props}
    >
      {icon && <div className="text-muted-foreground mb-4">{icon}</div>}
      <Heading level="h3" className="mb-2">
        {title}
      </Heading>
      {description && <Text variant="muted" className="mb-6 max-w-md">{description}</Text>}
      {action && <div>{action}</div>}
    </Stack>
  );
}
