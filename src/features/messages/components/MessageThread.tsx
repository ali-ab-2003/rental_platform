"use client";

import React, { useEffect, useRef, useState } from "react";
import { useMessages } from "../hooks/useMessages";
import { MessageBubble } from "./MessageBubble";
import { Text } from "@/components/typography";
import { getSession } from "next-auth/react";

interface MessageThreadProps {
  conversationId: string;
}

export function MessageThread({ conversationId }: MessageThreadProps) {
  const { data, isLoading, isError } = useMessages(conversationId);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    getSession().then((session) => {
      if (session?.user?.id) {
        setCurrentUserId(session.user.id);
      }
    });
  }, []);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [data]);

  if (isLoading || !currentUserId) {
    return (
      <div className="flex-1 p-6 space-y-4 overflow-y-auto bg-background">
        {[1, 2, 3].map((i) => (
          <div key={i} className={`flex ${i % 2 === 0 ? "justify-end" : "justify-start"}`}>
            <div className="h-10 w-2/3 bg-muted rounded-2xl animate-pulse" />
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex-1 flex items-center justify-center p-6 bg-background">
        <Text variant="muted">Failed to load message history.</Text>
      </div>
    );
  }

  const messages = data?.pages.flatMap((page) => page.data).reverse() || [];

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 bg-background">
        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
          <svg className="w-6 h-6 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <Text className="font-medium text-foreground mb-1">No messages here yet</Text>
        <Text variant="muted" className="text-sm">Send a message to start the conversation.</Text>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-background">
      {messages.map((message) => {
        const isMe = message.senderId === currentUserId;
        return (
          <MessageBubble
            key={message.id}
            message={message}
            isMe={isMe}
          />
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
}
