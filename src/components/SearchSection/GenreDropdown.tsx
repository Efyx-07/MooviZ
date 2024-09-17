import { useEffect, useState } from 'react';
import { Movie } from '@/interfaces/movie.interface';
import useMovieStore from '@/stores/MovieStore';
import Dropdown from '../Shared/Dropdown';

export default function GenreDropdown() {
  const [genres, setGenres] = useState<string[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const movieStore = useMovieStore();

  // Récupère les films stockés dans le store
  const movies: Movie[] = movieStore.initialMovies;

  // Récupère tous les genres des films stockés dans le store et met à jour setGenres dans le State
  // !! Important, évite les appels API
  // ===========================================================================================
  function getInitialMoviesAllGenres(movies: Movie[]) {
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
    if (movies.length > 0) getInitialMoviesAllGenres(movies);
  }, [movies]);

  // Mappe pour récupérer les options
  const options = genres.map((genre) => ({ label: genre, value: genre }));

  // Procède au filtrage selon le genre sélectionné
  const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const genre = event.target.value;
    setSelectedGenre(genre);
    movieStore.filterByGenre(genre);
  };

  return (
    <div className="dropdown-container">
      <Dropdown
        id="genre-dropdown"
        data-testid="genre-dropdown"
        selectedValue={selectedGenre}
        onChange={handleGenreChange}
        defaultLabel="-- Genre"
        options={options}
      />
    </div>
  );
}
