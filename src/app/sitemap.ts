import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const [tours, blogs] = await Promise.all([
    prisma.tour.findMany({ select: { slug: true, updatedAt: true } }),
    prisma.blog.findMany({ select: { slug: true, updatedAt: true } }),
  ]);

  const staticUrls: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/tours`, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/blog`, changeFrequency: "daily", priority: 0.7 },
    { url: `${base}/about`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/contact`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/why-shop-with-us`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${base}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/cookies`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terms`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/data-policy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/refund-policy`, changeFrequency: "yearly", priority: 0.3 },
  ];

  return [
    ...staticUrls,
    ...tours.map((t) => ({
      url: `${base}/tours/${t.slug}`,
      lastModified: t.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...blogs.map((b) => ({
      url: `${base}/blog/${b.slug}`,
      lastModified: b.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
