import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  Zap,
  ArrowRight,
  AlertTriangle,
  ShieldCheck,
  TrendingUp,
  BarChart2,
  Info,
  Maximize2,
  Minimize2
} from 'lucide-react';
import {
  regionalInterchanges,
  getInterchangeStatus,
  getStatusTheme,
  calculateSubsystemsBalance
} from '../../data/interchangeData';
import type {
  InterchangeId,
  RegionalInterchange
} from '../../data/interchangeData';
import type { NationalTelemetrySnapshot } from '../../services/onsApi';

interface InterchangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  telemetry?: NationalTelemetrySnapshot;
  selectedInterchangeId?: InterchangeId | null;
  onSelectInterchange?: (id: InterchangeId) => void;
}

type ActiveViewTab = 'fronteiras' | 'curvas24h' | 'dossie';

export const InterchangeModal: React.FC<InterchangeModalProps> = ({
  isOpen,
  onClose,
  telemetry,
  selectedInterchangeId: externalSelectedId,
  onSelectInterchange
}) => {
  const [activeTab, setActiveTab] = useState<ActiveViewTab>('fronteiras');
  const [selectedIdState, setSelectedIdState] = useState<InterchangeId>(
    externalSelectedId || 'NE_SECO'
  );
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [hoveredHour, setHoveredHour] = useState<number | null>(null);

  const selectedId = externalSelectedId || selectedIdState;

  // ESC key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const activeInterchange = useMemo<RegionalInterchange>(() => {
    return (
      regionalInterchanges.find((ic) => ic.id === selectedId) ||
      regionalInterchanges[0]
    );
  }, [selectedId]);

  const subsystemsBalance = useMemo(() => {
    return calculateSubsystemsBalance(regionalInterchanges);
  }, []);

  const totalInterchangeMW = useMemo(() => {
    return regionalInterchanges.reduce(
      (sum, ic) => sum + Math.abs(ic.nominalFlowMW),
      0
    );
  }, []);

  const worstStatus = useMemo(() => {
    const statuses = regionalInterchanges.map((ic) =>
      getInterchangeStatus(ic.nominalFlowMW, ic.maxExportLimitMW)
    );
    if (statuses.includes('critical')) return 'critical';
    if (statuses.includes('alert')) return 'alert';
    return 'nominal';
  }, []);

  const worstStatusTheme = getStatusTheme(worstStatus);

  if (!isOpen) return null;

  const handleSelectInterface = (id: InterchangeId) => {
    setSelectedIdState(id);
    if (onSelectInterchange) {
      onSelectInterchange(id);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Controle de Intercâmbios e Gargalos Regionais do SIN"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        className={`bg-[#07090e] border border-slate-800 rounded-2xl shadow-2xl flex flex-col font-mono text-slate-300 overflow-hidden transition-all duration-300 ${
          isFullScreen
            ? 'w-full h-full rounded-none'
            : 'w-full max-w-6xl max-h-[94vh] h-[820px]'
        }`}
      >
        {/* SCADA Header */}
        <header className="px-5 py-4 border-b border-slate-800/90 bg-slate-950/80 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-sm sm:text-base font-bold text-white tracking-wide">
                  INTERCÂMBIOS & LIMITES DE ESCOAMENTO DO SIN
                </h2>
                <span
                  className={`text-[9px] px-2 py-0.5 rounded border uppercase font-bold ${worstStatusTheme.badgeBg} ${worstStatusTheme.badgeBorder} ${worstStatusTheme.badgeText}`}
                >
                  {worstStatusTheme.label}
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Monitoramento de transferências de potência ativa entre
                subsistemas e limites operativos de estabilidade (ONS)
              </p>
            </div>
          </div>

          {/* Quick Metrics & Actions */}
          <div className="flex items-center space-x-3">
            <div className="hidden lg:flex items-center space-x-4 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs">
              <div>
                <span className="text-slate-500 text-[10px] block">
                  FLUXO TOTAL EM TRÂNSITO:
                </span>
                <strong className="text-cyan-400 font-bold">
                  {(totalInterchangeMW / 1000).toFixed(2)} GW
                </strong>
              </div>
              <div className="w-px h-6 bg-slate-800" />
              <div>
                <span className="text-slate-500 text-[10px] block">
                  FONTE DOS DADOS:
                </span>
                <span className="text-emerald-400 font-semibold text-[11px]">
                  {telemetry?.source === 'ONS_LIVE'
                    ? 'ONS API (VIVO)'
                    : 'ONS 2026 (CALIBRADO)'}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsFullScreen(!isFullScreen)}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              title={isFullScreen ? 'Restaurar' : 'Tela cheia'}
              aria-label="Alternar tela cheia"
            >
              {isFullScreen ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-red-400 hover:bg-slate-800 transition cursor-pointer"
              title="Fechar painel (Esc)"
              aria-label="Fechar modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* View Switcher Tabs */}
        <div className="px-5 pt-3 pb-2 bg-slate-950/40 border-b border-slate-800/60 flex items-center justify-between shrink-0">
          <div className="flex space-x-2">
            {[
              { id: 'fronteiras', label: 'Painel SCADA das Fronteiras', icon: ShieldCheck },
              { id: 'curvas24h', label: 'Curvas Diárias de Fluxo 24h', icon: TrendingUp },
              { id: 'dossie', label: 'Dossiê do Gargalo Físico', icon: Info }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as ActiveViewTab)}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="hidden sm:flex items-center space-x-2 text-[11px] text-slate-500">
            <span>Fronteira ativa:</span>
            <span className="text-cyan-400 font-bold">
              {activeInterchange.shortCode}
            </span>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* TAB 1: Painel SCADA das Fronteiras */}
          {activeTab === 'fronteiras' && (
            <div className="space-y-6">
              {/* Balanço Líquido Regional Banner */}
              <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2 text-xs font-bold text-slate-300 uppercase">
                    <BarChart2 className="w-4 h-4 text-cyan-400" />
                    <span>Balanço Líquido Instantâneo por Subsistema</span>
                  </div>
                  <span className="text-[10px] text-slate-500">
                    Soma vetorial das fronteiras de intercâmbio ativas
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {(Object.keys(subsystemsBalance) as (keyof typeof subsystemsBalance)[]).map(
                    (code) => {
                      const item = subsystemsBalance[code];
                      const isExporter = item.netExportMW > 0;
                      return (
                        <div
                          key={code}
                          className="bg-[#090c13] p-3 rounded-lg border border-slate-800/90 flex flex-col justify-between"
                        >
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="font-bold text-white">
                              {item.shortName}
                            </span>
                            <span
                              className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${
                                isExporter
                                  ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                                  : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                              }`}
                            >
                              {item.role === 'EXPORTADOR LÍQUIDO'
                                ? 'EXPORTANDO'
                                : 'IMPORTANDO'}
                            </span>
                          </div>
                          <div className="mt-1 flex items-baseline justify-between">
                            <span className="text-[10px] text-slate-500">
                              Saldo Líquido:
                            </span>
                            <strong
                              className={`text-sm font-bold ${
                                isExporter ? 'text-cyan-400' : 'text-amber-400'
                              }`}
                            >
                              {isExporter ? '+' : ''}
                              {(item.netExportMW / 1000).toFixed(2)} GW
                            </strong>
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>

              {/* Grid das 4 Fronteiras Operativas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {regionalInterchanges.map((ic) => {
                  const isSelected = ic.id === selectedId;
                  const status = getInterchangeStatus(
                    ic.nominalFlowMW,
                    ic.maxExportLimitMW
                  );
                  const theme = getStatusTheme(status);
                  const saturationPct = (
                    (Math.abs(ic.nominalFlowMW) / ic.maxExportLimitMW) *
                    100
                  ).toFixed(1);
                  const marginMW = ic.maxExportLimitMW - Math.abs(ic.nominalFlowMW);

                  return (
                    <div
                      key={ic.id}
                      onClick={() => handleSelectInterface(ic.id)}
                      className={`p-4 rounded-xl border transition cursor-pointer flex flex-col justify-between space-y-4 ${
                        isSelected
                          ? 'bg-slate-900/90 border-cyan-500/60 ring-1 ring-cyan-500/30 shadow-lg'
                          : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-900/50 hover:border-slate-700'
                      }`}
                    >
                      {/* Top info */}
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center space-x-2">
                            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-xs font-bold text-white">
                              {ic.shortCode}
                            </span>
                            <span className="text-xs font-semibold text-slate-200">
                              {ic.name}
                            </span>
                          </div>
                          <span
                            className={`text-[9px] px-1.5 py-0.5 rounded border uppercase font-bold ${theme.badgeBg} ${theme.badgeBorder} ${theme.badgeText}`}
                          >
                            {status}
                          </span>
                        </div>

                        {/* Directions indicator */}
                        <div className="flex items-center space-x-2 text-[11px] text-slate-400 mt-2 bg-slate-900/60 px-2.5 py-1 rounded-md border border-slate-800/80">
                          <span className="text-slate-500">Sentido Ativo:</span>
                          <span className="text-white font-bold flex items-center space-x-1">
                            <span>{ic.fromName}</span>
                            <ArrowRight className="w-3 h-3 text-cyan-400" />
                            <span>{ic.toName}</span>
                          </span>
                          <span className="text-slate-600">|</span>
                          <span className="text-slate-500">
                            {ic.voltageKV.join(' / ')} kV
                          </span>
                        </div>
                      </div>

                      {/* Power metrics */}
                      <div className="space-y-2">
                        <div className="flex items-end justify-between">
                          <div>
                            <span className="text-[10px] text-slate-500 uppercase block">
                              FLUXO OPERATIVO:
                            </span>
                            <span className="text-lg font-bold text-white">
                              {(ic.nominalFlowMW / 1000).toFixed(2)}{' '}
                              <span className="text-xs font-normal text-slate-400">
                                GW
                              </span>
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-[10px] text-slate-500 uppercase block">
                              LIMITE MÁXIMO ONS:
                            </span>
                            <span className="text-sm font-semibold text-slate-300">
                              {(ic.maxExportLimitMW / 1000).toFixed(2)} GW
                            </span>
                          </div>
                        </div>

                        {/* Linear Progress Bar */}
                        <div className="space-y-1">
                          <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800 relative">
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{
                                width: `${Math.min(100, Number(saturationPct))}%`,
                                backgroundColor: theme.color
                              }}
                            />
                            {/* 70% Alert Marker */}
                            <div
                              className="absolute top-0 bottom-0 w-px bg-amber-500/50"
                              style={{ left: '70%' }}
                              title="Alerta: 70%"
                            />
                            {/* 90% Critical Marker */}
                            <div
                              className="absolute top-0 bottom-0 w-px bg-red-500/80"
                              style={{ left: '90%' }}
                              title="Crítico: 90%"
                            />
                          </div>

                          <div className="flex items-center justify-between text-[10px] text-slate-500">
                            <span>
                              Carregamento:{' '}
                              <strong
                                className="font-bold"
                                style={{ color: theme.color }}
                              >
                                {saturationPct}%
                              </strong>
                            </span>
                            <span>
                              Margem Livre:{' '}
                              <strong className="text-slate-300 font-bold">
                                {(marginMW / 1000).toFixed(2)} GW
                              </strong>
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Footer action */}
                      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                        <span className="text-slate-500 truncate max-w-[240px]">
                          {ic.mainLines[0]}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectInterface(ic.id);
                            setActiveTab('dossie');
                          }}
                          className="text-cyan-400 hover:text-cyan-300 flex items-center space-x-1 font-semibold transition cursor-pointer"
                        >
                          <span>Diagnóstico Físico</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: Curvas Diárias de Fluxo 24h (Native SVG Chart) */}
          {activeTab === 'curvas24h' && (
            <div className="space-y-6">
              {/* Interface Selector Buttons */}
              <div className="flex flex-wrap gap-2 items-center justify-between bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                <span className="text-xs font-bold text-slate-400">
                  SELECIONAR FRONTEIRA:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {regionalInterchanges.map((ic) => (
                    <button
                      key={ic.id}
                      onClick={() => handleSelectInterface(ic.id)}
                      className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold transition cursor-pointer ${
                        ic.id === selectedId
                          ? 'bg-cyan-500 text-slate-950 shadow-md font-bold'
                          : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      {ic.shortCode} ({ic.fromName} → {ic.toName})
                    </button>
                  ))}
                </div>
              </div>

              {/* Native SVG 24h Chart Container */}
              <div className="bg-[#090c13] border border-slate-800/90 rounded-xl p-5 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                      <span>{activeInterchange.name}</span>
                      <span className="text-xs text-slate-500 font-normal">
                        ({activeInterchange.shortCode})
                      </span>
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Perfil horário de fluxo ativo vs limites operativos do ONS (24 leituras horárias)
                    </p>
                  </div>

                  <div className="flex items-center space-x-4 text-[11px]">
                    <div className="flex items-center space-x-1.5">
                      <span className="w-3 h-1 bg-cyan-400 rounded-sm" />
                      <span className="text-slate-400">Fluxo Verificado (MW)</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <span className="w-3 h-0.5 border-t border-dashed border-red-400" />
                      <span className="text-slate-400">Limite Máximo ONS</span>
                    </div>
                  </div>
                </div>

                {/* SVG Render */}
                <div className="w-full overflow-x-auto">
                  <div className="min-w-[620px]">
                    <svg
                      viewBox="0 0 800 280"
                      className="w-full h-64 select-none"
                    >
                      {/* Grid background */}
                      <rect x="0" y="0" width="800" height="280" fill="#07090e" />

                      {/* Horizontals */}
                      {[0, 50, 100, 150, 200, 250].map((y) => (
                        <line
                          key={y}
                          x1="50"
                          y1={y + 10}
                          x2="780"
                          y2={y + 10}
                          stroke="#1e293b"
                          strokeDasharray="2 3"
                        />
                      ))}

                      {/* Dynamic Scales */}
                      {(() => {
                        const maxLimit = activeInterchange.maxExportLimitMW;
                        const minLimit = -activeInterchange.maxImportLimitMW;
                        const range = maxLimit - minLimit;

                        const getY = (mw: number) => {
                          const pct = (mw - minLimit) / range;
                          return 260 - pct * 240;
                        };

                        const points = activeInterchange.hourlyProfile24h;
                        const pathD = points
                          .map((p, i) => {
                            const x = 60 + (i / 23) * 710;
                            const y = getY(p.flowMW);
                            return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
                          })
                          .join(' ');

                        const limitY = getY(activeInterchange.maxExportLimitMW);
                        const zeroY = getY(0);

                        return (
                          <>
                            {/* Zero line */}
                            <line
                              x1="50"
                              y1={zeroY}
                              x2="780"
                              y2={zeroY}
                              stroke="#475569"
                              strokeWidth="1.2"
                            />
                            <text
                              x="42"
                              y={zeroY + 3}
                              fill="#64748b"
                              fontSize="9"
                              textAnchor="end"
                              fontFamily="monospace"
                            >
                              0
                            </text>

                            {/* Max Limit Line */}
                            <line
                              x1="50"
                              y1={limitY}
                              x2="780"
                              y2={limitY}
                              stroke="#ef4444"
                              strokeWidth="1.5"
                              strokeDasharray="4 3"
                            />
                            <text
                              x="42"
                              y={limitY + 3}
                              fill="#ef4444"
                              fontSize="9"
                              textAnchor="end"
                              fontFamily="monospace"
                            >
                              {(maxLimit / 1000).toFixed(1)}G
                            </text>

                            {/* Curtailment / Danger Zone shading */}
                            <rect
                              x="60"
                              y={limitY}
                              width="710"
                              height={Math.max(0, limitY - 10)}
                              fill="#ef4444"
                              fillOpacity="0.05"
                            />

                            {/* Flow Curve */}
                            <path
                              d={pathD}
                              fill="none"
                              stroke="#38bdf8"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />

                            {/* Points and hover crosshair */}
                            {points.map((p, i) => {
                              const x = 60 + (i / 23) * 710;
                              const y = getY(p.flowMW);
                              const isHovered = hoveredHour === p.hour;
                              const isOverSat = p.saturationPct >= 90;

                              return (
                                <g
                                  key={p.hour}
                                  onMouseEnter={() => setHoveredHour(p.hour)}
                                  onMouseLeave={() => setHoveredHour(null)}
                                  className="cursor-pointer"
                                >
                                  {/* Vertical tick */}
                                  <line
                                    x1={x}
                                    y1="260"
                                    x2={x}
                                    y2="265"
                                    stroke="#334155"
                                  />
                                  {p.hour % 3 === 0 && (
                                    <text
                                      x={x}
                                      y="276"
                                      fill="#64748b"
                                      fontSize="9"
                                      textAnchor="middle"
                                      fontFamily="monospace"
                                    >
                                      {p.timeLabel}
                                    </text>
                                  )}

                                  {/* Dot */}
                                  <circle
                                    cx={x}
                                    cy={y}
                                    r={isHovered ? 5 : isOverSat ? 3.5 : 2.5}
                                    fill={
                                      isOverSat
                                        ? '#ef4444'
                                        : isHovered
                                        ? '#38bdf8'
                                        : '#0284c7'
                                    }
                                    stroke="#07090e"
                                    strokeWidth="1.5"
                                  />

                                  {/* Hover Guideline & Tooltip */}
                                  {isHovered && (
                                    <>
                                      <line
                                        x1={x}
                                        y1="20"
                                        x2={x}
                                        y2="260"
                                        stroke="#0ea5e9"
                                        strokeDasharray="2 2"
                                        strokeWidth="1"
                                      />
                                      <g transform={`translate(${Math.min(680, Math.max(60, x - 55))}, ${Math.max(25, y - 45)})`}>
                                        <rect
                                          x="0"
                                          y="0"
                                          width="110"
                                          height="38"
                                          rx="5"
                                          fill="#07090e"
                                          stroke="#38bdf8"
                                          strokeWidth="1"
                                        />
                                        <text
                                          x="8"
                                          y="14"
                                          fill="#94a3b8"
                                          fontSize="9"
                                          fontFamily="monospace"
                                        >
                                          {p.timeLabel} • {p.saturationPct}% sat
                                        </text>
                                        <text
                                          x="8"
                                          y="28"
                                          fill="#ffffff"
                                          fontSize="11"
                                          fontWeight="bold"
                                          fontFamily="monospace"
                                        >
                                          {p.flowMW > 0 ? '+' : ''}{p.flowMW} MW
                                        </text>
                                      </g>
                                    </>
                                  )}
                                </g>
                              );
                            })}
                          </>
                        );
                      })()}
                    </svg>
                  </div>
                </div>

                {/* Explanation note */}
                <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800/80 text-[11px] text-slate-400 flex items-start space-x-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <p>
                    <strong>Leitura do Gráfico:</strong> Valores positivos
                    indicam exportação no sentido principal ({activeInterchange.primaryDirection}).
                    Valores negativos indicam fluxo reverso ({activeInterchange.reverseDirection}).
                    Pontos vermelhos acima de 90% configuram risco iminente de
                    corte de geração por gargalo de rede (*curtailment*).
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Dossiê Físico & Regulatório */}
          {activeTab === 'dossie' && (
            <div className="space-y-6">
              {/* Interface Header */}
              <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider block">
                    DOSSIÊ TÉCNICO DE ENGENHARIA ELÉTRICA
                  </span>
                  <h3 className="text-base font-bold text-white mt-0.5">
                    {activeInterchange.name} ({activeInterchange.shortCode})
                  </h3>
                </div>
                <div className="flex items-center space-x-2">
                  {regionalInterchanges.map((ic) => (
                    <button
                      key={ic.id}
                      onClick={() => handleSelectInterface(ic.id)}
                      className={`px-2.5 py-1 rounded text-xs font-mono transition cursor-pointer ${
                        ic.id === selectedId
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 font-bold'
                          : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      {ic.shortCode}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3 Pillars of the Bottleneck */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                {/* 1. Causa Física */}
                <div className="bg-[#090c13] p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center space-x-2 text-amber-400 font-bold uppercase text-[11px]">
                    <AlertTriangle className="w-4 h-4" />
                    <span>1. Causa Física & Elétrica</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-[11px]">
                    {activeInterchange.bottleneck.cause}
                  </p>
                </div>

                {/* 2. Consequências na Operação */}
                <div className="bg-[#090c13] p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center space-x-2 text-red-400 font-bold uppercase text-[11px]">
                    <Zap className="w-4 h-4" />
                    <span>2. Impactos Operativos & Mercado</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-[11px]">
                    {activeInterchange.bottleneck.consequences}
                  </p>
                </div>

                {/* 3. Mitigação & Soluções */}
                <div className="bg-[#090c13] p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center space-x-2 text-emerald-400 font-bold uppercase text-[11px]">
                    <ShieldCheck className="w-4 h-4" />
                    <span>3. Soluções & Engenharia</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-[11px]">
                    {activeInterchange.bottleneck.mitigation}
                  </p>
                </div>
              </div>

              {/* Grid de Linhas Tronco da Fronteira */}
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                  <span>TRONCOS ESTRUTURANTES DESTA INTERFACE</span>
                  <span className="text-slate-500 font-normal">
                    {activeInterchange.bottleneck.technicalStandard}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeInterchange.mainLines.map((line, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800/80 flex items-center space-x-2.5 text-xs text-slate-300"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                      <span className="font-mono">{line}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <footer className="px-5 py-3 border-t border-slate-800/80 bg-slate-950/80 flex items-center justify-between text-xs font-mono text-slate-500 shrink-0">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Topologia ONS 2026 // Critérios de Operação N-1</span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 transition cursor-pointer text-xs font-semibold"
            >
              Fechar
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};
