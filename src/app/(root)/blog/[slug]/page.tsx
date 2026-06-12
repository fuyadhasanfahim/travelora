import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogHero from "@/components/blog/blog-hero";
import BlogDetail from "@/components/blog/blog-detail";
import { BLOGS, getBlog } from "@/data/blogs";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return BLOGS.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const blog = getBlog(slug);
  if (!blog) return { title: "Article not found — Travelora" };
  return {
    title: `${blog.title} — Travelora Blog`,
    description: blog.excerpt,
  };
}

export default async function BlogDetailPage({ params }: Params) {
  const { slug } = await params;
  const blog = getBlog(slug);
  if (!blog) notFound();

  return (
    <>
      <BlogHero
        title={blog.title}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: blog.title },
        ]}
      />
      <BlogDetail blog={blog} />
    </>
  );
}
