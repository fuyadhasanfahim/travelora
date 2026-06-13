"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  IconBuildingBank,
  IconBrandPaypal,
  IconBrandStripe,
  IconCash,
  IconMapPin,
  IconLoader2,
  IconCircleCheckFilled,
} from "@tabler/icons-react";
import type { ComponentType } from "react";
import { useTour, useCreateBooking, useCreatePayment } from "@/lib/query/hooks";
import { bookingSchema, type BookingInput, type BookingOutput } from "@/lib/validation/schemas";
import { TourDetailSkeleton } from "@/components/ui/skeleton";

type IconType = ComponentType<{ className?: string; stroke?: number }>;

const METHODS: { id: BookingInput["acceptTerms"] extends never ? never : "bank" | "paypal" | "stripe" | "cash"; label: string; icon: IconType }[] = [
  { id: "bank", label: "Bank Transfer", icon: IconBuildingBank },
  { id: "paypal", label: "Paypal", icon: IconBrandPaypal },
  { id: "stripe", label: "Stripe", icon: IconBrandStripe },
  { id: "cash", label: "Cash", icon: IconCash },
];

type FieldProps = {
  label: string;
  placeholder: string;
  required?: boolean;
  type?: string;
  full?: boolean;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

function Field({ label, placeholder, required, type = "text", full, error, ...rest }: FieldProps) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <label className={`block text-base ${required ? "text-[#373737]" : "text-[#8e8e8e]"}`}>
        {label}
        {required && <span className="text-rose-500">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        {...rest}
        className={`mt-2 w-full rounded-lg border bg-white px-4 py-3 text-[15px] text-[#373737] placeholder:text-[#c8c6c6] outline-none transition-colors focus:border-navy/50 ${
          error ? "border-rose-400" : "border-[#e4e4e4]"
        }`}
      />
      {error && <p className="mt-1 text-xs text-rose-500">{error}</p>}
    </div>
  );
}

