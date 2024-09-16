import useMovieStore from '@/stores/MovieStore';
import { AnalysisCriteria } from '@/interfaces/analysisCriteria.interface';

// Filtre les films selon les critéres de l'analyse, retourne les résultats et met à jour analysedMovies avec les résultats
// ===========================================================================================
export function filterMovies(criteria: {
  type: AnalysisCriteria['type'];
  genre: AnalysisCriteria['genre'];
  minRating: AnalysisCriteria['minRating'];
  maxRating: AnalysisCriteria['maxRating'];
  startYear: AnalysisCriteria['startYear'];
  endYear: AnalysisCriteria['endYear'];
}) {
  const { allSearchedMovies, setAnalysedMovies } = useMovieStore.getState();

  // Convertit une string en objet afin de prendre en compte le format des dates des séries dans l'API
  // Formats de dates possibles:  ("2015", "2015-", "2015-2022")
  const parseYearRange = (
    yearRange: string,
  ): { start: number; end: number | null } => {
    const [start, end] = yearRange.split('-').map((str) => parseInt(str, 10));
    return { start: isNaN(start) ? 0 : start, end: isNaN(end) ? null : end };
  };

  // Procède au filtrage dans le tableau du store AllSearchedMovies
  const result = allSearchedMovies.filter((movie) => {
    // filtre le type
    const matchesType = criteria.type ? movie.Type === criteria.type : true;
    // filtre le genre
    const matchesGenre = criteria.genre
      ? movie.Genre?.includes(criteria.genre)
      : true;
    // filtre les notes mini et maxi
    const matchesMinRating =
      criteria.minRating !== ''
        ? Number(movie.imdbRating) >= Number(criteria.minRating)
        : true;
    const matchesMaxRating =
      criteria.maxRating !== ''
        ? Number(movie.imdbRating) <= Number(criteria.maxRating)
        : true;

    // Analyse l'année du film
    const { start: movieStartYear, end: movieEndYear } = parseYearRange(
      movie.Year,
    );

    // Vérifie la correspondance des années
    const matchesStartYear =
      criteria.startYear !== ''
        ? movieEndYear === null
          ? movieStartYear >= Number(criteria.startYear)
          : movieEndYear >= Number(criteria.startYear)
        : true;
    const matchesEndYear =
      criteria.endYear !== ''
        ? movieStartYear <= Number(criteria.endYear) &&
          (movieEndYear === null || movieEndYear <= Number(criteria.endYear))
        : true;

    return (
      matchesType &&
      matchesGenre &&
      matchesMinRating &&
      matchesMaxRating &&
      matchesStartYear &&
      matchesEndYear
    );
  });

  // Met à jour le tableau analysedMovies dans le store
  setAnalysedMovies(result);
}
