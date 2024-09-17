import { Movie } from '@/interfaces/movie.interface';
import MoviesChart from '../Shared/MoviesChart';

interface GraphAnalysisViewProps {
  movies: Movie[];
}

export default function GraphAnalysisView({ movies }: GraphAnalysisViewProps) {
  return (
    <>
      <MoviesChart movies={movies} />
    </>
  );
}
