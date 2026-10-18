import React from 'react';
import { cn } from '../../utils/cn';

export interface SegmentOption<T extends string | number> {
  value: T;
  label: React.ReactNode;
}

interface SegmentedControlProps<T extends string | number> {
  options: SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
  optionClassName?: string;
  children?: React.ReactNode;
}

const segmentClass = (active: boolean) =>
  cn(
    'px-2.5 py-1 rounded text-xs transition-colors cursor-pointer',
    active ? 'bg-slate-800 text-slate-100' : 'text-slate-500 hover:text-slate-200'
  );

export function SegmentedControl<T extends string | number>({
  options,
  value,
  onChange,
  className,
  optionClassName,
  children
}: SegmentedControlProps<T>) {
  return (
    <div className={cn('inline-flex flex-wrap items-center gap-0.5 rounded-md border border-slate-800 p-0.5', className)}>
      {children}
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={cn(segmentClass(option.value === value), optionClassName)}
          aria-pressed={option.value === value}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
