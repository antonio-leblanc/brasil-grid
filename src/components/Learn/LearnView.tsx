import React, { Suspense, lazy } from 'react';
import { ArrowLeft } from 'lucide-react';
import { cn } from '../../utils/cn';
import type { InterchangeId } from '../../data/interchangeData';
import { SECTION_GROUPS, SECTIONS, type SectionId } from './sections';

// Code-splitting keeps these out of the initial map bundle.
const InterchangeSection = lazy(() =>
  import('../Interchange/InterchangeSection').then((m) => ({ default: m.InterchangeSection }))
);
const SimulatorSection = lazy(() =>
  import('../Simulator/SimulatorSection').then((m) => ({ default: m.SimulatorSection }))
);
const ValueChainSection = lazy(() =>
  import('../EnergyChain/ValueChainSection').then((m) => ({ default: m.ValueChainSection }))
);
const SinDossiersSection = lazy(() =>
  import('../Dossiers/SinDossiersSection').then((m) => ({ default: m.SinDossiersSection }))
);
const PriceSection = lazy(() =>
  import('../Market/PriceSection').then((m) => ({ default: m.PriceSection }))
);
const MagnitudeRuler = lazy(() =>
  import('../Scales/MagnitudeRuler').then((m) => ({ default: m.MagnitudeRuler }))
);

const SectionLoadingFallback: React.FC = () => (
  <p className="py-24 text-center text-xs text-slate-500">Carregando…</p>
);

interface LearnViewProps {
  activeSection: SectionId;
  onSelectSection: (id: SectionId) => void;
  onBack: () => void;
  selectedInterchangeId: InterchangeId;
  onSelectInterchange: (id: InterchangeId) => void;
}

export const LearnView: React.FC<LearnViewProps> = ({
  activeSection,
  onSelectSection,
  onBack,
  selectedInterchangeId,
  onSelectInterchange
}) => {
  const currentSection = SECTIONS.find((s) => s.id === activeSection) ?? SECTIONS[0];

  const renderSection = () => {
    switch (currentSection.id) {
      case 'intercambios':
        return <InterchangeSection selectedId={selectedInterchangeId} onSelect={onSelectInterchange} />;
      case 'simulador':
        return <SimulatorSection />;
      case 'cadeia':
        return <ValueChainSection />;
      case 'dossies':
        return <SinDossiersSection />;
      case 'preco':
        return <PriceSection />;
      case 'escalas':
        return <MagnitudeRuler />;
    }
  };

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
        <nav className="w-12 sm:w-52 shrink-0 border-r border-slate-800 bg-[#080b11] py-3 px-1.5 sm:px-2 space-y-4 overflow-y-auto">
          {SECTION_GROUPS.map((group) => (
            <div key={group.label} className="space-y-0.5">
              <p className="hidden sm:block px-2.5 pb-1 text-[11px] text-slate-600">{group.label}</p>
              {group.sections.map((section) => {
                const Icon = section.icon;
                const isActive = section.id === currentSection.id;
                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => onSelectSection(section.id)}
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
            </div>
          ))}
        </nav>

        <main className="flex-1 overflow-y-auto">
          <div className={cn('mx-auto px-4 sm:px-8 py-8', currentSection.wide ? 'max-w-5xl' : 'max-w-4xl')}>
            <Suspense fallback={<SectionLoadingFallback />}>{renderSection()}</Suspense>
          </div>
        </main>
      </div>
    </div>
  );
};
