import './PosterView.scss';
import { Movie } from "@/interfaces/movie.interface";
import MovieCard from "./MovieCard";

interface PosterViewProps {
    movies: Movie[]; 
}

export default function PosterView ({movies}: PosterViewProps) {
    return (
        <div className="poster-view">
            <MovieCard movies={movies} />
        </div>
    )
}