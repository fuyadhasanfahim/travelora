"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function BookSchedule() {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="container-content">
        <div className="overflow-hidden rounded-3xl bg-white shadow-[0_30px_80px_-40px_rgba(0,0,0,0.4)] ring-1 ring-black/[0.05]">
          <div className="grid items-stretch lg:grid-cols-2">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative min-h-[240px] overflow-hidden sm:min-h-[300px] lg:min-h-[430px]"
            >
              <Image
                src="/images/cta/book-schedule.png"
                alt="Book your next journey with Travelora"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </motion.div>

            {/* Copy */}
            <motion.div
              initial={{ opacity: 0, x: 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col justify-center px-7 py-12 sm:px-12 lg:py-16"
            >
              <h2 className="text-3xl font-semibold leading-[1.2] text-[#222222] sm:text-4xl lg:text-[46px]">
                <span className="text-primary">Book</span> Your Schedule
                <br />
                From <span className="text-primary">Anywhere,</span>
                <br />
                <span className="text-primary">any time</span>
              </h2>
              <p className="mt-5 text-lg text-[#6e6e6e]">
                Your journey, our commitment
              </p>

              <motion.button
                type="button"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="mt-8 inline-flex w-fit items-center justify-center rounded-full bg-navy px-12 py-4 text-base font-medium text-white shadow-[0_16px_34px_-12px_rgba(0,28,142,0.55)] transition-colors hover:bg-navy/90"
              >
                Explore Now
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
