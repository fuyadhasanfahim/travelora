import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogHero from "@/components/blog/blog-hero";
import BlogDetail from "@/components/blog/blog-detail";
import { prisma } from "@/lib/db";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

type Params = { params: Promise<{ slug: string }> };

export const revalidate = 300;

export async function generateStaticParams() {
  const blogs = await prisma.blog.findMany({ select: { slug: true } });
  return blogs.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const blog = await prisma.blog.findUnique({ where: { slug } });
  if (!blog) return { title: "Article not found" };
  return {
    title: blog.title,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      images: [{ url: blog.cover, alt: blog.title }],
      type: "article",
      publishedTime: blog.publishedAt.toISOString(),
      authors: [blog.author],
      tags: blog.tags,
    },
    alternates: { canonical: `/blog/${blog.slug}` },
  };
}

export default async function BlogDetailPage({ params }: Params) {
  const { slug } = await params;
  const blog = await prisma.blog.findUnique({ where: { slug } });
  if (!blog) notFound();

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

  return (
    <>
      <ArticleJsonLd blog={blog} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${SITE}/` },
          { name: "Blog", url: `${SITE}/blog` },
          { name: blog.title, url: `${SITE}/blog/${blog.slug}` },
        ]}
      />
      <BlogHero
        title={blog.title}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: blog.title },
        ]}
      />
      <BlogDetail
        blog={blog}
        prev={prev}
        next={next}
        trending={trending}
        relatedTour={relatedTour}
      />
    </>
  );
}