export default function PaymentForm() {
  const router = useRouter();
  const sp = useSearchParams();

  const tourSlug = sp.get("tour") ?? undefined;
  const adult = Math.max(1, Number(sp.get("adult") || 2));
  const child = Math.max(0, Number(sp.get("child") || 1));
  const extras = sp.get("extra") === "1";
  const startFromQuery = sp.get("start");

  const { data: tour, isLoading } = useTour(tourSlug);

  const [method, setMethod] = useState<"bank" | "paypal" | "stripe" | "cash">("bank");
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const createBooking = useCreateBooking();
  const createPayment = useCreatePayment();

  const defaultStart = useMemo(() => {
    if (startFromQuery) return startFromQuery;
    return new Date(Date.now() + 14 * 86400_000).toISOString().slice(0, 10);
  }, [startFromQuery]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<BookingInput, unknown, BookingOutput>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      tourSlug: tourSlug ?? "",
      adults: adult,
      children: child,
      extras,
      startDate: defaultStart,
      acceptTerms: false as unknown as true,
      country: "United States",
    },
  });
  // eslint-disable-next-line react-hooks/incompatible-library
  const acceptTerms = watch("acceptTerms");

  useEffect(() => {
    if (!tourSlug) return;
    // keep tourSlug field in sync with query param
  }, [tourSlug]);

  if (isLoading) {
    return (
      <section className="py-12">
        <TourDetailSkeleton />
      </section>
    );
  }

  if (!tour) {
    return (
      <section className="py-20">
        <div className="container-content grid place-items-center rounded-3xl border border-dashed border-black/15 bg-white py-20 text-center">
          <p className="text-lg font-semibold text-[#6e6e6e]">No tour selected.</p>
          <Link
            href="/tours"
            className="mt-5 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-primary-dark"
          >
            Browse tours
          </Link>
        </div>
      </section>
    );
  }

  const unitPrice = tour.price;
  const childPrice = Math.round(tour.price * 0.65);
  const extraPrice = extras ? 25 : 0;
  const packageFee = adult * unitPrice + child * childPrice;
  const totalPrice = packageFee + extraPrice;

  const onSubmit = async (values: BookingOutput) => {
    try {
      const booking = await createBooking.mutateAsync({
        ...values,
        tourSlug: tour.slug,
      });
      const ref = booking.booking.reference;
      setSubmittedRef(ref);
      toast.success(`Booking received — ${ref}`, {
        description: "We're processing your payment now.",
      });

      await createPayment.mutateAsync({
        bookingReference: ref,
        method,
      });
      toast.success("Payment recorded", {
        description: "Check your inbox for the receipt.",
      });

      setTimeout(() => {
        router.push(`/booking/success?ref=${ref}`);
      }, 800);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Something went wrong");
    }
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="container-content">
        <div className="grid gap-8 lg:grid-cols-[1fr_380px] lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold text-[#6e6e6e]">Booking Submission</h2>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-6 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2"
            >
              <Field label="First Name" placeholder="John" required {...register("firstName")} error={errors.firstName?.message} />
              <Field label="Last Name" placeholder="Doe" required {...register("lastName")} error={errors.lastName?.message} />
              <Field label="Email" placeholder="example@yourdomain.com" required type="email" {...register("email")} error={errors.email?.message} />
              <Field label="Phone" placeholder="(684) 555-0102" required {...register("phone")} error={errors.phone?.message} />
              <Field label="Start date" placeholder="" required type="date" {...register("startDate")} error={errors.startDate?.message} />
              <Field label="Adults" placeholder="2" type="number" required {...register("adults", { valueAsNumber: true })} error={errors.adults?.message} />
              <Field label="Children" placeholder="0" type="number" {...register("children", { valueAsNumber: true })} error={errors.children?.message} />
              <Field label="Country" placeholder="United States" required {...register("country")} error={errors.country?.message} />
              <Field label="Address" placeholder="4517 Washington Ave." {...register("address")} full />
              <Field label="City" placeholder="St. Petersburg" {...register("city")} />
              <Field label="Zip" placeholder="2536" {...register("zip")} />
              <Field label="Province" placeholder="Florida" {...register("province")} />
              <div className="sm:col-span-2">
                <label className="block text-base text-[#8e8e8e]">Requirements</label>
                <textarea
                  rows={4}
                  placeholder="Any access needs, dietary requirements, or notes for our guide?"
                  {...register("requirements")}
                  className="mt-2 w-full resize-none rounded-lg border border-[#e4e4e4] bg-white px-4 py-3 text-[15px] text-[#373737] placeholder:text-[#c8c6c6] outline-none transition-colors focus:border-navy/50"
                />
              </div>

              {/* Payment method */}
              <h2 className="mt-6 text-2xl font-semibold text-[#6e6e6e] sm:col-span-2">
                Select Payment Method
              </h2>
              <div className="sm:col-span-2 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {METHODS.map((m) => {
                  const Icon = m.icon;
                  const active = m.id === method;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setMethod(m.id)}
                      className={`flex items-center justify-center gap-2 rounded-lg border px-4 py-4 text-base font-medium transition-colors ${
                        active ? "border-navy text-navy" : "border-[#e4e4e4] text-[#a1a1a1] hover:border-navy/30"
                      }`}
                    >
                      <Icon className="size-5" stroke={1.8} />
                      {m.label}
                    </button>
                  );
                })}
              </div>

              <div className="sm:col-span-2 mt-2 rounded-xl border border-[#e4e4e4] bg-white p-6 text-[15px] text-[#515151]">
                {method === "bank" ? (
                  <>
                    Transfer to <strong>Travelora Tour</strong> · account{" "}
                    <strong>1234 5678 9101 1</strong> at JPMorgan Chase &amp; Co.{" "}
                    Use your booking reference (sent by email) as the payment note.
                  </>
                ) : (
                  <>
                    After you confirm, we&apos;ll forward you to {METHODS.find((m) => m.id === method)?.label}{" "}
                    to complete payment securely.
                  </>
                )}
              </div>

              <label className="group sm:col-span-2 mt-2 flex items-start gap-2.5 text-[15px] text-[#373737]">
                <input type="checkbox" {...register("acceptTerms")} className="peer sr-only" />
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded border border-black/25 transition-colors peer-checked:border-navy peer-checked:bg-navy peer-checked:text-white">
                  <svg viewBox="0 0 24 24" fill="none" className="size-3.5 text-white opacity-0 transition-opacity group-has-[:checked]:opacity-100" aria-hidden>
                    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span>
                  I have read and accept the{" "}
                  <Link href="/terms" className="text-primary-dark hover:underline">Terms and Conditions</Link> and{" "}
                  <Link href="/privacy" className="text-primary-dark hover:underline">Privacy Policy</Link>
                </span>
              </label>
              {errors.acceptTerms && (
                <p className="sm:col-span-2 -mt-3 text-xs text-rose-500">
                  {errors.acceptTerms.message}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting || !acceptTerms || !!submittedRef}
                className="sm:col-span-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-black shadow-[0_14px_30px_-12px_rgba(254,188,18,0.9)] transition-all hover:-translate-y-0.5 hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {isSubmitting ? (
                  <>
                    <IconLoader2 className="size-5 animate-spin" stroke={2} />
                    Processing…
                  </>
                ) : submittedRef ? (
                  <>
                    <IconCircleCheckFilled className="size-5" />
                    Booked — {submittedRef}
                  </>
                ) : (
                  "Confirm Booking"
                )}
              </button>
            </form>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <h2 className="text-2xl font-semibold text-[#6e6e6e]">Your Booking</h2>
            <div className="mt-5 rounded-2xl border border-[#e4e4e4] bg-white p-6">
              <div className="flex gap-4">
                <span className="relative h-[70px] w-[90px] shrink-0 overflow-hidden rounded-xl">
                  <Image src={tour.image} alt={tour.title} fill sizes="90px" className="object-cover" />
                </span>
                <div>
                  <h3 className="text-base font-semibold leading-snug text-[#6e6e6e]">{tour.title}</h3>
                  <p className="mt-1 flex items-center gap-1 text-sm text-[#a1a1a1]">
                    <IconMapPin className="size-4" stroke={1.7} />
                    {tour.location}
                  </p>
                </div>
              </div>

              <div className="my-5 h-px bg-[#ededed]" />

              <h4 className="text-lg font-semibold text-[#6e6e6e]">Details</h4>
              <div className="mt-3 space-y-2.5 text-sm">
                <Row label={`Adult ($${unitPrice})`} value={String(adult)} />
                <Row label={`Children ($${childPrice})`} value={String(child)} />
                {extras && <Row label="Extra services" value={`$${extraPrice}`} />}
              </div>

              <div className="my-5 h-px bg-[#ededed]" />

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

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[#a1a1a1]">{label}</span>
      <span className="text-[#6e6e6e]">{value}</span>
    </div>
  );
}
