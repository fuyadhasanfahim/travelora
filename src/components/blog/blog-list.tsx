"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { IconUserCircle, IconCalendarMonth, IconClock } from "@tabler/icons-react";
import Pagination from "@/components/ui/pagination";

const EXCERPT =
  "Duis finibus risus id dolor molestie commodo. Duis vel risus sapien. Nullam sit amet ex ut magna faucibus porttitor.";

const POSTS = [
  { slug: "ultimate-travel-planning-guide", title: "Ultimate Travel Planning Guide: 10 Tips for a Seamless Journey" },
  { slug: "adventure-awaits-best-mountain-trips", title: "Adventure Awaits: Best Mountain Trips for Thrill Seekers" },
  { slug: "10-hidden-gems-in-bali", title: "10 Hidden Gems in Bali You Must Visit in 2026" },
  { slug: "experience-luxury-travel", title: "Experience Luxury Travel Without Breaking the Bank" },
  { slug: "ultimate-dubai-travel-guide", title: "Ultimate Dubai Travel Guide for First-Time Travelers" },
  { slug: "best-beaches-for-2026", title: "Ultimate Travel Planning Guide: 10 Tips for a Seamless Journey" },
];

const grid = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const card: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function BlogList() {
  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="container-content">
        <motion.div
          variants={grid}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:gap-8"
        >
          {POSTS.map((p) => (
            <motion.article
              key={p.slug}
              variants={card}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="group relative flex flex-col overflow-hidden rounded-[24px] bg-white shadow-[0_16px_45px_-28px_rgba(0,0,0,0.3)] ring-1 ring-black/[0.05] transition-shadow duration-300 hover:shadow-[0_30px_70px_-30px_rgba(0,28,142,0.35)]"
            >
              {/* Whole-card link */}
              <Link href={`/blog/${p.slug}`} aria-label={p.title} className="absolute inset-0 z-10" />

              {/* Image */}
              <div className="relative aspect-[608/350] w-full overflow-hidden">
                <Image
                  src="/images/blog/post-main.jpg"
                  alt={p.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 600px"
                  className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-105"
                />
              </div>

              {/* Body */}
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[#aaa8a8]">
                  <span className="flex items-center gap-1.5 text-sm">
                    <IconUserCircle className="size-4" stroke={1.6} /> Tamara Johanson
                  </span>
                  <span className="flex items-center gap-1.5 text-sm">
                    <IconCalendarMonth className="size-4" stroke={1.6} /> 8 December, 2026
                  </span>
                  <span className="flex items-center gap-1.5 text-sm">
                    <IconClock className="size-4" stroke={1.6} /> 6 Minute
                  </span>
                </div>

                <h2 className="mt-3 line-clamp-2 text-xl font-semibold leading-snug text-[#6e6e6e] transition-colors group-hover:text-navy">
                  {p.title}
                </h2>
                <p className="mt-3 line-clamp-2 text-base leading-relaxed text-[#a1a1a1]">{EXCERPT}</p>

                <span className="mt-5 inline-flex w-fit items-center rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-black transition-all group-hover:-translate-y-0.5 group-hover:bg-primary-dark">
                  Read More
                </span>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Pagination */}
        <div className="mt-12">
          <Pagination total={10} current={2} />
        </div>
      </div>
    </section>
  );
}
