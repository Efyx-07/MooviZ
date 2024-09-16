import { AnalysisCriteria } from '@/interfaces/analysisCriteria.interface';

// Valide les champs number mini/maxi (la valeur mini doit toujours etre inférieure à la valeur maxi)
export default function validateForm(
  minRating: AnalysisCriteria['minRating'],
  maxRating: AnalysisCriteria['maxRating'],
  startYear: AnalysisCriteria['startYear'],
  endYear: AnalysisCriteria['endYear'],
) {
  if (minRating !== null && maxRating !== null && minRating > maxRating) {
    alert('La note minimale doit être inférieure ou égale à la note maximale.');
    return false;
  }
  if (startYear !== null && endYear !== null && startYear > endYear) {
    alert("L'année de départ doit être inférieure ou égale à l'année de fin.");
    return false;
  }
  return true;
}
