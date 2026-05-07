import bcrypt from "bcryptjs";

import { db } from "@/lib/db";
import type { SafeUser } from "@/types";

const SALT_ROUNDS = 12;

/**
 * Safe user select — never expose hashedPassword.
 * Reused across all user queries.
 */
const safeUserSelect = {
  id: true,
  name: true,
  email: true,
  image: true,
  role: true,
  createdAt: true,
} as const;

// ────────────────────────────────────────────────────────────
// User Service
// ────────────────────────────────────────────────────────────

export async function createUser(data: {
  name: string;
  email: string;
  password: string;
}): Promise<SafeUser> {
  const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);

  return db.user.create({
    data: {
      name: data.name,
      email: data.email,
      hashedPassword,
    },
    select: safeUserSelect,
  });
}

export async function getUserByEmail(
  email: string
): Promise<SafeUser | null> {
  return db.user.findUnique({
    where: { email },
    select: safeUserSelect,
  });
}

export async function getUserById(
  id: string
): Promise<SafeUser | null> {
  return db.user.findUnique({
    where: { id },
    select: safeUserSelect,
  });
}

export async function emailExists(email: string): Promise<boolean> {
  const user = await db.user.findUnique({
    where: { email },
    select: { id: true },
  });
  return !!user;
}
