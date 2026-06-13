"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { IconMapPin, IconPhone, IconMail, IconSend, IconLoader2 } from "@tabler/icons-react";
import type { ComponentType } from "react";
import { contactSchema, type ContactInput } from "@/lib/validation/schemas";
import { useSubmitContact } from "@/lib/query/hooks";

type IconType = ComponentType<{ className?: string; stroke?: number }>;

const INFO: { icon: IconType; label: string; lines: string[] }[] = [
  { icon: IconMapPin, label: "Address", lines: ["4517 Washington Ave. Manchester, Kentucky 39495"] },
  { icon: IconPhone, label: "Phone", lines: ["(208) 555-0112", "(208) 555-0112"] },
  { icon: IconMapPin, label: "Address", lines: ["4517 Washington Ave. Manchester, Kentucky 39495"] },
  { icon: IconMail, label: "Email Address", lines: ["info@travelora.app", "hello@travelora.app"] },
];

const infoCard: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

type FieldProps = {
  label: string;
  placeholder: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

function Field({ label, placeholder, error, ...rest }: FieldProps) {
  return (
    <div>
      <label className="block text-base text-[#616161]">{label}</label>
      <input
        placeholder={placeholder}
        {...rest}
        className={`mt-2 w-full rounded-lg border bg-white px-4 py-3 text-[15px] text-[#373737] placeholder:text-[#c8c6c6] outline-none transition-colors focus:border-navy/50 ${
          error ? "border-rose-400" : "border-[#e4e4e4]"
        }`}
      />
      {error && <p className="mt-1 text-xs text-rose-500">{error}</p>}
    </div>
  );
}

export default function ContactSection() {
  const submit = useSubmitContact();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (values: ContactInput) => {
    try {
      await submit.mutateAsync(values);
      toast.success("Message sent — we'll be in touch shortly.");
      reset();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not send your message");
    }
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="container-content">
        <div className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-navy/[0.06] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-navy">
              <span className="size-1.5 rounded-full bg-primary" />
              Get in Touch
            </span>
            <p className="mt-5 max-w-md text-2xl font-medium leading-snug text-[#6e6e6e]">
              Our mission is to create memories that last a lifetime for every traveler who chooses us.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-3">
              <div className="relative col-span-1 aspect-[187/259] overflow-hidden rounded-2xl">
                <Image src="/images/contact/img-1.png" alt="" fill sizes="200px" className="object-cover" />
              </div>
              <div className="relative col-span-2 aspect-[397/259] overflow-hidden rounded-2xl">
                <Image src="/images/contact/img-2.png" alt="" fill sizes="400px" className="object-cover" />
              </div>
              <div className="relative col-span-3 aspect-[608/336] overflow-hidden rounded-2xl">
                <Image src="/images/contact/img-3.png" alt="" fill sizes="600px" className="object-cover" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col rounded-[28px] border border-black/[0.06] bg-white p-7 shadow-[0_18px_50px_-32px_rgba(0,0,0,0.35)] sm:p-9"
          >
            <h2 className="text-3xl font-semibold text-[#6e6e6e]">Leave us a message</h2>
            <p className="mt-2 text-lg font-medium text-[#a1a1a1]">Feel free to ask anything to us</p>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 flex flex-1 flex-col">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field label="Name" placeholder="Your Name" {...register("name")} error={errors.name?.message} />
                <Field label="Email" placeholder="Email address" type="email" {...register("email")} error={errors.email?.message} />
                <div className="sm:col-span-2">
                  <Field label="Subject" placeholder="Your Subject" {...register("subject")} error={errors.subject?.message} />
                </div>
              </div>
              <div className="mt-5 flex flex-1 flex-col">
                <label className="block text-base text-[#616161]">Message</label>
                <textarea
                  placeholder="Your Message"
                  {...register("message")}
                  className={`mt-2 min-h-[160px] w-full flex-1 resize-none rounded-lg border bg-white px-4 py-3 text-[15px] text-[#373737] placeholder:text-[#c8c6c6] outline-none transition-colors focus:border-navy/50 ${
                    errors.message ? "border-rose-400" : "border-[#e4e4e4]"
                  }`}
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-rose-500">{errors.message.message}</p>
                )}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-black shadow-[0_14px_30px_-12px_rgba(254,188,18,0.9)] transition-all hover:-translate-y-0.5 hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <IconLoader2 className="size-5 animate-spin" stroke={2} />
                      Sending…
                    </>
                  ) : (
                    <>
                      <IconSend className="size-5" stroke={1.9} />
                      Send Message
                    </>
                  )}
                </button>
                <a href="#" className="text-sm font-medium text-amber-soft hover:underline">
                  Need some help?
                </a>
              </div>
            </form>
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.1 }}
          className="mt-8 grid gap-4 sm:grid-cols-2 lg:mt-10 lg:grid-cols-4"
        >
          {INFO.map((it, i) => {
            const Icon = it.icon;
            return (
              <motion.div
                key={i}
                variants={infoCard}
                className="flex gap-4 rounded-2xl border border-black/[0.06] bg-white p-5 shadow-[0_12px_35px_-26px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_45px_-26px_rgba(0,28,142,0.4)]"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-navy/[0.06] text-navy">
                  <Icon className="size-5" stroke={1.7} />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-[#8e8e8e]">{it.label}</p>
                  {it.lines.map((l, idx) => (
                    <p key={idx} className="mt-0.5 break-words text-sm text-[#a1a1a1]">{l}</p>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
