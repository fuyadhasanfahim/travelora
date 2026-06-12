"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  IconSearch,
  IconUserCircle,
  IconCalendarMonth,
  IconClock,
  IconStarFilled,
  IconMapPin,
  IconArrowLeft,
  IconArrowRight,
  IconChevronRight,
} from "@tabler/icons-react";

const PARA1 =
  "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse id lobortis sem. Vivamus vitae finibus lorem. In ut lobortis nibh. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc convallis cursus ultricies. Etiam consequat id est eu mattis. Mauris consectetur, dui ut bibendum cursus, est purus suscipit sem, at ullamcorper quam justo quis libero.";
const PARA2 =
  "Suspendisse id lobortis sem. Vivamus vitae finibus lorem. In ut lobortis nibh. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc convallis cursus ultricies. Etiam consequat id est eu mattis. Mauris consectetur, dui ut bibendum cursus, est purus suscipit sem, at ullamcorper quam justo quis libero.";
const QUOTE =
  "Vestibulum rutrum erat vitae nunc malesuada convallis. Pellentesque habitant morbi tristique senectus et netus et malesuada";

const TRENDING = [
  { title: "Ultimate Dubai Travel Guide for First-Time Travelers", img: "/images/blog/recent-1.png", date: "8 December, 2026" },
  { title: "Adventure Awaits: Best Mountain Trips for Thrill Seekers", img: "/images/blog/recent-2.png" },
  { title: "10 Hidden Gems in Bali You Must Visit in 2026", img: "/images/blog/recent-3.png" },
  { title: "Experience Luxury Travel Without Breaking the Bank", img: "/images/blog/recent-4.png" },
  { title: "Ultimate Travel Planning Guide: 10 Tips for a Seamless Journey", img: "/images/blog/recent-5.png" },
];

const CATEGORIES = [
  { label: "Adventure", count: 23 },
  { label: "Beach", count: 22 },
  { label: "Tropical", count: 55 },
  { label: "Budget Friendly Tour", count: 45 },
  { label: "City Tour", count: 15 },
  { label: "Mountain" },
  { label: "Tips and Tricks" },
];

