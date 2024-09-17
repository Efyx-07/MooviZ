import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import KeywordSearchBar from '../KeywordSearchBar';
import { getMoviesByKeywordWithGenres } from '@/services/movie.service';
import useMovieStore from '@/stores/MovieStore';

// Mock des dépendances
jest.mock('@/services/movie.service', () => ({
  getMoviesByKeywordWithGenres: jest.fn(),
}));
jest.mock('@/stores/MovieStore', () => ({
  __esModule: true,
  default: () => ({
    setMoviesData: jest.fn(),
    addMoviesToAllSearched: jest.fn(),
  }),
}));

describe('KeywordSearchBar', () => {
  const setMovieData = jest.fn();
  const addMoviesToAllSearched = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test de rendu
  it('should render the search bar and icon', () => {
    render(<KeywordSearchBar />);
    // Vérifie la présence du champ de saisie
    const inputElement = screen.getByPlaceholderText('Titre du film');
    expect(inputElement).toBeInTheDocument();
    // Vérifie la présence de l'icone de recherche
    const iconElement = screen.getByTestId('search-icon');
    expect(iconElement).toBeInTheDocument();
  });
});
