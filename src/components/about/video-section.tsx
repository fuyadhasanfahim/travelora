"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { IconPlayerPlayFilled } from "@tabler/icons-react";

export default function VideoSection() {
  return (
    <section className="py-4 sm:py-6 lg:py-8">
      <div className="container-content">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative aspect-[1242/610] w-full overflow-hidden rounded-[28px] shadow-[0_30px_70px_-34px_rgba(0,0,0,0.5)] ring-1 ring-black/5"
        >
          <Image
            src="/images/about/video-bg.jpg"
            alt="Watch our travel video"
            fill
            sizes="(max-width: 1280px) 100vw, 1240px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/15" />

          {/* Play button with rotating text */}
          <button
            type="button"
            aria-label="Play video"
            className="group absolute left-1/2 top-1/2 size-28 -translate-x-1/2 -translate-y-1/2 sm:size-32"
          >
            {/* Rotating circular text */}
            <svg viewBox="0 0 100 100" className="absolute inset-0 size-full animate-[spin_14s_linear_infinite]">
              <defs>
                <path id="circlePath" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
              </defs>
              <text className="fill-white text-[11px] font-semibold uppercase tracking-[0.25em]">
                <textPath href="#circlePath" startOffset="0%">
                  Watch our video • Watch our video •
                </textPath>
              </text>
            </svg>
            {/* Center play */}
            <span className="absolute left-1/2 top-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-navy shadow-lg transition-transform duration-300 group-hover:scale-110 sm:size-16">
              <IconPlayerPlayFilled className="size-6 translate-x-0.5 sm:size-7" />
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
