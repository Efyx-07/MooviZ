import './MovieListView.scss';
import { Movie } from '@/interfaces/movie.interface';
import { motion } from 'framer-motion';

interface MovieListViewProps {
  movies: Movie[];
}

export default function MovieListView({ movies }: MovieListViewProps) {
  return (
    <motion.div
      className="movie-list-container"
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {movies.map((movie) => (
        <p key={movie.imdbID}>
          {movie.Title} - {movie.Year} - {movie.Type} - {movie.Genre} -
          {movie.imdbRating}
        </p>
      ))}
    </motion.div>
  );
}
