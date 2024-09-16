// Interface des critères d'analyse
// ===========================================================================================
export interface AnalysisCriteria {
  type: MediaType | null;
  genre: string | null;
  minRating: number | null;
  maxRating: number | null;
  startYear: number | null;
  endYear: number | null;
}

export type MediaType = 'movie' | 'series';
