'use client';

import '../../styles/section.scss';
import './MovieSection.scss';
import useMovieStore from '@/stores/MovieStore';
import { Movie } from '@/interfaces/movie.interface';
import MovieCard from './MovieCard';
import RankingDropdown from './RankingDropdown';
import GraphView from './GraphView';
import { useState } from 'react';
import { Icon } from '@iconify/react';

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
    <>
      {movies.length > 0 && (
        <section className="movie-section">
          <div className="movie-section-head">
            <h2>Resultats</h2>
            <div className="viewMode-options">
              <p>Affichage: </p>
              <Icon
                icon="cil:movie"
                className={`view-mode-icon ${isPosterView ? 'active' : ''}`}
                onClick={() => toggleView('poster')}
              />
              <Icon
                icon="octicon:graph-16"
                className={`view-mode-icon ${!isPosterView ? 'active' : ''}`}
                onClick={() => toggleView('graph')}
              />
            </div>
          </div>
          <RankingDropdown />
          {isPosterView ? (
            <div className="movie-cards-container">
              <MovieCard movies={movies} />
            </div>
          ) : (
            <GraphView />
          )}
        </section>
      )}
    </>
  );
}