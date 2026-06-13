"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  IconSearch,
  IconX,
  IconStarFilled,
  IconMapPin,
  IconClock,
} from "@tabler/icons-react";
import { useTours } from "@/lib/query/hooks";

export default function NavbarSearch() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      // focus next tick so input is mounted
      requestAnimationFrame(() => inputRef.current?.focus());
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setOpen(false);
      };
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
      return () => {
        document.removeEventListener("keydown", onKey);
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  const { data: toursData } = useTours({ pageSize: 24 }, { enabled: open });
  const results = useMemo(() => {
    const allTours = toursData?.items ?? [];
    const term = q.trim().toLowerCase();
    if (!term) return allTours.slice(0, 6);
    return allTours
      .filter((t) =>
        [t.title, t.location, t.country, t.category, t.tourType].some((v) =>
          v.toLowerCase().includes(term),
        ),
      )
      .slice(0, 8);
  }, [q, toursData]);

  return (
    <>
      <button
        type="button"
        aria-label="Open search"
        onClick={() => setOpen(true)}
        className="grid size-11 place-items-center rounded-full bg-white text-ink shadow-[0_8px_22px_-12px_rgba(0,0,0,0.25)] ring-1 ring-black/[0.06] transition-all hover:-translate-y-0.5 hover:text-navy hover:shadow-[0_12px_28px_-12px_rgba(0,28,142,0.35)]"
      >
        <IconSearch className="size-5" stroke={1.9} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="search-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-navy/55 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ y: -28, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -28, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="mx-auto mt-[5.5rem] flex max-h-[calc(100vh-7rem)] w-[min(96%,820px)] flex-col overflow-hidden rounded-3xl bg-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.4)] ring-1 ring-black/[0.05]"
            >
              {/* Input row */}
              <div className="flex items-center gap-3 border-b border-black/[0.07] px-5 py-4 sm:px-6">
                <IconSearch className="size-5 shrink-0 text-navy/70" stroke={2} />
                <input
                  ref={inputRef}
                  type="text"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search packages by name, location or category…"
                  className="min-w-0 flex-1 bg-transparent text-base text-ink placeholder:text-[#a1a1a1] outline-none sm:text-lg"
                />
                <span className="hidden rounded-md border border-black/10 px-1.5 py-0.5 text-[11px] font-medium text-[#9a9a9a] sm:inline-flex">
                  ESC
                </span>
                <button
                  type="button"
                  aria-label="Close search"
                  onClick={() => setOpen(false)}
                  className="grid size-9 place-items-center rounded-full text-ink/60 transition-colors hover:bg-black/[0.05] hover:text-ink"
                >
                  <IconX className="size-5" stroke={2} />
                </button>
              </div>

              {/* Results */}
              <div className="min-h-[120px] flex-1 overflow-y-auto p-3 sm:p-4">
                {!q.trim() && (
                  <p className="px-3 pb-3 text-xs font-semibold uppercase tracking-wide text-[#a1a1a1]">
                    Suggested packages
                  </p>
                )}
                {results.length === 0 ? (
                  <div className="grid place-items-center py-14 text-center">
                    <p className="text-base font-medium text-[#6e6e6e]">
                      No packages match “{q}”.
                    </p>
                    <Link
                      href="/tours"
                      onClick={() => setOpen(false)}
                      className="mt-3 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-primary-dark"
                    >
                      Browse all tours
                    </Link>
                  </div>
                ) : (
                  <ul className="space-y-1.5">
                    {results.map((t) => (
                      <li key={t.slug}>
                        <Link
                          href={`/tours/${t.slug}`}
                          onClick={() => setOpen(false)}
                          className="group flex items-center gap-4 rounded-2xl p-2 transition-colors hover:bg-navy/[0.04]"
                        >
                          <span className="relative size-16 shrink-0 overflow-hidden rounded-xl sm:size-20">
                            <Image
                              src={t.image}
                              alt={t.title}
                              fill
                              sizes="80px"
                              className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="line-clamp-1 text-[15px] font-semibold text-[#3f3f3f] transition-colors group-hover:text-navy">
                              {t.title}
                            </span>
                            <span className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#8a8a8a]">
                              <span className="flex items-center gap-1">
                                <IconMapPin className="size-3.5" stroke={1.8} />
                                {t.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <IconClock className="size-3.5" stroke={1.8} />
                                {t.durationLabel}
                              </span>
                              <span className="flex items-center gap-1">
                                <IconStarFilled className="size-3.5 text-primary" />
                                {t.rating} ({t.reviews})
                              </span>
                            </span>
                          </span>
                          <span className="shrink-0 text-right">
                            <span className="block text-[10px] font-medium uppercase tracking-wide text-[#b0b0b0]">
                              From
                            </span>
                            <span className="text-base font-semibold text-navy">
                              ${t.price}
                            </span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}

                {q.trim() && results.length > 0 && (
                  <div className="mt-3 border-t border-black/[0.07] pt-3 text-center">
                    <Link
                      href={`/tours?q=${encodeURIComponent(q.trim())}`}
                      onClick={() => setOpen(false)}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-navy hover:text-primary-dark"
                    >
                      See all results for “{q.trim()}” →
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
