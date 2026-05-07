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

  let conversations = await db.conversation.findMany({
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

  // Automatically seed a gorgeous luxury concierge sample conversation for new users
  if (conversations.length === 0 && !cursor && userId !== "haven-concierge") {
    try {
      // 1. Ensure the Concierge user exists
      const concierge = await db.user.upsert({
        where: { email: "concierge@havens.com" },
        update: {},
        create: {
          id: "haven-concierge",
          name: "Aria Vance (Concierge)",
          email: "concierge@havens.com",
          image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
          role: "HOST",
        },
      });

      // 2. Create deterministic conversation with unique canonicalKey
      const canonicalKey = [userId, concierge.id].sort().join("_");
      const sampleConv = await db.conversation.create({
        data: {
          canonicalKey,
          participants: {
            createMany: {
              data: [{ userId }, { userId: concierge.id }],
            },
          },
        },
      });

      // 3. Create premium sample messages
      await db.message.createMany({
        data: [
          {
            content: "Welcome to Haven, your private sanctuary for curated luxury rentals. I am Aria, your personal concierge. How may I assist you with your extraordinary journey today?",
            senderId: concierge.id,
            conversationId: sampleConv.id,
            createdAt: new Date(Date.now() - 1200000), // 20 minutes ago
          },
          {
            content: "Thanks! I'm looking for a premium oceanfront villa for an upcoming weekend getaway.",
            senderId: userId,
            conversationId: sampleConv.id,
            createdAt: new Date(Date.now() - 900000), // 15 minutes ago
          },
          {
            content: "Splendid choice! I highly recommend our Villa Oceanfront in Malibu. It features private beach access, a heated infinity pool, and 24/7 dedicated butler service. Would you like me to send you the reservation details?",
            senderId: concierge.id,
            conversationId: sampleConv.id,
            createdAt: new Date(Date.now() - 600000), // 10 minutes ago
          },
          {
            content: "That sounds absolutely divine. Does it have chef services available as well?",
            senderId: userId,
            conversationId: sampleConv.id,
            createdAt: new Date(Date.now() - 400000), // 6 minutes ago
          },
          {
            content: "Yes, absolutely! We can arrange a private Michelin-star chef to customize all of your meals during your stay. Additionally, we can coordinate private helicopter transfers and a sunset yacht charter if you'd like.",
            senderId: concierge.id,
            conversationId: sampleConv.id,
            createdAt: new Date(Date.now() - 250000), // 4 minutes ago
          },
          {
            content: "Wow, that is exceptional service. I would love to see some images and pricing details.",
            senderId: userId,
            conversationId: sampleConv.id,
            createdAt: new Date(Date.now() - 120000), // 2 minutes ago
          },
          {
            content: "Wonderful! I am preparing a curated digital brochure with high-resolution imagery, direct pricing, and available dates for you now. It will appear right here in just a moment.",
            senderId: concierge.id,
            conversationId: sampleConv.id,
            createdAt: new Date(Date.now() - 30000), // 30 seconds ago
          },
        ],
      });

      // 4. Update conversation timestamp to force list ordering
      await db.conversation.update({
        where: { id: sampleConv.id },
        data: { updatedAt: new Date() },
      });

      // 5. Re-run query to pick up newly seeded conversation
      conversations = await db.conversation.findMany({
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
        take: limit + 1,
      });
    } catch (err) {
      console.error("Failed to seed concierge conversation:", err);
    }
  }

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
