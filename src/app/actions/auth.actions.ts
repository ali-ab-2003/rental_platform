"use server";

import { AuthError } from "next-auth";

import { Prisma } from "@prisma/client";

import { signIn } from "@/lib/auth";
import { signUpSchema, type SignUpInput } from "@/lib/validations";
import { userService } from "@/services";

// ────────────────────────────────────────────────────────────
// Auth Server Actions
// ────────────────────────────────────────────────────────────

type AuthActionResult = {
  success: boolean;
  error?: string;
};

/**
 * Server action: Register a new user.
 *
 * Validates input, creates user, and automatically signs them in.
 * Relies on DB unique constraint (P2002) for duplicate email detection
 * instead of a separate pre-check, making it race-condition safe.
 */
export async function signUpAction(
  data: SignUpInput
): Promise<AuthActionResult> {
  try {
    const parsed = signUpSchema.safeParse(data);

    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues[0].message,
      };
    }

    const { name, email, password } = parsed.data;

    // Create the user — duplicate email is caught by P2002 below
    try {
      await userService.createUser({ name, email, password });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        return {
          success: false,
          error: "An account with this email already exists",
        };
      }
      throw error;
    }

    // Auto sign-in after registration
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return { success: true };
  } catch (error) {
    console.error("[signUpAction]", error);
    return {
      success: false,
      error: "Something went wrong. Please try again.",
    };
  }
}

/**
 * Server action: Sign in with credentials.
 *
 * Delegates to Auth.js signIn. Returns a typed result
 * instead of throwing.
 */
export async function signInAction(data: {
  email: string;
  password: string;
}): Promise<AuthActionResult> {
  try {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            success: false,
            error: "Invalid email or password",
          };
        default:
          return {
            success: false,
            error: "Something went wrong. Please try again.",
          };
      }
    }

    // Re-throw non-auth errors (e.g., redirect errors from Next.js)
    throw error;
  }
}
