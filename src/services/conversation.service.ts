import { Prisma } from "@prisma/client";

import { db } from "@/lib/db";
import type {
  ConversationWithParticipants,
  PaginatedResponse,
} from "@/types";

/**
 * Build a deterministic key for a 1:1 conversation.
 * Sorting ensures both participants produce the same key regardless of order.
 */
function getCanonicalKey(userId: string, participantId: string): string {
  return [userId, participantId].sort().join("_");
}

/** Shared include shape for conversation queries. */
const conversationInclude = {
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
} as const;

// ────────────────────────────────────────────────────────────
// Conversation Service
// ────────────────────────────────────────────────────────────

/**
 * Find an existing 1:1 conversation between two users,
 * or create a new one. Race-condition safe via DB unique constraint
 * on canonicalKey — concurrent creates are caught and re-read.
 */
export async function findOrCreateConversation(
  userId: string,
  participantId: string
): Promise<ConversationWithParticipants> {
  const canonicalKey = getCanonicalKey(userId, participantId);

  // Try to find existing conversation by canonical key
  const existing = await db.conversation.findUnique({
    where: { canonicalKey },
    include: conversationInclude,
  });

  if (existing) return existing;

  // Try to create — if a concurrent request already created it,
  // the unique constraint on canonicalKey will throw P2002
  try {
    return await db.conversation.create({
      data: {
        canonicalKey,
        participants: {
          createMany: {
            data: [{ userId }, { userId: participantId }],
          },
        },
      },
      include: conversationInclude,
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      // Race condition: another request created it first — re-read
      const conversation = await db.conversation.findUnique({
        where: { canonicalKey },
        include: conversationInclude,
      });
      if (conversation) return conversation;
    }
    throw error;
  }
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
