import { useInfiniteQuery } from "@tanstack/react-query";
import { ListingFilters, ListingsResponse } from "../types";

/**
 * Hook to fetch listings with infinite scrolling and filtering support.
 * Depends on React Query for caching, deduping, and background updates.
 */
export function useListingsQuery(filters: ListingFilters) {
  return useInfiniteQuery<ListingsResponse, Error>({
    queryKey: ["listings", filters],
    queryFn: async ({ pageParam = "" }) => {
      // Build query string from filters
      const params = new URLSearchParams();
      if (pageParam) params.append("cursor", pageParam as string);
      if (filters.category) params.append("category", filters.category);
      if (filters.location) params.append("location", filters.location);
      if (filters.guests) params.append("guests", filters.guests.toString());
      
      const res = await fetch(`/api/listings?${params.toString()}`);
      if (!res.ok) {
        throw new Error("Failed to fetch listings");
      }
      return res.json();
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor || undefined,
    initialPageParam: "",
  });
}
