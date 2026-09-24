import React, { useState } from 'react';
import type { PowerPlantFeature, TransmissionLineFeature } from '../../data/gridData';
import { SourcesList } from '../Sources/SourcesList';
import { X, Share2, Check } from 'lucide-react';

interface NodeInspectorProps {
  plant: PowerPlantFeature | null;
  line: TransmissionLineFeature | null;
  onClose: () => void;
}

export const NodeInspector: React.FC<NodeInspectorProps> = ({ plant, line, onClose }) => {
  const [isCopied, setIsCopied] = useState(false);

  if (!plant && !line) return null;

  const handleShare = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2200);
      });
    }
  };

  return (
    <aside className="w-88 sm:w-96 bg-[#0a0d14]/95 backdrop-blur-xl border-l border-slate-800/90 h-full flex flex-col shadow-2xl z-30 animate-in slide-in-from-right duration-200">
      {/* Top Header Bar */}
      <div className="p-4 border-b border-slate-800/80 flex items-center justify-between bg-slate-950/40">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
          <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider font-semibold">
            {plant ? `TELEMETRIA // NÓ GERADOR` : `CIRCUITO // LINHA DE TRANSMISSÃO`}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleShare}
            className={`px-2 py-1 rounded transition font-mono text-xs flex items-center space-x-1.5 border ${
              isCopied
                ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
            }`}
            title="Copiar link direto para este ativo"
          >
            {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-cyan-400" />}
            <span className="text-[10px] tracking-wide">{isCopied ? 'COPIADO!' : 'COMPARTILHAR'}</span>
          </button>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition font-mono text-xs flex items-center"
            title="Fechar inspetor"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Inspector Body */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6 text-slate-300 font-sans">
        {plant && (
          <>
            <div>
              <span className="text-[10px] font-mono text-slate-500 uppercase">IDENTIFICADOR DO ATIVO</span>
              <h2 className="text-xl font-bold text-white leading-tight mt-0.5">{plant.name}</h2>
              <div className="flex items-center space-x-2 mt-2">
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-mono uppercase font-bold">
                  {plant.type}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {plant.state} — Subsistema {plant.subsystem}
                </span>
              </div>
            </div>

            {/* Core Specs Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="bg-slate-900/80 border border-slate-800/80 p-3 rounded-lg">
                <span className="text-slate-500 block text-[10px]">POTÊNCIA OUTORGADA</span>
                <strong className="text-white text-base font-bold">{plant.capacityMW.toLocaleString('pt-BR')} MW</strong>
                <span className="text-cyan-400 block text-[10px] font-bold">({(plant.capacityMW / 1000).toFixed(2)} GW)</span>
              </div>
              <div className="bg-slate-900/80 border border-slate-800/80 p-3 rounded-lg">
                <span className="text-slate-500 block text-[10px]">CONCESSIONÁRIA / OPERADOR</span>
                <strong className="text-slate-200 text-xs truncate block mt-0.5">{plant.operator}</strong>
                <span className="text-slate-500 block text-[10px] truncate">{plant.riverOrRegion}</span>
              </div>
            </div>

            {/* Operational Context */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">ENQUADRAMENTO OPERACIONAL</span>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/50 p-3 rounded-lg border border-slate-800/60 font-sans">
                {plant.description}
              </p>
            </div>

            {/* Deep Technical Specs */}
            {plant.technicalDetails && (
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">FICHA TÉCNICA DE ENGENHARIA</span>
                <div className="bg-slate-950/80 border border-slate-800/80 rounded-lg p-3 space-y-2.5 text-xs font-mono">
                  {plant.technicalDetails.commissionYear && (
                    <div className="flex justify-between border-b border-slate-800/50 pb-1.5">
                      <span className="text-slate-400">Ano de Comissionamento:</span>
                      <strong className="text-white">{plant.technicalDetails.commissionYear}</strong>
                    </div>
                  )}
                  {plant.technicalDetails.turbinesOrUnits && (
                    <div className="border-b border-slate-800/50 pb-1.5">
                      <span className="text-slate-400 block text-[10px]">Conjunto Gerador:</span>
                      <span className="text-slate-200 text-[11px]">{plant.technicalDetails.turbinesOrUnits}</span>
                    </div>
                  )}
                  {plant.technicalDetails.gridConnectionVoltage && (
                    <div className="flex justify-between border-b border-slate-800/50 pb-1.5">
                      <span className="text-slate-400">Tensão de Interligação:</span>
                      <strong className="text-amber-400">{plant.technicalDetails.gridConnectionVoltage}</strong>
                    </div>
                  )}
                  {plant.technicalDetails.flowOrEfficiency && (
                    <div>
                      <span className="text-slate-400 block text-[10px]">Vazão / Queda Hidráulica:</span>
                      <span className="text-slate-300 text-[11px]">{plant.technicalDetails.flowOrEfficiency}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
            <SourcesList sources={plant.sources} />
          </>
        )}

        {line && (
          <>
            <div>
              <span className="text-[10px] font-mono text-slate-500 uppercase">IDENTIFICADOR DO CIRCUITO</span>
              <h2 className="text-xl font-bold text-white leading-tight mt-0.5">{line.name}</h2>
              <div className="flex items-center space-x-2 mt-2">
                <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-mono uppercase font-bold">
                  {line.voltageKV} kV {line.type === 'CC' ? 'UHVDC (Corrente Contínua)' : 'CA (Alternada)'}
                </span>
              </div>
            </div>

            {/* Core Specs Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="bg-slate-900/80 border border-slate-800/80 p-3 rounded-lg">
                <span className="text-slate-500 block text-[10px]">EXTENSÃO FÍSICA</span>
                <strong className="text-cyan-400 text-base font-bold">{line.lengthKm.toLocaleString('pt-BR')} km</strong>
                <span className="text-slate-500 block text-[10px]">Autoestrada Elétrica</span>
              </div>
              <div className="bg-slate-900/80 border border-slate-800/80 p-3 rounded-lg">
                <span className="text-slate-500 block text-[10px]">CONCESSIONÁRIA (RAP)</span>
                <strong className="text-slate-200 text-xs truncate block mt-0.5">{line.concessionaire}</strong>
                <span className="text-emerald-400 block text-[10px]">Concessão ANEEL</span>
              </div>
            </div>

            {/* Routing */}
            <div className="bg-slate-950/70 border border-slate-800/80 rounded-lg p-3 space-y-2 text-xs font-mono">
              <span className="text-[10px] text-slate-500 uppercase block">TERMINAIS DE CONVERSÃO & SUBESTAÇÕES</span>
              <div className="space-y-1">
                <div className="flex items-start space-x-2">
                  <span className="text-emerald-400 font-bold">➔ Origem:</span>
                  <span className="text-slate-200">{line.from}</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-cyan-400 font-bold">➔ Destino:</span>
                  <span className="text-slate-200">{line.to}</span>
                </div>
              </div>
            </div>

            {/* Technical Highlights */}
            {line.technicalDetails && (
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">PARÂMETROS DE TRANSMISSÃO</span>
                <div className="bg-slate-950/80 border border-slate-800/80 rounded-lg p-3 space-y-2 text-xs font-mono">
                  {line.technicalDetails.converterTechnology && (
                    <div className="border-b border-slate-800/50 pb-1.5">
                      <span className="text-slate-400 block text-[10px]">Tecnologia de Transmissão:</span>
                      <span className="text-amber-400 text-xs">{line.technicalDetails.converterTechnology}</span>
                    </div>
                  )}
                  {line.technicalDetails.towerCount && (
                    <div className="flex justify-between border-b border-slate-800/50 pb-1.5">
                      <span className="text-slate-400">Total de Estruturas (Torres):</span>
                      <strong className="text-white">{line.technicalDetails.towerCount.toLocaleString('pt-BR')}</strong>
                    </div>
                  )}
                  {line.technicalDetails.substations && (
                    <div>
                      <span className="text-slate-400 block text-[10px]">Pátios de Subestação:</span>
                      <span className="text-slate-300 text-[11px]">{line.technicalDetails.substations.join(' ➔ ')}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
            <SourcesList sources={line.sources} />
          </>
        )}
      </div>
    </aside>
  );
};
