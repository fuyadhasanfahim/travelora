"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import {
  IconShieldCheck,
  IconUserStar,
  IconHeadset,
  IconRosetteDiscount,
  IconWorldPin,
  IconQuote,
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
    <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
      {/* Decorative depth */}
      <span className="pointer-events-none absolute -left-24 top-24 size-72 rounded-full bg-primary/[0.08] blur-3xl" />
      <span className="pointer-events-none absolute -right-24 bottom-10 size-80 rounded-full bg-navy/[0.06] blur-3xl" />

      <div className="container-content relative">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Left: heading + cards */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-amber-soft px-4 py-1.5 text-sm font-medium text-black shadow-[0_8px_18px_-10px_rgba(254,188,18,0.9)]">
                <span className="size-1.5 rounded-full bg-black/70" />
                About us
              </span>
              <h2 className="mt-5 text-3xl font-semibold leading-tight text-[#6e6e6e] sm:text-4xl lg:text-[44px]">
                We Help You{" "}
                <span className="relative font-bold text-[#3f3f3f]">
                  Planning
                  <motion.span
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                    className="absolute -bottom-1 left-0 h-1 w-full origin-left rounded-full bg-gradient-to-r from-primary to-amber-soft"
                  />
                </span>
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
                      <span className="grid size-12 place-items-center rounded-2xl bg-white/20 ring-1 ring-white/30 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
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
              className="relative overflow-hidden rounded-2xl border-l-4 border-amber-soft bg-gradient-to-br from-amber-soft/[0.14] to-amber-soft/[0.04] p-6 pl-7"
            >
              <IconQuote className="absolute -right-1 -top-1 size-16 text-primary/15" />
              <p className="relative text-lg font-medium leading-relaxed text-[#6e6e6e] sm:text-xl">
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
              <div className="relative aspect-[608/440] w-full overflow-hidden sm:aspect-[608/496]">
                <motion.div
                  animate={{ scale: [1, 1.06, 1] }}
                  transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src="/images/about/mission.jpg"
                    alt="Travel the world with Travelora"
                    fill
                    sizes="(max-width: 1024px) 100vw, 600px"
                    className="object-cover"
                  />
                </motion.div>
              </div>

              {/* Floating stat badge */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="absolute bottom-5 left-5 flex items-center gap-3 rounded-2xl bg-white/95 p-3.5 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.4)] backdrop-blur"
              >
                <span className="grid size-11 place-items-center rounded-xl bg-navy/[0.08] text-navy">
                  <IconWorldPin className="size-6" stroke={1.7} />
                </span>
                <div>
                  <p className="text-lg font-semibold leading-none text-ink">120+</p>
                  <p className="mt-1 text-xs text-[#9a9a9a]">Destinations</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
