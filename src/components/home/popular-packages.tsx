"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { motion, Variants } from "framer-motion";
import {
  IconStarFilled,
  IconMapPin,
  IconClock,
  IconUsers,
  IconHeart,
  IconCategory,
  IconCurrencyDollar,
  IconArrowRight,
} from "@tabler/icons-react";
import Select from "@/components/ui/select";
import { useTours } from "@/lib/query/hooks";
import { TourCardSkeleton } from "@/components/ui/skeleton";

type Pkg = {
  slug: string;
  image: string;
  title: string;
  location: string;
  category: string;
  rating: number;
  reviews: number;
  duration: string;
  durationDays: number;
  group: string;
  price: number;
  oldPrice?: number;
  badge: { label: string; tone: "popular" | "discount" };
};

const CATEGORY_OPTIONS = [
  { label: "All Categories", value: "all" },
  { label: "Adventure", value: "adventure" },
  { label: "Beach", value: "beach" },
  { label: "City", value: "city" },
  { label: "Cultural", value: "cultural" },
  { label: "Cruise", value: "cruise" },
  { label: "Desert", value: "desert" },
  { label: "Mountain", value: "mountain" },
  { label: "Tropical", value: "tropical" },
  { label: "Wildlife", value: "wildlife" },
];

const DESTINATION_OPTIONS = [
  { label: "All Destinations", value: "all" },
  { label: "Greece", value: "greece" },
  { label: "Switzerland", value: "switzerland" },
  { label: "Indonesia", value: "indonesia" },
  { label: "Norway", value: "norway" },
  { label: "Peru", value: "peru" },
  { label: "Kenya", value: "kenya" },
  { label: "Japan", value: "japan" },
  { label: "Italy", value: "italy" },
  { label: "Iceland", value: "iceland" },
  { label: "Morocco", value: "morocco" },
  { label: "Thailand", value: "thailand" },
  { label: "Egypt", value: "egypt" },
  { label: "Mexico", value: "mexico" },
  { label: "Vietnam", value: "vietnam" },
];

const DURATION_OPTIONS = [
  { label: "Any Duration", value: "all" },
  { label: "1 – 3 Days", value: "short" },
  { label: "4 – 6 Days", value: "mid" },
  { label: "7+ Days", value: "long" },
];

