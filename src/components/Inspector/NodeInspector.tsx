import React, { useState } from 'react';
import type { PowerPlantFeature, TransmissionLineFeature } from '../../data/gridData';
import { SourcesList } from '../Sources/SourcesList';
import { ArrowLeft, Link2, X } from 'lucide-react';

interface NodeInspectorProps {
  plant: PowerPlantFeature | null;
  line: TransmissionLineFeature | null;
  onBack: () => void;
  onClose: () => void;
}

const PLANT_TYPE_LABEL: Record<PowerPlantFeature['type'], { code: string; color: string }> = {
  hidro: { code: 'UHE', color: 'bg-sky-400' },
  solar: { code: 'UFV', color: 'bg-amber-400' },
  eolica: { code: 'EOL', color: 'bg-emerald-400' },
  nuclear: { code: 'UTN', color: 'bg-orange-500' },
  termica: { code: 'UTE', color: 'bg-rose-500' }
};

const Field: React.FC<{ label: string; children: React.ReactNode; stacked?: boolean }> = ({
  label,
  children,
  stacked = false
}) =>
  stacked ? (
    <div className="py-2">
      <dt className="text-[11px] text-slate-500">{label}</dt>
      <dd className="mt-0.5 text-xs text-slate-200 leading-relaxed">{children}</dd>
    </div>
  ) : (
    <div className="py-2 flex items-baseline justify-between gap-4">
      <dt className="text-xs text-slate-500 shrink-0">{label}</dt>
      <dd className="text-xs text-slate-200 text-right">{children}</dd>
    </div>
  );

const Num: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="font-mono tabular-nums">{children}</span>
);

const UnverifiedNote = () => (
  <p
    className="mt-2 text-[11px] text-amber-400"
    title="Dados cadastrais aguardando auditoria de link profundo com fonte primária"
  >
    Não auditada: aguardando fonte primária
  </p>
);

export const NodeInspector: React.FC<NodeInspectorProps> = ({ plant, line, onBack, onClose }) => {
  const [isCopied, setIsCopied] = useState(false);

  if (!plant && !line) return null;

  const handleShare = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      });
    }
  };

  const iconButton =
    'p-1 rounded-md text-slate-500 hover:text-slate-200 hover:bg-slate-900 transition-colors cursor-pointer';

  return (
    <div className="h-full flex flex-col">
      <div className="h-10 px-2 border-b border-slate-800 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="h-7 px-2 rounded-md flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-100 hover:bg-slate-900 transition-colors cursor-pointer"
          aria-label="Voltar para a lista"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Voltar
        </button>
        <div className="flex items-center gap-1">
          {isCopied && <span className="text-[11px] text-slate-400 mr-1">Copiado</span>}
          <button type="button" onClick={handleShare} className={iconButton} aria-label="Copiar link direto para este ativo">
            <Link2 className="w-4 h-4" />
          </button>
          <button type="button" onClick={onClose} className={iconButton} aria-label="Fechar painel">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        {plant && (
          <>
            <h2 className="text-base font-semibold text-slate-100 leading-snug">{plant.name}</h2>
            <p className="mt-1 flex items-center gap-2 text-xs text-slate-400">
              <span className={`w-2 h-2 rounded-full ${PLANT_TYPE_LABEL[plant.type].color}`} />
              {PLANT_TYPE_LABEL[plant.type].code} · {plant.state} · Subsistema {plant.subsystem}
            </p>
            {plant.verification === 'unverified' && <UnverifiedNote />}

            <dl className="mt-4 divide-y divide-slate-800/70 border-y border-slate-800/70">
              <Field label="Potência outorgada">
                <Num>{plant.capacityMW.toLocaleString('pt-BR')} MW</Num>
              </Field>
              <Field label="Operador">{plant.operator}</Field>
              <Field label="Rio / região">{plant.riverOrRegion}</Field>
              {plant.technicalDetails?.commissionYear && (
                <Field label="Comissionamento">
                  <Num>{plant.technicalDetails.commissionYear}</Num>
                </Field>
              )}
              {plant.technicalDetails?.gridConnectionVoltage && (
                <Field label="Tensão de conexão">
                  <Num>{plant.technicalDetails.gridConnectionVoltage}</Num>
                </Field>
              )}
              {plant.technicalDetails?.turbinesOrUnits && (
                <Field label="Unidades geradoras" stacked>
                  {plant.technicalDetails.turbinesOrUnits}
                </Field>
              )}
              {plant.technicalDetails?.flowOrEfficiency && (
                <Field label="Vazão / queda" stacked>
                  {plant.technicalDetails.flowOrEfficiency}
                </Field>
              )}
            </dl>

            <p className="mt-4 text-xs text-slate-300 leading-relaxed">{plant.description}</p>
            <SourcesList sources={plant.sources} className="mt-5" />
          </>
        )}

        {line && (
          <>
            <h2 className="text-base font-semibold text-slate-100 leading-snug">{line.name}</h2>
            <p className="mt-1 text-xs text-slate-400">
              <Num>{line.voltageKV} kV</Num> · {line.type === 'CC' ? 'Corrente contínua (HVDC)' : 'Corrente alternada'}
            </p>
            {line.verification === 'unverified' && <UnverifiedNote />}

            <dl className="mt-4 divide-y divide-slate-800/70 border-y border-slate-800/70">
              <Field label="Extensão">
                <Num>{line.lengthKm.toLocaleString('pt-BR')} km</Num>
              </Field>
              <Field label="Origem">{line.from}</Field>
              <Field label="Destino">{line.to}</Field>
              <Field label="Concessionária">{line.concessionaire}</Field>
              {line.technicalDetails?.towerCount && (
                <Field label="Torres">
                  <Num>{line.technicalDetails.towerCount.toLocaleString('pt-BR')}</Num>
                </Field>
              )}
              {line.technicalDetails?.converterTechnology && (
                <Field label="Tecnologia" stacked>
                  {line.technicalDetails.converterTechnology}
                </Field>
              )}
              {line.technicalDetails?.substations && (
                <Field label="Subestações" stacked>
                  {line.technicalDetails.substations.join(' → ')}
                </Field>
              )}
            </dl>

            <SourcesList sources={line.sources} className="mt-5" />
          </>
        )}
      </div>
    </div>
  );
};
