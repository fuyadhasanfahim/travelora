"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  IconBrandFacebookFilled,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconPhone,
} from "@tabler/icons-react";

const QUICK_MENU = ["About Us", "Privacy Policy", "Cookie Policy", "Terms & Conditions", "Why shop with us"];
const LEGAL = ["Terms of Service", "Privacy Policy", "Cookies Policy", "Data Policy", "Refund Policy"];
const SOCIALS = [
  { icon: IconBrandFacebookFilled, label: "Facebook" },
  { icon: IconBrandInstagram, label: "Instagram" },
  { icon: IconBrandLinkedin, label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#000a32] text-white">
      {/* Skyline silhouette */}
      <Image
        src="/images/footer/skyline.png"
        alt=""
        width={1442}
        height={405}
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 w-full max-w-[1442px] -translate-x-1/2 select-none opacity-[0.06]"
      />

      <div className="container-content relative">
        {/* Newsletter band */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5 }}
          className="-mt-16 flex flex-col items-center gap-6 rounded-[40px] bg-amber-soft px-7 py-8 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.5)] sm:px-12 lg:flex-row lg:justify-between lg:gap-8"
        >
          <h3 className="text-center text-xl font-medium text-white sm:text-2xl lg:text-left">
            Get updated, subscribe newsletter
          </h3>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex w-full max-w-md items-center gap-2 rounded-full bg-white p-1.5 shadow-sm"
          >
            <input
              type="email"
              placeholder="Your mail address"
              aria-label="Your mail address"
              className="min-w-0 flex-1 bg-transparent px-4 text-sm text-ink placeholder:text-[#c5c5c5] outline-none"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-navy px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-navy/90"
            >
              Subscribe
            </button>
          </form>
        </motion.div>

        {/* Footer body */}
        <div className="grid gap-10 pb-10 pt-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-8 lg:pt-20">
          {/* Brand + about */}
          <div className="max-w-sm">
            <Image src="/brand/logo-white.svg" alt="Travelora" width={170} height={30} className="h-8 w-auto" />
            <p className="mt-5 text-[15px] leading-relaxed text-[#c2cdf8]">
              Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
              posuere cubilia curae; Proin vel leo id mi sollicitudin tristique
              vitae sit amet velit. Praesent sit amet semper mauris, eu pulvinar
              ipsum.
            </p>
          </div>

          {/* Quick Menu */}
          <FooterCol title="Quick Menu" links={QUICK_MENU} />
          {/* Legal */}
          <FooterCol title="Legal" links={LEGAL} />

          {/* Follow us */}
          <div>
            <h4 className="text-base font-semibold text-amber-soft">Follow us</h4>
            <div className="mt-5 flex gap-3">
              {SOCIALS.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href="#"
                    aria-label={s.label}
                    className="grid size-10 place-items-center rounded-xl bg-white/10 text-white ring-1 ring-white/15 transition-colors hover:bg-amber-soft hover:text-black"
                  >
                    <Icon className="size-5" stroke={1.8} />
                  </a>
                );
              })}
            </div>
            <div className="mt-6 flex items-center gap-2 text-[#c2cdf8]">
              <IconPhone className="size-5" stroke={1.8} />
              <span className="text-sm">Call us</span>
            </div>
            <a href="tel:2085550112" className="mt-1 block text-base font-semibold text-amber-soft">
              (208) 555-0112
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 py-6 text-center">
          <p className="text-sm text-[#c2cdf8]">
            ©2026 Travelora, All Rights Reserved, Design and Develop by Webbriks
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h4 className="text-base font-semibold text-amber-soft">{title}</h4>
      <ul className="mt-5 space-y-3">
        {links.map((l) => (
          <li key={l}>
            <a
              href="#"
              className="text-[15px] text-[#c2cdf8] transition-colors hover:text-white"
            >
              {l}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
