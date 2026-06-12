"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import {
  IconBrandInstagram,
  IconPlayerPlayFilled,
  IconHeartFilled,
  IconArrowRight,
} from "@tabler/icons-react";

type Post = { image: string; video?: boolean; likes: string };

const POSTS: Post[] = [
  { image: "/images/instagram/insta-1.jpg", video: true, likes: "2.4k" },
  { image: "/images/instagram/insta-2.jpg", likes: "1.8k" },
  { image: "/images/instagram/insta-3.jpg", likes: "3.1k" },
  { image: "/images/instagram/insta-4.jpg", likes: "1.2k" },
];

const grid = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const card: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function SocialUpdates() {
  return (
    <section className="relative overflow-hidden pt-16 pb-36 sm:pt-20 sm:pb-40 lg:pt-24 lg:pb-48">
      {/* Decorative blobs */}
      <span className="pointer-events-none absolute -left-24 top-24 size-72 rounded-full bg-primary/10 blur-3xl" />
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
            <IconBrandInstagram className="size-4 text-primary-dark" stroke={2} />
            @travelora
          </span>
          <h2 className="mt-4 text-3xl font-semibold text-[#747474] sm:text-4xl lg:text-[46px]">
            Social Updates
          </h2>
          <p className="mt-3 text-base text-[#8e8e8e] sm:text-lg">
            Explore by your travel style
          </p>
        </motion.div>

        {/* Gallery (staggered) */}
        <motion.div
          variants={grid}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 lg:mt-16 lg:grid-cols-4 lg:gap-6"
        >
          {POSTS.map((p, i) => (
            <motion.a
              key={i}
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              variants={card}
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className={`group relative aspect-[292/377] overflow-hidden rounded-[28px] shadow-[0_20px_50px_-24px_rgba(0,0,0,0.55)] ring-1 ring-black/5 ${
                i % 2 === 1 ? "lg:translate-y-8" : ""
              }`}
            >
              <Image
                src={p.image}
                alt="Travelora social post"
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-[800ms] ease-out group-hover:scale-110"
              />
              {/* Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent transition-opacity duration-300 group-hover:from-navy/80" />

              {/* Play button for video */}
              {p.video && (
                <span className="absolute left-1/2 top-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-navy shadow-lg backdrop-blur transition-transform duration-300 group-hover:scale-110">
                  <IconPlayerPlayFilled className="size-6" />
                </span>
              )}

              {/* Instagram badge */}
              <span className="absolute right-4 top-4 grid size-9 place-items-center rounded-full bg-white/90 text-navy shadow-md backdrop-blur transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-black">
                <IconBrandInstagram className="size-5" stroke={1.8} />
              </span>

              {/* Hover meta */}
              <div className="absolute inset-x-4 bottom-4 flex translate-y-2 items-center justify-between text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="text-sm font-medium">@travelora</span>
                <span className="flex items-center gap-1.5 text-sm">
                  <IconHeartFilled className="size-4 text-rose-400" />
                  {p.likes}
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Follow CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 flex justify-center lg:mt-20"
        >
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-navy px-8 py-3.5 text-base font-medium text-white shadow-[0_12px_28px_rgba(0,28,142,0.25)] transition-all hover:-translate-y-0.5 hover:bg-navy/90"
          >
            <IconBrandInstagram className="size-5" stroke={1.9} />
            Follow on Instagram
            <IconArrowRight className="size-5 transition-transform group-hover:translate-x-1" stroke={2} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
