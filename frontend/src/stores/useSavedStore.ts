'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SavedState {
  savedIds: string[];
  toggle: (id: string) => void;
  isSaved: (id: string) => boolean;
  clear: () => void;
  setSavedIds: (ids: string[]) => void;
}

export const useSavedStore = create<SavedState>()(
  persist(
    (set, get) => ({
      savedIds: [],

      toggle: (id) => {
        const { savedIds } = get();
        if (savedIds.includes(id)) {
          set({ savedIds: savedIds.filter((x) => x !== id) });
        } else {
          set({ savedIds: [...savedIds, id] });
        }
      },

      isSaved: (id) => get().savedIds.includes(id),

      clear: () => set({ savedIds: [] }),
      setSavedIds: (ids) => set({ savedIds: ids }),
    }),
    { name: 'edutrack-saved-colleges' }
  )
);
