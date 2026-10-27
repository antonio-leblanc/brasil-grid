import React from 'react';
import { useI18n } from '../../i18n/context';
import type { Lang } from '../../i18n/language';
import type { BlackoutCause } from '../../services/gridPhysics';

interface ExplanationParams {
  droopPct: string;
  eracStartHz: string;
  eracStages: number;
  peakMmgdGW: string;
}

interface BlackoutParams {
  underHz: string;
  overHz: string;
  eracStages: number;
}

const formula = <span className="font-mono text-slate-300">df/dt = f₀·ΔP / 2Eₖ</span>;

const PT = {
  title: 'Simulador 60 Hz',
  dayDescription: (tripGW: string, tripHours: number[]) =>
    `Despacho verificado do SIN, hora a hora. Quedas de ${tripGW} GW às ${tripHours.map((h) => `${h}h`).join(' e às ')}: mesma perda, inércia diferente.`,
  freeLabel: 'Livre',
  freeDescription: 'Sem programa nem eventos. Ajuste as fontes ou dispare uma contingência.',
  slowMotion: 'câmera lenta',
  resume: 'Continuar',
  pause: 'Pausar',
  restartScenario: 'Reiniciar cenário',
  blackout: 'Apagão',
  blackoutFallback: 'A frequência saiu dos limites e as proteções desligaram os geradores.',
  blackoutCause: (cause: BlackoutCause, p: BlackoutParams): string => {
    switch (cause) {
      case 'sync_loss':
        return 'Perda de todas as máquinas síncronas: sem inércia, não há referência de frequência para o sistema.';
      case 'underfrequency':
        return `Colapso por subfrequência (f < ${p.underHz} Hz): o ERAC esgotou seus ${p.eracStages} estágios e as proteções das unidades geradoras atuaram em cascata.`;
      case 'overfrequency':
        return `Colapso por sobrefrequência (f > ${p.overHz} Hz): proteção de sobrevelocidade das turbinas desligou as unidades síncronas.`;
    }
  },
  restart: 'Reiniciar',
  dayEnd: 'Fim do dia.',
  startOver: 'Recomeçar',
  howItWorks: 'Como funciona',
  explanation: (p: ExplanationParams): React.ReactNode => (
    <>
      <p>
        Todas as máquinas síncronas giram a 60 Hz. Se a carga supera a geração, a energia cinética dos rotores cobre a
        diferença e a frequência cai, tanto mais rápido quanto menor a inércia: {formula}.
      </p>
      <p>
        A regulação primária das hidrelétricas (estatismo <span className="font-mono">{p.droopPct}%</span>) reage em
        segundos. Abaixo de <span className="font-mono">{p.eracStartHz} Hz</span> o ERAC corta carga em {p.eracStages}{' '}
        estágios.
      </p>
      <p>
        O CAG (regulação secundária) corrige o programa das hidrelétricas nos minutos seguintes até a frequência voltar a
        60 Hz. Inércia H = energia cinética das máquinas síncronas ÷ geração total: cai ao meio-dia, quando solar e eólica,
        sem massa girante, dominam.
      </p>
      <p>
        <span className="text-slate-300">Curva do pato.</span> A solar hachurada é MMGD, a micro e minigeração atrás dos
        medidores das distribuidoras: o ONS não a despacha, só a estima com dados meteorológicos. Ela chega a{' '}
        <span className="font-mono">{p.peakMmgdGW} GW</span> perto do meio-dia e afunda a carga que as usinas atendem; no
        fim da tarde some com a carga ainda alta e as hidrelétricas fazem a rampa.
      </p>
    </>
  ),
  desk: {
    generation: 'Geração',
    load: 'Carga',
    eracShed: (gw: React.ReactNode): React.ReactNode => <>ERAC cortou {gw} GW de carga</>,
    hydro: 'Hidrelétricas',
    thermal: 'Termelétricas',
    solar: 'Solar',
    wind: 'Eólica',
    schedule: 'programa',
    target: 'alvo',
    hydroTarget: 'Alvo das hidrelétricas',
    thermalTarget: 'Alvo das termelétricas',
    zeroDelta: 'Zerar ΔP',
    zeroDeltaTitle: 'Leva o alvo das hidrelétricas ao valor que zera ΔP',
    min: 'mín',
    max: 'máx',
    agcAdjust: 'Ajuste do CAG',
    agcAdjustTitle: 'Correção da regulação secundária sobre o programa das hidrelétricas',
    curtailment: 'Curtailment solar + eólica',
    primary: 'Regulação primária',
    primaryTitle: 'Resposta automática das hidrelétricas ao desvio de frequência (estatismo)',
    agc: 'CAG',
    agcTitle: 'Controle automático de geração: corrige o programa das hidrelétricas até a frequência voltar a 60 Hz',
    trip: 'Queda de usina',
    tripTitle: 'Desliga unidades hidrelétricas de forma intempestiva; a inércia e a reserva delas saem junto'
  },
  gauge: {
    frequency: 'Frequência',
    normal: 'Normal',
    eracStage: (stage: number) => `ERAC estágio ${stage}`,
    overfrequency: 'Sobrefrequência',
    underfrequency: 'Subfrequência',
    inertia: 'Inércia equivalente',
    eracStart: 'Início do ERAC'
  },
  day: {
    title: 'Geração verificada do SIN',
    hydro: 'Hidro',
    thermal: 'Térmica',
    wind: 'Eólica',
    solar: 'Solar centralizada',
    mmgd: 'Solar MMGD',
    inertia: 'Inércia H'
  },
  strip: {
    history: 'Histórico',
    normalBand: 'faixa normal'
  }
};

