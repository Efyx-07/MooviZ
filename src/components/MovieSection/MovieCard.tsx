import './MovieCard.scss';
import Image from 'next/image';
import { Movie } from '@/interfaces/movie.interface';

interface MovieCardProps {
  movies: Movie[];
}

export default function MovieCard({ movies }: MovieCardProps) {
  return (
    <>
      {movies.map((movie) => (
        <div className="movie-card" key={movie.imdbID}>
          <div className="poster-container">
            {/* Certaines affiches peuvent être manquantes ('N/A'), necessite un affichage conditionnel */}
            {movie.Poster !== 'N/A' ? (
              <Image
                className="poster"
                src={movie.Poster}
                width={400}
                height={500}
                alt={movie.Title}
                priority
              />
            ) : (
              <p>No image found</p>
            )}
          </div>
          <div className="infos-container">
            <p className="movie-title">{movie.Title}</p>
            <p className="movie-year">{movie.Year}</p>
          </div>
        </div>
      ))}
    </>
  );
}
