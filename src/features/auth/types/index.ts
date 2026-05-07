import { User } from "@prisma/client";

export type SafeUser = Omit<User, "hashedPassword" | "emailVerified"> & {
  emailVerified: string | null;
  createdAt: string;
  updatedAt: string;
};

export type AuthContextState = {
  user: SafeUser | null;
  status: "loading" | "authenticated" | "unauthenticated";
};
