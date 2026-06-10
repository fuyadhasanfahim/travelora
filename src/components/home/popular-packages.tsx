"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  IconStarFilled,
  IconMapPin,
  IconClock,
  IconChevronDown,
} from "@tabler/icons-react";

type Pkg = {
  image: string;
  title: string;
  location: string;
  rating: number;
  reviews: number;
  duration: string;
  price: number;
  badge: { label: string; tone: "popular" | "discount" };
};

const PACKAGES: Pkg[] = [
  {
    image: "/images/packages/pkg-1.png",
    title: "California Sunset / Twilight Boat Cruise",
    location: "Jamaica, Kenya",
    rating: 4.8,
    reviews: 496,
    duration: "7 Day 6 Night",
    price: 565,
    badge: { label: "Popular", tone: "popular" },
  },
  {
    image: "/images/packages/pkg-2.png",
    title: "Santorini Island Hopping Adventure",
    location: "Santorini, Greece",
    rating: 4.9,
    reviews: 312,
    duration: "5 Day 4 Night",
    price: 720,
    badge: { label: "25% OFF", tone: "discount" },
  },
  {
    image: "/images/packages/pkg-3.png",
    title: "Swiss Alps Scenic Mountain Retreat",
    location: "Zermatt, Switzerland",
    rating: 4.7,
    reviews: 210,
    duration: "6 Day 5 Night",
    price: 890,
    badge: { label: "Popular", tone: "popular" },
  },
  {
    image: "/images/packages/pkg-4.png",
    title: "Bali Tropical Beach & Temple Getaway",
    location: "Bali, Indonesia",
    rating: 4.6,
    reviews: 488,
    duration: "8 Day 7 Night",
    price: 640,
    badge: { label: "Popular", tone: "popular" },
  },
  {
    image: "/images/packages/pkg-5.png",
    title: "Norway Fjords & Northern Lights Tour",
    location: "Tromsø, Norway",
    rating: 4.9,
    reviews: 175,
    duration: "4 Day 3 Night",
    price: 980,
    badge: { label: "15% OFF", tone: "discount" },
  },
  {
    image: "/images/packages/pkg-6.png",
    title: "Machu Picchu Inca Trail Expedition",
    location: "Cusco, Peru",
    rating: 4.8,
    reviews: 264,
    duration: "5 Day 4 Night",
    price: 710,
    badge: { label: "Popular", tone: "popular" },
  },
];

const FILTERS = ["Categories", "Destination", "Rating", "Price"];

const cardVariant = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function PopularPackages() {
  return (
    <section className="bg-[#fafafa] py-16 sm:py-20 lg:py-24">
      <div className="container-content">
        {/* Header + filters */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5 }}
            className="max-w-xl"
          >
            <h2 className="text-3xl font-semibold text-[#6e6e6e] sm:text-4xl lg:text-[46px]">
              Popular Packages
            </h2>
            <p className="mt-3 text-base text-[#8e8e8e] sm:text-lg">
              Navigate the globe with confidence
            </p>
          </motion.div>

          <div className="flex flex-wrap gap-2.5 sm:gap-3">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-4 py-2.5 text-sm font-medium text-ink shadow-sm transition-colors hover:border-navy/30 hover:text-navy"
              >
                {f}
                <IconChevronDown className="size-4 text-ink/50" stroke={1.8} />
              </button>
            ))}
          </div>
        </div>

        {/* Cards grid */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          transition={{ staggerChildren: 0.1 }}
          className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-8"
        >
          {PACKAGES.map((p) => (
            <PackageCard key={p.title} pkg={p} />
          ))}
        </motion.div>

        {/* Load more */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 flex justify-center"
        >
          <button
            type="button"
            className="rounded-full bg-navy px-9 py-3.5 text-base font-medium text-white shadow-[0_12px_28px_rgba(0,28,142,0.25)] transition-all hover:-translate-y-0.5 hover:bg-navy/90"
          >
            Load More
          </button>
        </motion.div>
      </div>
    </section>
  );
}

function PackageCard({ pkg }: { pkg: Pkg }) {
  return (
    <motion.article
      variants={cardVariant}
      whileHover={{ y: -10 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group overflow-hidden rounded-3xl bg-white shadow-[0_10px_40px_-18px_rgba(0,0,0,0.25)] ring-1 ring-black/[0.04] transition-shadow duration-300 hover:shadow-[0_28px_60px_-20px_rgba(0,0,0,0.3)]"
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
        <span
          className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-medium shadow-sm ${
            pkg.badge.tone === "discount"
              ? "bg-primary text-black"
              : "bg-white/95 text-navy"
          }`}
        >
          {pkg.badge.label}
        </span>
      </div>

      {/* Body */}
      <div className="p-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5">
            <IconStarFilled className="size-4 text-primary" />
            <span className="text-xs text-[#a1a1a1]">
              {pkg.rating} ({pkg.reviews} Reviews)
            </span>
          </div>
          <div className="flex items-center gap-1 text-[#a1a1a1]">
            <IconMapPin className="size-4" stroke={1.6} />
            <span className="text-sm">{pkg.location}</span>
          </div>
        </div>

        <h3 className="mt-3 line-clamp-2 min-h-[3.5rem] text-xl font-semibold text-[#515151] transition-colors group-hover:text-navy">
          {pkg.title}
        </h3>

        <div className="mt-2 flex items-center gap-1.5 text-[#a1a1a1]">
          <IconClock className="size-4" stroke={1.6} />
          <span className="text-sm">{pkg.duration}</span>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-black/[0.06] pt-5">
          <p className="text-lg font-semibold text-navy">
            ${pkg.price}
            <span className="text-sm font-normal text-[#a1a1a1]">/ Person</span>
          </p>
          <button
            type="button"
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-black transition-colors hover:bg-primary-dark"
          >
            Book Now
          </button>
        </div>
      </div>
    </motion.article>
  );
}
