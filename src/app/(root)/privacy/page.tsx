import type { Metadata } from "next";
import BlogHero from "@/components/blog/blog-hero";
import LegalArticle, { type LegalSection } from "@/components/legal/legal-article";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Travelora collects, uses and protects your personal information when you browse, book and travel with us.",
  alternates: { canonical: "/privacy" },
};

const SECTIONS: LegalSection[] = [
  {
    heading: "Information we collect",
    paragraphs: [
      "We collect information you provide directly — your name, email, phone, travel preferences, billing address and any details you share when contacting us or booking a tour.",
      "We also collect technical information automatically — your IP address, device type, browser, the pages you visit on travelora.app and how you arrived at our site.",
    ],
  },
  {
    heading: "How we use your information",
    list: [
      "Confirm and deliver your booking, including coordinating with local guides and partners.",
      "Send transactional emails — booking confirmations, receipts and trip updates.",
      "Respond to your contact requests and provide customer support.",
      "Improve our site, services and content based on aggregated, anonymised analytics.",
      "Meet legal, accounting and regulatory obligations.",
    ],
  },
  {
    heading: "Sharing your information",
    paragraphs: [
      "We share booking details only with the in-country partners required to deliver your trip — hotels, guides, transport providers — and only the minimum needed to make your booking work.",
      "We never sell your personal data. We do not share it with advertisers.",
    ],
  },
  {
    heading: "Your rights",
    list: [
      "Access — request a copy of the personal data we hold about you.",
      "Correction — ask us to fix anything that is inaccurate.",
      "Deletion — request that we erase your data, subject to legal retention requirements.",
      "Portability — receive your data in a machine-readable format.",
      "Withdraw consent at any time for marketing communications.",
    ],
  },
  {
    heading: "Data retention",
    paragraphs: [
      "We keep booking records for seven years to meet tax and accounting requirements. Marketing data is retained until you unsubscribe. Analytics data is anonymised after 26 months.",
    ],
  },
  {
    heading: "Security",
    paragraphs: [
      "All data is transmitted over TLS. Sensitive records are encrypted at rest. Access to customer data is restricted to staff who need it for their role.",
    ],
  },
  {
    heading: "Contact",
    paragraphs: [
      "For any privacy question — including to exercise your rights above — email hello@travelora.app. We respond within seven business days.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <BlogHero
        title="Privacy Policy"
        crumbs={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
      />
      <LegalArticle
        effectiveDate="January 1, 2026"
        intro="Your privacy matters to us. This page explains what we collect, why we collect it, how we use it, and the choices you have."
        sections={SECTIONS}
      />
    </>
  );
}
