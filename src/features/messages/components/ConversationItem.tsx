"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ConversationWithParticipants } from "../types";
import { Text } from "@/components/typography";

interface ConversationItemProps {
  conversation: ConversationWithParticipants;
  isActive: boolean;
  currentUserId: string; // The currently logged-in user
}

export function ConversationItem({ conversation, isActive, currentUserId }: ConversationItemProps) {
  // Find the other participant in a 1:1 conversation
  const otherParticipant = conversation.participants.find(p => p.user.id !== currentUserId)?.user;
  
  if (!otherParticipant) return null;

  const lastMessage = conversation.messages && conversation.messages.length > 0 
    ? conversation.messages[0] 
    : null;

  return (
    <Link 
      href={`/messages/${conversation.id}`}
      className={`block px-4 py-3 border-b border-border/50 hover:bg-muted/50 transition-all duration-200 border-l-2 ${
        isActive ? "bg-muted/80 border-l-foreground" : "bg-transparent border-l-transparent"
      }`}
    >
      <div className="flex items-center space-x-3">
        {/* Avatar */}
        <div className="relative h-12 w-12 rounded-full overflow-hidden flex-shrink-0 bg-muted">
          {otherParticipant.image ? (
            <Image 
              src={otherParticipant.image} 
              alt={otherParticipant.name || "User"} 
              fill 
              sizes="48px"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-primary/5 text-primary text-lg font-medium">
              {otherParticipant.name?.charAt(0).toUpperCase() || "?"}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-baseline mb-1">
            <Text className="font-medium truncate text-base text-foreground">
              {otherParticipant.name || "Unknown User"}
            </Text>
            {lastMessage && (
              <Text variant="micro" className="text-muted-foreground whitespace-nowrap ml-2">
                {new Intl.DateTimeFormat("en-US", { 
                  hour: "numeric", 
                  minute: "numeric",
                  month: "short",
                  day: "numeric"
                }).format(new Date(lastMessage.createdAt))}
              </Text>
            )}
          </div>
          
          {lastMessage ? (
            <Text variant="muted" className="text-sm truncate">
              {lastMessage.senderId === currentUserId ? "You: " : ""}
              {lastMessage.content}
            </Text>
          ) : (
            <Text variant="muted" className="text-sm italic">
              No messages yet
            </Text>
          )}
        </div>
      </div>
    </Link>
  );
}
