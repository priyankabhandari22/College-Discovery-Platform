'use client';

import { cn } from '@/lib/utils';

interface SliderProps {
  id: string;
  min: number;
  max: number;
  step?: number;
  value: [number, number];
  onValueChange: (value: [number, number]) => void;
  'aria-label'?: string;
}

export function RangeSlider({
  id,
  min,
  max,
  step = 5000,
  value,
  onValueChange,
  'aria-label': ariaLabel,
}: SliderProps) {
  const [minVal, maxVal] = value;

  return (
    <div className="space-y-3" role="group" aria-label={ariaLabel}>
      <div className="flex justify-between text-xs font-medium text-slate-500">
        <span>₹{(minVal / 100000).toFixed(1)}L</span>
        <span>₹{(maxVal / 100000).toFixed(1)}L</span>
      </div>
      <input
        id={`${id}-min`}
        type="range"
        min={min}
        max={max}
        step={step}
        value={minVal}
        onChange={(e) => {
          const next = Math.min(Number(e.target.value), maxVal - step);
          onValueChange([next, maxVal]);
        }}
        className={cn('h-2 w-full cursor-pointer accent-blue-600')}
        aria-label="Minimum fees"
      />
      <input
        id={`${id}-max`}
        type="range"
        min={min}
        max={max}
        step={step}
        value={maxVal}
        onChange={(e) => {
          const next = Math.max(Number(e.target.value), minVal + step);
          onValueChange([minVal, next]);
        }}
        className={cn('h-2 w-full cursor-pointer accent-blue-600')}
        aria-label="Maximum fees"
      />
    </div>
  );
}
