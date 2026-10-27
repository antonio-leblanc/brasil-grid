import type { PowerPlantFeature, TransmissionLineFeature } from '../../data/gridData';
import type { Lang } from '../language';
import { POWER_PLANTS_EN } from './powerPlants.en';
import { TRANSMISSION_LINES_EN } from './transmissionLines.en';

/** English overrides for a plant; a field is present only when the Portuguese value needs translating. */
export interface PlantText {
  name?: string;
  riverOrRegion?: string;
  operator?: string;
  description: string;
  turbinesOrUnits?: string;
  flowOrEfficiency?: string;
  gridConnectionVoltage?: string;
}

export interface LineText {
  name: string;
  from?: string;
  to?: string;
  concessionaire?: string;
  converterTechnology?: string;
}

export function localizePlant(plant: PowerPlantFeature, lang: Lang): PowerPlantFeature {
  const en = lang === 'en' ? POWER_PLANTS_EN[plant.id] : undefined;
  if (!en) return plant;
  const { turbinesOrUnits, flowOrEfficiency, gridConnectionVoltage, ...text } = en;
  return {
    ...plant,
    ...text,
    technicalDetails: plant.technicalDetails && {
      ...plant.technicalDetails,
      ...(turbinesOrUnits && { turbinesOrUnits }),
      ...(flowOrEfficiency && { flowOrEfficiency }),
      ...(gridConnectionVoltage && { gridConnectionVoltage })
    }
  };
}

export function localizeLine(line: TransmissionLineFeature, lang: Lang): TransmissionLineFeature {
  const en = lang === 'en' ? TRANSMISSION_LINES_EN[line.id] : undefined;
  if (!en) return line;
  const { converterTechnology, ...text } = en;
  return {
    ...line,
    ...text,
    technicalDetails: line.technicalDetails && {
      ...line.technicalDetails,
      ...(converterTechnology && { converterTechnology })
    }
  };
}