export default function BlogDetail() {
  return (
    <section className="pt-12 pb-28 sm:pt-16 sm:pb-32 lg:pt-20 lg:pb-40">
      <div className="container-content">
        <div className="grid gap-10 lg:grid-cols-[1fr_397px] lg:gap-12">
          {/* ── Main article ── */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative aspect-[819/461] w-full overflow-hidden rounded-[28px] shadow-[0_24px_60px_-32px_rgba(0,0,0,0.45)]">
              <Image src="/images/blog/post-main.jpg" alt="Ultimate Dubai Travel Guide" fill priority sizes="(max-width: 1024px) 100vw, 819px" className="object-cover" />
            </div>

            {/* Meta */}
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[#aaa8a8]">
              <span className="flex items-center gap-1.5 text-sm"><IconUserCircle className="size-4" stroke={1.6} /> Tamara Johanson</span>
              <span className="flex items-center gap-1.5 text-sm"><IconCalendarMonth className="size-4" stroke={1.6} /> 8 December, 2026</span>
              <span className="flex items-center gap-1.5 text-sm"><IconClock className="size-4" stroke={1.6} /> 6 Minute</span>
            </div>

            <h2 className="mt-6 text-xl font-medium text-[#6e6e6e]">Step 01: How prepare</h2>
            <p className="mt-3 text-base leading-[1.9] text-[#a1a1a1]">{PARA1}</p>

            {/* Embedded package card */}
            <div className="my-8 flex flex-col gap-5 overflow-hidden rounded-[24px] border border-black/[0.06] bg-white p-4 shadow-[0_16px_45px_-30px_rgba(0,0,0,0.35)] sm:flex-row sm:items-center">
              <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-2xl sm:w-56">
                <Image src="/images/packages/pkg-1.png" alt="California Sunset/Twilight Boat Cruise" fill sizes="224px" className="object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 text-xs text-[#a1a1a1]">
                  <span className="flex items-center gap-1"><IconStarFilled className="size-3.5 text-primary" /> 4.6 (496 Reviews)</span>
                  <span className="flex items-center gap-1"><IconMapPin className="size-3.5" stroke={1.7} /> Jamica, Kenya</span>
                </div>
                <h3 className="mt-2 text-xl font-semibold text-[#515151]">California Sunset/Twilight Boat Cruise</h3>
                <div className="mt-2 flex items-center gap-1.5 text-sm text-[#a1a1a1]"><IconClock className="size-4" stroke={1.7} /> 7 Day 6 Night</div>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-lg font-semibold text-navy">$565<span className="text-sm font-normal text-[#a1a1a1]">/ Person</span></p>
                  <button type="button" className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-primary-dark">Book Now</button>
                </div>
              </div>
            </div>

            <p className="text-base leading-[1.9] text-[#a1a1a1]">{PARA2}</p>

            {/* Pull quote */}
            <blockquote className="my-8 rounded-2xl border-l-4 border-primary bg-amber-soft/[0.08] p-6 text-xl font-medium italic leading-relaxed text-[#8a8a8a]">
              “{QUOTE}”
            </blockquote>

            <p className="text-base leading-[1.9] text-[#a1a1a1]">{PARA1}</p>

            {/* Next / Previous */}
            <div className="mt-10 grid gap-4 border-t border-black/[0.08] pt-8 sm:grid-cols-2">
              <Link href="#" className="group flex items-center gap-3 text-left">
                <span className="grid size-10 shrink-0 place-items-center rounded-full border border-black/10 text-ink transition-colors group-hover:border-navy group-hover:bg-navy group-hover:text-white">
                  <IconArrowLeft className="size-5" stroke={2} />
                </span>
                <span>
                  <span className="block text-xs text-[#a1a1a1]">Previous</span>
                  <span className="mt-0.5 block text-sm font-medium text-[#6e6e6e] line-clamp-1">Ultimate Travel Planning Guide: 10 Tips for a Seamless Journey</span>
                </span>
              </Link>
              <Link href="#" className="group flex items-center justify-end gap-3 text-right">
                <span>
                  <span className="block text-xs text-[#a1a1a1]">Next</span>
                  <span className="mt-0.5 block text-sm font-medium text-[#6e6e6e] line-clamp-1">Ultimate Travel Planning Guide: 10 Tips for a Seamless Journey</span>
                </span>
                <span className="grid size-10 shrink-0 place-items-center rounded-full border border-black/10 text-ink transition-colors group-hover:border-navy group-hover:bg-navy group-hover:text-white">
                  <IconArrowRight className="size-5" stroke={2} />
                </span>
              </Link>
            </div>
          </motion.article>

          {/* ── Sidebar ── */}
          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-8"
          >
            {/* Search */}
            <div className="flex items-center gap-2 rounded-full border border-black/10 bg-white px-5 py-3.5">
              <IconSearch className="size-5 text-[#a1a1a1]" stroke={1.8} />
              <input type="text" placeholder="Search" className="min-w-0 flex-1 bg-transparent text-sm text-ink placeholder:text-[#a1a1a1] outline-none" />
            </div>

            {/* Trending */}
            <div className="rounded-3xl border border-black/[0.07] bg-white p-6 shadow-[0_16px_45px_-32px_rgba(0,0,0,0.3)]">
              <h3 className="text-xl font-semibold text-[#6e6e6e]">Treanding Now</h3>
              <ul className="mt-5 space-y-4">
                {TRENDING.map((t) => (
                  <li key={t.title}>
                    <Link href="#" className="group flex gap-3">
                      <span className="relative size-16 shrink-0 overflow-hidden rounded-xl">
                        <Image src={t.img} alt={t.title} fill sizes="64px" className="object-cover transition-transform duration-300 group-hover:scale-110" />
                      </span>
                      <span className="min-w-0">
                        <span className="line-clamp-2 text-sm font-medium text-[#6e6e6e] transition-colors group-hover:text-navy">{t.title}</span>
                        {t.date && (
                          <span className="mt-1 flex items-center gap-1 text-xs text-[#aaa8a8]">
                            <IconCalendarMonth className="size-3.5" stroke={1.6} /> {t.date}
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div className="rounded-3xl border border-black/[0.07] bg-white p-6 shadow-[0_16px_45px_-32px_rgba(0,0,0,0.3)]">
              <h3 className="text-xl font-semibold text-[#6e6e6e]">Categories</h3>
              <ul className="mt-5 space-y-3">
                {CATEGORIES.map((c) => (
                  <li key={c.label}>
                    <Link href="#" className="group flex items-center justify-between gap-2 text-[#a1a1a1] transition-colors hover:text-navy">
                      <span className="flex items-center gap-2">
                        <IconChevronRight className="size-4 text-primary-dark" stroke={2} />
                        {c.label}
                      </span>
                      {c.count !== undefined && (
                        <span className="text-sm font-medium text-ink">{c.count}</span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Promo */}
            <div className="relative overflow-hidden rounded-3xl bg-navy p-7 text-white shadow-[0_24px_55px_-28px_rgba(0,28,142,0.7)]">
              <span className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-primary/25 blur-3xl" />
              <p className="relative text-sm font-medium uppercase tracking-wide text-amber-soft">Time to</p>
              <p className="relative mt-1 text-4xl font-extrabold leading-[1.05]">
                <span className="text-primary">Explore</span>
                <br />
                The World
              </p>
              <button type="button" className="relative mt-6 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-black transition-colors hover:bg-primary-dark">
                Book Now
              </button>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
