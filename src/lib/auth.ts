import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { db } from "@/lib/db";
import { signInSchema } from "@/lib/validations";

import { authConfig } from "./auth.config";

/**
 * Main Auth.js configuration.
 * 
 * This file imports Node.js-only dependencies (bcryptjs, Prisma)
 * and must NOT be imported in middleware. Use auth.config.ts there instead.
 * 
 * Strategy: JWT — no database sessions needed.
 * Provider: Credentials (email/password) for now.
 */
export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const parsed = signInSchema.safeParse(credentials);

        if (!parsed.success) {
          return null;
        }

        const { email, password } = parsed.data;

        const user = await db.user.findUnique({
          where: { email },
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            hashedPassword: true,
            role: true,
          },
        });

        // User not found or no password (OAuth-only account)
        if (!user || !user.hashedPassword) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          password,
          user.hashedPassword
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user }) {
      // On initial sign-in, user object is present
      if (user) {
        token.id = user.id!;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
});
