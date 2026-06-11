"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import {
  IconArrowRight,
  IconArrowUpRight,
  IconCalendarMonth,
  IconClock,
  IconBookmark,
} from "@tabler/icons-react";

type Post = {
  image: string;
  author: string;
  authorAvatar: string;
  authorRole: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
};

const TITLE = "Ultimate Travel Planning Guide: 10 Tips for a Seamless Journey";

const POSTS: Post[] = [
  {
    image: "/images/blog/post.jpg",
    author: "Tamara Johanson",
    authorAvatar: "/images/testimonials/avatar-3.jpg",
    authorRole: "Travel Writer",
    title: TITLE,
    category: "Travel Tips",
    date: "May 24, 2026",
    readTime: "8 min read",
  },
  {
    image: "/images/blog/post.jpg",
    author: "Tamara Johanson",
    authorAvatar: "/images/testimonials/avatar-1.jpg",
    authorRole: "Travel Writer",
    title: TITLE,
    category: "Guides",
    date: "May 18, 2026",
    readTime: "6 min read",
  },
];

const grid = { hidden: {}, show: { transition: { staggerChildren: 0.14 } } };
const card: Variants = {
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export default function Blog() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
      {/* Decorative blob */}
      <span className="pointer-events-none absolute -right-28 top-16 size-80 rounded-full bg-navy/[0.06] blur-3xl" />

      <div className="container-content relative">
        {/* Heading + view all */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5 }}
            className="max-w-xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-navy/[0.06] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-navy">
              <span className="size-1.5 rounded-full bg-primary" />
              Our Blog
            </span>
            <h2 className="mt-4 text-3xl font-semibold text-[#6e6e6e] sm:text-4xl lg:text-[46px]">
              News, Tips and Guides
            </h2>
            <p className="mt-3 text-base text-[#8e8e8e] sm:text-lg">
              Explore by your travel style
            </p>
          </motion.div>

          <motion.button
            type="button"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group inline-flex w-fit items-center gap-2 rounded-full border border-navy/15 px-6 py-3 text-sm font-medium text-navy transition-colors hover:bg-navy hover:text-white"
          >
            View All Articles
            <IconArrowRight className="size-4 transition-transform group-hover:translate-x-1" stroke={2} />
          </motion.button>
        </div>

        {/* Cards */}
        <motion.div
          variants={grid}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-10 grid grid-cols-1 gap-6 lg:mt-14 lg:grid-cols-2 lg:gap-8"
        >
          {POSTS.map((p, i) => (
            <motion.article
              key={i}
              variants={card}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="group flex flex-col overflow-hidden rounded-[28px] bg-white shadow-[0_16px_45px_-26px_rgba(0,0,0,0.35)] ring-1 ring-black/[0.05] transition-shadow duration-300 hover:shadow-[0_32px_70px_-30px_rgba(0,28,142,0.4)] hover:ring-navy/10 sm:flex-row"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden sm:aspect-auto sm:w-[44%]">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 300px"
                  className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                {/* Category chip */}
                <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-black shadow-sm">
                  {p.category}
                </span>
                {/* Bookmark */}
                <span className="absolute right-4 top-4 grid size-9 place-items-center rounded-full bg-white/90 text-navy opacity-0 shadow-sm backdrop-blur transition-all duration-300 group-hover:opacity-100">
                  <IconBookmark className="size-[18px]" stroke={1.8} />
                </span>
              </div>

              {/* Body */}
              <div className="flex flex-1 flex-col justify-center p-6 sm:p-7">
                {/* Meta */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[#9a9a9a]">
                  <span className="flex items-center gap-1.5 text-xs">
                    <IconCalendarMonth className="size-4 text-navy/55" stroke={1.7} />
                    {p.date}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs">
                    <IconClock className="size-4 text-navy/55" stroke={1.7} />
                    {p.readTime}
                  </span>
                </div>

                <h3 className="mt-3 text-xl font-semibold leading-snug text-[#444] transition-colors group-hover:text-navy">
                  {p.title}
                </h3>

                {/* Author + read more */}
                <div className="mt-5 flex items-center justify-between gap-3 border-t border-black/[0.06] pt-5">
                  <div className="flex items-center gap-2.5">
                    <span className="relative size-9 overflow-hidden rounded-full ring-2 ring-white shadow-sm">
                      <Image src={p.authorAvatar} alt={p.author} fill sizes="36px" className="object-cover" />
                    </span>
                    <div className="leading-tight">
                      <p className="text-sm font-medium text-[#444]">{p.author}</p>
                      <p className="text-xs text-[#a8a8a8]">{p.authorRole}</p>
                    </div>
                  </div>
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary text-black shadow-[0_8px_18px_-8px_rgba(254,188,18,0.9)] transition-all duration-300 group-hover:rotate-45 group-hover:bg-primary-dark">
                    <IconArrowUpRight className="size-5" stroke={2} />
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
