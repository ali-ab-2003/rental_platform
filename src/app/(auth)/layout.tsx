import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="absolute top-8 left-8">
        <Link href="/" className="font-heading text-xl font-medium tracking-tight">
          {siteConfig.name}
        </Link>
      </div>
      <main className="w-full max-w-md space-y-8">
        {children}
      </main>
    </div>
  );
}
