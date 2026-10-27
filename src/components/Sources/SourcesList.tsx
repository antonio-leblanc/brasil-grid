import React from 'react';
import { ExternalLink } from 'lucide-react';
import type { SourceRef } from '../../data/sources';
import { cn } from '../../utils/cn';
import { useI18n } from '../../i18n/context';

interface SourcesListProps {
  sources?: SourceRef[];
  className?: string;
}

export const SourcesList: React.FC<SourcesListProps> = ({ sources, className }) => {
  const { t } = useI18n();
  if (!sources || sources.length === 0) return null;

  return (
    <div className={cn('pt-3 border-t border-slate-800/70', className)}>
      <span className="block text-[11px] text-slate-500 mb-1.5">{t.sources.title}</span>
      <ul className="space-y-1">
        {sources.map((source) => (
          <li key={source.url}>
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-start gap-1.5 text-[11px] leading-snug text-slate-400 hover:text-slate-100 transition-colors"
            >
              <ExternalLink className="w-3 h-3 mt-px shrink-0" aria-hidden="true" />
              <span>
                {source.label}
                {source.accessedAt && (
                  <span className="text-slate-600 ml-1 font-mono tabular-nums">{source.accessedAt}</span>
                )}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
