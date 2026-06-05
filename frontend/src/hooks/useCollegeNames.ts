'use client';

import { useEffect, useState } from 'react';
import { getCollegesByIds } from '@/lib/data-service';

/**
 * Given a list of college IDs, returns a map of id → name.
 * Fetches all colleges in a single batch request.
 */
export function useCollegeNames(ids: string[]): Record<string, string> {
  const [names, setNames] = useState<Record<string, string>>({});

  useEffect(() => {
    if (ids.length === 0) {
      setNames({});
      return;
    }

    let cancelled = false;

    const fetchAll = async () => {
      try {
        const colleges = await getCollegesByIds(ids);
        if (!cancelled) {
          setNames(
            Object.fromEntries(colleges.map((c) => [c.id, c.name]))
          );
        }
      } catch {
        // IDs as fallback; don't crash
      }
    };

    fetchAll();
    return () => { cancelled = true; };
  }, [ids.join(',')]);

  return names;
}
