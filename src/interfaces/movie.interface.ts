export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  Genre?: string;
  imdbRating?: string;
}

export interface MoviesSearchResponse {
  Search: Movie[];
}
