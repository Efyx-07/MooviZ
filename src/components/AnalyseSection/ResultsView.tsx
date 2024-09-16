import './ResultsView.scss';
import useMovieStore from '@/stores/MovieStore';

export default function ResultsView() {
  const movieStore = useMovieStore();
  const movies = movieStore.analysedMovies;
  return (
    <div className="results-view">
      <h3>Results</h3>
      {movies.map((movie) => (
        <p key={movie.imdbID}>
          {movie.Title} - {movie.Year} - {movie.Type} - {movie.Genre} -
          {movie.imdbRating}
        </p>
      ))}
    </div>
  );
}
