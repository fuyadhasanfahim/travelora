"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { motion } from "framer-motion";
import { IconChevronRight } from "@tabler/icons-react";

type Crumb = { label: string; href?: string };

export default function BlogHero({ title, crumbs }: { title: string; crumbs: Crumb[] }) {
  return (
    <section className="relative -mt-20 w-full">
      <div className="relative h-[380px] w-full overflow-hidden sm:h-[440px] lg:h-[460px]">
        <motion.div
          animate={{ scale: [1, 1.07, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image src="/images/blog/hero-bg.jpg" alt={title} fill priority sizes="100vw" className="object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-navy/75 via-navy/45 to-navy/75" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />
        <span className="pointer-events-none absolute -left-16 top-10 size-60 rounded-full bg-primary/20 blur-3xl" />

        <div className="container-content relative flex h-full flex-col items-center justify-center pt-20 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-4xl text-3xl font-semibold text-white drop-shadow-sm sm:text-4xl lg:text-[46px]"
          >
            {title}
          </motion.h1>
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
            className="mt-4 block h-1 w-16 rounded-full bg-gradient-to-r from-primary to-amber-soft"
          />
          <motion.nav
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            aria-label="Breadcrumb"
            className="mt-5 flex max-w-full flex-wrap items-center justify-center gap-1.5 rounded-full bg-white/10 px-4 py-1.5 text-sm ring-1 ring-white/15 backdrop-blur"
          >
            {crumbs.map((c, i) => (
              <Fragment key={c.label}>
                {i > 0 && <IconChevronRight className="size-4 shrink-0 text-white/70" stroke={2} />}
                {c.href ? (
                  <Link href={c.href} className="font-medium text-amber-soft transition-opacity hover:opacity-80">
                    {c.label}
                  </Link>
                ) : (
                  <span className="truncate text-white/90">{c.label}</span>
                )}
              </Fragment>
            ))}
          </motion.nav>
        </div>
      </div>
    </section>
  );
}
