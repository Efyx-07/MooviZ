import './AnalysisMovieForm.scss';
import Button from '../Shared/Button';
import { Movie } from '@/interfaces/movie.interface';
import {
  AnalysisCriteria,
  MediaType,
} from '@/interfaces/analysisCriteria.interface';
import validateForm from '@/utils/valdateForm';
import { useEffect, useState } from 'react';
import { currentYear } from '@/config';
import { filterMovies } from '@/utils/filterMovies';
import useAnalysisCriteriaStore from '@/stores/AnalysisCriteriaStore';
import Dropdown from '../Shared/Dropdown';

interface AnalysisMovieFormProps {
  movies: Movie[];
}

export default function AnalysisMovieForm({ movies }: AnalysisMovieFormProps) {
  const [genres, setGenres] = useState<string[]>([]);
  const [type, setType] = useState<AnalysisCriteria['type']>('');
  const [genre, setGenre] = useState<AnalysisCriteria['genre']>('');
  const [minRating, setMinRating] = useState<AnalysisCriteria['minRating']>('');
  const [maxRating, setMaxRating] = useState<AnalysisCriteria['maxRating']>('');
  const [startYear, setStartYear] = useState<AnalysisCriteria['startYear']>('');
  const [endYear, setEndYear] = useState<AnalysisCriteria['endYear']>('');

  // Accède au store
  const analysisCriteriaStore = useAnalysisCriteriaStore();

  // Récupère tous les genres des films stockés dans le store et met à jour setGenres dans le State
  // !! Important, évite les appels API
  // ===========================================================================================
  function getAllSearchedMoviesGenres(movies: Movie[]) {
    // Création d'un Set pour éviter les doublons de genres
    const genreSet: Set<string> = new Set<string>();
    // Parcourt les movies, retrouve tous les genres disponibles
    // split les genres (format par film: "Adventure, Drama, Thriller") et stocke chaque genre dans le set
    movies.forEach((movie) => {
      if (movie.Genre) {
        movie.Genre.split(', ').forEach((genre) => genreSet.add(genre));
      }
    });
    // Met à jour le state avec tous les genres
    setGenres(Array.from(genreSet));
  }

  // Surveille les changements de movieIds et déclenche FetchGenres si des films son disponibles
  // ===========================================================================================
  useEffect(() => {
    if (movies.length > 0) getAllSearchedMoviesGenres(movies);
  }, [movies]);

  // Soumet le formulaire après validation des données et stocke les critères dans le store
  // ===========================================================================================
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (validateForm(minRating, maxRating, startYear, endYear)) {
      // Stocke les différents critères
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
      <form
        className="analysis-movie-form"
        data-testid="analysis-movie-form"
        onSubmit={handleSubmit}
      >
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

        {/* Dropdown Genre */}
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
              setMinRating(e.target.value ? Number(e.target.value) : '')
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
              setMaxRating(e.target.value ? Number(e.target.value) : '')
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
              setStartYear(e.target.value ? Number(e.target.value) : '')
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
              setEndYear(e.target.value ? Number(e.target.value) : '')
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
