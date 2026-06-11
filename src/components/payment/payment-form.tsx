"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  IconBuildingBank,
  IconBrandPaypal,
  IconBrandStripe,
  IconCash,
  IconMapPin,
  IconCalendarMonth,
  IconEdit,
} from "@tabler/icons-react";
import type { ComponentType } from "react";

type IconType = ComponentType<{ className?: string; stroke?: number }>;

const METHODS: { id: string; label: string; icon: IconType }[] = [
  { id: "bank", label: "Bank Transfer", icon: IconBuildingBank },
  { id: "paypal", label: "Paypal", icon: IconBrandPaypal },
  { id: "stripe", label: "Stripe", icon: IconBrandStripe },
  { id: "cash", label: "Cash", icon: IconCash },
];

function Field({
  label,
  placeholder,
  required,
  type = "text",
  full,
}: {
  label: string;
  placeholder: string;
  required?: boolean;
  type?: string;
  full?: boolean;
}) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <label className="block text-sm text-[#6e6e6e]">
        {label}
        {required && <span className="text-rose-500">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-ink placeholder:text-[#c8c6c6] outline-none transition-shadow focus:border-navy/40 focus:ring-2 focus:ring-navy/10"
      />
    </div>
  );
}

export default function PaymentForm() {
  const [method, setMethod] = useState("bank");

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="container-content">
        <div className="grid gap-8 lg:grid-cols-[1fr_400px] lg:gap-10">
          {/* Left: form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold text-[#6e6e6e]">Booking Submission</h2>

            <form onSubmit={(e) => e.preventDefault()} className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field label="First Name" placeholder="John" required />
              <Field label="Last Name" placeholder="Doe" required />
              <Field label="Email" placeholder="example@yourdomain.com" required type="email" />
              <Field label="Phone" placeholder="(684) 555-0102" required />
              <Field label="Address" placeholder="4517 Washington Ave. Manchester, Kentucky 39495" required full />
              <Field label="City" placeholder="St. Petersburg" />
              <Field label="Zip" placeholder="2536" />
              <Field label="Province" placeholder="Florida" />
              <Field label="Country" placeholder="United Sates" required />
              <div className="sm:col-span-2">
                <label className="block text-sm text-[#6e6e6e]">Requirements</label>
                <textarea
                  rows={4}
                  placeholder="Requirements"
                  className="mt-2 w-full resize-none rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-ink placeholder:text-[#c8c6c6] outline-none transition-shadow focus:border-navy/40 focus:ring-2 focus:ring-navy/10"
                />
              </div>
            </form>

            {/* Payment method */}
            <h2 className="mt-10 text-2xl font-semibold text-[#6e6e6e]">Select Payment Method</h2>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {METHODS.map((m) => {
                const Icon = m.icon;
                const active = m.id === method;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMethod(m.id)}
                    className={`flex items-center justify-center gap-2 rounded-2xl border px-4 py-4 text-sm font-medium transition-all ${
                      active
                        ? "border-navy bg-navy/[0.04] text-navy shadow-[0_10px_24px_-14px_rgba(0,28,142,0.8)]"
                        : "border-black/10 bg-white text-[#a1a1a1] hover:border-navy/30"
                    }`}
                  >
                    <Icon className="size-5" stroke={1.8} />
                    {m.label}
                  </button>
                );
              })}
            </div>

            {/* Method content */}
            <motion.div
              key={method}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-5 rounded-2xl border border-black/10 bg-white p-6"
            >
              {method === "bank" ? (
                <>
                  <h3 className="text-base font-semibold text-[#6e6e6e]">Bank Information</h3>
                  <dl className="mt-4 space-y-2.5 text-sm text-ink">
                    <p>Account Name: <span className="font-semibold">Travelora Tour</span></p>
                    <p>Account Number: <span className="font-semibold">1234567891011</span></p>
                    <p>Account Number: <span className="font-semibold">JPMorgan Chase &amp; Co. Bank</span></p>
                    <p>SWIFT Code: <span className="font-semibold">12312</span></p>
                  </dl>
                  <p className="mt-4 text-sm italic text-[#8e8e8e]">
                    Please contact the admin for payment confirmation!
                  </p>
                </>
              ) : (
                <p className="text-sm text-[#8e8e8e]">
                  You&apos;ll be redirected to {METHODS.find((m) => m.id === method)?.label} to
                  complete your payment securely after confirming your booking.
                </p>
              )}
            </motion.div>

            {/* Terms + submit */}
            <label className="mt-6 flex items-start gap-2.5 text-sm text-ink">
              <input type="checkbox" className="peer sr-only" />
              <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-md border border-black/25 transition-colors peer-checked:border-navy peer-checked:bg-navy peer-checked:text-white">
                <svg viewBox="0 0 24 24" fill="none" className="size-3.5 opacity-0 peer-checked:opacity-100" aria-hidden>
                  <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span>
                I have read and accept the{" "}
                <a href="#" className="font-medium text-primary-dark hover:underline">Terms and Conditions</a>{" "}
                and <a href="#" className="font-medium text-primary-dark hover:underline">Privacy Policy</a>
              </span>
            </label>

            <button
              type="button"
              className="mt-6 w-full rounded-full bg-primary px-8 py-4 text-base font-semibold text-black shadow-[0_14px_30px_-12px_rgba(254,188,18,0.9)] transition-all hover:-translate-y-0.5 hover:bg-primary-dark sm:w-auto"
            >
              Confirm Booking
            </button>
          </motion.div>

          {/* Right: booking summary */}
          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <h2 className="text-2xl font-semibold text-[#6e6e6e]">Your Booking</h2>
            <div className="mt-5 rounded-3xl border border-black/[0.07] bg-white p-6 shadow-[0_16px_45px_-30px_rgba(0,0,0,0.35)]">
              {/* Item */}
              <div className="flex gap-4">
                <span className="relative size-20 shrink-0 overflow-hidden rounded-2xl">
                  <Image src="/images/packages/pkg-1.png" alt="California Sunset/Twilight Boat Cruise" fill sizes="80px" className="object-cover" />
                </span>
                <div>
                  <h3 className="text-base font-semibold leading-snug text-[#6e6e6e]">
                    California Sunset/Twilight Boat Cruise
                  </h3>
                  <p className="mt-1 flex items-center gap-1 text-sm text-[#a1a1a1]">
                    <IconMapPin className="size-4" stroke={1.7} />
                    Jamica, Kenya
                  </p>
                </div>
              </div>

              <Divider />

              {/* Your Trip */}
              <h4 className="text-base font-semibold text-[#6e6e6e]">Your Trip</h4>
              <div className="mt-3 flex items-center justify-between text-sm text-[#a1a1a1]">
                <span>Date</span>
                <span className="flex items-center gap-1.5">
                  25.09.26 - 24.09.26
                  <IconEdit className="size-4 text-navy/60" stroke={1.7} />
                </span>
              </div>

              <Divider />

              {/* Details */}
              <h4 className="text-base font-semibold text-[#6e6e6e]">Details</h4>
              <div className="mt-3 space-y-2 text-sm">
                <Row label="Adult" value="2" />
                <Row label="Children" value="1" />
              </div>

              <Divider />

              {/* Coupon */}
              <h4 className="text-base font-semibold text-[#6e6e6e]">Coupon</h4>
              <div className="mt-3 flex gap-2">
                <input
                  type="text"
                  placeholder="Coupon code"
                  className="min-w-0 flex-1 rounded-full border border-black/10 px-4 py-2.5 text-sm outline-none focus:border-navy/40"
                />
                <button type="button" className="shrink-0 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-primary-dark">
                  Apply
                </button>
              </div>

              <Divider />

              {/* Price details */}
              <h4 className="text-base font-semibold text-[#6e6e6e]">Price details</h4>
              <div className="mt-3 space-y-2 text-sm">
                <Row label="Package Fee" value="$355" />
                <Row label="Extra Fee" value="$50" />
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-black/[0.08] pt-4">
                <span className="text-base font-semibold text-[#6e6e6e]">Price details</span>
                <span className="text-xl font-bold text-navy">$405</span>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}

function Divider() {
  return <div className="my-5 h-px bg-black/[0.07]" />;
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[#a1a1a1]">{label}</span>
      <span className="font-medium text-[#6e6e6e]">{value}</span>
    </div>
  );
}
