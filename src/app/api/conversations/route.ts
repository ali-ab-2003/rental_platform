import { NextRequest } from "next/server";

import { getConversationsSchema } from "@/lib/validations";
import { conversationService } from "@/services";

import {
  badRequest,
  getAuthenticatedSession,
  serverError,
  success,
} from "@/app/api/_helpers";

/**
 * GET /api/conversations
 * 
 * List all conversations for the authenticated user.
 * Supports cursor-based pagination via query params.
 */
export async function GET(request: NextRequest) {
  try {
    const { session, error } = await getAuthenticatedSession();
    if (error) return error;

    const searchParams = request.nextUrl.searchParams;
    const cursor = searchParams.get("cursor");
    const limit = searchParams.get("limit");

    const parsed = getConversationsSchema.safeParse({
      cursor: cursor && cursor !== "" ? cursor : undefined,
      limit: limit && limit !== "" ? limit : undefined,
    });

    if (!parsed.success) {
      return badRequest(parsed.error.issues[0].message);
    }

    const conversations =
      await conversationService.getConversationsByUserId(
        session!.user.id,
        parsed.data
      );

    return success(conversations);
  } catch (err) {
    console.error("[GET /api/conversations]", err);
    return serverError();
  }
}

/**
 * POST /api/conversations
 * 
 * Create or find an existing 1:1 conversation with another user.
 */
export async function POST(request: NextRequest) {
  try {
    const { session, error } = await getAuthenticatedSession();
    if (error) return error;

    const body = await request.json();

    const { createConversationSchema } = await import(
      "@/lib/validations"
    );
    const parsed = createConversationSchema.safeParse(body);

    if (!parsed.success) {
      return badRequest(parsed.error.issues[0].message);
    }

    const { participantId } = parsed.data;

    // Cannot start a conversation with yourself
    if (participantId === session!.user.id) {
      return badRequest("Cannot start a conversation with yourself");
    }

    const conversation =
      await conversationService.findOrCreateConversation(
        session!.user.id,
        participantId
      );

    return success(conversation, 201);
  } catch (err) {
    console.error("[POST /api/conversations]", err);
    return serverError();
  }
}
