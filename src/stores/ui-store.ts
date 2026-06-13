/**
 * Zustand UI store — UI/client-only state. NEVER server data.
 */
import { create } from "zustand";

type UIState = {
  mobileMenuOpen: boolean;
  searchModalOpen: boolean;
  filterDrawerOpen: boolean;
  setMobileMenu: (v: boolean) => void;
  setSearchModal: (v: boolean) => void;
  setFilterDrawer: (v: boolean) => void;
  toggle: (key: "mobileMenuOpen" | "searchModalOpen" | "filterDrawerOpen") => void;
};

export const useUIStore = create<UIState>((set) => ({
  mobileMenuOpen: false,
  searchModalOpen: false,
  filterDrawerOpen: false,
  setMobileMenu: (mobileMenuOpen) => set({ mobileMenuOpen }),
  setSearchModal: (searchModalOpen) => set({ searchModalOpen }),
  setFilterDrawer: (filterDrawerOpen) => set({ filterDrawerOpen }),
  toggle: (key) => set((s) => ({ [key]: !s[key] }) as Partial<UIState>),
}));
