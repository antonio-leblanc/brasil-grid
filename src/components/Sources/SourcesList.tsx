import React from 'react';
import { ExternalLink } from 'lucide-react';
import type { SourceRef } from '../../data/sources';
import { cn } from '../../utils/cn';

interface SourcesListProps {
  sources?: SourceRef[];
  className?: string;
}

export const SourcesList: React.FC<SourcesListProps> = ({ sources, className }) => {
  if (!sources || sources.length === 0) return null;

  return (
    <div className={cn('pt-2 border-t border-slate-800/80 font-mono', className)}>
      <span className="block text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-1">Fontes</span>
      <ul className="space-y-0.5">
        {sources.map((source) => (
          <li key={source.url}>
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-start gap-1 text-[10px] leading-snug text-slate-400 hover:text-cyan-300 transition"
            >
              <ExternalLink className="w-3 h-3 mt-px shrink-0" aria-hidden="true" />
              <span>{source.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
