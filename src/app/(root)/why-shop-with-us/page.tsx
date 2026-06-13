import type { Metadata } from "next";
import BlogHero from "@/components/blog/blog-hero";
import LegalArticle, { type LegalSection } from "@/components/legal/legal-article";

export const metadata: Metadata = {
  title: "Why Shop With Us",
  description:
    "Five things that make Travelora different — the promises we make, the standards we hold, and the difference you can feel from the first email.",
  alternates: { canonical: "/why-shop-with-us" },
};

const SECTIONS: LegalSection[] = [
  {
    heading: "Hand-built itineraries",
    paragraphs: [
      "Every Travelora tour starts as a Google Doc with a route, a story and a reason to exist. We don't resell other operators' inventory — we design our own.",
    ],
  },
  {
    heading: "Small groups, real guides",
    paragraphs: [
      "Most tours cap at 8–14 travellers. Every group is led by a guide who lives in the region — not a coach driver reading from a script.",
    ],
  },
  {
    heading: "Honest pricing",
    list: [
      "Prices include guides, entrances, transfers and accommodation. No surprises.",
      "Optional extras are flagged in checkout — never bundled in silently.",
      "Single supplement is published on every tour page, before you book.",
    ],
  },
  {
    heading: "A real refund schedule",
    paragraphs: [
      "Our refund schedule is short, plain and on this site — see our Refund Policy. We don't bury cancellation terms in footnotes.",
    ],
  },
  {
    heading: "Real humans, fast replies",
    paragraphs: [
      "We answer contact form messages within one business day. During your trip you have a 24/7 emergency number that connects you to someone — not a queue.",
    ],
  },
  {
    heading: "Better for the places we visit",
    list: [
      "We use locally owned accommodation wherever it exists.",
      "Our guides are paid above market and through their own bank accounts.",
      "A portion of every booking funds community projects in the regions we operate.",
    ],
  },
];

export default function WhyShopPage() {
  return (
    <>
      <BlogHero
        title="Why shop with us"
        crumbs={[{ label: "Home", href: "/" }, { label: "Why shop with us" }]}
      />
      <LegalArticle
        effectiveDate="January 1, 2026"
        intro="There are a lot of travel sites. Here's what we do differently — and why so many of our customers travel with us more than once."
        sections={SECTIONS}
      />
    </>
  );
}
