import { create } from "zustand";

/**
 * Lightweight UI state store.
 *
 * ONLY for ephemeral UI state (modals, toggles, active selections).
 * Server data belongs in TanStack Query. Form state belongs in React Hook Form.
 */

type UIState = {
  // Mobile navigation
  isMobileNavOpen: boolean;
  toggleMobileNav: () => void;
  closeMobileNav: () => void;

  // Active conversation (for messaging UI)
  activeConversationId: string | null;
  setActiveConversationId: (id: string | null) => void;
};

export const useUIStore = create<UIState>((set) => ({
  // Mobile navigation
  isMobileNavOpen: false,
  toggleMobileNav: () =>
    set((state) => ({ isMobileNavOpen: !state.isMobileNavOpen })),
  closeMobileNav: () => set({ isMobileNavOpen: false }),

  // Active conversation
  activeConversationId: null,
  setActiveConversationId: (id) => set({ activeConversationId: id }),
}));
