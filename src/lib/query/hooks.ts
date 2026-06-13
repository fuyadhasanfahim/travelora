"use client";

import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseQueryOptions,
} from "@tanstack/react-query";
import type { Tour, Booking, Payment } from "@prisma/client";
import { apiFetch, type ToursListResponse, type BlogsListResponse, type BlogDetailResponse } from "@/lib/api/fetcher";
import { queryKeys } from "@/lib/query/keys";
import type {
  BookingOutput,
  ContactInput,
  NewsletterInput,
  PaymentInput,
} from "@/lib/validation/schemas";

// ─── Tours ───────────────────────────────────────────────────────────────

export type ToursListFilters = {
  q?: string;
  category?: string;
  destination?: string;
  minRating?: number;
  maxPrice?: number;
  featured?: boolean;
  sort?: string;
  page?: number;
  pageSize?: number;
};

function toQuery(filters: Record<string, unknown>) {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(filters)) {
    if (v === undefined || v === null || v === "") continue;
    sp.set(k, String(v));
  }
  return sp.toString();
}

export function useTours(filters: ToursListFilters = {}, options?: Partial<UseQueryOptions<ToursListResponse>>) {
  const qs = toQuery(filters);
  return useQuery<ToursListResponse>({
    queryKey: queryKeys.tours.list(filters),
    queryFn: () => apiFetch<ToursListResponse>(`/api/tours${qs ? `?${qs}` : ""}`),
    ...options,
  });
}

export function useTour(slug: string | undefined, options?: Partial<UseQueryOptions<Tour>>) {
  return useQuery<Tour>({
    queryKey: queryKeys.tours.detail(slug ?? ""),
    queryFn: () => apiFetch<Tour>(`/api/tours/${slug}`),
    enabled: !!slug,
    ...options,
  });
}

// ─── Blogs ───────────────────────────────────────────────────────────────

export type BlogsListFilters = { q?: string; category?: string; page?: number; pageSize?: number };

export function useBlogs(filters: BlogsListFilters = {}, options?: Partial<UseQueryOptions<BlogsListResponse>>) {
  const qs = toQuery(filters);
  return useQuery<BlogsListResponse>({
    queryKey: queryKeys.blogs.list(filters),
    queryFn: () => apiFetch<BlogsListResponse>(`/api/blogs${qs ? `?${qs}` : ""}`),
    ...options,
  });
}

export function useBlog(slug: string | undefined, options?: Partial<UseQueryOptions<BlogDetailResponse>>) {
  return useQuery<BlogDetailResponse>({
    queryKey: queryKeys.blogs.detail(slug ?? ""),
    queryFn: () => apiFetch<BlogDetailResponse>(`/api/blogs/${slug}`),
    enabled: !!slug,
    ...options,
  });
}

// ─── Mutations ───────────────────────────────────────────────────────────

export function useCreateBooking() {
  const qc = useQueryClient();
  return useMutation<{ booking: Booking }, Error, BookingOutput>({
    mutationFn: (input) =>
      apiFetch<{ booking: Booking }>("/api/bookings", {
        method: "POST",
        body: JSON.stringify(input),
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.tours.all });
    },
  });
}

export function useCreatePayment() {
  return useMutation<{ payment: Payment }, Error, PaymentInput>({
    mutationFn: (input) =>
      apiFetch<{ payment: Payment }>("/api/payments", {
        method: "POST",
        body: JSON.stringify(input),
      }),
  });
}

export function useSubmitContact() {
  return useMutation<{ id: string }, Error, ContactInput>({
    mutationFn: (input) =>
      apiFetch<{ id: string }>("/api/contact", {
        method: "POST",
        body: JSON.stringify(input),
      }),
  });
}

export function useSubscribeNewsletter() {
  return useMutation<{ subscribed: boolean }, Error, NewsletterInput>({
    mutationFn: (input) =>
      apiFetch<{ subscribed: boolean }>("/api/newsletter", {
        method: "POST",
        body: JSON.stringify(input),
      }),
  });
}
