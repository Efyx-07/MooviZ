import useAnalysisCriteriaStore from '@/stores/AnalysisCriteriaStore';
import './SearchedCriteria.scss';

export default function SearchedCriteria() {
  const { criteria } = useAnalysisCriteriaStore();

  // Vérifie si au moins une propriété est définie ou non vide
  const hasCriteria =
    criteria.type ||
    criteria.genre ||
    criteria.minRating !== '' ||
    criteria.maxRating !== '' ||
    criteria.startYear !== '' ||
    criteria.endYear !== '';

  return (
    <>
      {hasCriteria && (
        <div className="criteria-container">
          <p>Recherche:</p>
          {criteria.type && <p>Type: {criteria.type}</p>}
          {criteria.genre && <p>Genre: {criteria.genre}</p>}
          {criteria.minRating !== '' && criteria.maxRating !== null && (
            <p>
              Note: {criteria.minRating} à {criteria.maxRating}
            </p>
          )}
          {criteria.startYear !== '' && criteria.endYear !== null && (
            <p>
              Année: {criteria.startYear} à {criteria.endYear}
            </p>
          )}
        </div>
      )}
    </>
  );
}
