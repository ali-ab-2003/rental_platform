import { Listing } from "@prisma/client";
import { PaginatedResponse } from "@/features/shared";

// We omit hostId and sensitive fields from the public listing type if needed,
// but for now we can extend the Prisma model directly.
export type ListingSummary = Pick<
  Listing,
  | "id"
  | "title"
  | "price"
  | "currency"
  | "location"
  | "images"
  | "category"
  | "bedrooms"
  | "bathrooms"
  | "maxGuests"
>;

export type ListingFilters = {
  category?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  guests?: number;
};

export type ListingsResponse = PaginatedResponse<ListingSummary>;
