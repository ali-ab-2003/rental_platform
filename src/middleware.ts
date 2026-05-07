import NextAuth from "next-auth";

import { authConfig } from "@/lib/auth.config";

/**
 * Middleware for route protection.
 *
 * Uses the edge-safe auth config (no Prisma, no bcryptjs).
 * The `authorized` callback in auth.config.ts handles the logic.
 */
const { auth } = NextAuth(authConfig);

export default auth;

export const config = {
  // Run middleware on all routes except static files, images, and favicon
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
