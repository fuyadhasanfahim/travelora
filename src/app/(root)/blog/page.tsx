import type { Metadata } from "next";
import { Suspense } from "react";
import BlogHero from "@/components/blog/blog-hero";
import BlogList from "@/components/blog/blog-list";
import AboutCta from "@/components/about/about-cta";

export const metadata: Metadata = {
  title: "Blog — Travelora",
  description: "News, tips and guides to plan your next journey with Travelora.",
};

export default function BlogPage() {
  return (
    <>
      <BlogHero title="News, Tips and Guides" crumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]} />
      <Suspense fallback={null}>
        <BlogList />
      </Suspense>
      <AboutCta />
    </>
  );
}
