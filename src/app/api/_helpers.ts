import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import type { ApiResponse } from "@/types";

/**
 * Helper to get the authenticated session or return a 401 response.
 * Used in all protected API routes.
 */
export async function getAuthenticatedSession() {
  const session = await auth();

  if (!session?.user?.id) {
    return { session: null, error: unauthorized() };
  }

  return { session, error: null };
}

/**
 * Standardized error responses for API routes.
 */
export function unauthorized(): NextResponse<ApiResponse> {
  return NextResponse.json(
    { success: false, error: "Unauthorized" },
    { status: 401 }
  );
}

export function badRequest(message: string): NextResponse<ApiResponse> {
  return NextResponse.json(
    { success: false, error: message },
    { status: 400 }
  );
}

export function forbidden(): NextResponse<ApiResponse> {
  return NextResponse.json(
    { success: false, error: "Forbidden" },
    { status: 403 }
  );
}

export function notFound(resource: string): NextResponse<ApiResponse> {
  return NextResponse.json(
    { success: false, error: `${resource} not found` },
    { status: 404 }
  );
}

export function serverError(
  message = "Internal server error"
): NextResponse<ApiResponse> {
  return NextResponse.json(
    { success: false, error: message },
    { status: 500 }
  );
}

export function success<T>(data: T, status = 200): NextResponse<ApiResponse<T>> {
  return NextResponse.json({ success: true, data }, { status });
}
