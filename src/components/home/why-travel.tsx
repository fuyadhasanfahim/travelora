"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import {
  IconShieldCheck,
  IconUserStar,
  IconHeadset,
  IconRosetteDiscount,
} from "@tabler/icons-react";
import type { ComponentType } from "react";

type IconType = ComponentType<{ className?: string; stroke?: number }>;

type Perk = {
  title: string;
  color: string;
  cta: string;
  icon: IconType;
};

// Exact cards, colors & labels from Figma
const PERKS: Perk[] = [
  { title: "Secure Booking", color: "#ffb71f", cta: "Know More", icon: IconShieldCheck },
  { title: "Expert Guide", color: "#3cbf56", cta: "Know More", icon: IconUserStar },
  { title: "Round the clock Support", color: "#33c0ea", cta: "Book Now", icon: IconHeadset },
  { title: "Exclusive Deals", color: "#f0673b", cta: "Book Now", icon: IconRosetteDiscount },
];

const grid = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const tile: Variants = {
  hidden: { opacity: 0, y: 26, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function WhyTravel() {
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
            Why Travelora
          </span>
          <h2 className="mt-4 text-3xl font-semibold text-[#6e6e6e] sm:text-4xl lg:text-[46px]">
            Why Travel with us
          </h2>
          <p className="mt-3 text-base text-[#8e8e8e] sm:text-lg">
            Explore by your travel style
          </p>
        </motion.div>

        {/* Image + cards */}
        <div className="mt-10 grid items-stretch gap-6 lg:mt-14 lg:grid-cols-2 lg:gap-8">
          {/* Left image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative min-h-[320px] overflow-hidden rounded-[28px] shadow-[0_30px_70px_-32px_rgba(0,0,0,0.45)] ring-1 ring-black/5 lg:min-h-full"
          >
            <Image
              src="/images/why/why-travel.jpg"
              alt="Explore the world with Travelora"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent" />
          </motion.div>

          {/* 2x2 colored cards */}
          <motion.div
            variants={grid}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2"
          >
            {PERKS.map((p) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.title}
                  variants={tile}
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-3xl p-6 text-white shadow-[0_18px_45px_-22px_rgba(0,0,0,0.5)]"
                  style={{ backgroundColor: p.color }}
                >
                  {/* sheen */}
                  <span className="pointer-events-none absolute -right-10 -top-10 size-28 rounded-full bg-white/15 blur-2xl transition-all duration-500 group-hover:bg-white/25" />

                  <div className="relative">
                    <span className="grid size-12 place-items-center rounded-2xl bg-white/20 ring-1 ring-white/30 backdrop-blur-sm">
                      <Icon className="size-6" stroke={1.8} />
                    </span>
                    <h3 className="mt-5 text-xl font-semibold leading-snug">
                      {p.title}
                    </h3>
                  </div>

                  <button
                    type="button"
                    className="relative mt-6 inline-flex w-fit items-center rounded-full bg-white px-5 py-2 text-sm font-medium text-black shadow-sm transition-transform group-hover:translate-x-1"
                  >
                    {p.cta}
                  </button>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
