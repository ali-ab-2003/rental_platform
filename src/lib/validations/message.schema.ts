import { z } from "zod";

// ────────────────────────────────────────────────────────────
// Message Schemas
// ────────────────────────────────────────────────────────────

export const sendMessageSchema = z.object({
  conversationId: z.string().cuid("Invalid conversation ID"),
  content: z
    .string()
    .min(1, "Message cannot be empty")
    .max(5000, "Message must be less than 5000 characters")
    .trim(),
});

export const getMessagesSchema = z.object({
  conversationId: z.string().cuid("Invalid conversation ID"),
  cursor: z.string().cuid().optional(),
  limit: z.coerce.number().int().min(1).max(100).default(50),
});

export type SendMessageInput = z.infer<typeof sendMessageSchema>;
export type GetMessagesInput = z.infer<typeof getMessagesSchema>;
