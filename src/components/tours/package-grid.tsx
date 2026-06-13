"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, Variants } from "framer-motion";
import {
  IconStarFilled,
  IconMapPin,
  IconClock,
  IconHeart,
  IconAdjustmentsHorizontal,
} from "@tabler/icons-react";
import Pagination from "@/components/ui/pagination";
import { TourGridSkeleton } from "@/components/ui/skeleton";
import { useTours, type ToursListFilters } from "@/lib/query/hooks";
import { useUIStore } from "@/stores/ui-store";
import { useActiveFilterCount } from "./tour-filters-panel";

const PAGE_SIZE = 6;

const grid = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const card: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function PackageGrid() {
  const router = useRouter();
  const sp = useSearchParams();
  const openFilters = useUIStore((s) => s.setFilterDrawer);
  const activeFilterCount = useActiveFilterCount();

  const filters: ToursListFilters = {
    q: sp.get("q")?.trim() || undefined,
    category: sp.get("category") || undefined,
    destination: sp.get("destination") || undefined,
    minRating: sp.get("minRating") ? Number(sp.get("minRating")) : undefined,
    maxPrice: sp.get("maxPrice") ? Number(sp.get("maxPrice")) : undefined,
    sort: sp.get("sort") || "popular",
    page: Math.max(1, Number(sp.get("page") || 1)),
    pageSize: PAGE_SIZE,
  };

  const { data, isLoading, isError, refetch } = useTours(filters);

  const setParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(sp.toString());
    if (value === null || value === "") params.delete(key);
    else params.set(key, value);
    if (key !== "page") params.delete("page");
    const qs = params.toString();
    router.push(`/tours${qs ? `?${qs}` : ""}`, { scroll: false });
  };

  const goPage = (n: number) => {
    const params = new URLSearchParams(sp.toString());
    if (n <= 1) params.delete("page");
    else params.set("page", String(n));
    const qs = params.toString();
    router.push(`/tours${qs ? `?${qs}` : ""}`, { scroll: false });
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 320, behavior: "smooth" });
    }
  };

  if (isLoading) {
    return (
      <div>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div className="h-4 w-32 animate-pulse rounded bg-black/[0.06]" />
          <div className="flex items-center gap-2">
            <div className="h-9 w-28 animate-pulse rounded-full bg-black/[0.06] lg:hidden" />
            <div className="h-9 w-36 animate-pulse rounded-full bg-black/[0.06]" />
          </div>
        </div>
        <TourGridSkeleton count={PAGE_SIZE} />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="grid place-items-center rounded-3xl border border-dashed border-rose-200 bg-rose-50/30 py-20 text-center">
        <p className="text-lg font-semibold text-rose-700">
          We couldn&apos;t load tours right now.
        </p>
        <p className="mt-1 text-sm text-rose-500/80">
          Please check your connection and try again.
        </p>
        <button
          type="button"
          onClick={() => refetch()}
          className="mt-5 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-primary-dark"
        >
          Retry
        </button>
      </div>
    );
  }

  const { items, total, totalPages, page } = data;
  const sort = filters.sort ?? "popular";

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-[#8e8e8e]">
          Showing <span className="font-semibold text-ink">{items.length}</span> of{" "}
          <span className="font-semibold text-ink">{total}</span> tours
        </p>
        <div className="flex items-center gap-2">
          {/* Mobile / tablet only — opens drawer */}
          <button
            type="button"
            onClick={() => openFilters(true)}
            aria-label={
              activeFilterCount > 0
                ? `Open filters (${activeFilterCount} active)`
                : "Open filters"
            }
            className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-ink shadow-sm transition-all hover:-translate-y-0.5 hover:border-navy/30 lg:hidden"
          >
            <IconAdjustmentsHorizontal className="size-4" stroke={1.9} />
            Filters
            {activeFilterCount > 0 && (
              <span className="grid min-w-[1.25rem] place-items-center rounded-full bg-navy px-1.5 text-[11px] font-semibold text-white">
                {activeFilterCount}
              </span>
            )}
          </button>

          <label className="flex items-center gap-2 text-sm text-[#6e6e6e]">
            <span className="hidden sm:inline">Sort:</span>
            <select
              value={sort}
              onChange={(e) =>
                setParam("sort", e.target.value === "popular" ? null : e.target.value)
              }
              className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-ink outline-none transition-colors hover:border-navy/30 focus:border-navy/40"
            >
              <option value="popular">Popular</option>
              <option value="price-low">Price: Low → High</option>
              <option value="price-high">Price: High → Low</option>
              <option value="rating">Top rated</option>
            </select>
          </label>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="grid place-items-center rounded-3xl border border-dashed border-black/15 bg-white py-20 text-center">
          <p className="text-lg font-semibold text-[#6e6e6e]">
            No tours match these filters.
          </p>
          <p className="mt-1 text-sm text-[#9a9a9a]">
            Try widening your price range or removing a category.
          </p>
          <button
            type="button"
            onClick={() => router.push("/tours")}
            className="mt-5 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-primary-dark"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <motion.div
          key={`${sp.toString()}-${page}`}
          variants={grid}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3"
        >
          {items.map((p) => (
            <motion.article
              key={p.slug}
              variants={card}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="group relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-[0_12px_40px_-22px_rgba(0,0,0,0.3)] ring-1 ring-black/[0.04] transition-shadow duration-300 hover:shadow-[0_28px_60px_-26px_rgba(0,28,142,0.4)]"
            >
              <Link href={`/tours/${p.slug}`} aria-label={p.title} className="absolute inset-0 z-10" />

              <div className="relative aspect-[397/269] w-full overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 300px"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                <span
                  className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold shadow-sm backdrop-blur ${
                    p.badgeTone === "discount" ? "bg-primary text-black" : "bg-white/90 text-navy"
                  }`}
                >
                  {p.badgeLabel}
                </span>
                <span className="absolute right-4 top-4 z-20 grid size-9 place-items-center rounded-full bg-white/90 text-ink/70 shadow-sm backdrop-blur transition-colors group-hover:text-rose-500">
                  <IconHeart className="size-[18px]" stroke={1.8} />
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-1.5">
                    <IconStarFilled className="size-4 text-primary" />
                    <span className="text-sm font-semibold text-ink">{p.rating}</span>
                    <span className="text-xs text-[#a1a1a1]">({p.reviews})</span>
                  </span>
                  <span className="flex items-center gap-1 text-xs text-[#a1a1a1]">
                    <IconMapPin className="size-4" stroke={1.6} />
                    {p.location}
                  </span>
                </div>

                <h3 className="mt-2 line-clamp-2 min-h-[3rem] text-lg font-semibold text-[#3f3f3f] transition-colors group-hover:text-navy">
                  {p.title}
                </h3>

                <div className="mt-2 flex items-center gap-1.5 text-sm text-[#8a8a8a]">
                  <IconClock className="size-4 text-navy/60" stroke={1.7} />
                  {p.durationLabel}
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-black/[0.06] pt-4">
                  <p className="text-lg font-semibold text-navy">
                    ${p.price}
                    <span className="text-sm font-normal text-[#a1a1a1]">/ Person</span>
                  </p>
                  <Link
                    href={`/booking?tour=${p.slug}&adult=2&child=1&extra=0`}
                    aria-label={`Book ${p.title}`}
                    className="relative z-20 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-black transition-all group-hover:-translate-y-0.5 group-hover:bg-primary-dark"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      )}

      {totalPages > 1 && (
        <div className="mt-10">
          <Pagination total={totalPages} current={Math.min(page, totalPages)} onChange={goPage} />
        </div>
      )}
    </div>
  );
}
