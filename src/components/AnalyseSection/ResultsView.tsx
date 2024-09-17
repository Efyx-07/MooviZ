import './ResultsView.scss';
import useMovieStore from '@/stores/MovieStore';
import SearchedCriteria from './SearchedCriteria';
import MovieListView from './MovieListView';
import GraphAnalysisView from './GraphAnalysisView';
import { Icon } from '@iconify/react';
import { useState } from 'react';

export default function ResultsView() {
  const [isMovieListView, setIsMovieListView] = useState<boolean>(true);
  const movieStore = useMovieStore();
  const movies = movieStore.analysedMovies;

  // Bascule entre les vues
  const toggleView = (view: 'list' | 'graph') => {
    setIsMovieListView(view === 'list');
  };

  return (
    <div className="results-view">
      <div className="results-view-head">
        <h3>Resultats</h3>

        {movies.length > 0 && (
          <div className="viewMode-options">
            <p>Affichage: </p>
            <Icon
              icon="cil:movie"
              className={`view-mode-icon ${isMovieListView ? 'active' : ''}`}
              onClick={() => toggleView('list')}
            />
            <Icon
              icon="octicon:graph-16"
              className={`view-mode-icon ${!isMovieListView ? 'active' : ''}`}
              onClick={() => toggleView('graph')}
            />
          </div>
        )}
      </div>

      {movies.length > 0 && (
        <div className="results-appear">
          <SearchedCriteria />
          {isMovieListView ? (
            <MovieListView movies={movies} />
          ) : (
            <GraphAnalysisView movies={movies} />
          )}
        </div>
      )}
    </div>
  );
}
