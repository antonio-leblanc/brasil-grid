import React from 'react';
import { cn } from '../../utils/cn';

export interface FilterButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
}

export const FilterButton: React.FC<FilterButtonProps> = ({
  active = false,
  icon: Icon,
  children,
  className,
  ...props
}) => (
  <button
    type="button"
    aria-pressed={active}
    className={cn(
      'h-7 px-2 rounded-md text-xs transition-colors cursor-pointer select-none flex items-center justify-center gap-1.5',
      active
        ? 'bg-slate-800 text-slate-100'
        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900',
      className
    )}
    {...props}
  >
    {Icon && <Icon className="w-3.5 h-3.5 shrink-0" />}
    <span className="truncate">{children}</span>
  </button>
);
