"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  IconMapPin,
  IconCalendarMonth,
  IconUsers,
  IconChevronDown,
  IconSearch,
  IconMinus,
  IconPlus,
} from "@tabler/icons-react";
import { useTours } from "@/lib/query/hooks";

function toDDMMYYYY(iso: string) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${d}.${m}.${y}`;
}
function fromDDMMYYYY(human: string) {
  const m = human.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
  return m ? `${m[3]}-${m[2]}-${m[1]}` : "";
}

function useOutside<T extends HTMLElement>(onClose: () => void) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("keydown", esc);
    };
  }, [onClose]);
  return ref;
}

type FieldProps = {
  label: string;
  value: string;
  icon: React.ReactNode;
  borderLeft?: boolean;
  children: (close: () => void) => React.ReactNode;
};

function Field({ label, value, icon, borderLeft, children }: FieldProps) {
  const [open, setOpen] = useState(false);
  const ref = useOutside<HTMLDivElement>(() => setOpen(false));

  return (
    <div
      ref={ref}
      className={`relative ${borderLeft ? "lg:border-l lg:border-black/[0.08]" : ""}`}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="group flex w-full items-center justify-between gap-3 px-4 py-2 text-left transition-colors lg:px-5"
      >
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-semibold text-[#6e6e6e]">{label}</span>
          <span className="mt-1 flex items-center gap-1.5 text-sm text-[#8e8e8e]">
            {icon}
            <span className="truncate">{value}</span>
          </span>
        </span>
        <IconChevronDown
          className={`size-4 shrink-0 text-ink/40 transition-transform ${open ? "rotate-180" : ""}`}
          stroke={2}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute left-2 right-2 top-full z-40 mt-2 origin-top overflow-hidden rounded-2xl border border-black/[0.06] bg-white p-3 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.25)]"
          >
            {children(() => setOpen(false))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FilterSearch() {
  const router = useRouter();
  const sp = useSearchParams();
  const { data } = useTours({ pageSize: 48 });
  const COUNTRIES = Array.from(new Set((data?.items ?? []).map((t) => t.country))).sort();

  const [location, setLocation] = useState<string>(
    (sp.get("destination") ?? "").split(",")[0] ?? "",
  );
  const [checkInIso, setCheckInIso] = useState<string>(
    sp.get("checkIn") || "2026-09-25",
  );
  const [checkOutIso, setCheckOutIso] = useState<string>(
    sp.get("checkOut") || "2026-10-02",
  );
  const [adults, setAdults] = useState<number>(Number(sp.get("adults") || 2));
  const [children, setChildren] = useState<number>(Number(sp.get("children") || 1));

  const submit = () => {
    const params = new URLSearchParams(sp.toString());
    if (location) params.set("destination", location.toLowerCase());
    else params.delete("destination");
    if (checkInIso) params.set("checkIn", checkInIso);
    if (checkOutIso) params.set("checkOut", checkOutIso);
    params.set("adults", String(adults));
    params.set("children", String(children));
    params.delete("page");
    const qs = params.toString();
    router.push(`/tours${qs ? `?${qs}` : ""}`, { scroll: false });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="rounded-3xl border border-black/[0.06] bg-white p-3 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.45)] sm:p-4"
    >
      <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-2 lg:grid-cols-[repeat(4,1fr)_auto]">
        {/* Location */}
        <Field
          label="Location"
          value={location || "Any destination"}
          icon={<IconMapPin className="size-4 shrink-0 text-navy/60" stroke={1.8} />}
        >
          {(close) => (
            <ul className="max-h-64 overflow-y-auto">
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setLocation("");
                    close();
                  }}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition-colors hover:bg-navy/[0.05] ${
                    !location ? "bg-navy/[0.06] text-navy" : "text-[#515151]"
                  }`}
                >
                  Any destination
                </button>
              </li>
              {COUNTRIES.map((c) => (
                <li key={c}>
                  <button
                    type="button"
                    onClick={() => {
                      setLocation(c);
                      close();
                    }}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition-colors hover:bg-navy/[0.05] ${
                      location === c ? "bg-navy/[0.06] text-navy" : "text-[#515151]"
                    }`}
                  >
                    {c}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Field>

        {/* Check In */}
        <Field
          label="Check In"
          value={toDDMMYYYY(checkInIso) || "Pick a date"}
          icon={<IconCalendarMonth className="size-4 shrink-0 text-navy/60" stroke={1.8} />}
          borderLeft
        >
          {(close) => (
            <div className="p-1">
              <input
                type="date"
                value={checkInIso}
                onChange={(e) => {
                  const v = e.target.value;
                  setCheckInIso(v);
                  if (v && checkOutIso && v > checkOutIso) {
                    setCheckOutIso(v);
                  }
                }}
                className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 text-sm text-ink outline-none focus:border-navy/40"
              />
              <div className="mt-3 flex justify-end">
                <button
                  type="button"
                  onClick={close}
                  className="rounded-full bg-navy px-4 py-1.5 text-xs font-semibold text-white hover:bg-navy/90"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </Field>

        {/* Check out */}
        <Field
          label="Check out"
          value={toDDMMYYYY(checkOutIso) || "Pick a date"}
          icon={<IconCalendarMonth className="size-4 shrink-0 text-navy/60" stroke={1.8} />}
          borderLeft
        >
          {(close) => (
            <div className="p-1">
              <input
                type="date"
                value={checkOutIso}
                min={checkInIso || undefined}
                onChange={(e) => setCheckOutIso(e.target.value)}
                className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 text-sm text-ink outline-none focus:border-navy/40"
              />
              <div className="mt-3 flex justify-end">
                <button
                  type="button"
                  onClick={close}
                  className="rounded-full bg-navy px-4 py-1.5 text-xs font-semibold text-white hover:bg-navy/90"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </Field>

        {/* Guest */}
        <Field
          label="Guest"
          value={`${adults} Adult${adults === 1 ? "" : "s"} ${children} Child${children === 1 ? "" : "ren"}`}
          icon={<IconUsers className="size-4 shrink-0 text-navy/60" stroke={1.8} />}
          borderLeft
        >
          {(close) => (
            <div className="space-y-3 p-2">
              <GuestRow label="Adults" sub="Age 18+" value={adults} min={1} max={20} set={setAdults} />
              <GuestRow label="Children" sub="Under 12" value={children} min={0} max={10} set={setChildren} />
              <div className="flex justify-end pt-1">
                <button
                  type="button"
                  onClick={close}
                  className="rounded-full bg-navy px-4 py-1.5 text-xs font-semibold text-white hover:bg-navy/90"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </Field>

        <button
          type="button"
          onClick={submit}
          className="ml-auto flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-8 py-4 text-base font-medium text-black shadow-[0_12px_26px_-10px_rgba(254,188,18,0.9)] transition-all hover:-translate-y-0.5 hover:bg-primary-dark sm:w-auto lg:rounded-full"
        >
          <IconSearch className="size-5" stroke={2} />
          Search
        </button>
      </div>
    </motion.div>
  );
}

function GuestRow({
  label,
  sub,
  value,
  min,
  max,
  set,
}: {
  label: string;
  sub: string;
  value: number;
  min: number;
  max: number;
  set: (n: number) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div>
        <p className="text-sm font-semibold text-[#515151]">{label}</p>
        <p className="text-xs text-[#9a9a9a]">{sub}</p>
      </div>
      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={() => set(Math.max(min, value - 1))}
          disabled={value <= min}
          className="grid size-7 place-items-center rounded-full border border-black/15 text-ink transition-colors hover:border-navy hover:text-navy disabled:cursor-not-allowed disabled:opacity-40"
        >
          <IconMinus className="size-3.5" stroke={2.4} />
        </button>
        <span className="w-5 text-center text-sm font-semibold text-[#515151]">{value}</span>
        <button
          type="button"
          onClick={() => set(Math.min(max, value + 1))}
          disabled={value >= max}
          className="grid size-7 place-items-center rounded-full border border-black/15 text-ink transition-colors hover:border-navy hover:text-navy disabled:cursor-not-allowed disabled:opacity-40"
        >
          <IconPlus className="size-3.5" stroke={2.4} />
        </button>
      </div>
    </div>
  );
}

// Keep helper exported for potential reuse though currently unused externally.
export { fromDDMMYYYY };
