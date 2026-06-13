"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
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
import type { Blog, Tour } from "@prisma/client";

type BodyBlock = { heading?: string; text: string };
type TrendingItem = Pick<Blog, "slug" | "title" | "cover" | "date">;
type AdjacentItem = { slug: string; title: string };

export default function BlogDetail({
  blog,
  prev,
  next,
  trending,
  relatedTour,
}: {
  blog: Blog;
  prev: AdjacentItem | null;
  next: AdjacentItem | null;
  trending: TrendingItem[];
  relatedTour: Tour | null;
}) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const body = (blog.body ?? []) as unknown as BodyBlock[];

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const term = q.trim();
    router.push(term ? `/blog?q=${encodeURIComponent(term)}` : "/blog");
  };

  return (
    <section className="pt-12 pb-36 sm:pt-16 sm:pb-40 lg:pt-20 lg:pb-48">
      <div className="container-content">
        <div className="grid gap-10 lg:grid-cols-[1fr_397px] lg:gap-12">
          {/* Article */}
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

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[#aaa8a8]">
              <span className="flex items-center gap-1.5 text-sm"><IconUserCircle className="size-4" stroke={1.6} /> {blog.author}</span>
              <span className="flex items-center gap-1.5 text-sm"><IconCalendarMonth className="size-4" stroke={1.6} /> {blog.date}</span>
              <span className="flex items-center gap-1.5 text-sm"><IconClock className="size-4" stroke={1.6} /> {blog.readMinutes} Minute</span>
            </div>

            {body.map((b, i) => (
              <div key={i} className={i === 0 ? "" : "mt-6"}>
                {b.heading && (
                  <h2 className="mt-6 text-xl font-medium text-[#6e6e6e]">{b.heading}</h2>
                )}
                <p className="mt-3 text-base leading-[1.9] text-[#a1a1a1]">{b.text}</p>

                {i === 0 && relatedTour && (
                  <div className="my-8 flex flex-col gap-5 overflow-hidden rounded-[24px] border border-black/[0.06] bg-white p-4 shadow-[0_16px_45px_-30px_rgba(0,0,0,0.35)] sm:flex-row sm:items-center">
                    <Link href={`/tours/${relatedTour.slug}`} className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-2xl sm:w-56">
                      <Image src={relatedTour.image} alt={relatedTour.title} fill sizes="224px" className="object-cover transition-transform duration-500 hover:scale-105" />
                    </Link>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 text-xs text-[#a1a1a1]">
                        <span className="flex items-center gap-1"><IconStarFilled className="size-3.5 text-primary" /> {relatedTour.rating} ({relatedTour.reviews} Reviews)</span>
                        <span className="flex items-center gap-1"><IconMapPin className="size-3.5" stroke={1.7} /> {relatedTour.location}</span>
                      </div>
                      <Link href={`/tours/${relatedTour.slug}`} className="mt-2 block text-xl font-semibold text-[#515151] transition-colors hover:text-navy">
                        {relatedTour.title}
                      </Link>
                      <div className="mt-2 flex items-center gap-1.5 text-sm text-[#a1a1a1]"><IconClock className="size-4" stroke={1.7} /> {relatedTour.durationLabel}</div>
                      <div className="mt-4 flex items-center justify-between">
                        <p className="text-lg font-semibold text-navy">${relatedTour.price}<span className="text-sm font-normal text-[#a1a1a1]">/ Person</span></p>
                        <Link href={`/tours/${relatedTour.slug}`} className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-primary-dark">Book Now</Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {blog.quote && (
              <blockquote className="my-8 rounded-2xl border-l-4 border-primary bg-amber-soft/[0.08] p-6 text-xl font-medium italic leading-relaxed text-[#8a8a8a]">
                “{blog.quote}”
              </blockquote>
            )}

            <div className="mt-10 grid gap-4 border-t border-black/[0.08] pt-8 sm:grid-cols-2">
              {prev ? (
                <Link href={`/blog/${prev.slug}`} className="group flex items-center gap-3 text-left">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full border border-black/10 text-ink transition-colors group-hover:border-navy group-hover:bg-navy group-hover:text-white">
                    <IconArrowLeft className="size-5" stroke={2} />
                  </span>
                  <span>
                    <span className="block text-xs text-[#a1a1a1]">Previous</span>
                    <span className="mt-0.5 block text-sm font-medium text-[#6e6e6e] line-clamp-1">{prev.title}</span>
                  </span>
                </Link>
              ) : <span />}
              {next ? (
                <Link href={`/blog/${next.slug}`} className="group flex items-center justify-end gap-3 text-right">
                  <span>
                    <span className="block text-xs text-[#a1a1a1]">Next</span>
                    <span className="mt-0.5 block text-sm font-medium text-[#6e6e6e] line-clamp-1">{next.title}</span>
                  </span>
                  <span className="grid size-10 shrink-0 place-items-center rounded-full border border-black/10 text-ink transition-colors group-hover:border-navy group-hover:bg-navy group-hover:text-white">
                    <IconArrowRight className="size-5" stroke={2} />
                  </span>
                </Link>
              ) : <span />}
            </div>
          </motion.article>

          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-8"
          >
            <form onSubmit={onSearch} className="flex items-center gap-2 rounded-full border border-black/10 bg-white px-5 py-3.5">
              <IconSearch className="size-5 text-[#a1a1a1]" stroke={1.8} />
              <input
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search articles"
                className="min-w-0 flex-1 bg-transparent text-sm text-ink placeholder:text-[#a1a1a1] outline-none"
              />
            </form>

            <div className="rounded-3xl border border-black/[0.07] bg-white p-6 shadow-[0_16px_45px_-32px_rgba(0,0,0,0.3)]">
              <h3 className="text-xl font-semibold text-[#6e6e6e]">Trending Now</h3>
              <ul className="mt-5 space-y-4">
                {trending.map((t) => (
                  <li key={t.slug}>
                    <Link href={`/blog/${t.slug}`} className="group flex gap-3">
                      <span className="relative size-16 shrink-0 overflow-hidden rounded-xl">
                        <Image src={t.cover} alt={t.title} fill sizes="64px" className="object-cover transition-transform duration-300 group-hover:scale-110" />
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

            <div className="rounded-3xl border border-black/[0.07] bg-white p-6 shadow-[0_16px_45px_-32px_rgba(0,0,0,0.3)]">
              <h3 className="text-xl font-semibold text-[#6e6e6e]">Tags</h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {blog.tags.map((t) => (
                  <Link key={t} href={`/blog?q=${encodeURIComponent(t)}`} className="rounded-full bg-black/[0.04] px-3 py-1 text-xs font-medium text-[#6e6e6e] transition-colors hover:bg-navy hover:text-white">
                    <span className="flex items-center gap-1">
                      <IconChevronRight className="size-3" stroke={2} /> {t}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <PromoExplore href="/tours" />
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
