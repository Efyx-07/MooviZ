'use client';

import { Movie } from '@/interfaces/movie.interface';
import useMovieStore from '@/stores/MovieStore';
import { useEffect } from 'react';

export default function LsFilmList() {
  const movieStore = useMovieStore();
  const movies: Movie[] = movieStore.allSearchedMovies;

  // Charger les films du local storage au montage du composant
  useEffect(() => {
    movieStore.loadMoviesFromLocalStorage();
  }, [movieStore]);

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
