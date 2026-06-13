"use client";

import { motion } from "framer-motion";
import { IconAdjustmentsHorizontal } from "@tabler/icons-react";
import { useUIStore } from "@/stores/ui-store";
import { useActiveFilterCount } from "./tour-filters-panel";

/**
 * Floating action button — bottom-right on mobile/tablet only.
 * Opens the filter drawer. Active filter count appears as a badge.
 */
export default function FilterFab() {
  const open = useUIStore((s) => s.setFilterDrawer);
  const count = useActiveFilterCount();
  return (
    <motion.button
      type="button"
      onClick={() => open(true)}
      aria-label={
        count > 0 ? `Open filters (${count} active)` : "Open filters"
      }
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileTap={{ scale: 0.94 }}
      className="fixed bottom-5 right-4 z-40 inline-flex items-center gap-2 rounded-full bg-navy px-5 py-3.5 text-sm font-semibold text-white shadow-[0_18px_40px_-10px_rgba(0,28,142,0.55)] transition-colors hover:bg-navy/90 lg:hidden"
    >
      <IconAdjustmentsHorizontal className="size-5" stroke={2} />
      Filters
      {count > 0 && (
        <span className="grid min-w-[1.25rem] place-items-center rounded-full bg-primary px-1.5 text-[11px] font-semibold text-black">
          {count}
        </span>
      )}
    </motion.button>
  );
}
