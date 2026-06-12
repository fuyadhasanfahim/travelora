import type { Metadata } from "next";
import ContactHero from "@/components/contact/contact-hero";
import ContactSection from "@/components/contact/contact-section";
import SocialUpdates from "@/components/home/social-updates";

export const metadata: Metadata = {
  title: "Contact with us — Travelora",
  description: "Get in touch with Travelora. Leave us a message and we'll get back to you.",
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactSection />
      <SocialUpdates />
    </>
  );
}
