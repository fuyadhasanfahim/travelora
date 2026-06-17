'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import {
    IconBrandFacebookFilled,
    IconBrandInstagram,
    IconBrandLinkedin,
    IconPhone,
    IconArrowUp,
} from '@tabler/icons-react';
import NewsletterForm from './home/newsletter-form';

type FooterLink = { label: string; href: string };

const QUICK_MENU: FooterLink[] = [
    { label: 'About Us', href: '/about' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Cookie Policy', href: '/cookies' },
    { label: 'Terms & Conditions', href: '/terms' },
    { label: 'Why shop with us', href: '/why-shop-with-us' },
];
const LEGAL: FooterLink[] = [
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Cookies Policy', href: '/cookies' },
    { label: 'Data Policy', href: '/data-policy' },
    { label: 'Refund Policy', href: '/refund-policy' },
];
const SOCIALS = [
    { icon: IconBrandFacebookFilled, label: 'Facebook' },
    { icon: IconBrandInstagram, label: 'Instagram' },
    { icon: IconBrandLinkedin, label: 'LinkedIn' },
];

const reveal: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

export default function Footer() {
    return (
        // border-t (transparent) prevents margin-collapse so the band's negative
        // margin straddles the top edge instead of dragging the whole footer up.
        <footer className="relative border-t border-transparent bg-[#000a32] text-white">
            {/* Ambient glows + city skyline (clipped to footer) */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <span className="absolute top-32 left-1/2 size-[640px] -translate-x-1/2 rounded-full bg-[#1b2e8a]/30 blur-[120px]" />
                <span className="absolute bottom-24 left-10 size-72 rounded-full bg-primary/10 blur-3xl" />
                <Image
                    src="/images/footer/skyline.png"
                    alt=""
                    width={1442}
                    height={405}
                    aria-hidden
                    className="absolute bottom-0 left-1/2 w-full max-w-[1442px] -translate-x-1/2 select-none"
                />
            </div>

            {/* Top accent hairline */}
            <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-soft/60 to-transparent" />

            <div className="container-content relative">
                {/* ── Newsletter band — simple (Figma), straddles the top edge ── */}
                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.55, ease: 'easeOut' }}
                    className="relative z-20 -mt-[64px] overflow-hidden rounded-[40px] bg-amber-soft px-7 py-7 shadow-[0_30px_60px_-28px_rgba(0,0,0,0.6)] sm:-mt-[72px] sm:px-10"
                >
                    <div className="flex flex-col items-center gap-6 lg:flex-row lg:justify-between lg:gap-10">
                        <h3 className="text-center text-xl font-medium text-white sm:text-2xl lg:text-left">
                            Get updated, subscribe newsletter
                        </h3>
                        <NewsletterForm source="footer" />
                    </div>
                </motion.div>

                {/* ── Footer body ── */}
                <motion.div
                    variants={stagger}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    className="grid gap-10 pb-10 pt-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-8 lg:pt-20"
                >
                    {/* Brand + about */}
                    <motion.div variants={reveal} className="max-w-sm">
                        <Image
                            src="/brand/logo-white.svg"
                            alt="Travelora"
                            width={180}
                            height={32}
                            className="h-8 w-auto"
                            priority
                        />
                        <p className="mt-5 text-[15px] leading-relaxed text-[#c2cdf8]">
                            Vestibulum ante ipsum primis in faucibus orci luctus
                            et ultrices posuere cubilia curae; Proin vel leo id
                            mi sollicitudin tristique vitae sit amet velit.
                            Praesent sit amet semper mauris, eu pulvinar ipsum.
                        </p>
                    </motion.div>

                    <motion.div variants={reveal}>
                        <FooterCol title="Quick Menu" links={QUICK_MENU} />
                    </motion.div>
                    <motion.div variants={reveal}>
                        <FooterCol title="Legal" links={LEGAL} />
                    </motion.div>

                    {/* Follow us */}
                    <motion.div variants={reveal}>
                        <FooterHeading>Follow us</FooterHeading>
                        <div className="mt-5 flex gap-3">
                            {SOCIALS.map((s) => {
                                const Icon = s.icon;
                                return (
                                    <a
                                        key={s.label}
                                        href="#"
                                        aria-label={s.label}
                                        className="grid size-11 place-items-center rounded-xl bg-white/[0.07] text-white ring-1 ring-white/15 transition-all duration-300 hover:-translate-y-1 hover:bg-gradient-to-br hover:from-primary hover:to-amber-soft hover:text-black hover:ring-transparent"
                                    >
                                        <Icon className="size-5" stroke={1.8} />
                                    </a>
                                );
                            })}
                        </div>
                        <div className="mt-6 flex items-center gap-2 text-[#c2cdf8]">
                            <span className="grid size-8 place-items-center rounded-lg bg-white/[0.07] text-amber-soft ring-1 ring-white/15">
                                <IconPhone className="size-4" stroke={1.9} />
                            </span>
                            <span className="text-sm">Call us</span>
                        </div>
                        <a
                            href="tel:2085550112"
                            className="mt-2 block text-xl font-semibold text-amber-soft transition-opacity hover:opacity-80"
                        >
                            (208) 555-0112
                        </a>
                    </motion.div>
                </motion.div>

                {/* Bottom bar */}
                <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 sm:flex-row">
                    <p className="text-sm text-[#c2cdf8]">
                        &copy; {new Date().getFullYear()} Travelora, All Rights Reserved, Design and Develop
                        by{' '}
                        <a
                            href="https://fuyadhasanfahim.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Visit Fuyad Hasan Fahim"
                            className="group relative inline-block font-semibold text-amber-soft transition-colors hover:text-white"
                        >
                            Fuyad Hasan Fahim
                            <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-amber-soft transition-all duration-300 group-hover:w-full group-hover:bg-white" />
                        </a>
                    </p>
                    <button
                        type="button"
                        onClick={() =>
                            window.scrollTo({ top: 0, behavior: 'smooth' })
                        }
                        className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-xs font-medium text-[#c2cdf8] transition-all hover:border-amber-soft/50 hover:text-white"
                    >
                        Back to top
                        <span className="grid size-6 place-items-center rounded-full bg-amber-soft text-black transition-transform group-hover:-translate-y-0.5">
                            <IconArrowUp className="size-3.5" stroke={2.4} />
                        </span>
                    </button>
                </div>
            </div>
        </footer>
    );
}

function FooterHeading({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <h4 className="text-base font-semibold text-amber-soft">
                {children}
            </h4>
            <span className="mt-2 block h-0.5 w-8 rounded-full bg-amber-soft/70" />
        </div>
    );
}

function FooterCol({ title, links }: { title: string; links: FooterLink[] }) {
    return (
        <div>
            <FooterHeading>{title}</FooterHeading>
            <ul className="mt-5 space-y-3">
                {links.map((l) => (
                    <li key={`${title}-${l.label}`}>
                        <Link
                            href={l.href}
                            className="group inline-flex items-center gap-2 text-[15px] text-[#c2cdf8] transition-colors hover:text-white"
                        >
                            <span className="h-px w-0 bg-amber-soft transition-all duration-300 group-hover:w-4" />
                            {l.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
