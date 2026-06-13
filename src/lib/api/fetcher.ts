/**
 * Browser/server-safe JSON fetcher that understands our ApiSuccess/ApiError envelope.
 */
import type { Tour, Blog } from "@prisma/client";

export type ApiOk<T> = { ok: true; data: T };
export type ApiErr = { ok: false; error: { code: string; message: string; details?: unknown } };

export class ApiException extends Error {
  code: string;
  status: number;
  details?: unknown;
  constructor(message: string, code: string, status: number, details?: unknown) {
    super(message);
    this.code = code;
    this.status = status;
    this.details = details;
  }
}

export async function apiFetch<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
  let json: ApiOk<T> | ApiErr | null = null;
  try {
    json = (await res.json()) as ApiOk<T> | ApiErr;
  } catch {
    throw new ApiException("Invalid server response", "INVALID_RESPONSE", res.status);
  }
  if (!res.ok || !json || json.ok === false) {
    const err = json && "error" in json ? json.error : null;
    throw new ApiException(
      err?.message ?? `Request failed (${res.status})`,
      err?.code ?? "UNKNOWN",
      res.status,
      err?.details,
    );
  }
  return json.data;
}

// ─── Typed responses ─────────────────────────────────────────────────────
export type ToursListResponse = {
  items: Tour[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};
export type BlogsListResponse = {
  items: Blog[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  categories: { label: string; count: number }[];
};
export type BlogDetailResponse = {
  blog: Blog;
  prev: { slug: string; title: string } | null;
  next: { slug: string; title: string } | null;
  trending: Pick<Blog, "slug" | "title" | "cover" | "date">[];
  relatedTour: Tour | null;
};
