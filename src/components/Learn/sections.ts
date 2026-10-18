import { Activity, ArrowLeftRight, BookOpen, Gauge, Link2, Ruler, TrendingUp, type LucideIcon } from 'lucide-react';

export type SectionId = 'curva' | 'intercambios' | 'simulador' | 'cadeia' | 'dossies' | 'preco' | 'escalas';

export interface SectionDef {
  id: SectionId;
  label: string;
  icon: LucideIcon;
  wide?: boolean;
}

export const SECTION_GROUPS: { label: string; sections: SectionDef[] }[] = [
  {
    label: 'Operação',
    sections: [
      { id: 'curva', label: 'Curva de carga', icon: Activity },
      { id: 'intercambios', label: 'Intercâmbios', icon: ArrowLeftRight, wide: true },
      { id: 'simulador', label: 'Simulador 60 Hz', icon: Gauge, wide: true }
    ]
  },
  {
    label: 'Referência',
    sections: [
      { id: 'cadeia', label: 'Cadeia de valor do SEB', icon: Link2 },
      { id: 'dossies', label: 'Dossiês do SIN', icon: BookOpen },
      { id: 'preco', label: 'Preço', icon: TrendingUp },
      { id: 'escalas', label: 'Régua de grandezas', icon: Ruler }
    ]
  }
];

export const SECTIONS: SectionDef[] = SECTION_GROUPS.flatMap((group) => group.sections);

export const DEFAULT_SECTION: SectionId = 'cadeia';

export const isSectionId = (value: string | null): value is SectionId =>
  SECTIONS.some((section) => section.id === value);
