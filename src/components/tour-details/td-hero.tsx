"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { IconChevronRight, IconStarFilled, IconStarHalfFilled, IconMapPin } from "@tabler/icons-react";
import type { Tour } from "@/data/tours";

function Stars({ value }: { value: number }) {
  const full = Math.floor(value);
  const half = value % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <span className="flex items-center gap-0.5 text-primary">
      {Array.from({ length: full }).map((_, i) => (
        <IconStarFilled key={i} className="size-4" />
      ))}
      {half && <IconStarHalfFilled className="size-4" />}
      {Array.from({ length: empty }).map((_, i) => (
        <IconStarFilled key={`e${i}`} className="size-4 text-primary/30" />
      ))}
    </span>
  );
}

export default function TdHero({ tour }: { tour: Tour }) {
  return (
    <section className="relative -mt-20 w-full">
      <div className="relative h-[380px] w-full overflow-hidden sm:h-[420px] lg:h-[450px]">
        <motion.div
          animate={{ scale: [1, 1.07, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image src="/images/tours/td-hero.jpg" alt={tour.title} fill priority sizes="100vw" className="object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-navy/75 via-navy/45 to-navy/75" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />
        <span className="pointer-events-none absolute -left-16 top-10 size-60 rounded-full bg-primary/20 blur-3xl" />

        <div className="container-content relative flex h-full flex-col items-center justify-center pt-20 text-center">
          <motion.nav
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            aria-label="Breadcrumb"
            className="flex max-w-full flex-wrap items-center justify-center gap-1.5 rounded-full bg-white/10 px-4 py-1.5 text-sm ring-1 ring-white/15 backdrop-blur"
          >
            <Link href="/" className="font-medium text-amber-soft hover:opacity-80">Home</Link>
            <IconChevronRight className="size-4 shrink-0 text-white/70" stroke={2} />
            <Link href="/tours" className="font-medium text-amber-soft hover:opacity-80">Tour Packages</Link>
            <IconChevronRight className="size-4 shrink-0 text-white/70" stroke={2} />
            <span className="truncate text-white/90">{tour.title}</span>
          </motion.nav>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="mt-4 max-w-3xl text-3xl font-semibold text-white drop-shadow-sm sm:text-4xl lg:text-[46px]"
          >
            {tour.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-white/90"
          >
            <span className="flex items-center gap-1.5 text-sm">
              <Stars value={tour.rating} />
              {tour.rating} ({tour.reviews} Reviews)
            </span>
            <span className="flex items-center gap-1.5 text-sm">
              <IconMapPin className="size-4 text-amber-soft" stroke={1.8} />
              {tour.location}
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
