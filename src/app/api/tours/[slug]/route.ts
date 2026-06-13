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
    const tour = await prisma.tour.findUnique({ where: { slug } });
    if (!tour) return errors.notFound("Tour not found");
    return ok(tour, {
      headers: { "Cache-Control": "s-maxage=120, stale-while-revalidate=600" },
    });
  } catch (e) {
    log.error("api.tour", "fetch failed", { error: String(e), slug });
    return errors.unavailable();
  }
}
