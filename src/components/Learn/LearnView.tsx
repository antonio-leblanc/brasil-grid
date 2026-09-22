import React, { Suspense, lazy } from 'react';
import { ArrowLeft, Link2, ArrowRightLeft, Ruler } from 'lucide-react';
import { cn } from '../../utils/cn';

// Code-splitting keeps these out of the initial map bundle.
const ValueChainSection = lazy(() =>
  import('../EnergyChain/ValueChainSection').then((m) => ({ default: m.ValueChainSection }))
);
const AcrAclComparison = lazy(() =>
  import('../Market/AcrAclComparison').then((m) => ({ default: m.AcrAclComparison }))
);
const MagnitudeRuler = lazy(() =>
  import('../Scales/MagnitudeRuler').then((m) => ({ default: m.MagnitudeRuler }))
);

const LEARN_SECTIONS = [
  { id: 'cadeia', label: 'Cadeia de Valor do SEB', icon: Link2 },
  { id: 'mercado', label: 'Mercado ACL x ACR', icon: ArrowRightLeft },
  { id: 'escalas', label: 'Régua de Grandezas', icon: Ruler }
] as const;

const SectionLoadingFallback: React.FC = () => (
  <div className="flex flex-col items-center justify-center py-24 text-slate-500 font-mono text-xs space-y-3">
    <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
    <span className="text-slate-400">CARREGANDO CONTEÚDO...</span>
  </div>
);

interface LearnViewProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onBack: () => void;
}

export const LearnView: React.FC<LearnViewProps> = ({ activeTab, setActiveTab, onBack }) => {
  const currentSection = LEARN_SECTIONS.find((s) => s.id === activeTab) ?? LEARN_SECTIONS[0];

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-[#07090e] text-slate-100 font-sans">
      {/* Header — deliberately distinct from the SCADA console chrome */}
      <header className="h-14 shrink-0 bg-[#080b11]/90 backdrop-blur-md border-b border-slate-800/90 flex items-center justify-between px-3 sm:px-4">
        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg border border-slate-800 bg-slate-900 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/50 transition text-xs font-mono"
            title="Voltar ao mapa do SIN"
            aria-label="Voltar ao mapa"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline font-semibold">MAPA</span>
          </button>
          <div className="flex items-center space-x-2">
            <span className="font-mono font-black text-sm tracking-wider text-white">BRASIL-GRID</span>
            <span className="text-slate-600 font-mono text-xs">/</span>
            <span className="text-[11px] font-mono text-emerald-400 hidden md:inline">GUIA</span>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-hidden flex">
        {/* Section nav */}
        <nav className="w-16 sm:w-56 shrink-0 border-r border-slate-800/90 bg-[#090c13]/95 py-4 px-2 sm:px-3 space-y-1 overflow-y-auto">
          {LEARN_SECTIONS.map((section) => {
            const Icon = section.icon;
            const isActive = section.id === activeTab;
            return (
              <button
                key={section.id}
                type="button"
                onClick={() => setActiveTab(section.id)}
                className={cn(
                  'w-full flex items-center space-x-2.5 px-2.5 py-2.5 rounded-lg transition text-left cursor-pointer',
                  isActive
                    ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/40'
                    : 'text-slate-400 border border-transparent hover:text-white hover:bg-slate-900'
                )}
                aria-label={section.label}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="hidden sm:inline text-xs font-mono font-semibold">{section.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Reading content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-5 sm:px-8 py-10">
            <Suspense fallback={<SectionLoadingFallback />}>
              {currentSection.id === 'cadeia' && <ValueChainSection />}
              {currentSection.id === 'mercado' && <AcrAclComparison />}
              {currentSection.id === 'escalas' && <MagnitudeRuler />}
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  );
};
