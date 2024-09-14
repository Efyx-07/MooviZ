import { OmdbBaseUrl } from '@/config';
import { Movie, MoviesSearchResponse } from '@/interfaces/movie.interface';

// Recherche du film par mot-clé dans le titre
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
    throw new Error('Error while fetching movies' + error);
  }
}
