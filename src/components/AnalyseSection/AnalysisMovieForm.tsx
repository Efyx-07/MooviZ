import './AnalysisMovieForm.scss';
import Button from '../Shared/Button';
import { Movie } from '@/interfaces/movie.interface';
import { getFilmsAvailableGenres } from '@/services/movie.service';
import { useEffect, useState } from 'react';
import { currentYear } from '@/config';
import { filterMovies } from '@/utils/filterMovies';

interface AnalysisMovieFormProps {
  movies: Movie[];
}

// Typage pour le type d'un film tel que dans l'API
type MediaType = 'movie' | 'series';

export default function AnalysisMovieForm({ movies }: AnalysisMovieFormProps) {
  // States
  const [genres, setGenres] = useState<string[]>([]);
  const [type, setType] = useState<MediaType | ''>('');
  const [genre, setGenre] = useState<string>('');
  const [minRating, setMinRating] = useState<number | ''>('');
  const [maxRating, setMaxRating] = useState<number | ''>('');
  const [startYear, setStartYear] = useState<number | ''>('');
  const [endYear, setEndYear] = useState<number | ''>('');

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
    if (minRating !== '' && maxRating !== '' && minRating > maxRating) {
      alert(
        'La note minimale doit être inférieure ou égale à la note maximale.',
      );
      return false;
    }
    if (startYear !== '' && endYear !== '' && startYear > endYear) {
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

  // Soumet le formulaire
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (validateForm()) {
      filterMovies({
        type,
        genre,
        minRating,
        maxRating,
        startYear,
        endYear,
      });
    }
  };

  return (
    <div className="analysis-movie-form-container">
      <h3>Vos critères de recherche</h3>
      <form className="analysis-movie-form" onSubmit={handleSubmit}>
        {/* Dropdown Type */}
        <div className="field-container">
          <label htmlFor="type">Type</label>
          <select
            name="type"
            id="type"
            value={type}
            onChange={(e) => {
              setType(e.target.value as MediaType);
            }}
          >
            <option value="">-- Type</option>
            <option value="movie">Film</option>
            <option value="series">Série</option>
          </select>
        </div>

        {/* Dropdown Type */}
        <div className="field-container">
          <label htmlFor="genre">Genre</label>
          <select
            name="genre"
            id="genre"
            value={genre}
            onChange={(e) => {
              setGenre(e.target.value);
            }}
          >
            <option value="">-- Genre</option>
            {genres.map((genre) => (
              <option key={genre}>{genre}</option>
            ))}
          </select>
        </div>

        {/* Input number MinRating */}
        <div className="field-container">
          <label htmlFor="minRating">Note minimale</label>
          <input
            type="number"
            name="minRating"
            id="minRating"
            value={minRating}
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
            value={maxRating}
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
            value={startYear}
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
            value={endYear}
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
