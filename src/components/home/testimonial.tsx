"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import {
  IconStarFilled,
  IconStarHalfFilled,
  IconQuote,
  IconRosetteDiscountCheckFilled,
} from "@tabler/icons-react";

type Review = {
  quote: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
};

const QUOTE =
  "Vestibulum nec elit auctor, this iset the vestibulum neque sit amet, are is mete vehicula ex. Nullam sed tristique is fires diam, ac suscipit ligula";

const REVIEWS: Review[] = [
  { quote: QUOTE, name: "Tom Hanks", role: "Self Traveler", avatar: "/images/testimonials/avatar-1.jpg", rating: 4.5 },
  { quote: QUOTE, name: "Tom Hanks", role: "Self Traveler", avatar: "/images/testimonials/avatar-2.jpg", rating: 4.5 },
  { quote: QUOTE, name: "Tom Hanks", role: "Self Traveler", avatar: "/images/testimonials/avatar-3.jpg", rating: 4.5 },
];

const grid = { hidden: {}, show: { transition: { staggerChildren: 0.14 } } };
const card: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

function Stars({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <div className="flex items-center gap-1 text-primary-dark">
      {Array.from({ length: full }).map((_, i) => (
        <IconStarFilled key={i} className="size-[18px]" />
      ))}
      {half && <IconStarHalfFilled className="size-[18px]" />}
    </div>
  );
}

export default function Testimonial() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
      {/* Decorative blobs */}
      <span className="pointer-events-none absolute -left-24 top-10 size-72 rounded-full bg-primary/10 blur-3xl" />
      <span className="pointer-events-none absolute -right-24 bottom-10 size-80 rounded-full bg-navy/10 blur-3xl" />

      <div className="container-content relative">
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
            Testimonials
          </span>
          <h2 className="mt-4 text-3xl font-semibold text-[#6e6e6e] sm:text-4xl lg:text-[46px]">
            They Love Travelora
          </h2>
          <p className="mt-3 text-base text-[#8e8e8e] sm:text-lg">
            Your journey, Our commitment
          </p>

          {/* Trust strip */}
          <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-black/[0.06] bg-white/70 px-4 py-2 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.4)] backdrop-blur">
            <div className="flex -space-x-2.5">
              {REVIEWS.map((r, i) => (
                <span key={i} className="relative size-7 overflow-hidden rounded-full ring-2 ring-white">
                  <Image src={r.avatar} alt="" fill sizes="28px" className="object-cover" />
                </span>
              ))}
            </div>
            <span className="flex items-center gap-1">
              <IconStarFilled className="size-4 text-primary-dark" />
              <span className="text-sm font-semibold text-ink">4.9</span>
            </span>
            <span className="text-sm text-[#9a9a9a]">Loved by 50K+ travellers</span>
          </div>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={grid}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-8"
        >
          {REVIEWS.map((r, i) => {
            const featured = i === 1;
            return (
              <motion.article
                key={i}
                variants={card}
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className={`group relative overflow-hidden rounded-[28px] p-8 transition-shadow duration-300 ${
                  featured
                    ? "bg-white shadow-[0_30px_70px_-30px_rgba(0,28,142,0.45)] ring-1 ring-navy/10 lg:-translate-y-4"
                    : "bg-[#fff6e3] shadow-[0_18px_45px_-26px_rgba(0,0,0,0.35)] hover:bg-white hover:shadow-[0_30px_70px_-30px_rgba(0,28,142,0.4)] hover:ring-1 hover:ring-navy/10"
                }`}
              >
                {/* Top accent bar */}
                <span
                  className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary to-amber-soft transition-opacity duration-300 ${
                    featured ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`}
                />

                <IconQuote className="absolute -right-2 top-2 size-20 text-primary/10" />

                <div className="relative flex items-center justify-between">
                  <Stars rating={r.rating} />
                  <span className="text-sm font-semibold text-primary-dark">
                    {r.rating.toFixed(1)}
                  </span>
                </div>

                <p className="relative mt-5 text-[15px] italic leading-relaxed text-[#5f5f5f]">
                  “{r.quote}”
                </p>

                <div className="relative mt-7 flex items-center gap-3 border-t border-black/[0.06] pt-6">
                  <span className="relative shrink-0 rounded-full bg-gradient-to-br from-primary to-navy p-[2px]">
                    <span className="relative block size-12 overflow-hidden rounded-full ring-2 ring-white">
                      <Image src={r.avatar} alt={r.name} fill sizes="48px" className="object-cover" />
                    </span>
                    <IconRosetteDiscountCheckFilled className="absolute -bottom-0.5 -right-0.5 size-5 text-navy [&>path:first-child]:fill-navy" />
                  </span>
                  <div>
                    <p className="flex items-center gap-1 font-semibold text-black">
                      {r.name}
                    </p>
                    <p className="text-sm text-black/55">{r.role}</p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
