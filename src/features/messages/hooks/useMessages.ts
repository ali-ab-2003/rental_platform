import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { MessageThreadResponse, MessageWithSender } from "../types";

/**
 * Hook to fetch a message thread with infinite scrolling (cursor-based).
 * Also supports polling for new messages.
 */
export function useMessages(conversationId: string) {
  return useInfiniteQuery<MessageThreadResponse, Error>({
    queryKey: ["messages", conversationId],
    queryFn: async ({ pageParam = "" }) => {
      const res = await fetch(`/api/messages?conversationId=${conversationId}&cursor=${pageParam}`);
      if (!res.ok) throw new Error("Failed to fetch messages");
      return res.json();
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor || undefined,
    initialPageParam: "",
    // Polling for REST architecture (disable when upgrading to WebSockets)
    refetchInterval: 5000, 
  });
}

/**
 * Hook to send a new message with Optimistic UI updates.
 */
export function useSendMessage(conversationId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (content: string) => {
      const res = await fetch(`/api/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversationId, content }),
      });
      if (!res.ok) throw new Error("Failed to send message");
      return res.json() as Promise<MessageWithSender>;
    },
    onMutate: async (newContent) => {
      // Cancel any outgoing refetches so they don't overwrite our optimistic update
      await queryClient.cancelQueries({ queryKey: ["messages", conversationId] });

      // Snapshot the previous value
      const previousMessages = queryClient.getQueryData(["messages", conversationId]);

      // Optimistically update to the new value
      queryClient.setQueryData(["messages", conversationId], (old: any) => {
        if (!old || !old.pages) return old;
        
        // Create an optimistic message
        const optimisticMsg = {
          id: `temp-${Date.now()}`,
          content: newContent,
          createdAt: new Date().toISOString(),
          conversationId,
          // Note: Sender data would ideally come from auth context in a real component
          senderId: "temp-sender-id",
          sender: { id: "temp-sender-id", name: "Me", image: null }
        };

        const newPages = [...old.pages];
        if (newPages.length > 0) {
          // Add to the front of the first page (assuming descending order)
          newPages[0] = {
            ...newPages[0],
            data: [optimisticMsg, ...newPages[0].data]
          };
        }
        return { ...old, pages: newPages };
      });

      // Return a context object with the snapshotted value
      return { previousMessages };
    },
    onError: (err, newContent, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousMessages) {
        queryClient.setQueryData(["messages", conversationId], context.previousMessages);
      }
    },
    onSettled: () => {
      // Always refetch after error or success to ensure cache is correct
      queryClient.invalidateQueries({ queryKey: ["messages", conversationId] });
    },
  });
}
