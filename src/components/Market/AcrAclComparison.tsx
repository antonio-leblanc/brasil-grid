import React, { useState } from 'react';
import { marketComparisonData, tyrEnergySpotlight } from '../../data/marketData';
import { ShieldCheck, ArrowRightLeft, Sparkles, Building, Clock, Cpu } from 'lucide-react';

export const AcrAclComparison: React.FC = () => {
  const [activeView, setActiveView] = useState<'table' | 'spotlight'>('table');

  return (
    <section className="space-y-8">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono">
          <ArrowRightLeft className="w-3.5 h-3.5" />
          <span>ESTRUTURA DE MERCADO & REGULAÇÃO</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          ACR (Mercado Cativo) vs. ACL (Mercado Livre)
        </h2>
        <p className="text-sm sm:text-base text-slate-400">
          A maior transformação do setor elétrico brasileiro em décadas: a migração gradual de milhões de consumidores para o Ambiente Livre, reduzindo custos e impulsionando a telemetria inteligente.
        </p>
      </div>

      {/* Switcher Tabs */}
      <div className="flex justify-center">
        <div className="bg-slate-900 p-1 rounded-lg border border-slate-800 flex space-x-1 text-xs sm:text-sm font-mono">
          <button
            onClick={() => setActiveView('table')}
            className={`px-4 py-1.5 rounded-md transition ${
              activeView === 'table'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            📊 Matriz Comparativa (ACR × ACL)
          </button>
          <button
            onClick={() => setActiveView('spotlight')}
            className={`px-4 py-1.5 rounded-md flex items-center transition ${
              activeView === 'spotlight'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
            ⚡ Caso Tyr Energia & Smart Meters
          </button>
        </div>
      </div>

      {activeView === 'table' ? (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden backdrop-blur-md shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/60 font-mono text-xs text-slate-400">
                  <th className="p-4 sm:p-5 w-1/4">DIMENSÃO</th>
                  <th className="p-4 sm:p-5 w-5/12 text-slate-300">
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-slate-500"></span>
                      <strong className="text-white">ACR — MERCADO REGULADO (CATIVO)</strong>
                    </div>
                  </th>
                  <th className="p-4 sm:p-5 w-5/12 text-cyan-300 bg-cyan-950/20 border-l border-slate-800">
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                      <strong className="text-white">ACL — MERCADO LIVRE (CCEE)</strong>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-xs sm:text-sm">
                {marketComparisonData.map((row, index) => (
                  <tr key={index} className="hover:bg-slate-800/30 transition">
                    <td className="p-4 sm:p-5 font-mono text-slate-300 bg-slate-950/30 font-medium">
                      {row.aspect}
                      <span className="block text-[11px] font-sans text-slate-500 mt-1 font-normal">
                        {row.importance}
                      </span>
                    </td>
                    <td className="p-4 sm:p-5 text-slate-400 leading-relaxed">
                      {row.acr}
                    </td>
                    <td className="p-4 sm:p-5 text-slate-200 bg-cyan-950/10 border-l border-slate-800/60 leading-relaxed font-medium">
                      {row.acl}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Timeline & Deregulation Banner */}
          <div className="p-5 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
            <div className="flex items-center space-x-3">
              <Clock className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="text-slate-300">
                <strong>CRONOGRAMA DE ABERTURA:</strong> Jan/2024 liberou 100% do Grupo A (alta/média tensão). Abertura para Grupo B (residencial) em consulta pública no MME.
              </span>
            </div>
            <div className="px-3 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 shrink-0">
              Economia média: 15% a 35%
            </div>
          </div>
        </div>
      ) : (
        /* Tyr Energia Case Study & Smart Metering */
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center space-x-3 mb-1">
                <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  ESTUDO DE CASO / RADAR ESTRATÉGICO
                </span>
                <span className="text-xs font-mono text-slate-400">Grupo Mercurio Partners</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {tyrEnergySpotlight.name}
              </h3>
              <p className="text-sm text-slate-400 mt-1">{tyrEnergySpotlight.tagline}</p>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-mono text-slate-300">
              <span className="text-slate-500 block text-[10px]">LIDERANÇA TÉCNICA</span>
              <strong className="text-white text-sm">{tyrEnergySpotlight.foundersTechLead}</strong>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tyrEnergySpotlight.coreDifferentiators.map((diff, i) => (
              <div key={i} className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-5 space-y-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  {i === 0 ? <Cpu className="w-4 h-4" /> : i === 1 ? <Building className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                </div>
                <h4 className="font-bold text-white text-base leading-tight">{diff.title}</h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">{diff.desc}</p>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30 text-xs sm:text-sm text-cyan-200 flex items-start space-x-3">
            <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block mb-0.5 font-mono">Por que a tecnologia de telemetria é o diferencial crítico?</strong>
              No mercado livre tradicional, a comercializadora apenas manda um boleto com desconto no fim do mês. A Tyr, ao incorporar a tecnologia da <strong>GreenAnt</strong>, monitora a forma de onda, a potência ativa/reativa e detecta anomalias de operação na hora, transformando a venda de energia em uma plataforma contínua de inteligência e software.
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
