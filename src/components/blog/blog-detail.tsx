"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  IconSearch,
  IconUserCircle,
  IconCalendarMonth,
  IconClock,
  IconStarFilled,
  IconMapPin,
  IconArrowLeft,
  IconArrowRight,
  IconChevronRight,
} from "@tabler/icons-react";
import PromoExplore from "@/components/ui/promo-explore";
import {
  type Blog,
  BLOG_CATEGORIES,
  getAdjacentBlogs,
  trendingBlogs,
} from "@/data/blogs";
import { TOURS, getTour } from "@/data/tours";

export default function BlogDetail({ blog }: { blog: Blog }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const { prev, next } = useMemo(() => getAdjacentBlogs(blog.slug), [blog.slug]);
  const trending = useMemo(() => trendingBlogs(blog.slug, 5), [blog.slug]);
  const related =
    (blog.relatedTourSlug && getTour(blog.relatedTourSlug)) || TOURS[0];

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const term = q.trim();
    router.push(term ? `/blog?q=${encodeURIComponent(term)}` : "/blog");
  };

  return (
    <section className="pt-12 pb-36 sm:pt-16 sm:pb-40 lg:pt-20 lg:pb-48">
      <div className="container-content">
        <div className="grid gap-10 lg:grid-cols-[1fr_397px] lg:gap-12">
          {/* ── Main article ── */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative aspect-[819/461] w-full overflow-hidden rounded-[28px] shadow-[0_24px_60px_-32px_rgba(0,0,0,0.45)]">
              <Image src={blog.cover} alt={blog.title} fill priority sizes="(max-width: 1024px) 100vw, 819px" className="object-cover" />
              <span className="absolute left-5 top-5 rounded-full bg-white/95 px-3.5 py-1.5 text-xs font-semibold text-navy backdrop-blur">
                {blog.category}
              </span>
            </div>

            {/* Meta */}
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[#aaa8a8]">
              <span className="flex items-center gap-1.5 text-sm"><IconUserCircle className="size-4" stroke={1.6} /> {blog.author}</span>
              <span className="flex items-center gap-1.5 text-sm"><IconCalendarMonth className="size-4" stroke={1.6} /> {blog.date}</span>
              <span className="flex items-center gap-1.5 text-sm"><IconClock className="size-4" stroke={1.6} /> {blog.readMinutes} Minute</span>
            </div>

            {/* Body */}
            {blog.body.map((b, i) => (
              <div key={i} className={i === 0 ? "" : "mt-6"}>
                {b.heading && (
                  <h2 className="mt-6 text-xl font-medium text-[#6e6e6e]">{b.heading}</h2>
                )}
                <p className="mt-3 text-base leading-[1.9] text-[#a1a1a1]">{b.text}</p>

                {/* Embedded package card after first paragraph */}
                {i === 0 && (
                  <div className="my-8 flex flex-col gap-5 overflow-hidden rounded-[24px] border border-black/[0.06] bg-white p-4 shadow-[0_16px_45px_-30px_rgba(0,0,0,0.35)] sm:flex-row sm:items-center">
                    <Link href={`/tours/${related.slug}`} className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-2xl sm:w-56">
                      <Image src={related.image} alt={related.title} fill sizes="224px" className="object-cover transition-transform duration-500 hover:scale-105" />
                    </Link>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 text-xs text-[#a1a1a1]">
                        <span className="flex items-center gap-1"><IconStarFilled className="size-3.5 text-primary" /> {related.rating} ({related.reviews} Reviews)</span>
                        <span className="flex items-center gap-1"><IconMapPin className="size-3.5" stroke={1.7} /> {related.location}</span>
                      </div>
                      <Link href={`/tours/${related.slug}`} className="mt-2 block text-xl font-semibold text-[#515151] transition-colors hover:text-navy">
                        {related.title}
                      </Link>
                      <div className="mt-2 flex items-center gap-1.5 text-sm text-[#a1a1a1]"><IconClock className="size-4" stroke={1.7} /> {related.durationLabel}</div>
                      <div className="mt-4 flex items-center justify-between">
                        <p className="text-lg font-semibold text-navy">${related.price}<span className="text-sm font-normal text-[#a1a1a1]">/ Person</span></p>
                        <Link href={`/tours/${related.slug}`} className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-primary-dark">Book Now</Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Pull quote */}
            {blog.quote && (
              <blockquote className="my-8 rounded-2xl border-l-4 border-primary bg-amber-soft/[0.08] p-6 text-xl font-medium italic leading-relaxed text-[#8a8a8a]">
                “{blog.quote}”
              </blockquote>
            )}

            {/* Prev / Next */}
            <div className="mt-10 grid gap-4 border-t border-black/[0.08] pt-8 sm:grid-cols-2">
              <Link href={`/blog/${prev.slug}`} className="group flex items-center gap-3 text-left">
                <span className="grid size-10 shrink-0 place-items-center rounded-full border border-black/10 text-ink transition-colors group-hover:border-navy group-hover:bg-navy group-hover:text-white">
                  <IconArrowLeft className="size-5" stroke={2} />
                </span>
                <span>
                  <span className="block text-xs text-[#a1a1a1]">Previous</span>
                  <span className="mt-0.5 block text-sm font-medium text-[#6e6e6e] line-clamp-1">{prev.title}</span>
                </span>
              </Link>
              <Link href={`/blog/${next.slug}`} className="group flex items-center justify-end gap-3 text-right">
                <span>
                  <span className="block text-xs text-[#a1a1a1]">Next</span>
                  <span className="mt-0.5 block text-sm font-medium text-[#6e6e6e] line-clamp-1">{next.title}</span>
                </span>
                <span className="grid size-10 shrink-0 place-items-center rounded-full border border-black/10 text-ink transition-colors group-hover:border-navy group-hover:bg-navy group-hover:text-white">
                  <IconArrowRight className="size-5" stroke={2} />
                </span>
              </Link>
            </div>
          </motion.article>

          {/* ── Sidebar ── */}
          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-8"
          >
            {/* Search */}
            <form
              onSubmit={onSearch}
              className="flex items-center gap-2 rounded-full border border-black/10 bg-white px-5 py-3.5"
            >
              <IconSearch className="size-5 text-[#a1a1a1]" stroke={1.8} />
              <input
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search articles"
                className="min-w-0 flex-1 bg-transparent text-sm text-ink placeholder:text-[#a1a1a1] outline-none"
              />
            </form>

            {/* Trending */}
            <div className="rounded-3xl border border-black/[0.07] bg-white p-6 shadow-[0_16px_45px_-32px_rgba(0,0,0,0.3)]">
              <h3 className="text-xl font-semibold text-[#6e6e6e]">Treanding Now</h3>
              <ul className="mt-5 space-y-4">
                {trending.map((t) => (
                  <li key={t.slug}>
                    <Link href={`/blog/${t.slug}`} className="group flex gap-3">
                      <span className="relative size-16 shrink-0 overflow-hidden rounded-xl">
                        <Image src={t.thumb} alt={t.title} fill sizes="64px" className="object-cover transition-transform duration-300 group-hover:scale-110" />
                      </span>
                      <span className="min-w-0">
                        <span className="line-clamp-2 text-sm font-medium text-[#6e6e6e] transition-colors group-hover:text-navy">{t.title}</span>
                        <span className="mt-1 flex items-center gap-1 text-xs text-[#aaa8a8]">
                          <IconCalendarMonth className="size-3.5" stroke={1.6} /> {t.date}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div className="rounded-3xl border border-black/[0.07] bg-white p-6 shadow-[0_16px_45px_-32px_rgba(0,0,0,0.3)]">
              <h3 className="text-xl font-semibold text-[#6e6e6e]">Categories</h3>
              <ul className="mt-5 space-y-3">
                {BLOG_CATEGORIES.map((c) => (
                  <li key={c.label}>
                    <Link
                      href={`/blog?category=${encodeURIComponent(c.label)}`}
                      className="group flex items-center justify-between gap-2 text-[#a1a1a1] transition-colors hover:text-navy"
                    >
                      <span className="flex items-center gap-2">
                        <IconChevronRight className="size-4 text-primary-dark" stroke={2} />
                        {c.label}
                      </span>
                      {c.count !== undefined && (
                        <span className="text-sm font-medium text-ink">{c.count}</span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Promo */}
            <PromoExplore href="/tours" />
          </motion.aside>
        </div>
      </div>

    </section>
  );
}
