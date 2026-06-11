"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion } from "framer-motion";
import {
  IconArrowUpRight,
  IconChevronLeft,
  IconChevronRight,
  IconCompass,
  IconBeach,
  IconBuildingCommunity,
  IconSunHigh,
  IconUmbrella,
  IconMountain,
} from "@tabler/icons-react";
import type { ComponentType } from "react";

type IconType = ComponentType<{ className?: string; stroke?: number }>;

type Category = {
  name: string;
  image: string;
  tours: number;
  icon: IconType;
};

// Exact categories from Figma: Adventure, Beach, City, Desert, Tropical, Mountain
const CATEGORIES: Category[] = [
  { name: "Adventure", image: "/images/categories/adventure.jpg", tours: 74, icon: IconCompass },
  { name: "Beach", image: "/images/categories/beach.jpg", tours: 128, icon: IconBeach },
  { name: "City", image: "/images/categories/city.jpg", tours: 152, icon: IconBuildingCommunity },
  { name: "Desert", image: "/images/categories/desert.jpg", tours: 41, icon: IconSunHigh },
  { name: "Tropical", image: "/images/categories/tropical.jpg", tours: 89, icon: IconUmbrella },
  { name: "Mountain", image: "/images/categories/mountain.jpg", tours: 96, icon: IconMountain },
];

const track = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function TopCategories() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCards = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="container-content">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-navy/[0.06] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-navy">
            <span className="size-1.5 rounded-full bg-primary" />
            Browse by interest
          </span>
          <h2 className="mt-4 text-3xl font-semibold text-[#6e6e6e] sm:text-4xl lg:text-[46px]">
            Top Categories
          </h2>
          <p className="mt-3 text-base text-[#8e8e8e] sm:text-lg">
            Explore by your travel style
          </p>
        </motion.div>

        {/* Scrolling cards */}
        <div className="relative mt-10 lg:mt-14">
          <button
            type="button"
            aria-label="Previous categories"
            onClick={() => scrollByCards(-1)}
            className="absolute -left-4 top-1/2 z-10 hidden size-11 -translate-y-1/2 place-items-center rounded-full bg-white text-ink shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all hover:bg-primary hover:text-black lg:grid"
          >
            <IconChevronLeft className="size-5" stroke={2} />
          </button>
          <button
            type="button"
            aria-label="Next categories"
            onClick={() => scrollByCards(1)}
            className="absolute -right-4 top-1/2 z-10 hidden size-11 -translate-y-1/2 place-items-center rounded-full bg-white text-ink shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all hover:bg-primary hover:text-black lg:grid"
          >
            <IconChevronRight className="size-5" stroke={2} />
          </button>

          <motion.div
            ref={trackRef}
            variants={track}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-6 pt-6 sm:gap-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {CATEGORIES.map((c) => (
              <CategoryCard key={c.name} category={c} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CategoryCard({ category }: { category: Category }) {
  const Icon = category.icon;
  return (
    <motion.button
      type="button"
      variants={item}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group relative h-[190px] w-[240px] shrink-0 cursor-pointer snap-start overflow-hidden rounded-3xl shadow-[0_14px_40px_-20px_rgba(0,0,0,0.5)] ring-1 ring-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy sm:h-[210px] sm:w-[270px]"
    >
      <Image
        src={category.image}
        alt={category.name}
        fill
        sizes="270px"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/5 transition-opacity duration-300 group-hover:from-black/80" />

      {/* Icon chip */}
      <span className="absolute left-4 top-4 grid size-10 place-items-center rounded-xl bg-white/15 text-white backdrop-blur-sm ring-1 ring-white/25 transition-colors group-hover:bg-primary group-hover:text-black">
        <Icon className="size-5" stroke={1.8} />
      </span>

      {/* Label + arrow */}
      <div className="absolute inset-x-4 bottom-4 flex items-end justify-between">
        <div className="text-left">
          <p className="text-lg font-semibold text-white">{category.name}</p>
          <p className="text-sm text-white/75">{category.tours} Tours</p>
        </div>
        <span className="grid size-10 place-items-center rounded-full bg-white text-navy shadow-md transition-all duration-300 group-hover:rotate-45 group-hover:bg-primary group-hover:text-black">
          <IconArrowUpRight className="size-5" stroke={2} />
        </span>
      </div>
    </motion.button>
  );
}
