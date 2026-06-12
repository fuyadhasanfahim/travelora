"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, Variants } from "framer-motion";
import { IconUserCircle, IconCalendarMonth, IconClock, IconSearch } from "@tabler/icons-react";
import Pagination from "@/components/ui/pagination";
import { filterBlogs, BLOG_CATEGORIES } from "@/data/blogs";

const grid = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const card: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function BlogList() {
  const router = useRouter();
  const sp = useSearchParams();

  const q = sp.get("q") ?? "";
  const category = sp.get("category") ?? "";
  const page = Math.max(1, Number(sp.get("page") || 1));

  const result = useMemo(
    () => filterBlogs({ q, category, page }),
    [q, category, page],
  );

  const setParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(sp.toString());
    if (value === null || value === "") params.delete(key);
    else params.set(key, value);
    if (key !== "page") params.delete("page");
    const qs = params.toString();
    router.push(`/blog${qs ? `?${qs}` : ""}`, { scroll: false });
  };

  const goPage = (n: number) => {
    setParam("page", n <= 1 ? null : String(n));
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 320, behavior: "smooth" });
    }
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="container-content">
        {/* Toolbar: search + category chips */}
        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-2 rounded-full border border-black/10 bg-white px-5 py-3 lg:max-w-md lg:flex-1">
            <IconSearch className="size-5 shrink-0 text-[#a1a1a1]" stroke={1.8} />
            <input
              type="text"
              value={q}
              onChange={(e) => setParam("q", e.target.value || null)}
              placeholder="Search articles…"
              className="min-w-0 flex-1 bg-transparent text-sm text-ink placeholder:text-[#a1a1a1] outline-none"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setParam("category", null)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                !category ? "bg-navy text-white" : "bg-white text-[#6e6e6e] ring-1 ring-black/10 hover:text-navy"
              }`}
            >
              All
            </button>
            {BLOG_CATEGORIES.map((c) => (
              <button
                key={c.label}
                type="button"
                onClick={() => setParam("category", c.label)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                  category === c.label
                    ? "bg-navy text-white"
                    : "bg-white text-[#6e6e6e] ring-1 ring-black/10 hover:text-navy"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {result.items.length === 0 ? (
          <div className="grid place-items-center rounded-3xl border border-dashed border-black/15 bg-white py-20 text-center">
            <p className="text-lg font-semibold text-[#6e6e6e]">No articles match these filters.</p>
            <button
              type="button"
              onClick={() => router.push("/blog")}
              className="mt-5 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-primary-dark"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <motion.div
            key={`${q}-${category}-${page}`}
            variants={grid}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:gap-8"
          >
            {result.items.map((p) => (
              <motion.article
                key={p.slug}
                variants={card}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="group relative flex flex-col overflow-hidden rounded-[24px] bg-white shadow-[0_16px_45px_-28px_rgba(0,0,0,0.3)] ring-1 ring-black/[0.05] transition-shadow duration-300 hover:shadow-[0_30px_70px_-30px_rgba(0,28,142,0.35)]"
              >
                <Link href={`/blog/${p.slug}`} aria-label={p.title} className="absolute inset-0 z-10" />

                <div className="relative aspect-[608/350] w-full overflow-hidden">
                  <Image
                    src={p.cover}
                    alt={p.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-navy backdrop-blur">
                    {p.category}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[#aaa8a8]">
                    <span className="flex items-center gap-1.5 text-sm">
                      <IconUserCircle className="size-4" stroke={1.6} /> {p.author}
                    </span>
                    <span className="flex items-center gap-1.5 text-sm">
                      <IconCalendarMonth className="size-4" stroke={1.6} /> {p.date}
                    </span>
                    <span className="flex items-center gap-1.5 text-sm">
                      <IconClock className="size-4" stroke={1.6} /> {p.readMinutes} Minute
                    </span>
                  </div>

                  <h2 className="mt-3 line-clamp-2 text-xl font-semibold leading-snug text-[#6e6e6e] transition-colors group-hover:text-navy">
                    {p.title}
                  </h2>
                  <p className="mt-3 line-clamp-2 text-base leading-relaxed text-[#a1a1a1]">{p.excerpt}</p>

                  <span className="mt-5 inline-flex w-fit items-center rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-black transition-all group-hover:-translate-y-0.5 group-hover:bg-primary-dark">
                    Read More
                  </span>
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}

        {result.totalPages > 1 && (
          <div className="mt-12">
            <Pagination total={result.totalPages} current={result.page} onChange={goPage} />
          </div>
        )}
      </div>
    </section>
  );
}
