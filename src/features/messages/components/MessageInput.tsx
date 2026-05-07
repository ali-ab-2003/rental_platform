"use client";

import React, { useRef, useState, useEffect } from "react";
import { useSendMessage } from "../hooks/useMessages";
import { Button } from "@/components/primitives/button";

interface MessageInputProps {
  conversationId: string;
}

export function MessageInput({ conversationId }: MessageInputProps) {
  const [content, setContent] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const sendMessageMutation = useSendMessage(conversationId);

  // Auto-resize textarea heights
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 160)}px`;
    }
  }, [content]);

  const handleSend = () => {
    if (!content.trim() || sendMessageMutation.isPending) return;
    sendMessageMutation.mutate(content.trim());
    setContent("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-4 border-t border-border bg-background/80 backdrop-blur-md flex items-end space-x-3">
      <div className="flex-1 relative bg-muted rounded-2xl border border-transparent focus-within:border-border transition-colors">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Write a message..."
          rows={1}
          className="w-full resize-none bg-transparent py-3 px-4 text-sm outline-none placeholder:text-muted-foreground max-h-40 min-h-[44px]"
        />
      </div>
      <Button
        onClick={handleSend}
        disabled={!content.trim() || sendMessageMutation.isPending}
        className="rounded-full h-11 w-11 p-0 flex items-center justify-center shrink-0"
      >
        <svg
          className="w-5 h-5 transform rotate-90"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
          />
        </svg>
      </Button>
    </div>
  );
}
