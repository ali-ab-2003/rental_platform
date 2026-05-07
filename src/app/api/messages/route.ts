import { NextRequest } from "next/server";

import { getMessagesSchema, sendMessageSchema } from "@/lib/validations";
import { conversationService, messageService } from "@/services";

import {
  badRequest,
  forbidden,
  getAuthenticatedSession,
  serverError,
  success,
} from "@/app/api/_helpers";

/**
 * GET /api/messages?conversationId=xxx&cursor=xxx&limit=50
 * 
 * Get messages for a conversation. Validates that the
 * authenticated user is a participant in the conversation.
 */
export async function GET(request: NextRequest) {
  try {
    const { session, error } = await getAuthenticatedSession();
    if (error) return error;

    const searchParams = request.nextUrl.searchParams;
    const parsed = getMessagesSchema.safeParse({
      conversationId: searchParams.get("conversationId") ?? undefined,
      cursor: searchParams.get("cursor") ?? undefined,
      limit: searchParams.get("limit") ?? undefined,
    });

    if (!parsed.success) {
      return badRequest(parsed.error.issues[0].message);
    }

    const { conversationId, ...paginationOptions } = parsed.data;

    // Authorization: user must be a participant
    const isParticipant =
      await conversationService.isUserInConversation(
        session!.user.id,
        conversationId
      );

    if (!isParticipant) {
      return forbidden();
    }

    const messages =
      await messageService.getMessagesByConversationId(
        conversationId,
        paginationOptions
      );

    return success(messages);
  } catch (err) {
    console.error("[GET /api/messages]", err);
    return serverError();
  }
}

/**
 * POST /api/messages
 * 
 * Send a message in a conversation. Validates that the
 * authenticated user is a participant in the conversation.
 */
export async function POST(request: NextRequest) {
  try {
    const { session, error } = await getAuthenticatedSession();
    if (error) return error;

    const body = await request.json();
    const parsed = sendMessageSchema.safeParse(body);

    if (!parsed.success) {
      return badRequest(parsed.error.issues[0].message);
    }

    const { conversationId, content } = parsed.data;

    // Authorization: user must be a participant
    const isParticipant =
      await conversationService.isUserInConversation(
        session!.user.id,
        conversationId
      );

    if (!isParticipant) {
      return forbidden();
    }

    const message = await messageService.sendMessage({
      conversationId,
      senderId: session!.user.id,
      content,
    });

    return success(message, 201);
  } catch (err) {
    console.error("[POST /api/messages]", err);
    return serverError();
  }
}
