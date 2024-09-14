import { useEffect, useState } from 'react';
import useMovieStore from '@/stores/MovieStore';
import { getAllDisplayedFilmsGenres } from '@/services/movie.service';

export default function GenreDropdown() {
  const [genres, setGenres] = useState<string[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string>('')
  const movieStore = useMovieStore();

  // Récupère les films stockés dans le store
  const movies = movieStore.initialMovies;

  // Extrait les ids des films
  const movieIds = movies.map((movie) => movie.imdbID);

  useEffect(() => {
    async function FetchGenres() {
      try {
        const availableGenres = await getAllDisplayedFilmsGenres(movieIds);
        setGenres(availableGenres);
      } catch (error) {
        throw new Error('Error while fetching genres: ' + error);
      }
    }
    // N'appelle le service que si des films sont disponibles
    if (movieIds.length > 0) FetchGenres();
  }, [movieIds]);

  const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const genre = event.target.value;
    setSelectedGenre(genre)
    movieStore.sortByGenre(genre);
  }

  return (
    <>
      <select
        id="genre-dropdown"
        value={selectedGenre}
        onChange={handleGenreChange}
      >
        <option value="">-- Select a genre</option>
        {genres.map((genre) => (
            <option key={genre} value={genre}>{genre}</option>
        ))}
      </select>
    </>
  );
}
