"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
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

type Pkg = {
  image: string;
  title: string;
  location: string;
  category: string;
  rating: number;
  reviews: number;
  duration: string;
  group: string;
  price: number;
  oldPrice?: number;
  badge: { label: string; tone: "popular" | "discount" };
};

const PACKAGES: Pkg[] = [
  {
    image: "/images/packages/pkg-1.png",
    title: "California Sunset / Twilight Boat Cruise",
    location: "Jamaica, Kenya",
    category: "Cruise",
    rating: 4.8,
    reviews: 496,
    duration: "7 Days 6 Nights",
    group: "Up to 12",
    price: 565,
    badge: { label: "Popular", tone: "popular" },
  },
  {
    image: "/images/packages/pkg-2.png",
    title: "Santorini Island Hopping Adventure",
    location: "Santorini, Greece",
    category: "Beach",
    rating: 4.9,
    reviews: 312,
    duration: "5 Days 4 Nights",
    group: "Up to 8",
    price: 540,
    oldPrice: 720,
    badge: { label: "25% OFF", tone: "discount" },
  },
  {
    image: "/images/packages/pkg-3.png",
    title: "Swiss Alps Scenic Mountain Retreat",
    location: "Zermatt, Switzerland",
    category: "Mountain",
    rating: 4.7,
    reviews: 210,
    duration: "6 Days 5 Nights",
    group: "Up to 10",
    price: 890,
    badge: { label: "Popular", tone: "popular" },
  },
  {
    image: "/images/packages/pkg-4.png",
    title: "Bali Tropical Beach & Temple Getaway",
    location: "Bali, Indonesia",
    category: "Cultural",
    rating: 4.6,
    reviews: 488,
    duration: "8 Days 7 Nights",
    group: "Up to 14",
    price: 640,
    badge: { label: "Popular", tone: "popular" },
  },
  {
    image: "/images/packages/pkg-5.png",
    title: "Norway Fjords & Northern Lights Tour",
    location: "Tromsø, Norway",
    category: "Adventure",
    rating: 4.9,
    reviews: 175,
    duration: "4 Days 3 Nights",
    group: "Up to 9",
    price: 833,
    oldPrice: 980,
    badge: { label: "15% OFF", tone: "discount" },
  },
  {
    image: "/images/packages/pkg-6.png",
    title: "Machu Picchu Inca Trail Expedition",
    location: "Cusco, Peru",
    category: "Adventure",
    rating: 4.8,
    reviews: 264,
    duration: "5 Days 4 Nights",
    group: "Up to 11",
    price: 710,
    badge: { label: "Popular", tone: "popular" },
  },
];

const CATEGORY_OPTIONS = [
  { label: "All Categories", value: "all" },
  { label: "Adventure", value: "adventure" },
  { label: "Beach", value: "beach" },
  { label: "Cultural", value: "cultural" },
  { label: "Cruise", value: "cruise" },
  { label: "Mountain", value: "mountain" },
];

const DESTINATION_OPTIONS = [
  { label: "All Destinations", value: "all" },
  { label: "Greece", value: "greece" },
  { label: "Switzerland", value: "switzerland" },
  { label: "Indonesia", value: "indonesia" },
  { label: "Norway", value: "norway" },
  { label: "Peru", value: "peru" },
  { label: "Kenya", value: "kenya" },
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
  { label: "$800 & above", value: "800+" },
];

const cardVariant = {
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

  const visible = useMemo(() => {
    return PACKAGES.filter((p) => {
      if (filters.category !== "all" && p.category.toLowerCase() !== filters.category)
        return false;
      if (
        filters.destination !== "all" &&
        !p.location.toLowerCase().includes(filters.destination)
      )
        return false;
      if (filters.duration !== "all") {
        const days = parseInt(p.duration, 10);
        if (filters.duration === "short" && days > 3) return false;
        if (filters.duration === "mid" && (days < 4 || days > 6)) return false;
        if (filters.duration === "long" && days < 7) return false;
      }
      if (filters.price !== "all") {
        if (filters.price === "u600" && p.price >= 600) return false;
        if (filters.price === "600-800" && (p.price < 600 || p.price > 800))
          return false;
        if (filters.price === "800+" && p.price < 800) return false;
      }
      return true;
    });
  }, [filters]);

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
        <motion.div
          layout
          className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-8"
        >
          {visible.map((p) => (
            <PackageCard key={p.title} pkg={p} />
          ))}
        </motion.div>

        {visible.length === 0 && (
          <p className="mt-12 text-center text-base text-[#9a9a9a]">
            No packages match these filters yet — try widening your search.
          </p>
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
            <button
              type="button"
              className="group inline-flex items-center gap-2 rounded-full bg-navy px-9 py-3.5 text-base font-medium text-white shadow-[0_12px_28px_rgba(0,28,142,0.25)] transition-all hover:-translate-y-0.5 hover:bg-navy/90"
            >
              Explore All Packages
              <IconArrowRight
                className="size-5 transition-transform group-hover:translate-x-1"
                stroke={2}
              />
            </button>
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
      className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-[0_10px_40px_-18px_rgba(0,0,0,0.25)] ring-1 ring-black/[0.04] transition-shadow duration-300 hover:shadow-[0_28px_60px_-20px_rgba(0,0,0,0.3)]"
    >
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
            pkg.badge.tone === "discount"
              ? "bg-primary text-black"
              : "bg-white/90 text-navy"
          }`}
        >
          {pkg.badge.label}
        </span>

        {/* Wishlist */}
        <button
          type="button"
          aria-label="Save to wishlist"
          className="absolute right-4 top-4 grid size-9 place-items-center rounded-full bg-white/90 text-ink/70 shadow-sm backdrop-blur transition-colors hover:bg-white hover:text-rose-500"
        >
          <IconHeart className="size-[18px]" stroke={1.8} />
        </button>

        {/* Category + location on image */}
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
        <div className="mt-5 flex items-center justify-between border-t border-black/[0.06] pt-5">
          <div>
            <span className="block text-[11px] font-medium uppercase tracking-wide text-[#b0b0b0]">
              From
            </span>
            <p className="flex items-baseline gap-1.5">
              {pkg.oldPrice && (
                <span className="text-sm font-normal text-[#bdbdbd] line-through">
                  ${pkg.oldPrice}
                </span>
              )}
              <span className="text-xl font-semibold text-navy">${pkg.price}</span>
              <span className="text-sm font-normal text-[#a1a1a1]">/ person</span>
            </p>
          </div>
          <button
            type="button"
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-black shadow-[0_8px_18px_-8px_rgba(254,188,18,0.9)] transition-all hover:-translate-y-0.5 hover:bg-primary-dark"
          >
            Book Now
          </button>
        </div>
      </div>
    </motion.article>
  );
}
