import type { Metadata } from "next";
import BlogHero from "@/components/blog/blog-hero";
import LegalArticle, { type LegalSection } from "@/components/legal/legal-article";

export const metadata: Metadata = {
  title: "Data Policy",
  description:
    "How Travelora processes, stores and protects the data we hold about you and your bookings.",
  alternates: { canonical: "/data-policy" },
};

const SECTIONS: LegalSection[] = [
  {
    heading: "What this data policy covers",
    paragraphs: [
      "This page is a more detailed companion to our Privacy Policy. It describes the legal bases we rely on, where your data is processed, and the specific safeguards we put in place.",
    ],
  },
  {
    heading: "Legal bases for processing",
    list: [
      "Performance of a contract — to deliver the tour you booked.",
      "Legal obligation — to meet tax, accounting and aviation reporting rules.",
      "Legitimate interest — to keep the site safe, prevent fraud and improve our services.",
      "Consent — for optional marketing communications.",
    ],
  },
  {
    heading: "Where your data lives",
    paragraphs: [
      "Customer records are stored on managed PostgreSQL infrastructure (Neon, US/EU regions). Transactional emails are processed by Resend. Payments are handled by our PCI-DSS compliant payment processor.",
      "When data is transferred outside your home region we rely on Standard Contractual Clauses or equivalent legal mechanisms.",
    ],
  },
  {
    heading: "Sub-processors",
    list: [
      "Neon — database hosting.",
      "Resend — transactional email delivery.",
      "Vercel — application hosting and edge delivery.",
      "Stripe — payment processing (where Stripe is selected as payment method).",
    ],
  },
  {
    heading: "Data minimisation",
    paragraphs: [
      "We collect only the data needed to deliver the service you booked. We do not enrich your profile from third-party data sets.",
    ],
  },
  {
    heading: "Breach notification",
    paragraphs: [
      "If a breach occurs that is likely to result in a risk to your rights, we will notify the appropriate supervisory authority within 72 hours and email you directly without undue delay.",
    ],
  },
  {
    heading: "Data protection contact",
    paragraphs: [
      "Email dpo@travelora.app for any data protection matter. We aim to respond within five business days.",
    ],
  },
];

export default function DataPolicyPage() {
  return (
    <>
      <BlogHero
        title="Data Policy"
        crumbs={[{ label: "Home", href: "/" }, { label: "Data Policy" }]}
      />
      <LegalArticle
        effectiveDate="January 1, 2026"
        intro="A more technical companion to our Privacy Policy — describing the legal bases, processors and safeguards behind how we handle your data."
        sections={SECTIONS}
      />
    </>
  );
}
