import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { ok, errors } from "@/lib/api/respond";
import { log } from "@/lib/api/logger";

export const runtime = "nodejs";

export async function GET(
  _req: NextRequest,
  ctx: { params: Promise<{ slug: string }> },
) {
  const { slug } = await ctx.params;
  if (!slug) return errors.badRequest("Missing slug");
  try {
    const blog = await prisma.blog.findUnique({ where: { slug } });
    if (!blog) return errors.notFound("Article not found");

    const [prev, next, trending, relatedTour] = await Promise.all([
      prisma.blog.findFirst({
        where: { publishedAt: { lt: blog.publishedAt } },
        orderBy: { publishedAt: "desc" },
        select: { slug: true, title: true },
      }),
      prisma.blog.findFirst({
        where: { publishedAt: { gt: blog.publishedAt } },
        orderBy: { publishedAt: "asc" },
        select: { slug: true, title: true },
      }),
      prisma.blog.findMany({
        where: { slug: { not: blog.slug } },
        orderBy: { publishedAt: "desc" },
        take: 5,
        select: { slug: true, title: true, cover: true, date: true },
      }),
      blog.relatedTourSlug
        ? prisma.tour.findUnique({ where: { slug: blog.relatedTourSlug } })
        : null,
    ]);

    return ok(
      { blog, prev, next, trending, relatedTour },
      { headers: { "Cache-Control": "s-maxage=120, stale-while-revalidate=600" } },
    );
  } catch (e) {
    log.error("api.blog", "fetch failed", { error: String(e), slug });
    return errors.unavailable();
  }
}
