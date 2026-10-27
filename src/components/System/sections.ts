import { ArrowLeftRight, BookOpen, Gauge, Link2, Ruler, TrendingUp, type LucideIcon } from 'lucide-react';

export type AppView = 'mapa' | 'sistema';

export type SectionId = 'intercambios' | 'simulador' | 'cadeia' | 'dossies' | 'preco' | 'escalas';

export type SectionGroupId = 'operacao' | 'mercado' | 'referencia';

export interface SectionDef {
  id: SectionId;
  icon: LucideIcon;
  wide?: boolean;
}

export const SECTION_GROUPS: { id: SectionGroupId; sections: SectionDef[] }[] = [
  {
    id: 'operacao',
    sections: [
      { id: 'intercambios', icon: ArrowLeftRight, wide: true },
      { id: 'simulador', icon: Gauge, wide: true }
    ]
  },
  {
    id: 'mercado',
    sections: [{ id: 'preco', icon: TrendingUp }]
  },
  {
    id: 'referencia',
    sections: [
      { id: 'cadeia', icon: Link2 },
      { id: 'dossies', icon: BookOpen },
      { id: 'escalas', icon: Ruler }
    ]
  }
];

export const SECTIONS: SectionDef[] = SECTION_GROUPS.flatMap((group) => group.sections);

export const DEFAULT_SECTION: SectionId = 'simulador';

export const isSectionId = (value: string | null): value is SectionId =>
  SECTIONS.some((section) => section.id === value);
