import React from 'react';
import { cn } from '../../utils/cn';

export interface FilterButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  colorScheme?: 'cyan' | 'amber' | 'emerald';
  icon?: React.ComponentType<{ className?: string }>;
  badge?: string | number;
}

export const FilterButton: React.FC<FilterButtonProps> = ({
  active = false,
  colorScheme = 'cyan',
  icon: Icon,
  badge,
  children,
  className,
  ...props
}) => {
  const activeStyles: Record<string, string> = {
    cyan: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 font-bold shadow-sm shadow-cyan-500/10',
    amber: 'bg-amber-500/20 text-amber-300 border-amber-500/50 font-bold shadow-sm shadow-amber-500/10',
    emerald: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 font-bold shadow-sm shadow-emerald-500/10'
  };

  return (
    <button
      type="button"
      className={cn(
        'py-1.5 px-2 rounded border text-center transition-all cursor-pointer font-mono select-none flex items-center justify-center space-x-1',
        active
          ? activeStyles[colorScheme]
          : 'bg-slate-900/90 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 hover:bg-slate-800/80',
        className
      )}
      {...props}
    >
      {Icon && <Icon className="w-3 h-3 shrink-0" />}
      <span className="truncate">{children}</span>
      {badge !== undefined && (
        <span className="ml-1 text-[9px] px-1 rounded bg-slate-800 text-slate-400 border border-slate-700">
          {badge}
        </span>
      )}
    </button>
  );
};
