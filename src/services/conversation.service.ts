import { db } from "@/lib/db";
import type {
  ConversationWithParticipants,
  PaginatedResponse,
} from "@/types";

// ────────────────────────────────────────────────────────────
// Conversation Service
// ────────────────────────────────────────────────────────────

/**
 * Find an existing 1:1 conversation between two users,
 * or create a new one. Prevents duplicate conversations.
 */
export async function findOrCreateConversation(
  userId: string,
  participantId: string
): Promise<ConversationWithParticipants> {
  // Check for existing conversation between these two users
  const existing = await db.conversation.findFirst({
    where: {
      AND: [
        { participants: { some: { userId } } },
        { participants: { some: { userId: participantId } } },
      ],
      participants: {
        every: {
          userId: { in: [userId, participantId] },
        },
      },
    },
    include: {
      participants: {
        include: {
          user: {
            select: { id: true, name: true, image: true },
          },
        },
      },
      messages: {
        orderBy: { createdAt: "desc" },
        take: 1,
        select: {
          id: true,
          content: true,
          createdAt: true,
          senderId: true,
        },
      },
    },
  });

  if (existing) return existing;

  // Create new conversation with both participants
  return db.conversation.create({
    data: {
      participants: {
        createMany: {
          data: [{ userId }, { userId: participantId }],
        },
      },
    },
    include: {
      participants: {
        include: {
          user: {
            select: { id: true, name: true, image: true },
          },
        },
      },
      messages: {
        orderBy: { createdAt: "desc" },
        take: 1,
        select: {
          id: true,
          content: true,
          createdAt: true,
          senderId: true,
        },
      },
    },
  });
}

/**
 * Get all conversations for a user with the latest message,
 * ordered by most recent activity. Cursor-based pagination.
 */
export async function getConversationsByUserId(
  userId: string,
  options: { cursor?: string; limit: number }
): Promise<PaginatedResponse<ConversationWithParticipants>> {
  const { cursor, limit } = options;

  const conversations = await db.conversation.findMany({
    where: {
      participants: { some: { userId } },
    },
    include: {
      participants: {
        include: {
          user: {
            select: { id: true, name: true, image: true },
          },
        },
      },
      messages: {
        orderBy: { createdAt: "desc" },
        take: 1,
        select: {
          id: true,
          content: true,
          createdAt: true,
          senderId: true,
        },
      },
    },
    orderBy: { updatedAt: "desc" },
    take: limit + 1, // Take one extra to check if more exist
    ...(cursor && {
      cursor: { id: cursor },
      skip: 1, // Skip the cursor itself
    }),
  });

  const hasMore = conversations.length > limit;
  const items = hasMore ? conversations.slice(0, limit) : conversations;

  return {
    items,
    nextCursor: hasMore ? items[items.length - 1].id : null,
    hasMore,
  };
}

/**
 * Verify that a user is a participant in a conversation.
 * Used for authorization checks before accessing messages.
 */
export async function isUserInConversation(
  userId: string,
  conversationId: string
): Promise<boolean> {
  const participant = await db.conversationParticipant.findUnique({
    where: {
      userId_conversationId: { userId, conversationId },
    },
    select: { userId: true },
  });
  return !!participant;
}
