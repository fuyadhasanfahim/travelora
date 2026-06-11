"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { IconChevronDown, IconStarFilled, IconStarHalfFilled } from "@tabler/icons-react";

const CATEGORIES = [
  { label: "Adventure", count: 10 },
  { label: "Beach", count: 10 },
  { label: "City", count: 10 },
  { label: "Deseart", count: 10 },
  { label: "Tropical", count: 10 },
  { label: "Mountain", count: 10 },
];

const DESTINATIONS = [
  "Machu Picchu",
  "Great Wall",
  "Swiss Alps",
  "Amsterdam",
  "Palawan",
  "Tanzania",
  "Chiang Mai",
  "London, England",
];

const RATINGS = [
  { value: 4.9, count: 496 },
  { value: 4.5, count: 356 },
  { value: 4.2, count: 458 },
  { value: 4, count: 395 },
  { value: 3.7, count: 25 },
  { value: 3.5, count: 152 },
];

function Stars({ value }: { value: number }) {
  const full = Math.floor(value);
  const half = value % 1 >= 0.5;
  return (
    <span className="flex items-center gap-0.5 text-primary-dark">
      {Array.from({ length: full }).map((_, i) => (
        <IconStarFilled key={i} className="size-4" />
      ))}
      {half && <IconStarHalfFilled className="size-4" />}
      {Array.from({ length: 5 - full - (half ? 1 : 0) }).map((_, i) => (
        <IconStarFilled key={`e${i}`} className="size-4 text-black/15" />
      ))}
    </span>
  );
}

function Check({ label }: { label: string }) {
  return (
    <label className="flex cursor-pointer items-center gap-3 py-1.5 text-[#515151] transition-colors hover:text-navy">
      <input type="checkbox" className="peer sr-only" />
      <span className="grid size-5 shrink-0 place-items-center rounded-md border border-black/20 transition-colors peer-checked:border-navy peer-checked:bg-navy peer-checked:text-white">
        <svg viewBox="0 0 24 24" fill="none" className="size-3.5 opacity-0 peer-checked:opacity-100" aria-hidden>
          <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      {label}
    </label>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-black/[0.08] py-5 last:border-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between text-lg font-semibold text-black"
      >
        {title}
        <IconChevronDown className={`size-5 text-ink/50 transition-transform ${open ? "" : "-rotate-90"}`} stroke={2} />
      </button>
      {open && <div className="mt-4">{children}</div>}
    </div>
  );
}

export default function TourSidebar() {
  const [price, setPrice] = useState(500);

  return (
    <motion.aside
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5 }}
      className="space-y-5"
    >
      <div className="rounded-3xl border border-black/[0.07] bg-white p-6 shadow-[0_16px_45px_-30px_rgba(0,0,0,0.35)]">
        {/* Filter Price */}
        <Section title="Filter Price">
          <input
            type="range"
            min={0}
            max={1000}
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full accent-primary-dark"
            aria-label="Filter price"
          />
          <p className="mt-3 font-medium text-black">$0-${price}</p>
        </Section>

        {/* Categories */}
        <Section title="Categories">
          <div className="space-y-1">
            {CATEGORIES.map((c) => (
              <div key={c.label} className="flex items-center justify-between">
                <Check label={c.label} />
                <span className="rounded-md bg-black/[0.06] px-2 py-0.5 text-xs text-[#515151]">{c.count}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* Popular Destination */}
        <Section title="Popular Destination">
          <div className="space-y-1">
            {DESTINATIONS.map((d) => (
              <Check key={d} label={d} />
            ))}
          </div>
        </Section>

        {/* Rating */}
        <Section title="Rating">
          <div className="space-y-1">
            {RATINGS.map((r) => (
              <label key={r.value} className="flex cursor-pointer items-center gap-3 py-1.5">
                <input type="checkbox" className="peer sr-only" />
                <span className="grid size-5 shrink-0 place-items-center rounded-md border border-black/20 transition-colors peer-checked:border-navy peer-checked:bg-navy peer-checked:text-white">
                  <svg viewBox="0 0 24 24" fill="none" className="size-3.5 opacity-0 peer-checked:opacity-100" aria-hidden>
                    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <Stars value={r.value} />
                <span className="text-sm text-[#515151]">
                  {r.value} ({r.count})
                </span>
              </label>
            ))}
          </div>
        </Section>
      </div>

      {/* Promo */}
      <div className="relative aspect-[292/443] overflow-hidden rounded-3xl shadow-[0_20px_50px_-26px_rgba(0,0,0,0.5)]">
        <Image src="/images/tours/promo.jpg" alt="25% off promotion" fill sizes="292px" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/30" />
        <span className="absolute left-6 top-6 text-4xl font-bold leading-none text-white drop-shadow">
          25%
          <br />
          OFF
        </span>
        <button
          type="button"
          className="absolute bottom-6 left-6 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-black shadow-lg transition-colors hover:bg-primary-dark"
        >
          Book Now
        </button>
      </div>
    </motion.aside>
  );
}
