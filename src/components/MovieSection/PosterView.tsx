import './PosterView.scss';
import { Movie } from '@/interfaces/movie.interface';
import MovieCard from './MovieCard';
import { motion } from 'framer-motion';

interface PosterViewProps {
  movies: Movie[];
}

export default function PosterView({ movies }: PosterViewProps) {
  return (
    <motion.div
      className="poster-view"
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <MovieCard movies={movies} />
    </motion.div>
  );
}
