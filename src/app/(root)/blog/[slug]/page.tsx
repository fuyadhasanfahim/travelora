import type { Metadata } from "next";
import BlogHero from "@/components/blog/blog-hero";
import BlogDetail from "@/components/blog/blog-detail";

const TITLE = "Ultimate Dubai Travel Guide for First-Time Travelers";

export const metadata: Metadata = {
  title: `${TITLE} — Travelora Blog`,
  description: "A first-timer's guide to exploring Dubai with Travelora.",
};

export default function BlogDetailPage() {
  return (
    <>
      <BlogHero
        title={TITLE}
        crumbs={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: TITLE }]}
      />
      <BlogDetail />
    </>
  );
}
