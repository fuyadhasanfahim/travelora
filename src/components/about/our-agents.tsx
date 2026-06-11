"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import {
  IconBrandFacebookFilled,
  IconBrandInstagram,
  IconBrandLinkedin,
} from "@tabler/icons-react";

const AGENTS = [
  "/images/agents/agent-1.jpg",
  "/images/agents/agent-2.jpg",
  "/images/agents/agent-3.jpg",
  "/images/agents/agent-4.jpg",
];

const grid = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const card: Variants = {
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function OurAgents() {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="container-content">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-navy/[0.06] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-navy">
            <span className="size-1.5 rounded-full bg-primary" />
            Meet the team
          </span>
          <h2 className="mt-4 text-3xl font-semibold text-[#6e6e6e] sm:text-4xl lg:text-[46px]">
            Our Agents
          </h2>
          <p className="mt-3 text-base text-[#8e8e8e] sm:text-lg">
            Explore by your travel style
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={grid}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 lg:mt-14 lg:grid-cols-4 lg:gap-6"
        >
          {AGENTS.map((src, i) => (
            <motion.div
              key={i}
              variants={card}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="group relative aspect-[292/389] overflow-hidden rounded-[28px] shadow-[0_20px_50px_-26px_rgba(0,0,0,0.5)] ring-1 ring-black/5"
            >
              <Image
                src={src}
                alt="Travelora agent"
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              {/* Social overlay on hover */}
              <div className="absolute inset-x-0 bottom-0 flex translate-y-3 items-center justify-center gap-2.5 p-5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                {[IconBrandFacebookFilled, IconBrandInstagram, IconBrandLinkedin].map((Icon, j) => (
                  <span
                    key={j}
                    className="grid size-9 place-items-center rounded-full bg-white/90 text-navy shadow-md backdrop-blur transition-colors hover:bg-primary hover:text-black"
                  >
                    <Icon className="size-[18px]" stroke={1.8} />
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
