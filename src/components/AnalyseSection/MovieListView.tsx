import './MovieListView.scss';
import { Movie } from '@/interfaces/movie.interface';

interface MovieListViewProps {
  movies: Movie[];
}

export default function MovieListView({ movies }: MovieListViewProps) {
  return (
    <div className="movie-list-container">
      {movies.map((movie) => (
        <p key={movie.imdbID}>
          {movie.Title} - {movie.Year} - {movie.Type} - {movie.Genre} -
          {movie.imdbRating}
        </p>
      ))}
    </div>
  );
}
