"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { IconSend, IconPlayerPlayFilled } from "@tabler/icons-react";

const SLIDES = [
  "/images/hero/slide-1.png",
  "/images/hero/slide-2.png",
  "/images/hero/slide-3.png",
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % SLIDES.length),
      6000,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative -mt-20 w-full">
      {/* Slider background (full-bleed under the glass navbar) */}
      <div className="relative h-[600px] overflow-hidden sm:h-[680px] lg:h-[760px]">
        <AnimatePresence initial={false}>
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={SLIDES[index]}
              alt="Scenic travel destination"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Readability overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/35 to-black/10" />

        {/* Content */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="container-content relative z-10 flex h-full flex-col justify-center"
        >
          <motion.span
            variants={item}
            className="mb-5 inline-flex w-fit items-center gap-2 rounded-full bg-primary/90 px-4 py-1.5 text-sm font-normal text-black"
          >
            <IconSend className="size-4" stroke={1.8} />
            explore with travelora
          </motion.span>

          <motion.h1
            variants={item}
            className="max-w-3xl text-4xl font-medium leading-[1.1] text-white sm:text-5xl lg:text-[62px]"
          >
            Unveil the <span className="text-primary">Beauty</span> of the World
            Every Day
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-5 text-lg font-medium text-white/90 sm:text-xl lg:text-2xl"
          >
            Travel Without Limits Browse, Book, Explore
          </motion.p>

          <motion.div variants={item} className="mt-8">
            <button
              type="button"
              className="group inline-flex items-center gap-3 rounded-full bg-white/10 py-2 pl-2 pr-6 text-base font-medium text-white ring-1 ring-white/30 backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              <span className="grid size-10 place-items-center rounded-full bg-primary text-black transition-transform group-hover:scale-110">
                <IconPlayerPlayFilled className="size-4" />
              </span>
              How it Work
            </button>
          </motion.div>
        </motion.div>

        {/* Slide indicators (lifted above the search bar so nothing overlaps) */}
        <div className="container-content pointer-events-none absolute inset-x-0 bottom-28 z-10 sm:bottom-32 lg:bottom-36">
          <div className="pointer-events-auto flex items-center gap-2.5">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-2.5 rounded-full transition-all ${
                  i === index
                    ? "w-7 bg-primary"
                    : "w-2.5 bg-white/60 hover:bg-white"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
