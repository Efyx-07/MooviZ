'use client';

import '../../styles/section.scss';
import './MovieSection.scss';
import useMovieStore from '@/stores/MovieStore';
import { Movie } from '@/interfaces/movie.interface';
import RankingDropdown from './RankingDropdown';
import ViewMode from '../Shared/ViewMode';
import PosterView from './PosterView';
import GraphView from './GraphView';
import { useState } from 'react';

export default function MovieSection() {
  const [isPosterView, setIsPosterView] = useState<boolean>(true);

  // Récupère la liste de film stockée dans le store
  const movieStore = useMovieStore();
  const movies: Movie[] = movieStore.filteredMovies || [];

  // Bascule entre les vues
  const toggleView = (view: 'poster' | 'graph') => {
    setIsPosterView(view === 'poster');
  };

  return (
    // Ne s'affiche que si des films sont stockés dans la propriété filteredMovies
    // ===========================================================================================
    <>
      {movies.length > 0 && (
        <section className="movie-section">
          <div className="movie-section-head">
            <h2>Resultats</h2>
            <ViewMode
              isActive={isPosterView}
              toggleView={toggleView}
              firstView="poster"
              secondView="graph"
            />
          </div>
          <RankingDropdown />
          {isPosterView ? (
            <PosterView movies={movies} />
          ) : (
            <GraphView movies={movies} />
          )}
        </section>
      )}
    </>
  );
}
