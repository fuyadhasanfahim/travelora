import type { Metadata } from "next";
import BlogHero from "@/components/blog/blog-hero";
import LegalArticle, { type LegalSection } from "@/components/legal/legal-article";

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "How refunds work at Travelora — cancellation windows, processing times and the situations where a full refund applies.",
  alternates: { canonical: "/refund-policy" },
};

const SECTIONS: LegalSection[] = [
  {
    heading: "Standard cancellation windows",
    list: [
      "30+ days before departure — 95% refund (5% administration fee retained).",
      "15–30 days before departure — 50% refund of the tour total.",
      "Less than 15 days before departure — no refund, but rescheduling will be offered where availability allows.",
      "No-shows — non-refundable.",
    ],
  },
  {
    heading: "When you get a full refund",
    list: [
      "We cancel a tour for reasons in our control (e.g. minimum group size not reached).",
      "We materially change the itinerary and you do not accept the new plan.",
      "Government advisories make the destination unsafe to visit.",
    ],
  },
  {
    heading: "How refunds are processed",
    paragraphs: [
      "Refunds are issued to the original payment method within 10 business days of approval. Bank transfers may take an additional 3–5 days to appear depending on your bank.",
      "Where the original payment method is no longer available we issue refunds as travel credit valid for 24 months.",
    ],
  },
  {
    heading: "Travel insurance",
    paragraphs: [
      "Travelora requires travel insurance for all tours. Insurance covers the gap between our refund schedule and a full reimbursement when you cannot travel for a covered reason (medical, bereavement, missed connection).",
    ],
  },
  {
    heading: "Disputed charges",
    paragraphs: [
      "If you spot a charge you do not recognise, email finance@travelora.app within 60 days. We will investigate and respond within 10 business days.",
    ],
  },
  {
    heading: "Requesting a refund",
    paragraphs: [
      "Email hello@travelora.app from the account used to book, including your booking reference. We will confirm receipt within one business day and the refund decision within five.",
    ],
  },
];

export default function RefundPolicyPage() {
  return (
    <>
      <BlogHero
        title="Refund Policy"
        crumbs={[{ label: "Home", href: "/" }, { label: "Refund Policy" }]}
      />
      <LegalArticle
        effectiveDate="January 1, 2026"
        intro="Plans change — we get it. Here's exactly how refunds work at Travelora, when a full refund applies, and how long the money takes to land back with you."
        sections={SECTIONS}
      />
    </>
  );
}
