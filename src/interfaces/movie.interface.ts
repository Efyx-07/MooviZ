// Interface des données des films necessaires à leur traitement
// ===========================================================================================
export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  Genre?: string;
  imdbRating?: string;
}

// Interface de la réponse de l'API Omdb en mode Search (données contenues dans un tableau nommé "Search")
// ===========================================================================================
export interface MoviesSearchResponse {
  Search: Movie[];
}
