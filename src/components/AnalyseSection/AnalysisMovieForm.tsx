import './AnalysisMovieForm.scss';
import Button from '../Shared/Button';
import { Movie } from '@/interfaces/movie.interface';
import { getFilmsAvailableGenres } from '@/services/movie.service';
import { useEffect, useState } from 'react';
import { currentYear } from '@/config';

interface AnalysisMovieFormProps {
  movies: Movie[];
}

export default function AnalysisMovieForm({ movies }: AnalysisMovieFormProps) {
  const [genres, setGenres] = useState<string[]>([]);

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

  // Surveille les changements de movieIds et déclenche FetchGenres si des films son disponibles
  useEffect(() => {
    if (movieIds.length > 0) FetchGenres(movieIds);
  }, [movieIds]);

  return (
    <div className="analysis-movie-form-container">
      <h3>Vos critères de recherche</h3>
      <form className="analysis-movie-form">
        {/* Dropdown Type */}
        <div className="field-container">
          <label htmlFor="type">Type</label>
          <select name="type" id="type" value="" onChange={() => {}}>
            <option value="">-- Type</option>
            <option value="">Film</option>
            <option value="">Série</option>
          </select>
        </div>

        {/* Dropdown Type */}
        <div className="field-container">
          <label htmlFor="type">Type</label>
          <select name="genre" id="genre" value="" onChange={() => {}}>
            <option value="">-- Genre</option>
            {genres.map((genre) => (
              <option key={genre}>{genre}</option>
            ))}
          </select>
        </div>

        {/* Input number MinRating */}
        <div className="field-container">
          <label htmlFor="type">Type</label>
          <input
            type="number"
            name="minRating"
            id="minRating"
            value=""
            onChange={() => {}}
            min="0"
            max="10"
          />
        </div>

        {/* Input number MaxRating */}
        <div className="field-container">
          <label htmlFor="type">Type</label>
          <input
            type="number"
            name="maxRating"
            id="maxRating"
            value=""
            onChange={() => {}}
            min="0"
            max="10"
          />
        </div>

        {/* Input number StartYear */}
        <div className="field-container">
          <label htmlFor="type">Type</label>
          <input
            type="number"
            name="startYear"
            id="startYear"
            value=""
            onChange={() => {}}
            min="1900"
            max={currentYear}
          />
        </div>

        {/* Input number EndYear */}
        <div className="field-container">
          <label htmlFor="type">Type</label>
          <input
            type="number"
            name="endYear"
            id="endYear"
            value=""
            onChange={() => {}}
            min="1900"
            max={currentYear}
          />
        </div>

        <Button name="Appliquer les filtres" />
      </form>
    </div>
  );
}
