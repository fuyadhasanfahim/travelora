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

type Perk = { title: string; color: string; cta: string; icon: IconType };

const PERKS: Perk[] = [
  { title: "Secure Booking", color: "#ffb71f", cta: "Know More", icon: IconShieldCheck },
  { title: "Expert Guide", color: "#3cbf56", cta: "Know More", icon: IconUserStar },
  { title: "Round the clock Support", color: "#33c0ea", cta: "Book Now", icon: IconHeadset },
  { title: "Exclusive Deals", color: "#f0673b", cta: "Book Now", icon: IconRosetteDiscount },
];

const grid = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const tile: Variants = {
  hidden: { opacity: 0, y: 26, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function AboutSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="container-content">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Left: heading + cards */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center rounded-full bg-amber-soft px-4 py-1.5 text-sm font-medium text-black">
                About us
              </span>
              <h2 className="mt-5 text-3xl font-semibold leading-tight text-[#6e6e6e] sm:text-4xl lg:text-[44px]">
                We Help You <span className="font-bold text-[#3f3f3f]">Planning</span>
                <br className="hidden sm:block" /> Your Journey
              </h2>
            </motion.div>

            <motion.div
              variants={grid}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2"
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
                    <span className="pointer-events-none absolute -right-10 -top-10 size-28 rounded-full bg-white/15 blur-2xl transition-all duration-500 group-hover:bg-white/25" />
                    <div className="relative">
                      <span className="grid size-12 place-items-center rounded-2xl bg-white/20 ring-1 ring-white/30 backdrop-blur-sm">
                        <Icon className="size-6" stroke={1.8} />
                      </span>
                      <h3 className="mt-5 text-xl font-semibold leading-snug">{p.title}</h3>
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

          {/* Right: mission + image */}
          <div className="flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="rounded-2xl border-l-4 border-amber-soft bg-amber-soft/10 p-6"
            >
              <p className="text-lg font-medium leading-relaxed text-[#6e6e6e] sm:text-xl">
                Our mission is to create memories that last a lifetime for every
                traveler who chooses us.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative flex-1 overflow-hidden rounded-[28px] bg-gradient-to-b from-[#eaf4ff] to-white shadow-[0_24px_60px_-30px_rgba(0,0,0,0.4)] ring-1 ring-black/5"
            >
              <div className="relative aspect-[608/440] w-full sm:aspect-[608/496]">
                <Image
                  src="/images/about/mission.jpg"
                  alt="Travel the world with Travelora"
                  fill
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
