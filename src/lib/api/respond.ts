import { NextResponse } from "next/server";

export type ApiSuccess<T> = { ok: true; data: T };
export type ApiError = {
  ok: false;
  error: { code: string; message: string; details?: unknown };
};

export function ok<T>(data: T, init?: ResponseInit) {
  return NextResponse.json<ApiSuccess<T>>({ ok: true, data }, init);
}

export function fail(
  code: string,
  message: string,
  status = 400,
  details?: unknown,
) {
  return NextResponse.json<ApiError>(
    { ok: false, error: { code, message, details } },
    { status },
  );
}

export const errors = {
  badRequest: (message = "Bad request", details?: unknown) =>
    fail("BAD_REQUEST", message, 400, details),
  notFound: (message = "Not found") => fail("NOT_FOUND", message, 404),
  conflict: (message = "Conflict") => fail("CONFLICT", message, 409),
  rateLimited: (message = "Too many requests") =>
    fail("RATE_LIMITED", message, 429),
  internal: (message = "Internal server error") =>
    fail("INTERNAL", message, 500),
  unavailable: (message = "Service temporarily unavailable") =>
    fail("UNAVAILABLE", message, 503),
};
