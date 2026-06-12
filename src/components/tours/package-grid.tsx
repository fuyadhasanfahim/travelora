"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, Variants } from "framer-motion";
import {
  IconStarFilled,
  IconMapPin,
  IconClock,
  IconHeart,
} from "@tabler/icons-react";
import Pagination from "@/components/ui/pagination";
import { TOURS } from "@/data/tours";

const PAGE_SIZE = 6;

const grid = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const card: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function PackageGrid() {
  const router = useRouter();
  const sp = useSearchParams();

  const q = sp.get("q")?.trim().toLowerCase() ?? "";
  const cats = (sp.get("category") ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  const dests = (sp.get("destination") ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  const minRating = sp.get("minRating") ? Number(sp.get("minRating")) : undefined;
  const maxPrice = sp.get("maxPrice") ? Number(sp.get("maxPrice")) : undefined;
  const sort = sp.get("sort") ?? "popular";
  const page = Math.max(1, Number(sp.get("page") || 1));

  const { items, total, totalPages } = useMemo(() => {
    let list = TOURS.slice();

    if (q) {
      list = list.filter((t) =>
        [t.title, t.location, t.country, t.category, t.tourType].some((v) =>
          v.toLowerCase().includes(q),
        ),
      );
    }
    if (cats.length) {
      list = list.filter((t) => cats.includes(t.category.toLowerCase()));
    }
    if (dests.length) {
      list = list.filter((t) =>
        dests.some(
          (d) =>
            t.location.toLowerCase().includes(d) ||
            t.country.toLowerCase().includes(d),
        ),
      );
    }
    if (minRating !== undefined) list = list.filter((t) => t.rating >= minRating);
    if (maxPrice !== undefined) list = list.filter((t) => t.price <= maxPrice);

    if (sort === "price-low") list.sort((a, b) => a.price - b.price);
    else if (sort === "price-high") list.sort((a, b) => b.price - a.price);
    else if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    // popular = original order

    const total = list.length;
    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
    const safePage = Math.min(page, totalPages);
    const start = (safePage - 1) * PAGE_SIZE;
    const items = list.slice(start, start + PAGE_SIZE);
    return { items, total, totalPages };
  }, [q, cats, dests, minRating, maxPrice, sort, page]);

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

  return (
    <div>
      {/* Result bar */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-[#8e8e8e]">
          Showing <span className="font-semibold text-ink">{items.length}</span> of{" "}
          <span className="font-semibold text-ink">{total}</span> tours
        </p>
        <label className="flex items-center gap-2 text-sm text-[#6e6e6e]">
          Sort:
          <select
            value={sort}
            onChange={(e) => setParam("sort", e.target.value === "popular" ? null : e.target.value)}
            className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-ink outline-none transition-colors hover:border-navy/30 focus:border-navy/40"
          >
            <option value="popular">Popular</option>
            <option value="price-low">Price: Low → High</option>
            <option value="price-high">Price: High → Low</option>
            <option value="rating">Top rated</option>
          </select>
        </label>
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
          key={`${q}-${cats.join()}-${dests.join()}-${minRating}-${maxPrice}-${sort}-${page}`}
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
                    p.badge.tone === "discount" ? "bg-primary text-black" : "bg-white/90 text-navy"
                  }`}
                >
                  {p.badge.label}
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
                  <span className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-black transition-all group-hover:-translate-y-0.5 group-hover:bg-primary-dark">
                    Book Now
                  </span>
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
