import { create } from 'zustand';
import { Movie } from '@/interfaces/movie.interface';

interface State {
  movies: Movie[];
  setMoviesData: (movies: Movie[]) => void;
}

const useMovieStore = create<State>((set, get) => ({
  movies: [],

  // Fonction pour définir les données des films
  setMoviesData: (movies: Movie[]) => set({ movies }),
}));

export default useMovieStore;
