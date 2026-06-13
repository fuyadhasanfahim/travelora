import type { Metadata } from "next";
import BlogHero from "@/components/blog/blog-hero";
import LegalArticle, { type LegalSection } from "@/components/legal/legal-article";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "How Travelora uses cookies and similar technologies on travelora.app, what they do, and how you can control them.",
  alternates: { canonical: "/cookies" },
};

const SECTIONS: LegalSection[] = [
  {
    heading: "What cookies are",
    paragraphs: [
      "Cookies are small text files placed on your device by sites you visit. They make websites work — or work better — by remembering your preferences and what you did during a session.",
    ],
  },
  {
    heading: "The cookies we use",
    list: [
      "Strictly necessary — keep the site working: session, security, load balancing. These cannot be disabled.",
      "Functional — remember preferences like your filter selections on the Tours page.",
      "Analytics — measure traffic anonymously so we can improve content and performance.",
      "Marketing — measure the effectiveness of campaigns we run. Always opt-in.",
    ],
  },
  {
    heading: "Managing cookies",
    paragraphs: [
      "You can clear or block cookies in your browser settings. Blocking strictly-necessary cookies will break parts of the site (login, checkout, search).",
      "Major browsers offer per-site cookie controls — chrome://settings/cookies in Chrome, Settings → Privacy in Safari, about:preferences#privacy in Firefox.",
    ],
  },
  {
    heading: "Third-party cookies",
    paragraphs: [
      "We use a small number of trusted third-party tools — for example, payment providers for checkout and analytics platforms for traffic measurement. Each operates under its own privacy policy.",
    ],
  },
  {
    heading: "Changes to this policy",
    paragraphs: [
      "If we change how we use cookies we will update this page and, where required by law, ask for your consent again.",
    ],
  },
];

export default function CookiesPage() {
  return (
    <>
      <BlogHero
        title="Cookie Policy"
        crumbs={[{ label: "Home", href: "/" }, { label: "Cookie Policy" }]}
      />
      <LegalArticle
        effectiveDate="January 1, 2026"
        intro="Like most websites, travelora.app uses cookies. This page explains what we use them for and how you stay in control."
        sections={SECTIONS}
      />
    </>
  );
}
