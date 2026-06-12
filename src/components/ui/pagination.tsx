"use client";

import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

export default function Pagination({
  total = 10,
  current = 1,
}: {
  total?: number;
  current?: number;
}) {
  const pages = Array.from({ length: total }, (_, i) => i + 1);
  const box = "grid size-11 shrink-0 place-items-center rounded-xl text-base font-medium transition-all";

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <button
        type="button"
        aria-label="Previous page"
        className={`${box} bg-amber-soft text-black hover:bg-primary-dark`}
      >
        <IconChevronLeft className="size-5" stroke={2.4} />
      </button>

      {pages.map((n) => (
        <button
          key={n}
          type="button"
          className={`${box} ${
            n === current
              ? "bg-amber-soft text-black shadow-[0_8px_18px_-8px_rgba(255,183,31,0.9)]"
              : "border border-black/10 bg-white text-ink hover:border-amber-soft hover:text-primary-dark"
          }`}
        >
          {n}
        </button>
      ))}

      <button
        type="button"
        aria-label="Next page"
        className={`${box} bg-amber-soft text-black hover:bg-primary-dark`}
      >
        <IconChevronRight className="size-5" stroke={2.4} />
      </button>
    </div>
  );
}
