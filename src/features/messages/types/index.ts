import { Message, Conversation, User } from "@prisma/client";
import { PaginatedResponse } from "@/features/shared";

// Safe user data inside conversations (no private info)
export type ParticipantInfo = Pick<User, "id" | "name" | "image">;

export type MessageWithSender = Message & {
  sender: ParticipantInfo;
};

export type ConversationWithParticipants = Conversation & {
  participants: {
    user: ParticipantInfo;
    joinedAt: Date;
  }[];
  messages: MessageWithSender[]; // Usually just the latest message
};

export type MessageThreadResponse = PaginatedResponse<MessageWithSender>;
export type ConversationsResponse = PaginatedResponse<ConversationWithParticipants>;