const EN: typeof PT = {
  title: '60 Hz simulator',
  dayDescription: (tripGW: string, tripHours: number[]) =>
    `Verified SIN dispatch, hour by hour. ${tripGW} GW trips at ${tripHours.map((h) => `${String(h).padStart(2, '0')}:00`).join(' and ')}: same loss, different inertia.`,
  freeLabel: 'Free',
  freeDescription: 'No schedule, no events. Adjust the sources or trigger a contingency.',
  slowMotion: 'slow motion',
  resume: 'Resume',
  pause: 'Pause',
  restartScenario: 'Restart scenario',
  blackout: 'Blackout',
  blackoutFallback: 'Frequency left its limits and protection tripped the generators.',
  blackoutCause: (cause: BlackoutCause, p: BlackoutParams): string => {
    switch (cause) {
      case 'sync_loss':
        return 'All synchronous machines lost: with no inertia there is no frequency reference for the system.';
      case 'underfrequency':
        return `Under-frequency collapse (f < ${p.underHz} Hz): ERAC used up its ${p.eracStages} stages and generator protection tripped in cascade.`;
      case 'overfrequency':
        return `Over-frequency collapse (f > ${p.overHz} Hz): turbine overspeed protection tripped the synchronous units.`;
    }
  },
  restart: 'Restart',
  dayEnd: 'End of day.',
  startOver: 'Start over',
  howItWorks: 'How it works',
  explanation: (p: ExplanationParams): React.ReactNode => (
    <>
      <p>
        Every synchronous machine spins at 60 Hz. When load exceeds generation, the rotors' kinetic energy covers the gap
        and frequency falls, faster the lower the inertia: {formula}.
      </p>
      <p>
        Primary frequency response from the hydro plants (droop <span className="font-mono">{p.droopPct}%</span>) reacts
        within seconds. Below <span className="font-mono">{p.eracStartHz} Hz</span>, ERAC (under-frequency load shedding)
        sheds load in {p.eracStages} stages.
      </p>
      <p>
        AGC (secondary control) corrects the hydro schedule over the following minutes until frequency is back at 60 Hz.
        Inertia H = kinetic energy of the synchronous machines ÷ total generation: it drops at midday, when solar and wind,
        with no rotating mass, dominate.
      </p>
      <p>
        <span className="text-slate-300">Duck curve.</span> The hatched solar is MMGD, micro and mini generation behind
        the distribution utilities' meters: ONS does not dispatch it, only estimates it from weather data. It reaches{' '}
        <span className="font-mono">{p.peakMmgdGW} GW</span> around midday and pushes down the load the plants serve; late
        in the afternoon it fades while load is still high, and the hydro plants ramp up.
      </p>
    </>
  ),
  desk: {
    generation: 'Generation',
    load: 'Load',
    eracShed: (gw: React.ReactNode): React.ReactNode => <>ERAC shed {gw} GW of load</>,
    hydro: 'Hydro',
    thermal: 'Thermal',
    solar: 'Solar',
    wind: 'Wind',
    schedule: 'schedule',
    target: 'target',
    hydroTarget: 'Hydro target',
    thermalTarget: 'Thermal target',
    zeroDelta: 'Zero ΔP',
    zeroDeltaTitle: 'Sets the hydro target to the value that zeroes ΔP',
    min: 'min',
    max: 'max',
    agcAdjust: 'AGC adjustment',
    agcAdjustTitle: 'Secondary control correction on the hydro schedule',
    curtailment: 'Solar + wind curtailment',
    primary: 'Primary control',
    primaryTitle: 'Automatic hydro response to frequency deviation (droop)',
    agc: 'AGC',
    agcTitle: 'Automatic generation control: corrects the hydro schedule until frequency is back at 60 Hz',
    trip: 'Plant trip',
    tripTitle: 'Trips hydro units unexpectedly; their inertia and reserve go with them'
  },
  gauge: {
    frequency: 'Frequency',
    normal: 'Normal',
    eracStage: (stage: number) => `ERAC stage ${stage}`,
    overfrequency: 'Over-frequency',
    underfrequency: 'Under-frequency',
    inertia: 'Equivalent inertia',
    eracStart: 'ERAC threshold'
  },
  day: {
    title: 'Verified SIN generation',
    hydro: 'Hydro',
    thermal: 'Thermal',
    wind: 'Wind',
    solar: 'Utility-scale solar',
    mmgd: 'Distributed solar (MMGD)',
    inertia: 'Inertia H'
  },
  strip: {
    history: 'History',
    normalBand: 'normal band'
  }
};

const COPY: Record<Lang, typeof PT> = { pt: PT, en: EN };

export const useSimulatorCopy = () => COPY[useI18n().lang];
