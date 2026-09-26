import React, { useState } from 'react';
import { energyChainStages } from '../../data/energyChainData';
import { SourcesList } from '../Sources/SourcesList';
import { Zap, ArrowRight, Building2, TrendingUp, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const ValueChainSection: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('comercializacao');

  const activeStage = energyChainStages.find((s) => s.id === selectedId) || energyChainStages[3];

  return (
    <section className="space-y-8">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
          <Zap className="w-3.5 h-3.5" />
          <span>CADEIA DE VALOR DO SETOR ELÉTRICO BRASILEIRO (SEB)</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide font-mono uppercase">
          Arquitetura Operativa & Regulatória
        </h2>
        <p className="text-xs font-mono text-slate-400">
          Quatro elos funcionais: limites físicos de tensão, governança (ANEEL/ONS) e liquidação contábil CCEE.
        </p>
      </div>

      {/* 4 Interactive Process Steps */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {energyChainStages.map((stage) => {
          const isSelected = stage.id === selectedId;
          const badgeText =
            stage.id === 'geracao'
              ? 'ATÉ 500 kV'
              : stage.id === 'transmissao'
              ? '230 a ±800 kV'
              : stage.id === 'distribuicao'
              ? '13,8 kV a 127 V'
              : 'CONTRATOS & MCP';

          return (
            <div
              key={stage.id}
              onClick={() => setSelectedId(stage.id)}
              className={`cursor-pointer rounded-xl p-5 border transition-all relative overflow-hidden ${
                isSelected
                  ? 'bg-slate-900 border-cyan-500/80 shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-500/50'
                  : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80'
              }`}
            >
              {/* Top step number */}
              <div className="flex items-center justify-between mb-3">
                <span className={`font-mono text-2xl font-black ${isSelected ? 'text-cyan-400' : 'text-slate-600'}`}>
                  {stage.number}
                </span>
                <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded ${
                  isSelected ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'bg-slate-800 text-slate-400'
                }`}>
                  {badgeText}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-1 font-mono">{stage.name}</h3>
              <p className="text-xs text-slate-400 line-clamp-2 font-mono">{stage.subtitle}</p>

              {/* Selection indicator pill */}
              <div className="mt-4 flex items-center text-xs font-mono text-cyan-400 font-medium">
                <span>{isSelected ? 'Explorando elo' : 'Clique para auditar'}</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Selected Stage Breakdown */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-2xl">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column: Core Narrative */}
          <div className="flex-1 space-y-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="font-mono text-cyan-400 text-xs px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/40 font-semibold">
                  ELO {activeStage.number} / 04
                </span>
                <span className="text-slate-400 text-xs font-mono bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800">
                  {activeStage.voltage}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 font-mono uppercase">{activeStage.name}</h3>
              <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80 font-mono text-xs sm:text-sm text-slate-300 leading-normal">
                {activeStage.description}
              </div>
            </div>

            {/* Economics & Regulation Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4">
                <div className="flex items-center space-x-2 text-amber-400 text-xs font-mono mb-1.5">
                  <TrendingUp className="w-4 h-4" />
                  <span className="font-bold uppercase">Modelo de Remuneração</span>
                </div>
                <p className="text-xs text-slate-300 leading-normal font-mono">
                  {activeStage.revenueModel}
                </p>
              </div>

              <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4">
                <div className="flex items-center space-x-2 text-cyan-400 text-xs font-mono mb-1.5">
                  <ShieldAlert className="w-4 h-4" />
                  <span className="font-bold uppercase">Regulação & Governança</span>
                </div>
                <p className="text-xs text-slate-300 leading-normal font-mono">
                  {activeStage.regulator}
                </p>
              </div>
            </div>

            {/* Strategic Highlights */}
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">Pontos Estratégicos & Dinâmica Operacional</h4>
              <div className="space-y-2.5">
                {activeStage.highlights.map((h, i) => {
                  const colonIndex = h.indexOf(':');
                  return (
                    <div key={i} className="flex items-start space-x-2.5 text-xs text-slate-300 font-mono">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      {colonIndex !== -1 ? (
                        <span className="leading-normal">
                          <strong className="text-white font-semibold">{h.slice(0, colonIndex)}:</strong>
                          {h.slice(colonIndex + 1)}
                        </span>
                      ) : (
                        <span className="leading-normal">{h}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Key Metrics & Companies */}
          <div className="w-full lg:w-80 space-y-6">
            {/* Key Metrics */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 space-y-4">
              <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider">Métricas do Elo</h4>
              <div className="grid grid-cols-2 gap-3">
                {activeStage.keyMetrics.map((m, i) => (
                  <div key={i} className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800/50">
                    <span className="text-[10px] font-mono text-slate-400 block">{m.label}</span>
                    <strong className="text-sm sm:text-base font-mono text-white font-bold">{m.value}</strong>
                  </div>
                ))}
              </div>
            </div>

            {/* Players in Brazil */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center">
                  <Building2 className="w-3.5 h-3.5 mr-1.5 text-cyan-400" />
                  Players no Brasil
                </h4>
              </div>

              <div className="space-y-2">
                {activeStage.mainCompanies.map((c, i) => (
                  <div key={i} className="p-2 rounded-lg bg-slate-900/60 border border-slate-800/60 flex flex-col font-mono">
                    <span className="text-xs font-bold text-white">{c.name}</span>
                    <span className="text-[10px] text-slate-400">{c.tag}</span>
                  </div>
                ))}
              </div>
            </div>

            <SourcesList sources={activeStage.sources} />
          </div>
        </div>
      </div>
    </section>
  );
};
