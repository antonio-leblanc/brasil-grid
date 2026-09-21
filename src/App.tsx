import { useState } from 'react';
import { Header } from './components/Header';
import { GridMap } from './components/Map/GridMap';
import { ValueChainSection } from './components/EnergyChain/ValueChainSection';
import { AcrAclComparison } from './components/Market/AcrAclComparison';
import { MagnitudeRuler } from './components/Scales/MagnitudeRuler';
import { Footer } from './components/Footer';
import { subsystems } from './data/gridData';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('mapa');

  return (
    <div className="min-h-screen bg-[#080b11] text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Header with live status */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Hero Section */}
        <section className="text-center max-w-4xl mx-auto space-y-4 pt-4 pb-2">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span>EXPLORADOR GEOESPACIAL E REGULATÓRIO DO SEB</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            A Anatomia do <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-400">Sistema Interligado Nacional</span>
          </h1>

          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Uma imersão visual e interativa na infraestrutura de transmissão, polos geradores limpos e na dinâmica de mercado que abastece 215 milhões de brasileiros.
          </p>

          {/* Core Macro Numbers Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
            <div className="bg-slate-900/70 border border-slate-800/80 rounded-xl p-3.5">
              <span className="text-slate-400 text-[11px] font-mono block">CAPACIDADE TOTAL</span>
              <strong className="text-lg sm:text-xl font-mono text-white font-bold">~205 GW</strong>
              <span className="text-[10px] text-emerald-400 font-mono block mt-0.5">84% Matriz Renovável</span>
            </div>
            <div className="bg-slate-900/70 border border-slate-800/80 rounded-xl p-3.5">
              <span className="text-slate-400 text-[11px] font-mono block">MALHA DE TRANSMISSÃO</span>
              <strong className="text-lg sm:text-xl font-mono text-cyan-400 font-bold">185.000+ km</strong>
              <span className="text-[10px] text-slate-500 font-mono block mt-0.5">230 kV a ±800 kV CC</span>
            </div>
            <div className="bg-slate-900/70 border border-slate-800/80 rounded-xl p-3.5">
              <span className="text-slate-400 text-[11px] font-mono block">RECORDE DE PICO (SIN)</span>
              <strong className="text-lg sm:text-xl font-mono text-amber-400 font-bold">~105 GW</strong>
              <span className="text-[10px] text-slate-500 font-mono block mt-0.5">Demanda instantânea BR</span>
            </div>
            <div className="bg-slate-900/70 border border-slate-800/80 rounded-xl p-3.5">
              <span className="text-slate-400 text-[11px] font-mono block">CONSUMO ANUAL</span>
              <strong className="text-lg sm:text-xl font-mono text-slate-200 font-bold">~540 TWh</strong>
              <span className="text-[10px] text-cyan-400 font-mono block mt-0.5">~40% no Mercado Livre</span>
            </div>
          </div>
        </section>

        {/* Dynamic Content View based on activeTab */}
        {activeTab === 'mapa' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <GridMap />

            {/* Subsystems of SIN Grid Cards */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-mono uppercase text-slate-400 tracking-wider">
                  Os 4 Subsistemas Elétricos do ONS
                </h3>
                <span className="text-xs font-mono text-slate-500">Coordenação e Intercâmbio de Potência</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {subsystems.map((sub) => (
                  <div key={sub.id} className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-lg">{sub.icon}</span>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold">
                        {sub.loadShare} da carga
                      </span>
                    </div>
                    <h4 className="font-bold text-white text-base">{sub.name}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{sub.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cadeia' && (
          <div className="animate-in fade-in duration-300">
            <ValueChainSection />
          </div>
        )}

        {activeTab === 'mercado' && (
          <div className="animate-in fade-in duration-300">
            <AcrAclComparison />
          </div>
        )}

        {activeTab === 'escalas' && (
          <div className="animate-in fade-in duration-300">
            <MagnitudeRuler />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