const PRICE_OPTIONS = [
  { label: "Any Price", value: "all" },
  { label: "Under $600", value: "u600" },
  { label: "$600 – $800", value: "600-800" },
  { label: "$800 – $1500", value: "800-1500" },
  { label: "$1500 & above", value: "1500+" },
];

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function PopularPackages() {
  const [filters, setFilters] = useState({
    category: "all",
    destination: "all",
    duration: "all",
    price: "all",
  });

  // Push category, destination, maxPrice down to the API so it filters the
  // entire dataset — not just the slice we happen to have loaded.
  const apiMaxPrice = (() => {
    if (filters.price === "u600") return 599;
    if (filters.price === "600-800") return 800;
    if (filters.price === "800-1500") return 1500;
    return undefined;
  })();

  const { data, isLoading } = useTours({
    pageSize: 24,
    category: filters.category !== "all" ? filters.category : undefined,
    destination: filters.destination !== "all" ? filters.destination : undefined,
    maxPrice: apiMaxPrice,
  });

  const visible = useMemo<Pkg[]>(() => {
    const items = (data?.items ?? []).map((t): Pkg => ({
      slug: t.slug,
      image: t.image,
      title: t.title,
      location: t.location,
      category: t.category,
      rating: t.rating,
      reviews: t.reviews,
      duration: t.durationLabel,
      durationDays: t.durationDays,
      group: t.groupSize,
      price: t.price,
      oldPrice: t.oldPrice ?? undefined,
      badge: {
        label: t.badgeLabel,
        tone: t.badgeTone === "discount" ? "discount" : "popular",
      },
    }));

    return items
      .filter((p) => {
        // Duration is a derived field (durationDays); filter client-side.
        if (filters.duration !== "all") {
          const days = p.durationDays;
          if (filters.duration === "short" && days > 3) return false;
          if (filters.duration === "mid" && (days < 4 || days > 6)) return false;
          if (filters.duration === "long" && days < 7) return false;
        }
        // Lower bound of the "600-800" / "800-1500" buckets — API only
        // enforced the upper bound.
        if (filters.price === "600-800" && p.price < 600) return false;
        if (filters.price === "800-1500" && p.price < 800) return false;
        if (filters.price === "1500+" && p.price < 1500) return false;
        return true;
      })
      .slice(0, 6);
  }, [data, filters]);

  // Build the "View all" link with the current filter context so the
  // /tours page opens pre-filtered with the same view.
  const exploreHref = useMemo(() => {
    const sp = new URLSearchParams();
    if (filters.category !== "all") sp.set("category", filters.category);
    if (filters.destination !== "all") sp.set("destination", filters.destination);
    if (apiMaxPrice) sp.set("maxPrice", String(apiMaxPrice));
    const qs = sp.toString();
    return qs ? `/tours?${qs}` : "/tours";
  }, [filters, apiMaxPrice]);

  return (
    <section className="bg-[#fafafa] py-16 sm:py-20 lg:py-24">
      <div className="container-content">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5 }}
          className="max-w-xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-navy/[0.06] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-navy">
            <span className="size-1.5 rounded-full bg-primary" />
            Curated Journeys
          </span>
          <h2 className="mt-4 text-3xl font-semibold text-[#4f4f4f] sm:text-4xl lg:text-[46px]">
            Popular Packages
          </h2>
          <p className="mt-3 text-base text-[#8e8e8e] sm:text-lg">
            Hand-picked escapes with everything sorted — flights, stays, and
            unforgettable moments.
          </p>
        </motion.div>

        {/* Filter bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mt-8 grid grid-cols-1 gap-3 rounded-3xl border border-black/[0.06] bg-white p-3 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.4)] sm:grid-cols-2 lg:mt-10 lg:grid-cols-4"
        >
          <Select
            label="Category"
            icon={IconCategory}
            options={CATEGORY_OPTIONS}
            value={filters.category}
            onChange={(v) => setFilters((f) => ({ ...f, category: v }))}
          />
          <Select
            label="Destination"
            icon={IconMapPin}
            options={DESTINATION_OPTIONS}
            value={filters.destination}
            onChange={(v) => setFilters((f) => ({ ...f, destination: v }))}
          />
          <Select
            label="Duration"
            icon={IconClock}
            options={DURATION_OPTIONS}
            value={filters.duration}
            onChange={(v) => setFilters((f) => ({ ...f, duration: v }))}
          />
          <Select
            label="Pricing"
            icon={IconCurrencyDollar}
            options={PRICE_OPTIONS}
            value={filters.price}
            onChange={(v) => setFilters((f) => ({ ...f, price: v }))}
          />
        </motion.div>

        {/* Cards grid */}
        {isLoading ? (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <TourCardSkeleton key={i} />
            ))}
          </div>
        ) : visible.length === 0 ? (
          <div className="mt-12 grid place-items-center rounded-3xl border border-dashed border-black/15 bg-white py-20 text-center">
            <p className="text-lg font-semibold text-[#6e6e6e]">
              No packages match these filters yet.
            </p>
            <p className="mt-1 text-sm text-[#9a9a9a]">
              Try widening your price range or removing a category.
            </p>
            <button
              type="button"
              onClick={() =>
                setFilters({ category: "all", destination: "all", duration: "all", price: "all" })
              }
              className="mt-5 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-primary-dark"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-8"
          >
            {visible.map((p) => (
              <PackageCard key={p.slug} pkg={p} />
            ))}
          </motion.div>
        )}

        {/* Load more */}
        {visible.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-12 flex justify-center"
          >
            <Link
              href={exploreHref}
              className="group inline-flex items-center gap-2 rounded-full bg-navy px-9 py-3.5 text-base font-medium text-white shadow-[0_12px_28px_rgba(0,28,142,0.25)] transition-all hover:-translate-y-0.5 hover:bg-navy/90"
            >
              Explore All Packages
              <IconArrowRight
                className="size-5 transition-transform group-hover:translate-x-1"
                stroke={2}
              />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}

