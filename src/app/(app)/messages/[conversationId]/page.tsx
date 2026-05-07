"use client";

import React, { use } from "react";
import Link from "next/link";
import { MessageThread } from "@/features/messages/components/MessageThread";
import { MessageInput } from "@/features/messages/components/MessageInput";
import { Text } from "@/components/typography";

interface ConversationPageProps {
  params: Promise<{
    conversationId: string;
  }>;
}

export default function ConversationPage({ params }: ConversationPageProps) {
  const resolvedParams = use(params);
  const conversationId = resolvedParams.conversationId;

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background">
      {/* Header with back button on mobile */}
      <header className="h-16 px-6 border-b border-border flex items-center bg-background/50 backdrop-blur-xl shrink-0">
        <Link
          href="/messages"
          className="md:hidden mr-4 p-1 rounded-full hover:bg-muted transition-colors flex items-center text-foreground"
          aria-label="Back to conversations"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        
        <div>
          <Text className="font-semibold text-foreground text-base">Conversation</Text>
          <Text variant="muted" className="text-xs">Active now</Text>
        </div>
      </header>

      {/* Message Thread Area */}
      <MessageThread conversationId={conversationId} />

      {/* Sticky Bottom Input Bar */}
      <MessageInput conversationId={conversationId} />
    </div>
  );
}
