"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { IconChevronRight } from "@tabler/icons-react";

export default function AboutHero() {
  return (
    <section className="relative -mt-20 w-full">
      <div className="relative h-[380px] w-full overflow-hidden sm:h-[440px] lg:h-[480px]">
        {/* Ken Burns background */}
        <motion.div
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src="/images/about/hero-bg.jpg"
              alt="About Travelora"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </motion.div>

        {/* Overlay + vignette + bottom fade into page */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy/75 via-navy/45 to-navy/75" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,10,50,0.55)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />

        {/* Decorative glows */}
        <span className="pointer-events-none absolute -left-16 top-10 size-60 rounded-full bg-primary/20 blur-3xl" />
        <span className="pointer-events-none absolute -right-16 bottom-6 size-72 rounded-full bg-[#2746ff]/25 blur-3xl" />

        {/* Content */}
        <div className="container-content relative flex h-full flex-col items-center justify-center pt-20 text-center">
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white ring-1 ring-white/20 backdrop-blur"
          >
            <span className="size-1.5 rounded-full bg-primary" />
            Welcome to Travelora
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="mt-4 text-4xl font-semibold text-white drop-shadow-sm sm:text-5xl lg:text-[52px]"
          >
            About us
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
            transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
            aria-label="Breadcrumb"
            className="mt-5 flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-1.5 text-sm ring-1 ring-white/15 backdrop-blur"
          >
            <Link href="/" className="font-medium text-amber-soft transition-opacity hover:opacity-80">
              Home
            </Link>
            <IconChevronRight className="size-4 text-white/70" stroke={2} />
            <span className="text-white/90">About</span>
          </motion.nav>
        </div>
      </div>
    </section>
  );
}
