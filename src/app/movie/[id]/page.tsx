import { FetchMovieDetailsById } from '@/services/movie.service';

interface MoviePageProps {
  params: { id: string };
}
export default async function MoviePage({ params }: MoviePageProps) {
  const selectedMovie = await FetchMovieDetailsById(params.id);
  return (
    <div className="page">
      <div className="content">
        <div className="movie-details-container">
          <h1>{selectedMovie.Title}</h1>
          <p>{selectedMovie.Genre}</p>
        </div>
      </div>
    </div>
  );
}
