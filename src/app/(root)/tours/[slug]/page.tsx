import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TdHero from "@/components/tour-details/td-hero";
import TdGallery from "@/components/tour-details/td-gallery";
import TdContent from "@/components/tour-details/td-content";
import BookingForm from "@/components/tour-details/booking-form";
import PromoExplore from "@/components/ui/promo-explore";
import SocialUpdates from "@/components/home/social-updates";
import { prisma } from "@/lib/db";
import { TourJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

type Params = { params: Promise<{ slug: string }> };

export const revalidate = 300;

export async function generateStaticParams() {
  const tours = await prisma.tour.findMany({ select: { slug: true } });
  return tours.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const tour = await prisma.tour.findUnique({ where: { slug } });
  if (!tour) return { title: "Tour not found" };
  return {
    title: tour.title,
    description: `${tour.durationLabel} ${tour.tourType.toLowerCase()} in ${tour.location}. Book your journey with Travelora.`,
    openGraph: {
      title: tour.title,
      description: tour.overview.slice(0, 160),
      images: [{ url: tour.image, alt: tour.title }],
      type: "article",
    },
    alternates: { canonical: `/tours/${tour.slug}` },
  };
}

export default async function TourDetailsPage({ params }: Params) {
  const { slug } = await params;
  const tour = await prisma.tour.findUnique({ where: { slug } });
  if (!tour) notFound();

  return (
    <>
      <TourJsonLd tour={tour} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${SITE}/` },
          { name: "Tours", url: `${SITE}/tours` },
          { name: tour.title, url: `${SITE}/tours/${tour.slug}` },
        ]}
      />
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
