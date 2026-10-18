import React, { Suspense, lazy } from 'react';
import { ArrowLeft, Link2, BookOpen, Ruler } from 'lucide-react';
import { cn } from '../../utils/cn';

// Code-splitting keeps these out of the initial map bundle.
const ValueChainSection = lazy(() =>
  import('../EnergyChain/ValueChainSection').then((m) => ({ default: m.ValueChainSection }))
);
const SinDossiersSection = lazy(() =>
  import('../Dossiers/SinDossiersSection').then((m) => ({ default: m.SinDossiersSection }))
);
const MagnitudeRuler = lazy(() =>
  import('../Scales/MagnitudeRuler').then((m) => ({ default: m.MagnitudeRuler }))
);

const LEARN_SECTIONS = [
  { id: 'cadeia', label: 'Cadeia de valor do SEB', icon: Link2 },
  { id: 'dossies', label: 'Dossiês do SIN', icon: BookOpen },
  { id: 'escalas', label: 'Régua de grandezas', icon: Ruler }
] as const;

const SectionLoadingFallback: React.FC = () => (
  <p className="py-24 text-center text-xs text-slate-500">Carregando…</p>
);

interface LearnViewProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onBack: () => void;
}

export const LearnView: React.FC<LearnViewProps> = ({ activeTab, setActiveTab, onBack }) => {
  const effectiveTab = activeTab === 'mercado' ? 'dossies' : activeTab;
  const currentSection = LEARN_SECTIONS.find((s) => s.id === effectiveTab) ?? LEARN_SECTIONS[0];

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-[#07090e] text-slate-100 font-sans">
      <header className="h-11 shrink-0 bg-[#080b11] border-b border-slate-800 flex items-center gap-2 px-2 sm:px-3">
        <button
          type="button"
          onClick={onBack}
          className="h-7 px-2 rounded-md flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-100 hover:bg-slate-900 transition-colors cursor-pointer"
          aria-label="Voltar ao mapa"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Mapa</span>
        </button>
        <span className="text-sm font-semibold text-slate-100">brasil-grid</span>
        <span className="text-xs text-slate-500">Guia</span>
      </header>

      <div className="flex-1 overflow-hidden flex">
        <nav className="w-12 sm:w-52 shrink-0 border-r border-slate-800 bg-[#080b11] py-3 px-1.5 sm:px-2 space-y-0.5 overflow-y-auto">
          {LEARN_SECTIONS.map((section) => {
            const Icon = section.icon;
            const isActive = section.id === effectiveTab;
            return (
              <button
                key={section.id}
                type="button"
                onClick={() => setActiveTab(section.id)}
                className={cn(
                  'w-full h-8 flex items-center gap-2.5 px-2.5 rounded-md text-left text-xs transition-colors cursor-pointer',
                  isActive ? 'bg-slate-900 text-slate-100' : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/60'
                )}
                aria-label={section.label}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon className={cn('w-3.5 h-3.5 shrink-0', isActive && 'text-cyan-300')} />
                <span className="hidden sm:inline">{section.label}</span>
              </button>
            );
          })}
        </nav>

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8">
            <Suspense fallback={<SectionLoadingFallback />}>
              {currentSection.id === 'cadeia' && <ValueChainSection />}
              {currentSection.id === 'dossies' && <SinDossiersSection />}
              {currentSection.id === 'escalas' && <MagnitudeRuler />}
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  );
};
