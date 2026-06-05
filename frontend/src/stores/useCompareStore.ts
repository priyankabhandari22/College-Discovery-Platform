'use client';

import { create } from 'zustand';

const MAX_COMPARE = 2;

interface CompareStoreState {
  selectedIds: string[];
  add: (id: string) => void;
  remove: (id: string) => void;
  toggle: (id: string) => void;
  clear: () => void;
  isSelected: (id: string) => boolean;
  canAdd: (id: string) => boolean;
}

// Safely read from sessionStorage (SSR-safe)
function readSession(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = sessionStorage.getItem('edutrack_compare_ids');
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function writeSession(ids: string[]): void {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem('edutrack_compare_ids', JSON.stringify(ids));
  } catch {
    // ignore quota errors silently
  }
}

export const useCompareStore = create<CompareStoreState>((set, get) => ({
  // Initialise from sessionStorage if available; falls back to [] on SSR
  selectedIds: readSession(),

  add: (id) => {
    const { selectedIds } = get();
    if (selectedIds.includes(id) || selectedIds.length >= MAX_COMPARE) return;
    const next = [...selectedIds, id];
    writeSession(next);
    set({ selectedIds: next });
  },

  remove: (id) => {
    const next = get().selectedIds.filter((x) => x !== id);
    writeSession(next);
    set({ selectedIds: next });
  },

  toggle: (id) => {
    const { selectedIds } = get();
    if (selectedIds.includes(id)) {
      get().remove(id);
    } else if (selectedIds.length < MAX_COMPARE) {
      get().add(id);
    }
  },

  clear: () => {
    writeSession([]);
    set({ selectedIds: [] });
  },

  isSelected: (id) => get().selectedIds.includes(id),

  canAdd: (id) => {
    const { selectedIds } = get();
    return selectedIds.includes(id) || selectedIds.length < MAX_COMPARE;
  },
}));

export const MAX_COMPARE_COLLEGES = MAX_COMPARE;
