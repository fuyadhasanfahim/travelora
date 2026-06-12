"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function TdGallery() {
  return (
    <section className="pt-10 sm:pt-12 lg:pt-14">
      <div className="container-content">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr]"
        >
          {/* Big left */}
          <div className="group relative aspect-[608/520] overflow-hidden rounded-[24px] lg:aspect-auto lg:row-span-2">
            <Image src="/images/tours/gallery-1.jpg" alt="" fill sizes="(max-width:1024px) 100vw, 600px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>

          {/* Right column */}
          <div className="grid gap-3">
            <div className="group relative aspect-[608/300] overflow-hidden rounded-[24px]">
              <Image src="/images/tours/gallery-2.jpg" alt="" fill sizes="(max-width:1024px) 100vw, 500px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="group relative aspect-square overflow-hidden rounded-[24px]">
                <Image src="/images/tours/gallery-3.png" alt="" fill sizes="250px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="group relative aspect-square overflow-hidden rounded-[24px]">
                <Image src="/images/tours/gallery-4.jpg" alt="" fill sizes="250px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
