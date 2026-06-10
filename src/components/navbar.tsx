"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { IconArrowRight } from "@tabler/icons-react";

// Primary navigation
const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Tour Package", href: "/tours" },
  { label: "Booking", href: "/payment" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const lastY = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const goingDown = latest > lastY.current;
    // Hide when scrolling down past the hero area, reveal when scrolling up
    if (!open && goingDown && latest > 160) {
      setHidden(true);
    } else if (latest < lastY.current || latest <= 160) {
      setHidden(false);
    }
    setScrolled(latest > 10);
    lastY.current = latest;
  });

  // Close the mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <motion.header
      variants={{ visible: { y: 0 }, hidden: { y: "-110%" } }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
        scrolled || open
          ? "border-b border-white/40 bg-white/70 shadow-[0_8px_30px_rgba(0,0,0,0.07)] backdrop-blur-xl"
          : "bg-white/25 backdrop-blur-md"
      }`}
    >
      <div className="container-content flex h-20 items-center justify-between gap-6">
        <Link href="/" aria-label="Travelora home" className="shrink-0">
          <Image
            src="/brand/logo.svg"
            alt="Travelora"
            width={227}
            height={40}
            priority
            className="h-8 w-auto sm:h-9 lg:h-10"
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`group relative py-1 text-[15px] font-medium transition-colors hover:text-navy ${
                  active ? "text-navy" : "text-ink"
                }`}
              >
                {link.label}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-0.5 left-0 right-0 h-0.5 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="absolute -bottom-0.5 left-1/2 right-1/2 h-0.5 rounded-full bg-primary/40 transition-all duration-300 group-hover:left-0 group-hover:right-0" />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/tours"
            className="group hidden items-center gap-2 rounded-full bg-primary px-6 py-3 text-[15px] font-medium text-black shadow-[0_10px_24px_rgba(254,188,18,0.4)] transition-all hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-[0_14px_28px_rgba(254,188,18,0.55)] sm:inline-flex"
          >
            Book a Tour
            <IconArrowRight
              className="size-4 transition-transform group-hover:translate-x-0.5"
              stroke={2}
            />
          </Link>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid size-11 place-items-center rounded-full text-ink transition-colors hover:bg-black/5 lg:hidden"
          >
            <Burger open={open} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden lg:hidden"
          >
            <div className="container-content flex flex-col gap-1 pb-5 pt-1">
              {NAV_LINKS.map((link) => {
                const active = isActive(pathname, link.href);
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`rounded-xl px-3 py-3 text-base font-medium transition-colors ${
                      active
                        ? "bg-primary/15 text-navy"
                        : "text-ink hover:bg-black/5"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Link
                href="/tours"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3.5 text-base font-medium text-black shadow-[0_10px_24px_rgba(254,188,18,0.4)] transition-colors hover:bg-primary-dark"
              >
                Book a Tour
                <IconArrowRight className="size-4" stroke={2} />
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function Burger({ open }: { open: boolean }) {
  return (
    <div className="relative h-4 w-5">
      <span
        className={`absolute left-0 block h-0.5 w-5 bg-ink transition-all duration-300 ${
          open ? "top-1.5 rotate-45" : "top-0"
        }`}
      />
      <span
        className={`absolute left-0 top-1.5 block h-0.5 w-5 bg-ink transition-all duration-300 ${
          open ? "opacity-0" : "opacity-100"
        }`}
      />
      <span
        className={`absolute left-0 block h-0.5 w-5 bg-ink transition-all duration-300 ${
          open ? "top-1.5 -rotate-45" : "top-3"
        }`}
      />
    </div>
  );
}
