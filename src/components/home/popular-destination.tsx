"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion } from "framer-motion";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

type Destination = { name: string; image: string; tours: number };

const DESTINATIONS: Destination[] = [
  { name: "Opera House", image: "/images/destinations/opera-house.png", tours: 78 },
  { name: "Great Wall", image: "/images/destinations/great-wall.png", tours: 64 },
  { name: "Taj Mahal", image: "/images/destinations/taj-mahal.png", tours: 92 },
  { name: "Colosseum", image: "/images/destinations/colosseum.png", tours: 47 },
  { name: "Eiffel Tower", image: "/images/destinations/eiffel-tower.png", tours: 110 },
  { name: "Machu Picchu", image: "/images/destinations/machu-picchu.png", tours: 53 },
  { name: "Grand Canyon", image: "/images/destinations/grand-canyon.png", tours: 38 },
  { name: "Statue of Liberty", image: "/images/destinations/statue-of-liberty.png", tours: 71 },
];

const card = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function PopularDestination() {
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
          <h2 className="text-3xl font-semibold text-[#6e6e6e] sm:text-4xl lg:text-[46px]">
            Popular destination
          </h2>
          <p className="mt-3 text-base text-[#8e8e8e] sm:text-lg">
            Navigate the globe with confidence
          </p>
        </motion.div>

        {/* Slider */}
        <div className="relative mt-10 lg:mt-14">
          {/* Arrows (desktop) */}
          <button
            type="button"
            aria-label="Previous destinations"
            onClick={() => scrollByCards(-1)}
            className="absolute -left-4 top-[40%] z-10 hidden size-11 -translate-y-1/2 place-items-center rounded-full bg-white text-ink shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all hover:bg-primary hover:text-black lg:grid"
          >
            <IconChevronLeft className="size-5" stroke={2} />
          </button>
          <button
            type="button"
            aria-label="Next destinations"
            onClick={() => scrollByCards(1)}
            className="absolute -right-4 top-[40%] z-10 hidden size-11 -translate-y-1/2 place-items-center rounded-full bg-white text-ink shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all hover:bg-primary hover:text-black lg:grid"
          >
            <IconChevronRight className="size-5" stroke={2} />
          </button>

          <motion.div
            ref={trackRef}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ staggerChildren: 0.08 }}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 sm:gap-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {DESTINATIONS.map((d) => (
              <motion.div
                key={d.name}
                variants={card}
                whileHover={{ scale: 1.07, y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group w-[150px] shrink-0 origin-bottom cursor-pointer snap-start sm:w-[170px] lg:w-[187px]"
              >
                <div className="relative aspect-[187/254] w-full overflow-hidden rounded-full ring-1 ring-black/5">
                  <Image
                    src={d.image}
                    alt={d.name}
                    fill
                    sizes="187px"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
                <div className="mt-4 text-center">
                  <p className="text-base font-medium text-[#747474] transition-colors group-hover:text-navy sm:text-lg">
                    {d.name}
                  </p>
                  <p className="mt-1 text-sm text-[#b9b9b9] sm:text-base">
                    {d.tours} Tour
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
