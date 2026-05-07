import React from "react";
import { ConversationList } from "@/features/messages/components/ConversationList";
import { Text } from "@/components/typography";

export default function MessagesPage() {
  return (
    <>
      {/* Mobile: Shows ConversationList only */}
      <div className="block md:hidden h-full overflow-y-auto">
        <div className="p-4 border-b border-border">
          <h1 className="text-xl font-semibold tracking-tight">Messages</h1>
        </div>
        <ConversationList />
      </div>

      {/* Desktop: Shows Empty/Select conversation state */}
      <div className="hidden md:flex flex-col items-center justify-center h-full text-center p-6 bg-muted/5">
        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
          <svg className="w-6 h-6 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <Text className="font-medium text-foreground mb-1">Select a conversation</Text>
        <Text variant="muted" className="text-sm max-w-sm">
          Choose a conversation from the sidebar to view messages or start chatting.
        </Text>
      </div>
    </>
  );
}
