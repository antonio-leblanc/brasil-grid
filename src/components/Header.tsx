import React from 'react';
import { Activity, Zap, Shield } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'mapa', label: '01. Mapa do SIN', icon: Zap },
    { id: 'cadeia', label: '02. Cadeia de Valor', icon: Activity },
    { id: 'mercado', label: '03. Mercado (ACR × ACL)', icon: Shield },
    { id: 'escalas', label: '04. Régua de Grandezas', icon: Zap }
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#080b11]/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-amber-500 p-0.5 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <div className="w-full h-full bg-[#080b11] rounded-[7px] flex items-center justify-center">
                <Zap className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg tracking-wider text-white font-mono">BRASIL GRID</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-mono">
                  SIN v1.0
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Sistema Interligado Nacional & Mercado de Energia
              </p>
            </div>
          </div>

          {/* Telemetry pill */}
          <div className="hidden lg:flex items-center space-x-4 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-xs font-mono">
            <span className="flex items-center text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse mr-2"></span>
              ONS DESPACHO ATIVO
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-300">MATRIZ RENOVÁVEL: <strong className="text-cyan-400">&gt;84%</strong></span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-300">PICO SIN: <strong className="text-amber-400">~105 GW</strong></span>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/40 shadow-sm shadow-cyan-500/10'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 mr-1.5 opacity-80" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
};
