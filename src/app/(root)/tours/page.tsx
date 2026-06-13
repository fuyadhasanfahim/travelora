import type { Metadata } from "next";
import { Suspense } from "react";
import TourHero from "@/components/tours/tour-hero";
import TourSidebar from "@/components/tours/tour-sidebar";
import PackageGrid from "@/components/tours/package-grid";
import TourFiltersDrawer from "@/components/tours/tour-filters-drawer";
import FilterFab from "@/components/tours/filter-fab";
import SocialUpdates from "@/components/home/social-updates";

export const metadata: Metadata = {
  title: "Tour Packages — Travelora",
  description:
    "Browse Travelora tour packages. Filter by price, category, destination and rating to find your perfect journey.",
};

export default function ToursPage() {
  return (
    <>
      <Suspense fallback={null}>
        <TourHero />
      </Suspense>

      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container-content">
          {/* Mobile/tablet: grid only. Desktop (lg+): sidebar + grid. */}
          <div className="grid gap-8 lg:grid-cols-[292px_1fr] lg:gap-10">
            <Suspense fallback={null}>
              <TourSidebar />
            </Suspense>
            <Suspense fallback={null}>
              <PackageGrid />
            </Suspense>
          </div>
        </div>
      </section>

      {/* Mobile/tablet only — drawer + floating button (both lg:hidden internally) */}
      <Suspense fallback={null}>
        <TourFiltersDrawer />
      </Suspense>
      <Suspense fallback={null}>
        <FilterFab />
      </Suspense>

      <SocialUpdates />
    </>
  );
}
