import React from 'react';
import { ExternalLink, Zap } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800 bg-[#06080d] py-12 text-slate-400 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-800/80">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-cyan-400" />
              <span className="font-bold text-lg tracking-wider text-white font-mono">BRASIL GRID</span>
            </div>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              Exploração visual, topológica e de mercado do Sistema Interligado Nacional (SIN) e do Setor Elétrico Brasileiro (SEB).
            </p>
          </div>

          {/* Institutional Data Sources Links */}
          <div className="flex flex-wrap gap-4 text-xs font-mono">
            <a
              href="https://www.ons.org.br"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-slate-400 hover:text-cyan-400 transition"
            >
              <span>ONS (Operador)</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://www.ccee.org.br"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-slate-400 hover:text-cyan-400 transition"
            >
              <span>CCEE (Mercado)</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://www.gov.br/aneel"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-slate-400 hover:text-cyan-400 transition"
            >
              <span>ANEEL (Regulação)</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://www.epe.gov.br"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-slate-400 hover:text-cyan-400 transition"
            >
              <span>EPE (Pesquisa)</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div className="flex items-center space-x-2">
            <span>Desenvolvido por</span>
            <strong className="text-slate-300">Antonio Leblanc</strong>
            <span>• Projeto Open Source (MIT)</span>
          </div>

          <div className="flex items-center space-x-4">
            <span>Stack: MapLibre GL • Vite • React • Tailwind</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
