import { create } from 'zustand';
import { Movie } from '@/interfaces/movie.interface';

interface State {
  initialMovies: Movie[];
  filteredMovies: Movie[];
  allSearchedMovies: Movie[]; // Tableau pour stocker tous les films recherchés
  setMoviesData: (movies: Movie[]) => void;
  addMoviesToAllSearched: (movies: Movie[]) => void;
  filterByGenre: (genre: Movie['Genre']) => void;
  filterByYear: (year: Movie['Year']) => void;
  filterByImdbRatingRange: (minRating?: number, maxRating?: number) => void;
  sortByPopularityAsc: () => void;
  sortByPopularityDesc: () => void;
  sortByYearAsc: () => void;
  sortByYearDesc: () => void;
}

const useMovieStore = create<State>((set, get) => ({
  initialMovies: [], // Tableau pour la iste de films initiale
  filteredMovies: [], // Tableau pour la liste de films filtrés
  allSearchedMovies: [], // Tableau pour tous les films recherchés

  // Fonction pour définir les données des films
  setMoviesData: (movies: Movie[]) =>
    set({ initialMovies: movies, filteredMovies: movies }),

  // Ajoute des films à allSearchedMovies
  addMoviesToAllSearched: (movies: Movie[]) => {
    const currentMovies = get().allSearchedMovies;
    const newMovies = movies.filter(
      (movie) => !currentMovies.some((m) => m.imdbID === movie.imdbID) // Évite les doublons
    );
    set({ allSearchedMovies: [...currentMovies, ...newMovies] });
  },

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
      // Réinitialise filteredMovies à initialMovies si l'année est vide
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
  filterByImdbRatingRange: (minRating?: number, maxRating?: number) => {
    // Si minRating ou maxRating est undefined, réinitialise les films
    if (minRating === undefined || maxRating === undefined) {
      set({ filteredMovies: get().initialMovies });
    } else {
      // Applique le filtre seulement si les valeurs sont valides
      const filteredMovies = get().initialMovies.filter((movie) => {
        const imdbRating = parseFloat(movie.imdbRating || '0');
        return imdbRating >= minRating && imdbRating <= maxRating;
      });
      set({ filteredMovies });
    }
  },

  // Classe les films par popularité (du moins populaire au plus populaire)
  sortByPopularityAsc: () => {
    const sortedMovies = get()
      .filteredMovies.slice()
      .sort((a, b) => Number(a.imdbRating) - Number(b.imdbRating));
    set({ filteredMovies: sortedMovies });
  },

  // Classe les films par popularité (du plus populaire au moins populaire)
  sortByPopularityDesc: () => {
    const sortedMovies = get()
      .filteredMovies.slice()
      .sort((a, b) => Number(b.imdbRating) - Number(a.imdbRating));
    set({ filteredMovies: sortedMovies });
  },

  // Classe les films du plus ancien au plus récent)
  sortByYearAsc: () => {
    const sortedMovies = get()
      .filteredMovies.slice()
      .sort((a, b) => Number(a.Year) - Number(b.Year));
    set({ filteredMovies: sortedMovies });
  },

  // Classe les films du plus récent au plus ancien)
  sortByYearDesc: () => {
    const sortedMovies = get()
      .filteredMovies.slice()
      .sort((a, b) => Number(b.Year) - Number(a.Year));
    set({ filteredMovies: sortedMovies });
  },
}));

export default useMovieStore;
