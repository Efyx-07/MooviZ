import '../../styles/section.scss';
import MovieCard from './MovieCard';

export default function MovieSection() {
  return (
    <section className="movie-section">
      <h2>Resultats</h2>
      <div className="movie-cards-container">
        <MovieCard />
      </div>
    </section>
  );
}
