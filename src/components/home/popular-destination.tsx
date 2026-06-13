"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { IconArrowUpRight, IconMapPin } from "@tabler/icons-react";

type Destination = { name: string; image: string; tours: number; country: string };

const DESTINATIONS: Destination[] = [
  { name: "Opera House", image: "/images/destinations/opera-house.png", tours: 78, country: "Sydney, Australia" },
  { name: "Great Wall", image: "/images/destinations/great-wall.png", tours: 64, country: "Beijing, China" },
  { name: "Taj Mahal", image: "/images/destinations/taj-mahal.png", tours: 92, country: "Agra, India" },
  { name: "Colosseum", image: "/images/destinations/colosseum.png", tours: 47, country: "Rome, Italy" },
  { name: "Eiffel Tower", image: "/images/destinations/eiffel-tower.png", tours: 110, country: "Paris, France" },
  { name: "Machu Picchu", image: "/images/destinations/machu-picchu.png", tours: 53, country: "Cusco, Peru" },
  { name: "Grand Canyon", image: "/images/destinations/grand-canyon.png", tours: 38, country: "Arizona, USA" },
  { name: "Statue of Liberty", image: "/images/destinations/statue-of-liberty.png", tours: 71, country: "New York, USA" },
];

const pill: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function PopularDestination() {
  const [active, setActive] = useState(0);

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
            Where to next
          </span>
          <h2 className="mt-4 text-3xl font-semibold text-[#4f4f4f] sm:text-4xl lg:text-[46px]">
            Popular destination
          </h2>
          <p className="mt-3 text-base text-[#8e8e8e] sm:text-lg">
            Navigate the globe with confidence — swipe or hover a place to take a closer look.
          </p>
        </motion.div>

        {/* Desktop: expanding panels */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.06 }}
          className="mt-12 hidden h-[440px] gap-3 lg:flex"
        >
          {DESTINATIONS.map((d, i) => {
            const isActive = i === active;
            return (
              <motion.button
                key={d.name}
                type="button"
                variants={pill}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                animate={{ flexGrow: isActive ? 4.2 : 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 26 }}
                style={{ flexBasis: 0 }}
                className="group relative min-w-0 cursor-pointer overflow-hidden rounded-[28px] shadow-[0_18px_45px_-22px_rgba(0,0,0,0.5)] ring-1 ring-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy"
              >
                <Image
                  src={d.image}
                  alt={d.name}
                  fill
                  sizes="(max-width: 1024px) 0px, 40vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Gradient */}
                <div
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    isActive
                      ? "bg-gradient-to-t from-black/75 via-black/20 to-transparent"
                      : "bg-gradient-to-t from-black/60 to-black/10"
                  }`}
                />

                {/* Tours chip (active only) */}
                <motion.span
                  animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : -6 }}
                  transition={{ duration: 0.3 }}
                  className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-navy shadow-sm backdrop-blur"
                >
                  <IconMapPin className="size-3.5" stroke={2} />
                  {d.tours} Tours
                </motion.span>

                {/* Collapsed label — vertical */}
                <span
                  className={`absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-base font-semibold text-white transition-opacity duration-200 [writing-mode:vertical-rl] ${
                    isActive ? "opacity-0" : "opacity-100"
                  }`}
                >
                  {d.name}
                </span>

                {/* Expanded content */}
                <motion.div
                  animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 12 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-6 text-left"
                >
                  <div className="min-w-0">
                    <p className="flex items-center gap-1.5 text-xs font-medium text-white/80">
                      <IconMapPin className="size-3.5" stroke={1.8} />
                      <span className="truncate">{d.country}</span>
                    </p>
                    <p className="mt-1 truncate text-2xl font-semibold text-white">
                      {d.name}
                    </p>
                  </div>
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-primary text-black shadow-lg transition-transform duration-300 group-hover:rotate-45">
                    <IconArrowUpRight className="size-5" stroke={2} />
                  </span>
                </motion.div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Mobile / tablet: fixed-width snap carousel — premium card treatment */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.07 }}
          className="-mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-6 sm:gap-5 sm:px-6 lg:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ scrollPaddingLeft: "1rem" }}
        >
          {DESTINATIONS.map((d) => (
            <motion.div
              key={d.name}
              variants={pill}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group relative aspect-[4/5] w-[260px] shrink-0 snap-start overflow-hidden rounded-[24px] shadow-[0_18px_45px_-22px_rgba(0,0,0,0.5)] ring-1 ring-black/5 sm:w-[300px]"
            >
              <Link
                href={`/tours?destination=${encodeURIComponent(d.country.split(",")[0].trim().toLowerCase())}`}
                aria-label={`Explore ${d.tours} tours in ${d.name}`}
                className="absolute inset-0 z-10"
              />
              <Image
                src={d.image}
                alt={d.name}
                fill
                sizes="(max-width: 640px) 260px, (max-width: 1024px) 300px, 0px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {/* Gradient overlay — softer, lifts the text without burying the image */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              {/* Tours chip */}
              <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-navy shadow-sm backdrop-blur">
                <IconMapPin className="size-3" stroke={2} />
                {d.tours} Tours
              </span>

              {/* Bottom content */}
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-5">
                <div className="min-w-0">
                  <p className="flex items-center gap-1 text-[11px] font-medium text-white/85">
                    <IconMapPin className="size-3" stroke={1.8} />
                    <span className="truncate">{d.country}</span>
                  </p>
                  <p className="mt-0.5 truncate text-lg font-semibold leading-tight text-white sm:text-xl">
                    {d.name}
                  </p>
                </div>
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary text-black shadow-lg transition-transform duration-300 group-hover:rotate-45">
                  <IconArrowUpRight className="size-4" stroke={2.2} />
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
