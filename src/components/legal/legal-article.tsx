"use client";

import { motion, type Variants } from "framer-motion";
import { IconShieldCheck, IconCalendar } from "@tabler/icons-react";

export type LegalSection = {
  heading: string;
  paragraphs?: string[];
  list?: string[];
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export default function LegalArticle({
  intro,
  effectiveDate,
  sections,
}: {
  intro: string;
  effectiveDate: string;
  sections: LegalSection[];
}) {
  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="container-content">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap items-center gap-3"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-navy/[0.06] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-navy">
              <IconShieldCheck className="size-4" stroke={1.8} />
              Legal
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#a1a1a1]">
              <IconCalendar className="size-3.5" stroke={1.8} />
              Effective {effectiveDate}
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-6 text-lg leading-relaxed text-[#515151]"
          >
            {intro}
          </motion.p>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
            className="mt-10 space-y-10"
          >
            {sections.map((s, idx) => (
              <motion.article
                key={s.heading}
                variants={item}
                className="relative rounded-3xl border border-black/[0.06] bg-white p-7 shadow-[0_18px_50px_-32px_rgba(0,28,142,0.25)] transition-shadow duration-300 hover:shadow-[0_24px_60px_-28px_rgba(0,28,142,0.35)] sm:p-8"
              >
                <span
                  aria-hidden
                  className="absolute -left-3 top-7 grid size-8 place-items-center rounded-xl bg-gradient-to-br from-primary to-amber-soft text-xs font-semibold text-black shadow-[0_8px_20px_-8px_rgba(254,188,18,0.9)] sm:-left-4"
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h2 className="text-xl font-semibold text-[#373737] sm:text-2xl">
                  {s.heading}
                </h2>
                {s.paragraphs?.map((p, i) => (
                  <p key={i} className="mt-3 text-base leading-[1.85] text-[#6e6e6e]">
                    {p}
                  </p>
                ))}
                {s.list && (
                  <ul className="mt-4 space-y-2.5">
                    {s.list.map((li, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-base leading-[1.7] text-[#6e6e6e]">
                        <span
                          aria-hidden
                          className="mt-2 inline-block size-1.5 shrink-0 rounded-full bg-primary"
                        />
                        {li}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.article>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            className="mt-12 text-center text-sm text-[#a1a1a1]"
          >
            Questions? Reach out to us at{" "}
            <a
              href="mailto:hello@travelora.app"
              className="font-medium text-navy hover:text-primary-dark"
            >
              hello@travelora.app
            </a>
            .
          </motion.p>
        </div>
      </div>
    </section>
  );
}
