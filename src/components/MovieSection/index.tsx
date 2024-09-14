'use client';

import '../../styles/section.scss';
import './MovieSection.scss';
import useMovieStore from '@/stores/MovieStore';
import { Movie } from '@/interfaces/movie.interface';
import MovieCard from './MovieCard';

export default function MovieSection() {
  // Récupère la liste de film stockée dans le store
  const movieStore = useMovieStore();
  const movies: Movie[] = movieStore.filteredMovies;

  return (
    <section className="movie-section">
      <h2>Resultats</h2>
      <div className="movie-cards-container">
        <MovieCard movies={movies} />
      </div>
    </section>
  );
}
