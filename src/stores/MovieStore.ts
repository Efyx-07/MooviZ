import { create } from 'zustand';
import { Movie } from '@/interfaces/movie.interface';

interface State {
  initialMovies: Movie[];
  filteredMovies: Movie[];
  setMoviesData: (movies: Movie[]) => void;
  sortByGenre: (genre: Movie['Genre']) => void;
}

const useMovieStore = create<State>((set, get) => ({
  initialMovies: [], // Tableau pour la iste de films initiale
  filteredMovies: [], // Tableau pour la liste de films filtrés

  // Fonction pour définir les données des films
  setMoviesData: (movies: Movie[]) =>
    set({ initialMovies: movies, filteredMovies: movies }),

  // Trie les films par genre et met à jour le tableau movies avec les films triés
  sortByGenre: (selectedGenre: Movie['Genre']) => {
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
}));

export default useMovieStore;
