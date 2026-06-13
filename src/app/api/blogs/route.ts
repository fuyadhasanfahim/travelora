import { NextRequest } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { ok, errors } from "@/lib/api/respond";
import { log } from "@/lib/api/logger";
import { blogsQuerySchema } from "@/lib/validation/schemas";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const parse = blogsQuerySchema.safeParse(Object.fromEntries(req.nextUrl.searchParams));
  if (!parse.success) {
    return errors.badRequest("Invalid query parameters", parse.error.flatten());
  }
  const q = parse.data;

  try {
    const where: Prisma.BlogWhereInput = {};
    if (q.q) {
      where.OR = [
        { title: { contains: q.q, mode: "insensitive" } },
        { excerpt: { contains: q.q, mode: "insensitive" } },
        { author: { contains: q.q, mode: "insensitive" } },
      ];
    }
    if (q.category) where.category = q.category;

    const [total, items, categoriesRaw] = await Promise.all([
      prisma.blog.count({ where }),
      prisma.blog.findMany({
        where,
        orderBy: { publishedAt: "desc" },
        skip: (q.page - 1) * q.pageSize,
        take: q.pageSize,
      }),
      prisma.blog.groupBy({ by: ["category"], _count: { category: true } }),
    ]);

    const categories = categoriesRaw
      .map((c) => ({ label: c.category, count: c._count.category }))
      .sort((a, b) => b.count - a.count);

    return ok(
      {
        items,
        total,
        page: q.page,
        pageSize: q.pageSize,
        totalPages: Math.max(1, Math.ceil(total / q.pageSize)),
        categories,
      },
      { headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=300" } },
    );
  } catch (e) {
    log.error("api.blogs", "list failed", { error: String(e) });
    return errors.unavailable();
  }
}
