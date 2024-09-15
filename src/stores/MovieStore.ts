import { create } from 'zustand';
import { Movie } from '@/interfaces/movie.interface';

interface State {
  initialMovies: Movie[];
  filteredMovies: Movie[];
  setMoviesData: (movies: Movie[]) => void;
  filterByGenre: (genre: Movie['Genre']) => void;
  filterByYear: (year: Movie['Year']) => void;
  filterByImdbRatingRange: (minRating: number, maxRating: number) => void;
  sortByPopularity: () => void;
  sortByYearAsc: () => void;
  sortByYearDesc: () => void;
}

const useMovieStore = create<State>((set, get) => ({
  initialMovies: [], // Tableau pour la iste de films initiale
  filteredMovies: [], // Tableau pour la liste de films filtrés

  // Fonction pour définir les données des films
  setMoviesData: (movies: Movie[]) =>
    set({ initialMovies: movies, filteredMovies: movies }),

  // Filtre les films par genre et met à jour le tableau movies avec les films filtrés
  filterByGenre: (selectedGenre: Movie['Genre']) => {
    if (selectedGenre === '') {
      // Réinitialise filteredMovies à initialMovies si le genre est vide
      set({ filteredMovies: get().initialMovies });
    } else {
      if (selectedGenre) {
        const filteredMovies = get().initialMovies.filter(
          (movie) => movie.Genre && movie.Genre.includes(selectedGenre),
        );
        set({ filteredMovies });
      }
    }
  },

  // Filtre les films par année de sortie et met à jour le tableau movies avec les films filtrés
  filterByYear: (selectedYear: Movie['Year']) => {
    if (selectedYear === '') {
      // Réinitialise filteredMovies à initialMovies si le genre est vide
      set({ filteredMovies: get().initialMovies });
    } else {
      if (selectedYear) {
        const filteredMovies = get().initialMovies.filter(
          (movie) => movie.Year && movie.Year.includes(selectedYear),
        );
        set({ filteredMovies });
      }
    }
  },

  // Filtre les films par plage de note Imdb et met à jour le tableau movies avec les films filtrés
  filterByImdbRatingRange: (minRating: number, maxRating: number) => {
    const filteredMovies = get().initialMovies.filter((movie) => {
      const imdbRating = parseFloat(movie.imdbRating || '0');
      return imdbRating >= minRating && imdbRating <= maxRating;
    });
    set({ filteredMovies });
  },

  sortByPopularity: () => {},
  sortByYearAsc: () => {},
  sortByYearDesc: () => {},
}));

export default useMovieStore;
