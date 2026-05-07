// Common application types that are shared across features

export type PaginationParams = {
  cursor?: string;
  limit?: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  nextCursor?: string;
  hasMore: boolean;
};

export type ApiError = {
  message: string;
  code: string;
  status: number;
};

// Represents the standard success response from server actions
export type ActionResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};
