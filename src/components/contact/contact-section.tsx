"use client";

import { motion, Variants } from "framer-motion";
import { IconMapPin, IconPhone, IconMail, IconSend } from "@tabler/icons-react";
import type { ComponentType } from "react";

type IconType = ComponentType<{ className?: string; stroke?: number }>;

const INFO: { icon: IconType; label: string; lines: string[] }[] = [
  { icon: IconMapPin, label: "Address", lines: ["4517 Washington Ave. Manchester, Kentucky 39495"] },
  { icon: IconPhone, label: "Phone", lines: ["(208) 555-0112", "(208) 555-0112"] },
  { icon: IconMail, label: "Email Address", lines: ["info@yoursite.com", "hello@yoursite.com"] },
];

const card: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div>
      <label className="block text-base text-[#616161]">{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        className="mt-2 w-full rounded-lg border border-[#e4e4e4] bg-white px-4 py-3 text-[15px] text-[#373737] placeholder:text-[#c8c6c6] outline-none transition-colors focus:border-navy/50"
      />
    </div>
  );
}

export default function ContactSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="container-content">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Left: form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="rounded-[28px] border border-black/[0.06] bg-white p-7 shadow-[0_18px_50px_-32px_rgba(0,0,0,0.35)] sm:p-9"
          >
            <h2 className="text-3xl font-semibold text-[#6e6e6e]">Leave us a message</h2>
            <p className="mt-2 text-lg font-medium text-[#a1a1a1]">Feel free to ask anything to us</p>

            <form onSubmit={(e) => e.preventDefault()} className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field label="Name" placeholder="Your Name" />
              <Field label="Email" placeholder="Email address" />
              <div className="sm:col-span-2">
                <Field label="Subject" placeholder="Your Subject" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-base text-[#616161]">Message</label>
                <textarea
                  rows={5}
                  placeholder="Your Message"
                  className="mt-2 w-full resize-none rounded-lg border border-[#e4e4e4] bg-white px-4 py-3 text-[15px] text-[#373737] placeholder:text-[#c8c6c6] outline-none transition-colors focus:border-navy/50"
                />
              </div>
            </form>

            <button
              type="button"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-black shadow-[0_14px_30px_-12px_rgba(254,188,18,0.9)] transition-all hover:-translate-y-0.5 hover:bg-primary-dark"
            >
              <IconSend className="size-5" stroke={1.9} />
              Book Now
            </button>
          </motion.div>

          {/* Right: get in touch + info */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-navy/[0.06] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-navy">
                <span className="size-1.5 rounded-full bg-primary" />
                Get in Touch
              </span>
              <p className="mt-5 text-2xl font-medium leading-snug text-[#6e6e6e]">
                Our mission is to create memories that last a lifetime for every
                traveler who chooses us.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ staggerChildren: 0.1 }}
              className="mt-8 grid gap-4 sm:grid-cols-2"
            >
              {INFO.map((it) => {
                const Icon = it.icon;
                return (
                  <motion.div
                    key={it.label}
                    variants={card}
                    className="flex gap-4 rounded-2xl border border-black/[0.06] bg-white p-5 shadow-[0_12px_35px_-26px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_45px_-26px_rgba(0,28,142,0.4)]"
                  >
                    <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-navy/[0.06] text-navy">
                      <Icon className="size-6" stroke={1.7} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-base font-medium text-[#8e8e8e]">{it.label}</p>
                      {it.lines.map((l) => (
                        <p key={l} className="mt-0.5 break-words text-sm text-[#a1a1a1]">{l}</p>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
