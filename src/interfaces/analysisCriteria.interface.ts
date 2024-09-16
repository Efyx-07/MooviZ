// Interface des critères d'analyse
// ===========================================================================================
export interface AnalysisCriteria {
  type: MediaType | string;
  genre: string | string;
  minRating: number | string;
  maxRating: number | string;
  startYear: number | string;
  endYear: number | string;
}

export type MediaType = 'movie' | 'series';
