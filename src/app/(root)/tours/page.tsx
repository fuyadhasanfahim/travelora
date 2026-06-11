import type { Metadata } from "next";
import TourHero from "@/components/tours/tour-hero";
import TourSidebar from "@/components/tours/tour-sidebar";
import PackageGrid from "@/components/tours/package-grid";
import SocialUpdates from "@/components/home/social-updates";

export const metadata: Metadata = {
  title: "Tour Packages — Travelora",
  description:
    "Browse Travelora tour packages. Filter by price, category, destination and rating to find your perfect journey.",
};

export default function ToursPage() {
  return (
    <>
      <TourHero />

      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container-content">
          <div className="grid gap-8 lg:grid-cols-[292px_1fr] lg:gap-10">
            <TourSidebar />
            <PackageGrid />
          </div>
        </div>
      </section>

      <SocialUpdates />
    </>
  );
}
