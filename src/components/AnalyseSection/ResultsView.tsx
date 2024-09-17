import './ResultsView.scss';
import useMovieStore from '@/stores/MovieStore';
import ViewMode from '../Shared/ViewMode';
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
          <ViewMode
            isActive={isMovieListView}
            toggleView={toggleView}
            firstView="list"
            secondView="graph"
          />
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
