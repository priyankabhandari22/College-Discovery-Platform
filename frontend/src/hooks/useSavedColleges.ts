'use client';

import { useEffect, useCallback } from 'react';
import { useSavedStore } from '@/stores/useSavedStore';
import { useAuth } from '@/hooks/useAuth';

export function useSavedColleges() {
  const { isLoggedIn } = useAuth();
  const savedIds = useSavedStore((s) => s.savedIds);
  const toggleLocal = useSavedStore((s) => s.toggle);
  const setSavedIds = useSavedStore((s) => s.setSavedIds);

  useEffect(() => {
    if (isLoggedIn) {
      fetch('/api/saved')
        .then((res) => {
          if (!res.ok) throw new Error();
          return res.json();
        })
        .then((data: { collegeId: string }[]) => {
          const ids = data.map((s) => s.collegeId);
          setSavedIds(ids);
        })
        .catch(() => {});
    }
  }, [isLoggedIn, setSavedIds]);

  const toggle = useCallback(
    async (collegeId: string) => {
      toggleLocal(collegeId);
      if (isLoggedIn) {
        const isSaved = savedIds.includes(collegeId);
        if (isSaved) {
          await fetch(`/api/saved/${collegeId}`, { method: 'DELETE' });
        } else {
          await fetch('/api/saved', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ collegeId }),
          });
        }
      }
    },
    [isLoggedIn, savedIds, toggleLocal]
  );

  const isSaved = useCallback(
    (id: string) => savedIds.includes(id),
    [savedIds]
  );

  return { savedIds, toggle, isSaved };
}
