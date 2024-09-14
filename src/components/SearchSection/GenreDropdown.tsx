import { useEffect, useState } from 'react';
import useMovieStore from '@/stores/MovieStore';
import { getAllDisplayedFilmsGenres } from '@/services/movie.service';

export default function GenreDropdown() {
  const [genres, setGenres] = useState<string[]>([]);

  // Récupère les films stockés dans le store
  const movies = useMovieStore().movies;

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
    // N'appelle le service que des films sont disponibles
    if (movieIds.length > 0) FetchGenres();
  }, [movieIds]);
  return (
    <>
      <select>
        <option value="">-- Select a genre</option>
        {genres.map((genre) => (
            <option key={genre} value={genre}>{genre}</option>
        ))}
      </select>
    </>
  );
}
