import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * Client-side hook to ensure a user is authenticated.
 * Redirects to login if not.
 */
export function useRequireAuth(redirectTo: string = "/login") {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push(redirectTo);
    }
  }, [status, router, redirectTo]);

  return { session, status };
}
