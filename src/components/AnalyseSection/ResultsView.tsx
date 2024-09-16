import './ResultsView.scss';
import useMovieStore from '@/stores/MovieStore';
import SearchedCriteria from './SearchedCriteria';

export default function ResultsView() {
  const movieStore = useMovieStore();
  const movies = movieStore.analysedMovies;

  return (
    <div className="results-view">
      <h3>Resultats</h3>
      <SearchedCriteria />
      {movies.map((movie) => (
        <p key={movie.imdbID}>
          {movie.Title} - {movie.Year} - {movie.Type} - {movie.Genre} -
          {movie.imdbRating}
        </p>
      ))}
    </div>
  );
}
