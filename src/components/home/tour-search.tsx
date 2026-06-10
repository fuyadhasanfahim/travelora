"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  IconMapPin,
  IconCalendar,
  IconUsers,
  IconChevronDown,
  IconHelpCircle,
  type Icon,
} from "@tabler/icons-react";

const TABS = ["Tour", "Ticket", "Hotel", "Rental", "Activities"];

const FIELDS: { label: string; value: string; icon: Icon }[] = [
  { label: "Location", value: "Milford Sound (NZ)", icon: IconMapPin },
  { label: "Check In", value: "25.09.2026", icon: IconCalendar },
  { label: "Check out", value: "25.09.2026", icon: IconCalendar },
  { label: "Guest", value: "2 Adult 1 Children", icon: IconUsers },
];

export default function TourSearch() {
  const [active, setActive] = useState("Tour");

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full rounded-[28px] border border-white/30 bg-white/10 p-3 shadow-[0_30px_80px_-24px_rgba(0,0,0,0.5)] backdrop-blur-2xl sm:p-4"
    >
      {/* Tabs */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {TABS.map((tab) => {
            const isActive = tab === active;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActive(tab)}
                className={`rounded-full px-5 py-2 text-sm font-medium backdrop-blur-md transition-all sm:text-base ${
                  isActive
                    ? "bg-primary text-black shadow-[0_8px_22px_rgba(254,188,18,0.5)]"
                    : "border border-white/70 bg-white/55 text-ink shadow-sm hover:bg-white/75"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
        <button
          type="button"
          className="hidden items-center gap-2 whitespace-nowrap rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white ring-1 ring-white/25 backdrop-blur-md transition-colors hover:bg-white/20 md:flex"
        >
          <IconHelpCircle className="size-4" stroke={1.6} />
          Need some help?
        </button>
      </div>

      {/* Search card */}
      <div className="flex flex-col gap-2 rounded-2xl border border-white/60 bg-white/85 p-3 shadow-[0_20px_60px_rgba(0,0,0,0.18)] backdrop-blur-xl lg:flex-row lg:items-center lg:gap-0 lg:p-2 lg:pl-6">
        {FIELDS.map((field, i) => {
          const Icon = field.icon;
          return (
            <div
              key={field.label}
              className={`flex flex-1 items-start gap-3 px-3 py-2 lg:py-1 ${
                i < FIELDS.length - 1
                  ? "border-b border-black/10 lg:border-b-0 lg:border-r"
                  : ""
              }`}
            >
              <div className="flex-1">
                <p className="text-sm font-semibold text-[#6e6e6e]">
                  {field.label}
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <Icon className="size-4 shrink-0 text-ink/70" stroke={1.6} />
                  <span className="text-sm text-[#8e8e8e]">{field.value}</span>
                  <IconChevronDown
                    className="ml-auto size-4 text-ink/50 lg:ml-1"
                    stroke={1.8}
                  />
                </div>
              </div>
            </div>
          );
        })}

        <button
          type="button"
          className="mt-1 inline-flex shrink-0 items-center justify-center rounded-xl bg-primary px-8 py-3 text-base font-medium text-black transition-colors hover:bg-primary-dark lg:mx-2 lg:rounded-full"
        >
          Search
        </button>
      </div>
    </motion.div>
  );
}
