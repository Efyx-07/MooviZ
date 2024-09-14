import { OmdbBaseUrl } from '@/config';
import { Movie, MoviesSearchResponse } from '@/interfaces/movie.interface';

// Recherche du film par mot-clé dans le titre
// Retourne une liste de film avec format API réduit (API Search)
// ===========================================================================================
export async function FetchMovieByKeyword(keyword: string): Promise<Movie[]> {
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

// Récupère tout les genres des films affichés à partir de leurs imdbIDs
// Retourne un tableau de strings
// ===========================================================================================
export async function getAllDisplayedFilmsGenres(
  movieIds: string[],
): Promise<string[]> {
  // Creation d'un set pour stocker les differents genres sans doublons
  const genreSet: Set<string> = new Set<string>();
  // Récupération des détails de chaque films pour ensuite extraire les genres, retourne un tableau de Promise
  const movieDetailsPromises = movieIds.map((id) => FetchMovieDetailsById(id));
  // Une fois les Promises résolues, retourne un tableau avec les détails des films
  const moviesDetails = await Promise.all(movieDetailsPromises);
  // Extrait les genres des films et les split en fonction des virgules.
  // Format reçu de l'API("Genre": "Adventure, Drama, Thriller",)
  // Ajoute chaque genre au genreSet
  moviesDetails.forEach((movie) => {
    if (movie.Genre) {
      movie.Genre.split(', ').forEach((genre) => genreSet.add(genre));
    }
  });
  return Array.from(genreSet);
}

// Recherche du film par mot-clé dans le titre, enrichit le film avec ses genres
// Retourne une liste de film avec format API réduit (API Search)
// ===========================================================================================
export async function FetchMovieByKeywordWithGenres(
  keyword: string,
): Promise<Movie[]> {
  const url = `${OmdbBaseUrl}&s=${keyword}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Error while fetching movies');
    }
    const data: MoviesSearchResponse = await response.json();

    // Si retourne des résultats, enrichit chaque film avec ses genres
    if (data.Search) {
      const enrichedMoviesPromises = data.Search.map(async (movie) => {
        const movieDetails = await FetchMovieDetailsById(movie.imdbID);
        // Retourne le film enrichi avec ses détails (incluant genres)
        return { ...movie, Genre: movieDetails.Genre };
      });

      // Attendre que toutes les promesses soient résolues
      const enrichedMovies = await Promise.all(enrichedMoviesPromises);
      return enrichedMovies;
    }

    return [];
  } catch (error) {
    throw new Error('Error while fetching movies: ' + error);
  }
}
