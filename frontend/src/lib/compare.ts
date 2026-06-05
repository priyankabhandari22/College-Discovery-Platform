export interface CompareRow {
  key: string;
  label: string;
  format: 'currency' | 'percent' | 'text' | 'rating' | 'boolean';
  higherIsBetter: boolean;
}

export type Winner = 'a' | 'b' | 'tie';

/**
 * Determine which college "wins" a row.
 * For numeric rows, applies higherIsBetter logic.
 * For text/boolean rows, always returns 'tie'.
 */
export function getWinner(row: CompareRow, valA: unknown, valB: unknown): Winner {
  if (row.format === 'text' || row.format === 'boolean') return 'tie';

  const a = typeof valA === 'number' ? valA : parseFloat(String(valA));
  const b = typeof valB === 'number' ? valB : parseFloat(String(valB));

  if (isNaN(a) || isNaN(b)) return 'tie';
  if (a === b) return 'tie';

  const aWins = row.higherIsBetter ? a > b : a < b;
  return aWins ? 'a' : 'b';
}

/** Tailwind class for winning cell */
export const winnerClass = 'bg-green-50 text-green-800 font-bold';
/** Tailwind class for losing cell */
export const loserClass = 'bg-red-50 text-red-700';

export function getCellClass(winner: Winner, side: 'a' | 'b'): string {
  if (winner === 'tie') return '';
  return winner === side ? winnerClass : loserClass;
}

/** All compare rows in display order */
export const COMPARE_ROWS: CompareRow[] = [
  // ── Location info ────────────────────────────────────────────────
  { key: 'location',          label: 'Location',          format: 'text',     higherIsBetter: false },
  { key: 'fees',              label: 'Annual Fees',        format: 'currency', higherIsBetter: false },
  { key: 'accreditation',     label: 'NAAC / Accreditation', format: 'text',  higherIsBetter: false },
  { key: 'stream',            label: 'Ownership / Type',  format: 'text',     higherIsBetter: false },
  { key: 'established',       label: 'Founded',            format: 'text',     higherIsBetter: false },

  // ── Placements ───────────────────────────────────────────────────
  { key: 'avgCTC',            label: 'Avg CTC',            format: 'currency', higherIsBetter: true  },
  { key: 'highestCTC',        label: 'Highest CTC',        format: 'currency', higherIsBetter: true  },
  { key: 'placementPct',      label: '% Placed',           format: 'percent',  higherIsBetter: true  },
  { key: 'topRecruiters',     label: 'Top Recruiters',     format: 'text',     higherIsBetter: false },

  // ── Courses / Eligibility ─────────────────────────────────────────
  { key: 'courseCount',       label: 'Total Courses',      format: 'text',     higherIsBetter: false },
  { key: 'jeeCutoff',         label: 'JEE Accepted',       format: 'boolean',  higherIsBetter: false },
  { key: 'mhtCetCutoff',      label: 'MHT-CET Accepted',   format: 'boolean',  higherIsBetter: false },

  // ── Ratings ──────────────────────────────────────────────────────
  { key: 'rating',            label: 'Overall Rating',     format: 'rating',   higherIsBetter: true  },
  { key: 'faculty',           label: 'Faculty',            format: 'rating',   higherIsBetter: true  },
  { key: 'infrastructure',    label: 'Infrastructure',     format: 'rating',   higherIsBetter: true  },
  { key: 'placements',        label: 'Placements Rating',  format: 'rating',   higherIsBetter: true  },
];
