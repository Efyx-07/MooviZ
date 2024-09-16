'use client';

import '../../styles/section.scss';
import './AnalyseSection.scss';
import { Movie } from '@/interfaces/movie.interface';
import useMovieStore from '@/stores/MovieStore';
import { useEffect } from 'react';
import FiltersForm from './FiltersForm';
import ResultsView from './ResultsView';

export default function AnalyseSection() {
  const movieStore = useMovieStore();
  const movies: Movie[] = movieStore.allSearchedMovies;

  // Charge les films du local-storage au montage du composant
  useEffect(() => {
    movieStore.loadMoviesFromLocalStorage();
  }, [movieStore]);

  return (
    // Ne s'affiche que si des films sont stockés dans le local-storage
    // ===========================================================================================
    <>
      {movies.length > 0 && (
        <section className="analyse-section">
          <h2>Analyse personnalisée</h2>
          <div className="analyse-container">
            <FiltersForm />
            <ResultsView />
          </div>
        </section>
      )}
    </>
  );
}
