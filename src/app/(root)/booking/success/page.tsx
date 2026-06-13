import type { Metadata } from "next";
import Link from "next/link";
import { IconCircleCheckFilled } from "@tabler/icons-react";

export const metadata: Metadata = {
  title: "Booking confirmed",
  robots: { index: false, follow: false },
};

type Search = { searchParams: Promise<{ ref?: string }> };

export default async function BookingSuccessPage({ searchParams }: Search) {
  const { ref } = await searchParams;
  return (
    <section className="py-20 sm:py-24">
      <div className="container-content grid place-items-center">
        <div className="w-full max-w-xl rounded-3xl border border-black/[0.06] bg-white p-10 text-center shadow-[0_24px_60px_-32px_rgba(0,28,142,0.4)]">
          <IconCircleCheckFilled className="mx-auto size-14 text-emerald-500" />
          <h1 className="mt-5 text-3xl font-semibold text-[#373737]">Thanks — you&apos;re booked.</h1>
          <p className="mt-3 text-base text-[#8e8e8e]">
            We&apos;ve emailed your confirmation and receipt. Our team will be in touch with your trip
            details before departure.
          </p>
          {ref && (
            <p className="mt-5 inline-block rounded-full bg-navy/[0.06] px-4 py-1.5 text-sm font-semibold text-navy">
              Reference: {ref}
            </p>
          )}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link href="/tours" className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-primary-dark">
              Explore more tours
            </Link>
            <Link href="/" className="text-sm font-semibold text-navy hover:underline">
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
