"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useConversationsQuery } from "../hooks/useConversationsQuery";
import { ConversationItem } from "./ConversationItem";
import { Text } from "@/components/typography";
import { getSession } from "next-auth/react";

export function ConversationList() {
  const { data, isLoading, isError } = useConversationsQuery();
  const pathname = usePathname();
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  // We need the current user ID to determine the "other" participant
  useEffect(() => {
    getSession().then((session) => {
      if (session?.user?.id) {
        setCurrentUserId(session.user.id);
      }
    });
  }, []);

  if (isLoading || !currentUserId) {
    return (
      <div className="p-4 space-y-4 animate-pulse">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center space-x-4">
            <div className="h-12 w-12 bg-muted rounded-full" />
            <div className="space-y-2 flex-1">
              <div className="h-4 bg-muted rounded w-1/2" />
              <div className="h-3 bg-muted rounded w-3/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8 text-center">
        <Text variant="muted">Failed to load conversations.</Text>
      </div>
    );
  }

  const conversations = data?.pages.flatMap((page) => page.data) || [];

  if (conversations.length === 0) {
    return (
      <div className="p-8 text-center flex flex-col items-center justify-center h-full">
        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
          <svg className="w-6 h-6 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <Text className="font-medium text-foreground mb-1">No messages yet</Text>
        <Text variant="muted" className="text-sm max-w-[200px]">
          When you contact a host, your messages will appear here.
        </Text>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {conversations.map((conversation) => {
        const isActive = pathname === `/messages/${conversation.id}`;
        return (
          <ConversationItem
            key={conversation.id}
            conversation={conversation}
            isActive={isActive}
            currentUserId={currentUserId}
          />
        );
      })}
    </div>
  );
}
