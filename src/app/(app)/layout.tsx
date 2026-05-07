import React from "react";
import { Navbar } from "@/components/layout";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {/* App layout usually doesn't have a footer, maximizing screen space for messages/dashboards */}
      <main className="flex-1 overflow-hidden relative">
        {children}
      </main>
    </div>
  );
}
