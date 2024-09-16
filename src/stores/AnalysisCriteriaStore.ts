import { create } from 'zustand';
import { AnalysisCriteria } from '@/interfaces/analysisCriteria.interface';

interface State {
  criteria: AnalysisCriteria;
  setCriteria: (criteria: AnalysisCriteria) => void;
}

// Store pour la gestion des états des critères d'analyse
// ===========================================================================================
const useAnalysisCriteriaStore = create<State>((set, get) => ({
  criteria: {
    type: null,
    genre: null,
    minRating: null,
    maxRating: null,
    startYear: null,
    endYear: null,
  }, // Objet des critère d'analyse

  // Met à jour les critères d'analyse
  // ===========================================================================================
  setCriteria: (criteria: AnalysisCriteria) => {
    set({ criteria });
  },
}));

export default useAnalysisCriteriaStore;
