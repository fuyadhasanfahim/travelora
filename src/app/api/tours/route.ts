import { NextRequest } from "next/server";
import { Prisma, TourCategory } from "@prisma/client";
import { prisma } from "@/lib/db";
import { ok, errors } from "@/lib/api/respond";
import { log } from "@/lib/api/logger";
import { toursQuerySchema } from "@/lib/validation/schemas";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const parse = toursQuerySchema.safeParse(Object.fromEntries(req.nextUrl.searchParams));
  if (!parse.success) {
    return errors.badRequest("Invalid query parameters", parse.error.flatten());
  }
  const q = parse.data;

  try {
    const where: Prisma.TourWhereInput = {};

    if (q.q) {
      where.OR = [
        { title: { contains: q.q, mode: "insensitive" } },
        { location: { contains: q.q, mode: "insensitive" } },
        { country: { contains: q.q, mode: "insensitive" } },
        { tourType: { contains: q.q, mode: "insensitive" } },
      ];
    }

    if (q.category) {
      const list = q.category
        .split(",")
        .map((s) => s.trim().toLowerCase())
        .filter(Boolean);
      const validCats = list
        .map((c) => Object.values(TourCategory).find((v) => v.toLowerCase() === c))
        .filter((v): v is TourCategory => !!v);
      if (validCats.length) where.category = { in: validCats };
    }

    if (q.destination) {
      const dests = q.destination
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      if (dests.length) {
        where.OR = [
          ...(where.OR ?? []),
          ...dests.flatMap((d) => [
            { location: { contains: d, mode: "insensitive" as const } },
            { country: { contains: d, mode: "insensitive" as const } },
          ]),
        ];
      }
    }

    if (q.minRating !== undefined) where.rating = { gte: q.minRating };
    if (q.maxPrice !== undefined) where.price = { lte: q.maxPrice };
    if (q.featured !== undefined) where.featured = q.featured;

    const orderBy: Prisma.TourOrderByWithRelationInput =
      q.sort === "price-low"
        ? { price: "asc" }
        : q.sort === "price-high"
          ? { price: "desc" }
          : q.sort === "rating"
            ? { rating: "desc" }
            : { createdAt: "desc" };

    const [total, items] = await Promise.all([
      prisma.tour.count({ where }),
      prisma.tour.findMany({
        where,
        orderBy,
        skip: (q.page - 1) * q.pageSize,
        take: q.pageSize,
      }),
    ]);

    const totalPages = Math.max(1, Math.ceil(total / q.pageSize));

    return ok(
      {
        items,
        total,
        page: q.page,
        pageSize: q.pageSize,
        totalPages,
      },
      { headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=300" } },
    );
  } catch (e) {
    log.error("api.tours", "list failed", { error: String(e) });
    return errors.unavailable();
  }
}
