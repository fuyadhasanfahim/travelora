"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  IconBuildingBank,
  IconBrandPaypal,
  IconBrandStripe,
  IconCash,
  IconMapPin,
  IconEdit,
} from "@tabler/icons-react";
import type { ComponentType } from "react";
import { TOURS, getTour } from "@/data/tours";

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
      <label className={`block text-base ${required ? "text-[#373737]" : "text-[#8e8e8e]"}`}>
        {label}
        {required && <span className="text-rose-500">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-2 w-full rounded-lg border border-[#e4e4e4] bg-white px-4 py-3 text-[15px] text-[#373737] placeholder:text-[#c8c6c6] outline-none transition-colors focus:border-navy/50"
      />
    </div>
  );
}

export default function PaymentForm() {
  const [method, setMethod] = useState("bank");
  const sp = useSearchParams();

  const tourSlug = sp.get("tour");
  const adult = Math.max(0, Number(sp.get("adult") || 2));
  const child = Math.max(0, Number(sp.get("child") || 1));
  const extra = sp.get("extra") === "1";
  const couponDiscount = 0;

  const tour = useMemo(
    () => (tourSlug ? getTour(tourSlug) : null) ?? TOURS[0],
    [tourSlug],
  );

  const adultPrice = tour.price;
  const childPrice = Math.round(tour.price * 0.65);
  const extraPrice = extra ? 25 : 0;
  const packageFee = adult * adultPrice + child * childPrice;
  const totalPrice = packageFee + extraPrice - couponDiscount;

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="container-content">
        <div className="grid gap-8 lg:grid-cols-[1fr_380px] lg:gap-12">
          {/* Left: form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold text-[#6e6e6e]">Booking Submission</h2>

            <form onSubmit={(e) => e.preventDefault()} className="mt-6 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
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
                <label className="block text-base text-[#8e8e8e]">Requirements</label>
                <textarea
                  rows={4}
                  placeholder="Requirements"
                  className="mt-2 w-full resize-none rounded-lg border border-[#e4e4e4] bg-white px-4 py-3 text-[15px] text-[#373737] placeholder:text-[#c8c6c6] outline-none transition-colors focus:border-navy/50"
                />
              </div>
            </form>

            {/* Payment method */}
            <h2 className="mt-10 text-2xl font-semibold text-[#6e6e6e]">Select Payment Method</h2>
            <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {METHODS.map((m) => {
                const Icon = m.icon;
                const active = m.id === method;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMethod(m.id)}
                    className={`flex items-center justify-center gap-2 rounded-lg border px-4 py-4 text-base font-medium transition-colors ${
                      active
                        ? "border-navy text-navy"
                        : "border-[#e4e4e4] text-[#a1a1a1] hover:border-navy/30"
                    }`}
                  >
                    <Icon className="size-5" stroke={1.8} />
                    {m.label}
                  </button>
                );
              })}
            </div>

            {/* Method content */}
            <div className="mt-5 rounded-xl border border-[#e4e4e4] bg-white p-6">
              {method === "bank" ? (
                <>
                  <h3 className="text-base font-semibold text-[#6e6e6e]">Bank Information</h3>
                  <div className="mt-4 space-y-2.5 text-[15px] text-[#515151]">
                    <p>Account Name: <span className="font-semibold text-[#373737]">Travelora Tour</span></p>
                    <p>Account Number: <span className="font-semibold text-[#373737]">1234567891011</span></p>
                    <p>Account Number: <span className="font-semibold text-[#373737]">JPMorgan Chase &amp; Co. Bank</span></p>
                    <p>SWIFT Code: <span className="font-semibold text-[#373737]">12312</span></p>
                  </div>
                  <p className="mt-4 text-sm italic text-[#8e8e8e]">
                    Please contact the admin for payment confirmation!
                  </p>
                </>
              ) : (
                <p className="text-[15px] text-[#8e8e8e]">
                  You&apos;ll be redirected to {METHODS.find((m) => m.id === method)?.label} to
                  complete your payment securely after confirming your booking.
                </p>
              )}
            </div>

            {/* Terms */}
            <label className="mt-6 flex items-start gap-2.5 text-[15px] text-[#373737]">
              <input type="checkbox" className="peer sr-only" />
              <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded border border-black/25 transition-colors peer-checked:border-navy peer-checked:bg-navy peer-checked:text-white">
                <svg viewBox="0 0 24 24" fill="none" className="size-3.5 opacity-0 peer-checked:opacity-100" aria-hidden>
                  <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span>
                I have read and accept the{" "}
                <a href="#" className="text-primary-dark hover:underline">Terms and Conditions</a>{" "}
                and <a href="#" className="text-primary-dark hover:underline">Privacy Policy</a>
              </span>
            </label>

            {/* Submit */}
            <button
              type="button"
              className="mt-6 rounded-full bg-primary px-8 py-3 text-base font-medium text-black transition-colors hover:bg-primary-dark"
            >
              Confirm Booking
            </button>
          </motion.div>

          {/* Right: booking summary */}
          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <h2 className="text-2xl font-semibold text-[#6e6e6e]">Your Booking</h2>
            <div className="mt-5 rounded-2xl border border-[#e4e4e4] bg-white p-6">
              {/* Item */}
              <div className="flex gap-4">
                <span className="relative h-[70px] w-[90px] shrink-0 overflow-hidden rounded-xl">
                  <Image src={tour.image} alt={tour.title} fill sizes="90px" className="object-cover" />
                </span>
                <div>
                  <h3 className="text-base font-semibold leading-snug text-[#6e6e6e]">
                    {tour.title}
                  </h3>
                  <p className="mt-1 flex items-center gap-1 text-sm text-[#a1a1a1]">
                    <IconMapPin className="size-4" stroke={1.7} />
                    {tour.location}
                  </p>
                </div>
              </div>

              <Divider />

              {/* Your Trip */}
              <h4 className="text-lg font-semibold text-[#6e6e6e]">Your Trip</h4>
              <div className="mt-3 flex items-center justify-between text-sm text-[#a1a1a1]">
                <span>Date</span>
                <span className="flex items-center gap-1.5">
                  25.09.26 - 24.09.26
                  <IconEdit className="size-4 text-[#a1a1a1]" stroke={1.7} />
                </span>
              </div>

              <Divider />

              {/* Details */}
              <h4 className="text-lg font-semibold text-[#6e6e6e]">Details</h4>
              <div className="mt-3 space-y-2.5 text-sm">
                <Row label={`Adult ($${adultPrice})`} value={String(adult)} />
                <Row label={`Children ($${childPrice})`} value={String(child)} />
              </div>

              <Divider />

              {/* Coupon */}
              <h4 className="text-lg font-semibold text-[#6e6e6e]">Coupon</h4>
              <div className="mt-3 flex gap-2">
                <input
                  type="text"
                  className="min-w-0 flex-1 rounded-full border border-[#e4e4e4] px-4 py-2.5 text-sm outline-none focus:border-navy/50"
                />
                <button type="button" className="shrink-0 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-black transition-colors hover:bg-primary-dark">
                  Apply
                </button>
              </div>

              <Divider />

              {/* Price details */}
              <h4 className="text-lg font-semibold text-[#6e6e6e]">Price details</h4>
              <div className="mt-3 space-y-2.5 text-sm">
                <Row label="Package Fee" value={`$${packageFee}`} />
                <Row label="Extra Fee" value={`$${extraPrice}`} />
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-[#e4e4e4] pt-4">
                <span className="text-lg font-semibold text-[#6e6e6e]">Total</span>
                <span className="text-lg font-semibold text-navy">${totalPrice}</span>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}

function Divider() {
  return <div className="my-5 h-px bg-[#ededed]" />;
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[#a1a1a1]">{label}</span>
      <span className="text-[#6e6e6e]">{value}</span>
    </div>
  );
}
