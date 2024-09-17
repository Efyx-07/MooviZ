import { OmdbBaseUrl } from '@/config';
import { Movie, MoviesSearchResponse } from '@/interfaces/movie.interface';

// Fetch les films par mot-clé contenu dans le titre, retourne une liste de films
// ===========================================================================================
export async function FetchMoviesByKeyword(keyword: string): Promise<Movie[]> {
  // Route de l'API en mode "by search" (s)
  const url = `${OmdbBaseUrl}&s=${keyword}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Error while fetching movies');
    }
    const data: MoviesSearchResponse = await response.json();
    // Search doit apparaitre dans la réponse, sinon retourne un tableau vide
    return data.Search || [];
  } catch (error) {
    throw new Error('Error while fetching movies: ' + error);
  }
}

// Fetch les films par mot-clé, enrichit les films avec leurs genres et les retourne
// ===========================================================================================
export async function getMoviesByKeywordWithGenres(
  keyword: string,
): Promise<Movie[]> {
  // Récupère les films par mot-clé
  const movies: Movie[] = await FetchMoviesByKeyword(keyword);
  // Si aucun film trouvé, retourne un tableau vide
  if (movies.length === 0) return [];
  // Retourne les films enrichis avec genres, imdbRating
  const moviesWithGenre: Movie[] = await addGenresToMovies(movies);
  const moviesWithImdbRating: Movie[] =
    await addImdbRatingToMovies(moviesWithGenre);
  return moviesWithImdbRating;
}

// Ajoute la donnée manquante "Genre" aux films, nécessaire au filtrage par genre
// ===========================================================================================
export async function addGenresToMovies(movies: Movie[]): Promise<Movie[]> {
  const enrichedMovies = await Promise.all(
    movies.map(async (movie) => {
      const movieDetails = await FetchMovieDetailsById(movie.imdbID);
      return { ...movie, Genre: movieDetails.Genre };
    }),
  );
  return enrichedMovies;
}

// Ajoute la donnée manquante "imdbRating" aux films, nécessaire au filtrage par popularité
// ===========================================================================================
export async function addImdbRatingToMovies(movies: Movie[]): Promise<Movie[]> {
  const enrichedMovies = await Promise.all(
    movies.map(async (movie) => {
      const movieDetails = await FetchMovieDetailsById(movie.imdbID);
      return { ...movie, imdbRating: movieDetails.imdbRating };
    }),
  );
  return enrichedMovies;
}

// Récupère le détail d'un film à partir de son imdbID
// Retourne le film avec format API complet (API ID)
// ===========================================================================================
export async function FetchMovieDetailsById(
  movieId: Movie['imdbID'] | string[],
): Promise<Movie> {
  // Route de l'API en mode "by ID" (i)
  const url = `${OmdbBaseUrl}&i=${movieId}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Error while fetching movie details');
    }
    const data: Movie = await response.json();
    return data;
  } catch (error) {
    throw new Error('Error while fetching movie details: ' + error);
  }
}
