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
    type: '',
    genre: '',
    minRating: '',
    maxRating: '',
    startYear: '',
    endYear: '',
  }, // Objet des critères d'analyse

  // Met à jour les critères d'analyse
  // ===========================================================================================
  setCriteria: (criteria: AnalysisCriteria) => {
    set({ criteria });
  },
}));

export default useAnalysisCriteriaStore;
