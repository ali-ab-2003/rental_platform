import { Role } from "@prisma/client";
import { type DefaultSession } from "next-auth";

/**
 * Extend the default Auth.js session and JWT types
 * to include our custom user fields (id, role).
 */
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: Role;
    } & DefaultSession["user"];
  }

  interface User {
    role: Role;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    id: string;
    role: Role;
  }
}
