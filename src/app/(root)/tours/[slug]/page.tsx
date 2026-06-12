import type { Metadata } from "next";
import TdHero from "@/components/tour-details/td-hero";
import TdGallery from "@/components/tour-details/td-gallery";
import TdContent from "@/components/tour-details/td-content";
import BookingForm from "@/components/tour-details/booking-form";
import PromoExplore from "@/components/ui/promo-explore";
import SocialUpdates from "@/components/home/social-updates";

export const metadata: Metadata = {
  title: "California Sunset/Twilight Boat Cruise — Travelora",
  description: "A 12-day specific tour with sunset cruise, island hopping and more. Book your journey with Travelora.",
};

export default function TourDetailsPage() {
  return (
    <>
      <TdHero />
      <TdGallery />

      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container-content">
          <div className="grid gap-10 lg:grid-cols-[1fr_397px] lg:gap-12">
            <TdContent />

            <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
              <BookingForm />
              <PromoExplore href="/tours" />
            </aside>
          </div>
        </div>
      </section>

      <SocialUpdates />
    </>
  );
}
