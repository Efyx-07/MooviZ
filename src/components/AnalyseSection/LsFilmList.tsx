'use client';

import { Movie } from '@/interfaces/movie.interface';
import useMovieStore from '@/stores/MovieStore';

export default function LsFilmList() {
    const movieStore = useMovieStore();
    const movies: Movie[] = movieStore.allSearchedMovies;

  return (
    <div className="film-list">
      {movies.length > 0 ? (
        <>
          {movies.map((movie) => (
            <p key={movie.imdbID}>{movie.Title}</p>
          ))}
        </>
      ) : (
        <p>No movie found</p>
      )}
    </div>
  );
}
