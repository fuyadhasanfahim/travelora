"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import {
  IconUserCircle,
  IconCalendarMonth,
  IconClock,
  IconArrowRight,
} from "@tabler/icons-react";

const EXCERPT =
  "Duis finibus risus id dolor molestie commodo. Duis vel risus sapien. Nullam sit amet ex ut magna faucibus porttitor.";

const POSTS = [
  { slug: "ultimate-travel-planning-guide", title: "Ultimate Travel Planning Guide: 10 Tips for a Seamless Journey" },
  { slug: "adventure-awaits-best-mountain-trips", title: "Adventure Awaits: Best Mountain Trips for Thrill Seekers" },
  { slug: "10-hidden-gems-in-bali", title: "10 Hidden Gems in Bali You Must Visit in 2026" },
];

const PAGES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const grid = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const card: Variants = {
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export default function BlogList() {
  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="container-content">
        <motion.div
          variants={grid}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="space-y-8"
        >
          {POSTS.map((p) => (
            <motion.article
              key={p.slug}
              variants={card}
              className="group relative grid overflow-hidden rounded-[28px] bg-white shadow-[0_16px_45px_-28px_rgba(0,0,0,0.3)] ring-1 ring-black/[0.05] transition-shadow duration-300 hover:shadow-[0_30px_70px_-30px_rgba(0,28,142,0.35)] lg:grid-cols-2"
            >
              {/* Whole-card link */}
              <Link href={`/blog/${p.slug}`} aria-label={p.title} className="absolute inset-0 z-10" />

              {/* Image */}
              <div className="relative aspect-[608/350] w-full overflow-hidden">
                <Image
                  src="/images/blog/post-main.jpg"
                  alt={p.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-105"
                />
              </div>

              {/* Body */}
              <div className="flex flex-col justify-center p-7 sm:p-9">
                <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[#aaa8a8]">
                  <span className="flex items-center gap-1.5 text-sm">
                    <IconUserCircle className="size-4" stroke={1.6} />
                    Tamara Johanson
                  </span>
                  <span className="flex items-center gap-1.5 text-sm">
                    <IconCalendarMonth className="size-4" stroke={1.6} />
                    8 December, 2026
                  </span>
                  <span className="flex items-center gap-1.5 text-sm">
                    <IconClock className="size-4" stroke={1.6} />
                    6 Minute
                  </span>
                </div>

                <h2 className="mt-4 text-2xl font-semibold leading-snug text-[#6e6e6e] transition-colors group-hover:text-navy">
                  {p.title}
                </h2>
                <p className="mt-3 text-base leading-relaxed text-[#a1a1a1]">{EXCERPT}</p>

                <span className="mt-6 inline-flex w-fit items-center gap-2 text-base font-medium text-navy">
                  Read More
                  <span className="grid size-8 place-items-center rounded-full bg-primary text-black transition-transform duration-300 group-hover:translate-x-1">
                    <IconArrowRight className="size-4" stroke={2} />
                  </span>
                </span>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Pagination */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
          {PAGES.map((n) => (
            <button
              key={n}
              type="button"
              className={`grid size-10 place-items-center rounded-full text-sm font-medium transition-colors ${
                n === 1
                  ? "bg-navy text-white shadow-[0_10px_22px_-10px_rgba(0,28,142,0.9)]"
                  : "border border-black/10 bg-white text-ink hover:border-navy/30 hover:text-navy"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
