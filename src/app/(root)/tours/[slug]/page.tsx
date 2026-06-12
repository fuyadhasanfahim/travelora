import type { Metadata } from "next";
import TdHero from "@/components/tour-details/td-hero";
import TdGallery from "@/components/tour-details/td-gallery";
import TdContent from "@/components/tour-details/td-content";
import BookingForm from "@/components/tour-details/booking-form";
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

              {/* Promo */}
              <div className="relative overflow-hidden rounded-3xl bg-navy p-7 text-white shadow-[0_24px_55px_-28px_rgba(0,28,142,0.7)]">
                <span className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-primary/25 blur-3xl" />
                <p className="relative text-sm font-medium uppercase tracking-wide text-amber-soft">Time to</p>
                <p className="relative mt-1 text-4xl font-extrabold leading-[1.05]">
                  <span className="text-primary">Explore</span>
                  <br />
                  The World
                </p>
                <button type="button" className="relative mt-6 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-black transition-colors hover:bg-primary-dark">
                  Book Now
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <SocialUpdates />
    </>
  );
}
