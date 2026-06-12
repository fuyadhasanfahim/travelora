"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { IconCalendarMonth, IconMinus, IconPlus } from "@tabler/icons-react";

function Stepper({ value, set }: { value: number; set: (n: number) => void }) {
  return (
    <div className="flex items-center gap-2.5">
      <button type="button" onClick={() => set(Math.max(0, value - 1))} className="grid size-7 place-items-center rounded-full border border-black/15 text-ink transition-colors hover:border-navy hover:text-navy">
        <IconMinus className="size-3.5" stroke={2.4} />
      </button>
      <span className="w-5 text-center text-sm text-[#747474]">{value}</span>
      <button type="button" onClick={() => set(value + 1)} className="grid size-7 place-items-center rounded-full border border-black/15 text-ink transition-colors hover:border-navy hover:text-navy">
        <IconPlus className="size-3.5" stroke={2.4} />
      </button>
    </div>
  );
}

export default function BookingForm() {
  const [adult, setAdult] = useState(2);
  const [child, setChild] = useState(1);
  const [time, setTime] = useState("5.00 PM");
  const [extra, setExtra] = useState(true);

  const total = adult * 120 + child * 80 + (extra ? 25 : 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5 }}
      className="rounded-3xl border border-black/[0.07] bg-white p-6 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.4)]"
    >
      <h3 className="text-lg font-semibold text-[#6e6e6e]">Booking Form</h3>

      {/* From */}
      <div className="mt-5">
        <span className="text-base font-semibold text-[#6e6e6e]">From:</span>
        <div className="mt-2 flex items-center gap-2 rounded-xl border border-black/10 px-4 py-3">
          <IconCalendarMonth className="size-5 text-navy/60" stroke={1.8} />
          <span className="text-sm text-[#a1a1a1]">25.09.26</span>
        </div>
      </div>

      {/* Time */}
      <div className="mt-5">
        <span className="text-base font-semibold text-[#6e6e6e]">Time</span>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {["5.00 PM", "7.00 PM"].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTime(t)}
              className={`rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors ${
                time === t ? "border-navy bg-navy/[0.04] text-navy" : "border-black/10 text-[#a1a1a1] hover:border-navy/30"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Guest */}
      <div className="mt-5">
        <span className="text-base font-semibold text-[#6e6e6e]">Guest</span>
        <div className="mt-3 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#a1a1a1]">Adult (18+) $120</span>
            <Stepper value={adult} set={setAdult} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#a1a1a1]">Children (Under 12) $80</span>
            <Stepper value={child} set={setChild} />
          </div>
        </div>
      </div>

      {/* Add Extra */}
      <div className="mt-5">
        <span className="text-base font-semibold text-[#6e6e6e]">Add Extra:</span>
        <label className="mt-3 flex cursor-pointer items-center justify-between">
          <span className="flex items-center gap-2.5">
            <input type="checkbox" checked={extra} onChange={(e) => setExtra(e.target.checked)} className="peer sr-only" />
            <span className="grid size-5 shrink-0 place-items-center rounded border border-black/25 transition-colors peer-checked:border-navy peer-checked:bg-navy peer-checked:text-white">
              <svg viewBox="0 0 24 24" fill="none" className="size-3.5 opacity-0 peer-checked:opacity-100" aria-hidden>
                <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="text-sm text-[#a1a1a1]">Add service per Booking</span>
          </span>
          <span className="text-sm text-[#747474]">$25</span>
        </label>
      </div>

      {/* Total */}
      <div className="mt-6 flex items-center justify-between border-t border-black/[0.08] pt-5">
        <span className="text-base font-semibold text-[#6e6e6e]">Total</span>
        <span className="text-lg font-bold text-navy">${total}</span>
      </div>

      <button type="button" className="mt-5 w-full rounded-full bg-primary px-6 py-3.5 text-base font-semibold text-black shadow-[0_14px_30px_-12px_rgba(254,188,18,0.9)] transition-all hover:-translate-y-0.5 hover:bg-primary-dark">
        Book Now
      </button>
    </motion.div>
  );
}
