import { z } from "zod";

// ────────────────────────────────────────────────────────────
// Conversation Schemas
// ────────────────────────────────────────────────────────────

export const createConversationSchema = z.object({
  participantId: z.string().cuid("Invalid participant ID"),
});

export const getConversationsSchema = z.object({
  cursor: z.string().cuid().optional(),
  limit: z.coerce.number().int().min(1).max(50).default(20),
});

export type CreateConversationInput = z.infer<typeof createConversationSchema>;
export type GetConversationsInput = z.infer<typeof getConversationsSchema>;
