import React from 'react';
import { useI18n } from '../../i18n/context';
import type { Lang } from '../../i18n/language';
import type { InterchangeStatus } from '../../data/interchangeData';

export type InterchangeView = 'fronteiras' | 'curva' | 'dossie';

const PT = {
  title: 'Intercâmbios',
  intro: 'Potência ativa entre subsistemas contra o limite operativo do ONS. Em trânsito agora:',
  snapshotNote: 'Snapshot de referência, não telemetria em tempo real.',
  views: { fronteiras: 'Fronteiras', curva: 'Curva 24h', dossie: 'Dossiê do gargalo' } as Record<InterchangeView, string>,
  status: { nominal: 'nominal', alert: 'alerta', critical: 'crítico' } as Record<InterchangeStatus, string>,
  balanceTitle: 'Saldo líquido por subsistema (soma das fronteiras)',
  exporting: 'exportando',
  importing: 'importando',
  loading: 'Carregamento',
  margin: 'Margem',
  alertMark: 'Alerta: 70%',
  criticalMark: 'Crítico: 90%',
  flow: 'fluxo',
  limit: 'limite',
  curveLink: 'Curva 24h',
  dossierLink: 'Dossiê',
  curveSubtitle: 'Perfil horário ilustrativo contra o limite operativo do ONS',
  referenceFlow: 'Fluxo de referência',
  onsLimit: 'Limite ONS',
  curveNote: (primary: string, reverse: string): React.ReactNode => (
    <>
      Positivo: sentido principal ({primary}). Negativo: fluxo reverso ({reverse}). Pontos vermelhos acima de 90% indicam
      risco de <em>curtailment</em> por gargalo de rede.
    </>
  ),
  cause: 'Causa física',
  impact: 'Impacto na operação e no mercado',
  solution: 'Solução de engenharia',
  trunks: 'Troncos da interface'
};

const EN: typeof PT = {
  title: 'Interchanges',
  intro: 'Active power between subsystems against the ONS operating limit. In transit now:',
  snapshotNote: 'Reference snapshot, not real-time telemetry.',
  views: { fronteiras: 'Interfaces', curva: '24h curve', dossie: 'Bottleneck dossier' },
  status: { nominal: 'nominal', alert: 'alert', critical: 'critical' },
  balanceTitle: 'Net balance per subsystem (sum of its interfaces)',
  exporting: 'exporting',
  importing: 'importing',
  loading: 'Loading',
  margin: 'Margin',
  alertMark: 'Alert: 70%',
  criticalMark: 'Critical: 90%',
  flow: 'flow',
  limit: 'limit',
  curveLink: '24h curve',
  dossierLink: 'Dossier',
  curveSubtitle: 'Illustrative hourly profile against the ONS operating limit',
  referenceFlow: 'Reference flow',
  onsLimit: 'ONS limit',
  curveNote: (primary: string, reverse: string): React.ReactNode => (
    <>
      Positive: main direction ({primary}). Negative: reverse flow ({reverse}). Red points above 90% flag a risk of{' '}
      <em>curtailment</em> from a grid bottleneck.
    </>
  ),
  cause: 'Physical cause',
  impact: 'Impact on operation and market',
  solution: 'Engineering solution',
  trunks: 'Interface trunk lines'
};

const COPY: Record<Lang, typeof PT> = { pt: PT, en: EN };

export const useInterchangeCopy = () => COPY[useI18n().lang];
