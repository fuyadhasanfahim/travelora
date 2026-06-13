import type { Metadata } from "next";
import BlogHero from "@/components/blog/blog-hero";
import LegalArticle, { type LegalSection } from "@/components/legal/legal-article";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "The terms that govern your use of travelora.app and the bookings you make with Travelora.",
  alternates: { canonical: "/terms" },
};

const SECTIONS: LegalSection[] = [
  {
    heading: "Booking and contract",
    paragraphs: [
      "A booking becomes a contract when we confirm it by email — not when you submit the form. We may decline bookings at our discretion, for example if a tour is fully sold or if details are inconsistent.",
      "All prices on travelora.app are quoted in US dollars unless otherwise stated.",
    ],
  },
  {
    heading: "Payment",
    paragraphs: [
      "Bookings require payment in full at checkout unless a deposit option is offered for the tour. Your booking is held for 24 hours after submission while your payment clears.",
    ],
  },
  {
    heading: "Cancellation and changes",
    list: [
      "More than 30 days before departure — full refund minus a 5% administration fee.",
      "15–30 days before departure — 50% refund.",
      "Less than 15 days before departure — no refund, but we will help reschedule where possible.",
      "If we cancel a tour for reasons in our control, you receive a full refund or a transfer.",
    ],
  },
  {
    heading: "Your responsibilities",
    list: [
      "Hold a valid passport and all visas required for the destinations on your itinerary.",
      "Arrange your own travel insurance — it is mandatory for all tours we operate.",
      "Disclose medical conditions or accessibility needs at the time of booking so we can plan safely.",
      "Behave respectfully toward guides, partners and other travellers.",
    ],
  },
  {
    heading: "Liability",
    paragraphs: [
      "Travelora is not liable for losses caused by events outside our reasonable control — weather, strikes, civil unrest, government action — known collectively as force majeure. Our liability is limited to the amount you paid for the affected services.",
    ],
  },
  {
    heading: "Intellectual property",
    paragraphs: [
      "All content on travelora.app — photography, copy, design, software — is owned by Travelora or our licensors. You may not reproduce it for commercial purposes without written consent.",
    ],
  },
  {
    heading: "Governing law",
    paragraphs: [
      "These terms are governed by the laws of the State of Delaware. Disputes will be resolved in the courts of Delaware, except where local law gives you a non-waivable right to use your own courts.",
    ],
  },
  {
    heading: "Updates to these terms",
    paragraphs: [
      "We may update these terms from time to time. Material changes will be highlighted on this page with a new effective date.",
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <BlogHero
        title="Terms & Conditions"
        crumbs={[{ label: "Home", href: "/" }, { label: "Terms & Conditions" }]}
      />
      <LegalArticle
        effectiveDate="January 1, 2026"
        intro="These terms apply when you browse travelora.app and when you book a tour with us. Please read them carefully — by using the site or making a booking you agree to be bound by them."
        sections={SECTIONS}
      />
    </>
  );
}
