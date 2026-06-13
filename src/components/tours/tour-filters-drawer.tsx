"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconX, IconFilter } from "@tabler/icons-react";
import { useUIStore } from "@/stores/ui-store";
import TourFiltersPanel, {
  useActiveFilterCount,
  useClearAllFilters,
} from "./tour-filters-panel";

/**
 * Mobile/tablet filter drawer. Slides in from the right with a backdrop.
 * URL search params drive the filter state (same source of truth as the
 * desktop sidebar) so closing the drawer is purely a UI concern.
 */
export default function TourFiltersDrawer() {
  const open = useUIStore((s) => s.filterDrawerOpen);
  const setOpen = useUIStore((s) => s.setFilterDrawer);
  const close = () => setOpen(false);

  const count = useActiveFilterCount();
  const clearAll = useClearAllFilters();

  // Lock body scroll while open; close on ESC.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="filter-drawer-root"
          className="fixed inset-0 z-[70] lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          aria-modal="true"
          role="dialog"
          aria-label="Filter tours"
        >
          {/* Backdrop — outside click closes */}
          <motion.button
            type="button"
            aria-label="Close filters"
            onClick={close}
            className="absolute inset-0 bg-navy/55 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Panel — slides in from the right */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="absolute right-0 top-0 flex h-full w-[min(420px,100%)] flex-col bg-white shadow-[0_30px_60px_-12px_rgba(0,0,0,0.45)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-3 border-b border-black/[0.07] px-5 py-4 sm:px-6">
              <div className="flex items-center gap-2.5">
                <span className="grid size-10 place-items-center rounded-xl bg-navy/[0.06] text-navy">
                  <IconFilter className="size-5" stroke={1.8} />
                </span>
                <div>
                  <h2 className="text-base font-semibold text-ink">Filters</h2>
                  {count > 0 && (
                    <p className="text-xs text-[#8e8e8e]">
                      {count} active filter{count === 1 ? "" : "s"}
                    </p>
                  )}
                </div>
              </div>
              <button
                type="button"
                aria-label="Close filters"
                onClick={close}
                className="grid size-10 place-items-center rounded-full text-ink/60 transition-colors hover:bg-black/[0.05] hover:text-ink"
              >
                <IconX className="size-5" stroke={2} />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto px-5 pb-4 sm:px-6">
              <TourFiltersPanel />
            </div>

            {/* Sticky footer */}
            <div className="flex items-center gap-3 border-t border-black/[0.07] bg-white px-5 py-3 sm:px-6">
              <button
                type="button"
                onClick={() => {
                  clearAll();
                }}
                disabled={count === 0}
                className="rounded-full px-4 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-navy/[0.05] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Clear all
              </button>
              <button
                type="button"
                onClick={close}
                className="ml-auto flex-1 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-black shadow-[0_10px_24px_-10px_rgba(254,188,18,0.9)] transition-all hover:-translate-y-0.5 hover:bg-primary-dark"
              >
                Show results
              </button>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
