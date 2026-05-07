import React from "react";
import { ConversationList } from "@/features/messages/components/ConversationList";

export default function MessagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-7xl h-[calc(100vh-64px)] overflow-hidden">
      <div className="grid h-full md:grid-cols-[320px_1fr] lg:grid-cols-[380px_1fr]">
        {/* LEFT PANEL: Conversation List (Desktop Only) 
            On mobile, the list is rendered by the index page.tsx instead. */}
        <aside className="hidden md:flex flex-col border-r border-border bg-background/50 backdrop-blur-xl">
          <div className="p-4 border-b border-border">
            <h1 className="text-xl font-semibold tracking-tight">Messages</h1>
          </div>
          <div className="flex-1 overflow-y-auto">
            <ConversationList />
          </div>
        </aside>

        {/* RIGHT PANEL: Message Thread or Empty State */}
        <main className="flex-1 relative flex flex-col overflow-hidden bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}
