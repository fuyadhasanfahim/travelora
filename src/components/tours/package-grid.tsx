"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import {
  IconStarFilled,
  IconMapPin,
  IconClock,
  IconHeart,
} from "@tabler/icons-react";
import Pagination from "@/components/ui/pagination";

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
  { image: "/images/packages/pkg-1.png", title: "California Sunset / Twilight Boat Cruise", location: "Jamaica, Kenya", rating: 4.8, reviews: 496, duration: "7 Days 6 Nights", price: 565, badge: { label: "Popular", tone: "popular" } },
  { image: "/images/packages/pkg-2.png", title: "Santorini Island Hopping Adventure", location: "Santorini, Greece", rating: 4.9, reviews: 312, duration: "5 Days 4 Nights", price: 720, badge: { label: "25% OFF", tone: "discount" } },
  { image: "/images/packages/pkg-3.png", title: "Swiss Alps Scenic Mountain Retreat", location: "Zermatt, Switzerland", rating: 4.7, reviews: 210, duration: "6 Days 5 Nights", price: 890, badge: { label: "Popular", tone: "popular" } },
  { image: "/images/packages/pkg-4.png", title: "Bali Tropical Beach & Temple Getaway", location: "Bali, Indonesia", rating: 4.6, reviews: 488, duration: "8 Days 7 Nights", price: 640, badge: { label: "Popular", tone: "popular" } },
  { image: "/images/packages/pkg-5.png", title: "Norway Fjords & Northern Lights Tour", location: "Tromsø, Norway", rating: 4.9, reviews: 175, duration: "4 Days 3 Nights", price: 980, badge: { label: "15% OFF", tone: "discount" } },
  { image: "/images/packages/pkg-6.png", title: "Machu Picchu Inca Trail Expedition", location: "Cusco, Peru", rating: 4.8, reviews: 264, duration: "5 Days 4 Nights", price: 710, badge: { label: "Popular", tone: "popular" } },
  { image: "/images/packages/pkg-1.png", title: "California Sunset / Twilight Boat Cruise", location: "Jamaica, Kenya", rating: 4.8, reviews: 496, duration: "7 Days 6 Nights", price: 565, badge: { label: "Popular", tone: "popular" } },
  { image: "/images/packages/pkg-3.png", title: "Swiss Alps Scenic Mountain Retreat", location: "Zermatt, Switzerland", rating: 4.7, reviews: 210, duration: "6 Days 5 Nights", price: 890, badge: { label: "25% OFF", tone: "discount" } },
  { image: "/images/packages/pkg-4.png", title: "Bali Tropical Beach & Temple Getaway", location: "Bali, Indonesia", rating: 4.6, reviews: 488, duration: "8 Days 7 Nights", price: 640, badge: { label: "Popular", tone: "popular" } },
];


const grid = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const card: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function PackageGrid() {
  return (
    <div>
      {/* Result bar */}
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-[#8e8e8e]">
          Showing <span className="font-semibold text-ink">9</span> of 120 tours
        </p>
        <button
          type="button"
          className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-navy/30 hover:text-navy"
        >
          Sort: Popular
        </button>
      </div>

      <motion.div
        variants={grid}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.05 }}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3"
      >
        {PACKAGES.map((p, i) => (
          <motion.article
            key={i}
            variants={card}
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="group relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-[0_12px_40px_-22px_rgba(0,0,0,0.3)] ring-1 ring-black/[0.04] transition-shadow duration-300 hover:shadow-[0_28px_60px_-26px_rgba(0,28,142,0.4)]"
          >
            {/* Whole-card link */}
            <Link href="/tours/california-sunset" aria-label={p.title} className="absolute inset-0 z-10" />

            <div className="relative aspect-[397/269] w-full overflow-hidden">
              <Image
                src={p.image}
                alt={p.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 300px"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
              <span
                className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold shadow-sm backdrop-blur ${
                  p.badge.tone === "discount" ? "bg-primary text-black" : "bg-white/90 text-navy"
                }`}
              >
                {p.badge.label}
              </span>
              <span className="absolute right-4 top-4 z-20 grid size-9 place-items-center rounded-full bg-white/90 text-ink/70 shadow-sm backdrop-blur transition-colors group-hover:text-rose-500">
                <IconHeart className="size-[18px]" stroke={1.8} />
              </span>
            </div>

            <div className="flex flex-1 flex-col p-5">
              <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-1.5">
                  <IconStarFilled className="size-4 text-primary" />
                  <span className="text-sm font-semibold text-ink">{p.rating}</span>
                  <span className="text-xs text-[#a1a1a1]">({p.reviews})</span>
                </span>
                <span className="flex items-center gap-1 text-xs text-[#a1a1a1]">
                  <IconMapPin className="size-4" stroke={1.6} />
                  {p.location}
                </span>
              </div>

              <h3 className="mt-2 line-clamp-2 min-h-[3rem] text-lg font-semibold text-[#3f3f3f] transition-colors group-hover:text-navy">
                {p.title}
              </h3>

              <div className="mt-2 flex items-center gap-1.5 text-sm text-[#8a8a8a]">
                <IconClock className="size-4 text-navy/60" stroke={1.7} />
                {p.duration}
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-black/[0.06] pt-4">
                <p className="text-lg font-semibold text-navy">
                  ${p.price}
                  <span className="text-sm font-normal text-[#a1a1a1]">/ Person</span>
                </p>
                <span className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-black transition-all group-hover:-translate-y-0.5 group-hover:bg-primary-dark">
                  Book Now
                </span>
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>

      {/* Pagination */}
      <div className="mt-10">
        <Pagination total={10} current={1} />
      </div>
    </div>
  );
}
