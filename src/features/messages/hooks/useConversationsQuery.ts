import { useInfiniteQuery } from "@tanstack/react-query";
import { ConversationsResponse } from "../types";

export function useConversationsQuery() {
  return useInfiniteQuery<ConversationsResponse, Error>({
    queryKey: ["conversations"],
    queryFn: async ({ pageParam = "" }) => {
      const res = await fetch(`/api/conversations?cursor=${pageParam}`);
      if (!res.ok) throw new Error("Failed to fetch conversations");
      return res.json();
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor || undefined,
    initialPageParam: "",
  });
}
