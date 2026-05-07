import { db } from "@/lib/db";
import type { MessageWithSender, PaginatedResponse } from "@/types";

// ────────────────────────────────────────────────────────────
// Message Service
// ────────────────────────────────────────────────────────────

/**
 * Send a message in a conversation.
 * Also touches the conversation's updatedAt to bubble it up in lists.
 */
export async function sendMessage(data: {
  conversationId: string;
  senderId: string;
  content: string;
}): Promise<MessageWithSender> {
  // Use a transaction to atomically create message + update conversation
  const [message] = await db.$transaction([
    db.message.create({
      data: {
        content: data.content,
        senderId: data.senderId,
        conversationId: data.conversationId,
      },
      include: {
        sender: {
          select: { id: true, name: true, image: true },
        },
      },
    }),
    db.conversation.update({
      where: { id: data.conversationId },
      data: { updatedAt: new Date() },
    }),
  ]);

  return message;
}

/**
 * Get messages for a conversation with cursor-based pagination.
 * Returns messages in reverse chronological order (newest first).
 */
export async function getMessagesByConversationId(
  conversationId: string,
  options: { cursor?: string; limit: number }
): Promise<PaginatedResponse<MessageWithSender>> {
  const { cursor, limit } = options;

  const messages = await db.message.findMany({
    where: { conversationId },
    include: {
      sender: {
        select: { id: true, name: true, image: true },
      },
    },
    orderBy: { createdAt: "desc" },
    take: limit + 1,
    ...(cursor && {
      cursor: { id: cursor },
      skip: 1,
    }),
  });

  const hasMore = messages.length > limit;
  const items = hasMore ? messages.slice(0, limit) : messages;

  return {
    items,
    nextCursor: hasMore ? items[items.length - 1].id : null,
    hasMore,
  };
}
