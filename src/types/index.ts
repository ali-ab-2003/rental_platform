import { Role } from "@prisma/client";

// ────────────────────────────────────────────────────────────
// API Response Types
// ────────────────────────────────────────────────────────────

export type ApiResponse<T = undefined> =
  | { success: true; data: T }
  | { success: false; error: string };

// ────────────────────────────────────────────────────────────
// User Types (safe — no password hash exposed)
// ────────────────────────────────────────────────────────────

export type SafeUser = {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  role: Role;
  createdAt: Date;
};

// ────────────────────────────────────────────────────────────
// Message Types
// ────────────────────────────────────────────────────────────

export type MessageWithSender = {
  id: string;
  content: string;
  createdAt: Date;
  senderId: string;
  sender: {
    id: string;
    name: string | null;
    image: string | null;
  };
};

// ────────────────────────────────────────────────────────────
// Conversation Types
// ────────────────────────────────────────────────────────────

export type ConversationWithParticipants = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  participants: {
    user: {
      id: string;
      name: string | null;
      image: string | null;
    };
  }[];
  messages: {
    id: string;
    content: string;
    createdAt: Date;
    senderId: string;
  }[];
};

// ────────────────────────────────────────────────────────────
// Pagination
// ────────────────────────────────────────────────────────────

export type PaginatedResponse<T> = {
  items: T[];
  nextCursor: string | null;
  hasMore: boolean;
};
