"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function PromoExplore({ href = "/tours" }: { href?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
    >
      <Link
        href={href}
        aria-label="Time to Explore The World — Book Now"
        className="group block overflow-hidden rounded-3xl shadow-[0_24px_55px_-28px_rgba(0,0,0,0.45)] ring-1 ring-black/5"
      >
        <div className="relative aspect-[397/621] w-full">
          <Image
            src="/images/promos/explore-world.png"
            alt="Time to Explore The World"
            fill
            sizes="397px"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      </Link>
    </motion.div>
  );
}
