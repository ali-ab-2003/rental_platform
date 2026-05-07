"use client";

import React from "react";
import { motion } from "framer-motion";
import { MessageWithSender } from "../types";
import { Text } from "@/components/typography";

interface MessageBubbleProps {
  message: MessageWithSender;
  isMe: boolean;
}

export function MessageBubble({ message, isMe }: MessageBubbleProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`flex w-full ${isMe ? "justify-end" : "justify-start"} mb-4`}
    >
      <div
        className={`max-w-[70%] px-4 py-3 rounded-2xl shadow-sm text-sm ${
          isMe
            ? "bg-foreground text-background rounded-tr-none"
            : "bg-muted text-foreground rounded-tl-none"
        }`}
      >
        {!isMe && (
          <Text className="font-semibold text-xs mb-1 text-foreground/80">
            {message.sender.name || "User"}
          </Text>
        )}
        <Text className={`leading-relaxed break-words ${isMe ? "text-background" : "text-foreground"}`}>{message.content}</Text>
        <div className="flex justify-end mt-1">
          <Text
            variant="micro"
            className={`text-[10px] ${isMe ? "text-background/60" : "text-muted-foreground"}`}
          >
            {new Intl.DateTimeFormat("en-US", {
              hour: "numeric",
              minute: "numeric",
            }).format(new Date(message.createdAt))}
          </Text>
        </div>
      </div>
    </motion.div>
  );
}
