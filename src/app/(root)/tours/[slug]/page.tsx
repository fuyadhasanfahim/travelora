import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TdHero from "@/components/tour-details/td-hero";
import TdGallery from "@/components/tour-details/td-gallery";
import TdContent from "@/components/tour-details/td-content";
import BookingForm from "@/components/tour-details/booking-form";
import PromoExplore from "@/components/ui/promo-explore";
import SocialUpdates from "@/components/home/social-updates";
import { TOURS, getTour } from "@/data/tours";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return TOURS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const tour = getTour(slug);
  if (!tour) return { title: "Tour not found — Travelora" };
  return {
    title: `${tour.title} — Travelora`,
    description: `${tour.durationLabel} ${tour.tourType.toLowerCase()} in ${tour.location}. Book your journey with Travelora.`,
  };
}

export default async function TourDetailsPage({ params }: Params) {
  const { slug } = await params;
  const tour = getTour(slug);
  if (!tour) notFound();

  return (
    <>
      <TdHero tour={tour} />
      <TdGallery gallery={tour.gallery} />

      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container-content">
          <div className="grid gap-10 lg:grid-cols-[1fr_397px] lg:gap-12">
            <TdContent tour={tour} />

            <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
              <BookingForm tour={tour} />
              <PromoExplore href="/tours" />
            </aside>
          </div>
        </div>
      </section>

      <SocialUpdates />
    </>
  );
}
