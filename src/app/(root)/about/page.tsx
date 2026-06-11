import type { Metadata } from "next";
import AboutHero from "@/components/about/about-hero";
import AboutSection from "@/components/about/about-section";
import VideoSection from "@/components/about/video-section";
import OurAgents from "@/components/about/our-agents";
import AboutCta from "@/components/about/about-cta";
import Testimonial from "@/components/home/testimonial";
import SocialUpdates from "@/components/home/social-updates";

export const metadata: Metadata = {
  title: "About us — Travelora",
  description:
    "We help you plan your journey. Our mission is to create memories that last a lifetime for every traveler who chooses us.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutSection />
      <VideoSection />
      <OurAgents />
      <AboutCta />
      <Testimonial />
      <SocialUpdates />
    </>
  );
}
