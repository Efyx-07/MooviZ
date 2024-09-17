import './GraphView.scss';
import { Movie } from '@/interfaces/movie.interface';
import MoviesChart from '../Shared/MoviesChart';

interface GraphViewProps {
  movies: Movie[];
}

export default function GraphView({ movies }: GraphViewProps) {
  return (
    <div className="graph-view">
      <MoviesChart movies={movies} />
    </div>
  );
}
