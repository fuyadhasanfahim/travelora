"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { IconChevronRight } from "@tabler/icons-react";
import FilterSearch from "./filter-search";

export default function TourHero() {
  return (
    <>
      <section className="relative -mt-20 w-full">
        <div className="relative h-[380px] w-full overflow-hidden sm:h-[420px] lg:h-[460px]">
          {/* Ken Burns background */}
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src="/images/tours/hero-bg.jpg"
              alt="Tour Packages"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/50 to-navy/30" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />
          <span className="pointer-events-none absolute -left-16 top-10 size-60 rounded-full bg-primary/20 blur-3xl" />

          {/* Content */}
          <div className="container-content relative flex h-full flex-col justify-center pb-16 pt-20">
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white ring-1 ring-white/20 backdrop-blur"
            >
              <span className="size-1.5 rounded-full bg-primary" />
              Discover the world
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="mt-4 text-4xl font-semibold text-white drop-shadow-sm sm:text-5xl lg:text-[52px]"
            >
              Tour Packages
            </motion.h1>
            <motion.nav
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              aria-label="Breadcrumb"
              className="mt-4 flex items-center gap-1.5 text-sm"
            >
              <Link href="/" className="font-medium text-amber-soft transition-opacity hover:opacity-80">
                Home
              </Link>
              <IconChevronRight className="size-4 text-white/70" stroke={2} />
              <span className="text-white/90">Tour Packages</span>
            </motion.nav>
          </div>
        </div>
      </section>

      {/* Filter/Search bar — straddles the hero bottom */}
      <div className="container-content relative z-10 -mt-14 sm:-mt-16">
        <FilterSearch />
      </div>
    </>
  );
}
