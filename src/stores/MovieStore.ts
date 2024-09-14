import { create } from 'zustand';
import { Movie } from '@/interfaces/movie.interface';

interface State {
  movies: Movie[];
  setMoviesData: (movies: Movie[]) => void;
  sortByGenre: (genre: Movie['Genre']) => void;
}

const useMovieStore = create<State>((set, get) => ({
  movies: [],

  // Fonction pour définir les données des films
  setMoviesData: (movies: Movie[]) => set({ movies }),

  // Trie les films par genre et met à jour le tableau movies avec les films triés
  sortByGenre: (selectedGenre: Movie['Genre']) => {
    if (selectedGenre) {
      const filteredMovies = get().movies.filter(movie => 
        movie.Genre && movie.Genre.includes(selectedGenre)
      );
      set({ movies: filteredMovies });
    }
  }
}));

export default useMovieStore;
