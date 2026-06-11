"use client";

import { motion } from "framer-motion";
import {
  IconMapPin,
  IconCalendarMonth,
  IconUsers,
  IconChevronDown,
  IconSearch,
} from "@tabler/icons-react";
import type { ComponentType } from "react";

type IconType = ComponentType<{ className?: string; stroke?: number }>;

type Field = { label: string; value: string; icon: IconType };

const FIELDS: Field[] = [
  { label: "Location", value: "Milford Sound (NZ)", icon: IconMapPin },
  { label: "Check In", value: "25.09.2026", icon: IconCalendarMonth },
  { label: "Check out", value: "25.09.2026", icon: IconCalendarMonth },
  { label: "Guest", value: "2 Adult 1 Children", icon: IconUsers },
];

export default function FilterSearch() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="rounded-3xl border border-black/[0.06] bg-white p-3 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.45)] sm:p-4"
    >
      <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-2 lg:grid-cols-[repeat(4,1fr)_auto]">
        {FIELDS.map((f, i) => {
          const Icon = f.icon;
          return (
            <button
              key={f.label}
              type="button"
              className={`group flex items-center justify-between gap-3 px-4 py-2 text-left transition-colors lg:px-5 ${
                i > 0 ? "lg:border-l lg:border-black/[0.08]" : ""
              }`}
            >
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-[#6e6e6e]">{f.label}</span>
                <span className="mt-1 flex items-center gap-1.5 text-sm text-[#8e8e8e]">
                  <Icon className="size-4 shrink-0 text-navy/60" stroke={1.8} />
                  <span className="truncate">{f.value}</span>
                </span>
              </span>
              <IconChevronDown className="size-4 shrink-0 text-ink/40 transition-transform group-hover:translate-y-0.5" stroke={2} />
            </button>
          );
        })}

        <button
          type="button"
          className="ml-auto flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-8 py-4 text-base font-medium text-black shadow-[0_12px_26px_-10px_rgba(254,188,18,0.9)] transition-all hover:-translate-y-0.5 hover:bg-primary-dark sm:w-auto lg:rounded-full"
        >
          <IconSearch className="size-5" stroke={2} />
          Search
        </button>
      </div>
    </motion.div>
  );
}
