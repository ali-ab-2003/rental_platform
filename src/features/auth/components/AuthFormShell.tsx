import React from "react";
import { FadeUp } from "@/components/motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/primitives/card";

interface AuthFormShellProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function AuthFormShell({ title, description, children, footer }: AuthFormShellProps) {
  return (
    <FadeUp>
      <Card className="w-full border-none shadow-xl shadow-black/5 bg-white/80 backdrop-blur-xl">
        <CardHeader className="space-y-2 pb-8">
          <CardTitle className="text-2xl font-semibold tracking-tight">{title}</CardTitle>
          {description && (
            <CardDescription className="text-base text-muted-foreground">
              {description}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          {children}
        </CardContent>
        {footer && (
          <CardFooter className="flex justify-center pt-6 pb-2">
            {footer}
          </CardFooter>
        )}
      </Card>
    </FadeUp>
  );
}
