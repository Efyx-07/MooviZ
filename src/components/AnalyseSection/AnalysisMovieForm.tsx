import './AnalysisMovieForm.scss';
import Button from '../Shared/Button';
import { Movie } from '@/interfaces/movie.interface';
import {
  AnalysisCriteria,
  MediaType,
} from '@/interfaces/analysisCriteria.interface';
import { getFilmsAvailableGenres } from '@/services/movie.service';
import { useEffect, useState } from 'react';
import { currentYear } from '@/config';
import { filterMovies } from '@/utils/filterMovies';
import useAnalysisCriteriaStore from '@/stores/AnalysisCriteriaStore';
import Dropdown from '../Shared/Dropdown';

interface AnalysisMovieFormProps {
  movies: Movie[];
}

export default function AnalysisMovieForm({ movies }: AnalysisMovieFormProps) {
  // States
  const [genres, setGenres] = useState<string[]>([]);
  const [type, setType] = useState<AnalysisCriteria['type']>(null);
  const [genre, setGenre] = useState<AnalysisCriteria['genre']>(null);
  const [minRating, setMinRating] =
    useState<AnalysisCriteria['minRating']>(null);
  const [maxRating, setMaxRating] =
    useState<AnalysisCriteria['maxRating']>(null);
  const [startYear, setStartYear] =
    useState<AnalysisCriteria['startYear']>(null);
  const [endYear, setEndYear] = useState<AnalysisCriteria['endYear']>(null);

  // Accède au store
  const analysisCriteriaStore = useAnalysisCriteriaStore();

  // Extrait les ids des films pour récupérer les genres
  const movieIds: string[] = movies.map((movie) => movie.imdbID);

  // Récupère les genres disponibles et les stocke dans le state
  async function FetchGenres(ids: string[]) {
    try {
      const availableGenres = await getFilmsAvailableGenres(ids);
      setGenres(availableGenres);
    } catch (error) {
      throw new Error('Error while fetching genres: ' + error);
    }
  }

  // Validation des champs number mini/maxi (la valeur mini doit toujours etre inférieure à la valeur maxi)
  const validateForm = () => {
    if (minRating !== null && maxRating !== null && minRating > maxRating) {
      alert(
        'La note minimale doit être inférieure ou égale à la note maximale.',
      );
      return false;
    }
    if (startYear !== null && endYear !== null && startYear > endYear) {
      alert(
        "L'année de départ doit être inférieure ou égale à l'année de fin.",
      );
      return false;
    }
    return true;
  };

  // Surveille les changements de movieIds et déclenche FetchGenres si des films son disponibles
  useEffect(() => {
    if (movieIds.length > 0) FetchGenres(movieIds);
  }, [movieIds]);

  // Soumet le formulaire après validation des données et stocke les critères dans le store
  // ===========================================================================================
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (validateForm()) {
      // Stocke les différent critères
      const criteria = {
        type,
        genre,
        minRating,
        maxRating,
        startYear,
        endYear,
      };

      // Stocke les critères dans le store
      analysisCriteriaStore.setCriteria(criteria);
      // Procède au filtrage des films selon les critères
      filterMovies(criteria);
    }
  };

  return (
    <div className="analysis-movie-form-container">
      <h3>Vos critères de recherche</h3>
      <form className="analysis-movie-form" onSubmit={handleSubmit}>
        {/* Dropdown Type */}
        <div className="field-container">
          <label htmlFor="type">Type</label>
          <Dropdown
            id="type"
            selectedValue={type as MediaType}
            onChange={(e) => setType(e.target.value as MediaType)}
            defaultLabel="-- Type"
            options={[
              { label: 'Film', value: 'movie' },
              { label: 'Série', value: 'series' },
            ]}
          />
        </div>

        {/* Dropdown Type */}
        <div className="field-container">
          <label htmlFor="genre">Genre</label>
          <Dropdown
            id="genre"
            selectedValue={genre as string}
            onChange={(e) => setGenre(e.target.value)}
            defaultLabel="-- Genre"
            options={genres.map((genre) => ({
              label: genre,
              value: genre,
            }))}
          />
        </div>

        {/* Input number MinRating */}
        <div className="field-container">
          <label htmlFor="minRating">Note minimale</label>
          <input
            type="number"
            name="minRating"
            id="minRating"
            value={minRating as number}
            onChange={(e) =>
              setMinRating(e.target.value ? Number(e.target.value) : null)
            }
            min="0"
            max="10"
          />
        </div>

        {/* Input number MaxRating */}
        <div className="field-container">
          <label htmlFor="maxRating">Note maximale</label>
          <input
            type="number"
            name="maxRating"
            id="maxRating"
            value={maxRating as number}
            onChange={(e) =>
              setMaxRating(e.target.value ? Number(e.target.value) : null)
            }
            min="0"
            max="10"
          />
        </div>

        {/* Input number StartYear */}
        <div className="field-container">
          <label htmlFor="startYear">Année de départ</label>
          <input
            type="number"
            name="startYear"
            id="startYear"
            value={startYear as number}
            onChange={(e) =>
              setStartYear(e.target.value ? Number(e.target.value) : null)
            }
            min="1900"
            max={currentYear}
          />
        </div>

        {/* Input number EndYear */}
        <div className="field-container">
          <label htmlFor="endYear">Année de fin</label>
          <input
            type="number"
            name="endYear"
            id="endYear"
            value={endYear as number}
            onChange={(e) =>
              setEndYear(e.target.value ? Number(e.target.value) : null)
            }
            min="1900"
            max={currentYear}
          />
        </div>

        <Button name="Appliquer les filtres" />
      </form>
    </div>
  );
}
