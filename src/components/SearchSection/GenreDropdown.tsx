import './AdvSearchDropdown.scss';
import { useEffect, useState } from 'react';
import { Movie } from '@/interfaces/movie.interface';
import useMovieStore from '@/stores/MovieStore';
import { getFilmsAvailableGenres } from '@/services/movie.service';
import { Icon } from '@iconify/react';

export default function GenreDropdown() {
  const [genres, setGenres] = useState<string[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const movieStore = useMovieStore();

  // Récupère les films stockés dans le store
  const movies: Movie[] = movieStore.initialMovies;

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

  // Procède au filtrage selon le genre sélectionné
  const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const genre = event.target.value;
    setSelectedGenre(genre);
    movieStore.filterByGenre(genre);
  };

  return (
    <div className="dropdown-container">
      <select
        className="advSearch-dropdown"
        id="genre-dropdown"
        value={selectedGenre}
        onChange={handleGenreChange}
      >
        <option value="">-- Genre</option>
        {genres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
      <Icon
        icon="material-symbols-light:play-arrow"
        className="dropdown-icon"
      />
    </div>
  );
}
