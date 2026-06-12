"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  IconClock,
  IconRoute,
  IconUsers,
  IconLanguage,
  IconChevronDown,
  IconCircleCheckFilled,
  IconCircleXFilled,
} from "@tabler/icons-react";
import type { ComponentType } from "react";
import type { Tour } from "@/data/tours";

type IconType = ComponentType<{ className?: string; stroke?: number }>;

function Heading({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl font-semibold text-[#6e6e6e]">{children}</h2>;
}

export default function TdContent({ tour }: { tour: Tour }) {
  const [open, setOpen] = useState(0);

  const INFO: { icon: IconType; label: string; value: string }[] = [
    { icon: IconClock, label: "Duration", value: tour.durationLabel },
    { icon: IconRoute, label: "Tour Type", value: tour.tourType },
    { icon: IconUsers, label: "Group Size", value: tour.groupSize },
    { icon: IconLanguage, label: "Language", value: tour.language },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.5 }}
    >
      {/* Info bar */}
      <div className="grid grid-cols-2 gap-4 rounded-3xl border border-black/[0.07] bg-white p-6 shadow-[0_16px_45px_-32px_rgba(0,0,0,0.3)] sm:grid-cols-4">
        {INFO.map((it) => {
          const Icon = it.icon;
          return (
            <div key={it.label} className="flex items-center gap-3">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-navy/[0.06] text-navy">
                <Icon className="size-6" stroke={1.7} />
              </span>
              <div>
                <p className="text-base font-medium text-[#747474]">{it.label}</p>
                <p className="text-sm text-[#a9a9a9]">{it.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Overview */}
      <div className="mt-10">
        <Heading>Overview</Heading>
        <p className="mt-4 text-base leading-[1.9] text-[#747474]">{tour.overview}</p>
      </div>

      {/* Highlights */}
      <div className="mt-10">
        <Heading>Highlights</Heading>
        <p className="mt-4 text-base leading-[1.9] text-[#747474]">{tour.highlights}</p>
      </div>

      {/* Included / Excluded */}
      <div className="mt-10">
        <Heading>Included / Excluded</Heading>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <ul className="space-y-3">
            {tour.included.map((x) => (
              <li key={x} className="flex items-center gap-2.5 text-[#747474]">
                <IconCircleCheckFilled className="size-5 shrink-0 text-[#3cbf56]" />
                {x}
              </li>
            ))}
          </ul>
          <ul className="space-y-3">
            {tour.excluded.map((x) => (
              <li key={x} className="flex items-center gap-2.5 text-[#747474]">
                <IconCircleXFilled className="size-5 shrink-0 text-[#f0673b]" />
                {x}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Tour Plan */}
      <div className="mt-10">
        <Heading>Tour Plan</Heading>
        <div className="mt-5 space-y-3">
          {tour.plan.map((p, i) => {
            const isOpen = i === open;
            return (
              <div key={p.day} className="overflow-hidden rounded-2xl border border-black/[0.08] bg-white">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-center gap-4 px-5 py-4 text-left"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-navy text-sm font-semibold text-white">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1">
                    <span className="block text-xs font-semibold uppercase tracking-wide text-[#a1a1a1]">{p.day}</span>
                    <span className="mt-0.5 block font-medium text-[#6e6e6e]">{p.title}</span>
                  </span>
                  <IconChevronDown className={`size-5 shrink-0 text-ink/50 transition-transform ${isOpen ? "rotate-180" : ""}`} stroke={2} />
                </button>
                {isOpen && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="px-5 pb-5 pl-[4.75rem] text-sm leading-[1.9] text-[#747474]"
                  >
                    {p.body}
                  </motion.p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
