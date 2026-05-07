import type { NextAuthConfig } from "next-auth";

/**
 * Edge-safe auth configuration.
 * 
 * This file is separated from auth.ts because middleware runs on the
 * Edge Runtime, which cannot import Prisma or bcryptjs. Keep this file
 * free of any Node.js-only dependencies.
 */
export const authConfig = {
  pages: {
    signIn: "/login",
    // signUp is not a built-in Auth.js page, handled via custom route
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAuthPage =
        nextUrl.pathname.startsWith("/login") ||
        nextUrl.pathname.startsWith("/signup");
      const isProtectedRoute =
        nextUrl.pathname.startsWith("/messages");

      // Redirect authenticated users away from auth pages
      if (isOnAuthPage && isLoggedIn) {
        return Response.redirect(new URL("/", nextUrl));
      }

      // Block unauthenticated users from protected routes
      if (isProtectedRoute && !isLoggedIn) {
        return false; // Redirects to signIn page
      }

      return true;
    },
  },
  providers: [], // Configured in auth.ts (not edge-safe)
} satisfies NextAuthConfig;
