"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import TourFiltersPanel from "./tour-filters-panel";

/**
 * Desktop sidebar. Hidden below `lg` — mobile users open the same filters
 * through TourFiltersDrawer.
 */
export default function TourSidebar() {
  return (
    <motion.aside
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5 }}
      className="hidden space-y-5 lg:block"
    >
      <div className="rounded-3xl border border-black/[0.07] bg-white p-6 shadow-[0_16px_45px_-30px_rgba(0,0,0,0.35)]">
        <TourFiltersPanel />
      </div>

      {/* Promo */}
      <Link
        href="/tours?category=tropical"
        className="relative block aspect-[292/443] overflow-hidden rounded-3xl shadow-[0_20px_50px_-26px_rgba(0,0,0,0.5)]"
      >
        <Image
          src="/images/tours/promo.jpg"
          alt="25% off promotion"
          fill
          sizes="292px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/30" />
        <span className="absolute left-6 top-6 text-4xl font-bold leading-none text-white drop-shadow">
          25%
          <br />
          OFF
        </span>
        <span className="absolute bottom-6 left-6 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-black shadow-lg transition-colors hover:bg-primary-dark">
          Book Now
        </span>
      </Link>
    </motion.aside>
  );
}
