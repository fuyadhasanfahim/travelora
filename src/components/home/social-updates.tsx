"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { IconBrandInstagram, IconPlayerPlayFilled } from "@tabler/icons-react";

type Post = { image: string; video?: boolean };

const POSTS: Post[] = [
  { image: "/images/instagram/insta-1.jpg", video: true },
  { image: "/images/instagram/insta-2.jpg" },
  { image: "/images/instagram/insta-3.jpg" },
  { image: "/images/instagram/insta-4.jpg" },
];

const grid = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const card = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function SocialUpdates() {
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
            @travelora
          </span>
          <h2 className="mt-4 text-3xl font-semibold text-[#747474] sm:text-4xl lg:text-[46px]">
            Social Updates
          </h2>
          <p className="mt-3 text-base text-[#8e8e8e] sm:text-lg">
            Explore by your travel style
          </p>
        </motion.div>

        {/* Gallery */}
        <motion.div
          variants={grid}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 lg:mt-14 lg:grid-cols-4 lg:gap-6"
        >
          {POSTS.map((p, i) => (
            <motion.a
              key={i}
              href="#"
              variants={card}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="group relative aspect-[292/377] overflow-hidden rounded-3xl shadow-[0_18px_45px_-24px_rgba(0,0,0,0.5)] ring-1 ring-black/5"
            >
              <Image
                src={p.image}
                alt="Travelora social post"
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-100" />

              {/* Play button for video */}
              {p.video && (
                <span className="absolute left-1/2 top-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-navy shadow-lg backdrop-blur transition-transform duration-300 group-hover:scale-110">
                  <IconPlayerPlayFilled className="size-6" />
                </span>
              )}

              {/* Instagram badge on hover */}
              <span className="absolute right-4 top-4 grid size-9 place-items-center rounded-full bg-white/90 text-navy opacity-0 shadow-md backdrop-blur transition-all duration-300 group-hover:opacity-100">
                <IconBrandInstagram className="size-5" stroke={1.8} />
              </span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
