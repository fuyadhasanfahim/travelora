/**
 * Centralised query keys. Use these in every useQuery/invalidate call.
 */
export const queryKeys = {
  tours: {
    all: ["tours"] as const,
    list: (filters: Record<string, unknown>) =>
      ["tours", "list", filters] as const,
    detail: (slug: string) => ["tours", "detail", slug] as const,
  },
  blogs: {
    all: ["blogs"] as const,
    list: (filters: Record<string, unknown>) =>
      ["blogs", "list", filters] as const,
    detail: (slug: string) => ["blogs", "detail", slug] as const,
  },
} as const;
