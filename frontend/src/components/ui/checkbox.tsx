import * as React from 'react';
import { cn } from '@/lib/utils';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, id, ...props }, ref) => (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        ref={ref}
        id={id}
        className={cn(
          'h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600',
          className
        )}
        {...props}
      />
      {label && (
        <label htmlFor={id} className="text-sm text-slate-600 cursor-pointer">
          {label}
        </label>
      )}
    </div>
  )
);
Checkbox.displayName = 'Checkbox';
