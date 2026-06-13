"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  IconChevronDown,
  IconStarFilled,
  IconStarHalfFilled,
} from "@tabler/icons-react";
import { TOUR_CATEGORIES, POPULAR_DESTINATIONS } from "@/lib/catalog";
import { useTours } from "@/lib/query/hooks";

const RATINGS = [4.9, 4.5, 4.2, 4, 3.7, 3.5];

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

function useFilterSync() {
  const router = useRouter();
  const sp = useSearchParams();

  const setMulti = (key: string, value: string, checked: boolean) => {
    const params = new URLSearchParams(sp.toString());
    const current = (params.get(key) ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const lower = value.toLowerCase();
    const next = checked
      ? Array.from(new Set([...current, lower]))
      : current.filter((v) => v !== lower);
    if (next.length === 0) params.delete(key);
    else params.set(key, next.join(","));
    params.delete("page");
    const qs = params.toString();
    router.push(`/tours${qs ? `?${qs}` : ""}`, { scroll: false });
  };

  const setSingle = (key: string, value: string | null) => {
    const params = new URLSearchParams(sp.toString());
    if (value === null || value === "") params.delete(key);
    else params.set(key, value);
    params.delete("page");
    const qs = params.toString();
    router.push(`/tours${qs ? `?${qs}` : ""}`, { scroll: false });
  };

  return { sp, setMulti, setSingle };
}

export default function TourSidebar() {
  const { sp, setMulti, setSingle } = useFilterSync();

  const cats = (sp.get("category") ?? "").split(",").filter(Boolean);
  const dests = (sp.get("destination") ?? "").split(",").filter(Boolean);
  const minRating = sp.get("minRating");
  const maxPriceParam = sp.get("maxPrice");

  // Local price slider state, debounced into URL
  const [price, setPrice] = useState<number>(maxPriceParam ? Number(maxPriceParam) : 1500);
  useEffect(() => {
    if (maxPriceParam) setPrice(Number(maxPriceParam));
  }, [maxPriceParam]);

  useEffect(() => {
    const id = setTimeout(() => {
      const current = sp.get("maxPrice");
      if (price >= 1500) {
        if (current) setSingle("maxPrice", null);
      } else if (String(price) !== current) {
        setSingle("maxPrice", String(price));
      }
    }, 350);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [price]);

  // Fetch a wide page to compute counts per category for the sidebar.
  // Cheap (cached) — used for badges only.
  const { data: allTours } = useTours({ pageSize: 48 });
  const categoryCounts = TOUR_CATEGORIES.map((c) => ({
    label: c,
    count: allTours?.items.filter((t) => t.category === c).length ?? 0,
  }));

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
            min={100}
            max={1500}
            step={20}
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full accent-primary-dark"
            aria-label="Filter price"
          />
          <p className="mt-3 font-medium text-black">$0 - ${price}</p>
        </Section>

        {/* Categories */}
        <Section title="Categories">
          <div className="space-y-1">
            {categoryCounts.map((c) => {
              const checked = cats.includes(c.label.toLowerCase());
              return (
                <div key={c.label} className="flex items-center justify-between">
                  <label className="flex cursor-pointer items-center gap-3 py-1.5 text-[#515151] transition-colors hover:text-navy">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={(e) => setMulti("category", c.label, e.target.checked)}
                      className="peer sr-only"
                    />
                    <span className="grid size-5 shrink-0 place-items-center rounded-md border border-black/20 transition-colors peer-checked:border-navy peer-checked:bg-navy peer-checked:text-white">
                      <svg viewBox="0 0 24 24" fill="none" className="size-3.5 opacity-0 peer-checked:opacity-100" aria-hidden>
                        <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {c.label}
                  </label>
                  <span className="rounded-md bg-black/[0.06] px-2 py-0.5 text-xs text-[#515151]">{c.count}</span>
                </div>
              );
            })}
          </div>
        </Section>

        {/* Popular Destination */}
        <Section title="Popular Destination">
          <div className="space-y-1">
            {POPULAR_DESTINATIONS.map((d) => {
              const key = d.split(",")[0].trim();
              const checked = dests.includes(key.toLowerCase());
              return (
                <label key={d} className="flex cursor-pointer items-center gap-3 py-1.5 text-[#515151] transition-colors hover:text-navy">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => setMulti("destination", key, e.target.checked)}
                    className="peer sr-only"
                  />
                  <span className="grid size-5 shrink-0 place-items-center rounded-md border border-black/20 transition-colors peer-checked:border-navy peer-checked:bg-navy peer-checked:text-white">
                    <svg viewBox="0 0 24 24" fill="none" className="size-3.5 opacity-0 peer-checked:opacity-100" aria-hidden>
                      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {d}
                </label>
              );
            })}
          </div>
        </Section>

        {/* Rating */}
        <Section title="Rating">
          <div className="space-y-1">
            {RATINGS.map((r) => {
              const active = minRating === String(r);
              return (
                <label key={r} className="flex cursor-pointer items-center gap-3 py-1.5">
                  <input
                    type="radio"
                    name="minRating"
                    checked={active}
                    onChange={() => setSingle("minRating", active ? null : String(r))}
                    onClick={() => {
                      if (active) setSingle("minRating", null);
                    }}
                    className="peer sr-only"
                  />
                  <span className="grid size-5 shrink-0 place-items-center rounded-md border border-black/20 transition-colors peer-checked:border-navy peer-checked:bg-navy peer-checked:text-white">
                    <svg viewBox="0 0 24 24" fill="none" className="size-3.5 opacity-0 peer-checked:opacity-100" aria-hidden>
                      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <Stars value={r} />
                  <span className="text-sm text-[#515151]">{r}+ stars</span>
                </label>
              );
            })}
          </div>
        </Section>
      </div>

      {/* Promo */}
      <Link href="/tours?category=tropical" className="relative block aspect-[292/443] overflow-hidden rounded-3xl shadow-[0_20px_50px_-26px_rgba(0,0,0,0.5)]">
        <Image src="/images/tours/promo.jpg" alt="25% off promotion" fill sizes="292px" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/30" />
        <span className="absolute left-6 top-6 text-4xl font-bold leading-none text-white drop-shadow">
          25%
          <br />
          OFF
        </span>
        <span className="absolute bottom-6 left-6 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-black shadow-lg transition-colors hover:bg-primary-dark">
          Book Now
        </span>
      </Link>
    </motion.aside>
  );
}