function PackageCard({ pkg }: { pkg: Pkg }) {
  return (
    <motion.article
      layout
      variants={cardVariant}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -10 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-[0_10px_40px_-18px_rgba(0,0,0,0.25)] ring-1 ring-black/[0.04] transition-shadow duration-300 hover:shadow-[0_28px_60px_-20px_rgba(0,0,0,0.3)]"
    >
      {/* Whole-card link → tour detail */}
      <Link
        href={`/tours/${pkg.slug}`}
        aria-label={pkg.title}
        className="absolute inset-0 z-10"
      />

      {/* Image */}
      <div className="relative aspect-[397/269] w-full overflow-hidden">
        <Image
          src={pkg.image}
          alt={pkg.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-black/10" />

        {/* Badge */}
        <span
          className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold shadow-sm backdrop-blur ${
            pkg.badge.tone === "discount" ? "bg-primary text-black" : "bg-white/90 text-navy"
          }`}
        >
          {pkg.badge.label}
        </span>

        {/* Wishlist (above the overlay link) */}
        <button
          type="button"
          aria-label="Save to wishlist"
          className="absolute right-4 top-4 z-20 grid size-9 place-items-center rounded-full bg-white/90 text-ink/70 shadow-sm backdrop-blur transition-colors hover:bg-white hover:text-rose-500"
        >
          <IconHeart className="size-[18px]" stroke={1.8} />
        </button>

        {/* Category + location */}
        <div className="absolute inset-x-4 bottom-3 flex items-center justify-between gap-2">
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-navy backdrop-blur">
            {pkg.category}
          </span>
          <span className="flex items-center gap-1 text-xs font-medium text-white drop-shadow">
            <IconMapPin className="size-4" stroke={1.8} />
            {pkg.location}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-1.5">
          <IconStarFilled className="size-4 text-primary" />
          <span className="text-sm font-semibold text-ink">{pkg.rating}</span>
          <span className="text-xs text-[#a1a1a1]">({pkg.reviews} reviews)</span>
        </div>

        <h3 className="mt-2 line-clamp-2 min-h-[3.5rem] text-xl font-semibold text-[#3f3f3f] transition-colors group-hover:text-navy">
          {pkg.title}
        </h3>

        {/* Meta */}
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[#8a8a8a]">
          <span className="flex items-center gap-1.5 text-sm">
            <IconClock className="size-4 text-navy/60" stroke={1.7} />
            {pkg.duration}
          </span>
          <span className="flex items-center gap-1.5 text-sm">
            <IconUsers className="size-4 text-navy/60" stroke={1.7} />
            {pkg.group}
          </span>
        </div>

        {/* Footer */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-black/[0.06] pt-5">
          <div className="min-w-0">
            <span className="block text-[11px] font-medium uppercase tracking-wide text-[#b0b0b0]">
              From
            </span>
            <p className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
              {pkg.oldPrice && (
                <span className="text-sm font-normal text-[#bdbdbd] line-through">
                  ${pkg.oldPrice}
                </span>
              )}
              <span className="text-xl font-semibold text-navy">${pkg.price}</span>
              <span className="text-sm font-normal text-[#a1a1a1]">/ person</span>
            </p>
          </div>
          {/* Book Now → checkout (sits above the whole-card link via z-20) */}
          <Link
            href={`/booking?tour=${pkg.slug}&adult=2&child=1&extra=0`}
            aria-label={`Book ${pkg.title}`}
            className="relative z-20 shrink-0 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-black shadow-[0_8px_18px_-8px_rgba(254,188,18,0.9)] transition-all hover:-translate-y-0.5 hover:bg-primary-dark"
          >
            Book Now
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
