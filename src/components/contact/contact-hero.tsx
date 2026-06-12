"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { IconChevronRight } from "@tabler/icons-react";

export default function ContactHero() {
  return (
    <section className="relative -mt-20 w-full">
      <div className="relative h-[360px] w-full overflow-hidden sm:h-[420px] lg:h-[450px]">
        <motion.div
          animate={{ scale: [1, 1.07, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image src="/images/contact/hero-bg.jpg" alt="Contact with us" fill priority sizes="100vw" className="object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-navy/75 via-navy/45 to-navy/75" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />
        <span className="pointer-events-none absolute -left-16 top-10 size-60 rounded-full bg-primary/20 blur-3xl" />

        <div className="container-content relative flex h-full flex-col items-center justify-center pt-20 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-3xl font-semibold text-white drop-shadow-sm sm:text-4xl lg:text-[46px]"
          >
            Contact with us
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
            className="mt-5 flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-1.5 text-sm ring-1 ring-white/15 backdrop-blur"
          >
            <Link href="/" className="font-medium text-amber-soft hover:opacity-80">Home</Link>
            <IconChevronRight className="size-4 text-white/70" stroke={2} />
            <span className="text-white/90">Contact</span>
          </motion.nav>
        </div>
      </div>
    </section>
  );
}
