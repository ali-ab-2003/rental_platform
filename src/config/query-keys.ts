/**
 * TanStack Query key factory.
 *
 * Centralizes all cache keys for type-safe, consistent
 * cache invalidation across the application.
 *
 * Usage:
 *   queryKeys.conversations.all        → ["conversations"]
 *   queryKeys.conversations.detail(id) → ["conversations", id]
 *   queryKeys.messages.byConversation(id) → ["messages", "conversation", id]
 */
export const queryKeys = {
  conversations: {
    all: ["conversations"] as const,
    detail: (id: string) => ["conversations", id] as const,
  },
  messages: {
    byConversation: (conversationId: string) =>
      ["messages", "conversation", conversationId] as const,
  },
  listings: {
    all: ["listings"] as const,
    detail: (id: string) => ["listings", id] as const,
    byHost: (hostId: string) => ["listings", "host", hostId] as const,
    search: (filters: Record<string, unknown>) =>
      ["listings", "search", filters] as const,
  },
  users: {
    current: ["users", "current"] as const,
    detail: (id: string) => ["users", id] as const,
  },
} as const;
