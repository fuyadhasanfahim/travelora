"use client";

import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

type Props = {
  total?: number;
  current?: number;
  onChange?: (page: number) => void;
};

export default function Pagination({ total = 1, current = 1, onChange }: Props) {
  if (total <= 1) return null;

  // Build a compact list with ellipses for large totals
  const items: (number | "…")[] = [];
  const add = (n: number | "…") => items.push(n);
  const window = 1;

  for (let i = 1; i <= total; i++) {
    if (
      i === 1 ||
      i === total ||
      (i >= current - window && i <= current + window)
    ) {
      add(i);
    } else if (items[items.length - 1] !== "…") {
      add("…");
    }
  }

  const go = (n: number) => {
    if (n < 1 || n > total || n === current) return;
    onChange?.(n);
  };

  const box = "grid size-11 shrink-0 place-items-center rounded-xl text-base font-medium transition-all";

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <button
        type="button"
        aria-label="Previous page"
        onClick={() => go(current - 1)}
        disabled={current <= 1}
        className={`${box} ${
          current <= 1
            ? "cursor-not-allowed bg-black/[0.05] text-black/30"
            : "bg-amber-soft text-black hover:bg-primary-dark"
        }`}
      >
        <IconChevronLeft className="size-5" stroke={2.4} />
      </button>

      {items.map((n, i) =>
        n === "…" ? (
          <span key={`e${i}`} className={`${box} text-[#9a9a9a]`}>
            …
          </span>
        ) : (
          <button
            key={n}
            type="button"
            onClick={() => go(n)}
            className={`${box} ${
              n === current
                ? "bg-amber-soft text-black shadow-[0_8px_18px_-8px_rgba(255,183,31,0.9)]"
                : "border border-black/10 bg-white text-ink hover:border-amber-soft hover:text-primary-dark"
            }`}
          >
            {n}
          </button>
        ),
      )}

      <button
        type="button"
        aria-label="Next page"
        onClick={() => go(current + 1)}
        disabled={current >= total}
        className={`${box} ${
          current >= total
            ? "cursor-not-allowed bg-black/[0.05] text-black/30"
            : "bg-amber-soft text-black hover:bg-primary-dark"
        }`}
      >
        <IconChevronRight className="size-5" stroke={2.4} />
      </button>
    </div>
  );
}
