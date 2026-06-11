"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutCta() {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="container-content">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[28px] shadow-[0_30px_70px_-34px_rgba(0,0,0,0.5)]"
        >
          <Image
            src="/images/about/cta-bg.jpg"
            alt=""
            fill
            sizes="(max-width: 1280px) 100vw, 1240px"
            className="object-cover"
          />
          {/* Overlay (darker on the left for text) */}
          <div className="absolute inset-0 bg-gradient-to-r from-navy/85 via-navy/55 to-navy/20" />

          <div className="relative flex flex-col items-start gap-6 px-7 py-10 sm:px-12 lg:flex-row lg:items-center lg:justify-between lg:px-16 lg:py-14">
            <h2 className="max-w-2xl text-2xl font-bold leading-snug text-white sm:text-3xl lg:text-[34px]">
              Travel beyond your imagination,
              <br className="hidden sm:block" /> with our Travel Agency!
            </h2>
            <button
              type="button"
              className="shrink-0 rounded-full bg-primary px-8 py-3.5 text-base font-medium text-black shadow-[0_14px_30px_-12px_rgba(254,188,18,0.9)] transition-all hover:-translate-y-0.5 hover:bg-primary-dark"
            >
              Book Now
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
