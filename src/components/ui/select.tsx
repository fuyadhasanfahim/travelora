"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type ComponentType,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconCheck, IconChevronDown } from "@tabler/icons-react";

export type SelectOption = { label: string; value: string };

type IconType = ComponentType<{ className?: string; stroke?: number }>;

type SelectProps = {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  /** Small caption rendered above the trigger (e.g. "Destination"). */
  label?: string;
  /** Leading Tabler icon component. */
  icon?: IconType;
  className?: string;
};

/**
 * Premium, fully-custom select used across the marketing site.
 * Accessible (keyboard + outside-click + Esc), animated, and brand-styled.
 * Works controlled (`value`) or uncontrolled (`defaultValue`).
 */
export default function Select({
  options,
  value,
  defaultValue,
  onChange,
  placeholder = "Select",
  label,
  icon: Icon,
  className,
}: SelectProps) {
  const id = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [internal, setInternal] = useState<string | undefined>(defaultValue);

  const selected = value ?? internal;
  const selectedOption = options.find((o) => o.value === selected);

  // Close on outside click / Escape.
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const choose = (val: string) => {
    if (value === undefined) setInternal(val);
    onChange?.(val);
    setOpen(false);
  };

  return (
    <div ref={rootRef} className={`relative ${className ?? ""}`}>
      <button
        type="button"
        id={id}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={`group flex w-full items-center gap-2.5 rounded-2xl border bg-white px-4 py-3 text-left shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-200 hover:shadow-[0_8px_20px_-12px_rgba(0,28,142,0.35)] ${
          open ? "border-navy/40 ring-4 ring-navy/5" : "border-black/[0.08]"
        }`}
      >
        {Icon && (
          <span
            className={`grid size-9 shrink-0 place-items-center rounded-xl transition-colors ${
              open
                ? "bg-navy text-white"
                : "bg-navy/[0.06] text-navy group-hover:bg-navy/10"
            }`}
          >
            <Icon className="size-[18px]" stroke={1.7} />
          </span>
        )}
        <span className="min-w-0 flex-1">
          {label && (
            <span className="block text-[11px] font-medium uppercase tracking-wide text-[#a8a8a8]">
              {label}
            </span>
          )}
          <span
            className={`block truncate text-sm font-medium ${
              selectedOption ? "text-ink" : "text-[#9a9a9a]"
            }`}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </span>
        <IconChevronDown
          className={`size-4 shrink-0 text-ink/45 transition-transform duration-300 ${
            open ? "rotate-180 text-navy" : ""
          }`}
          stroke={2}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            aria-labelledby={id}
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="absolute z-30 mt-2 max-h-72 w-full min-w-[14rem] overflow-auto rounded-2xl border border-black/[0.06] bg-white p-1.5 shadow-[0_24px_50px_-20px_rgba(0,0,0,0.3)] [scrollbar-width:thin]"
          >
            {options.map((o) => {
              const active = o.value === selected;
              return (
                <li key={o.value} role="option" aria-selected={active}>
                  <button
                    type="button"
                    onClick={() => choose(o.value)}
                    className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                      active
                        ? "bg-navy/[0.06] font-medium text-navy"
                        : "text-ink/80 hover:bg-black/[0.035]"
                    }`}
                  >
                    <span className="truncate">{o.label}</span>
                    {active && (
                      <IconCheck className="size-4 shrink-0 text-navy" stroke={2.4} />
                    )}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
