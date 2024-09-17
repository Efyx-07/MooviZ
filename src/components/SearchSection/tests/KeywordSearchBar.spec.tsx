import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
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

  // Test du bon fonctionnement de la recherche par keyword
  it('should call getMoviesByKeywordWithGenres with the correct keyword when search icon is clicked', async () => {
    const keyword = 'keyword';
    (getMoviesByKeywordWithGenres as jest.Mock).mockResolvedValue([]);

    render(<KeywordSearchBar />);
    const inputElement = screen.getByPlaceholderText('Titre du film');
    const iconElement = screen.getByTestId('search-icon');

    // Mock l'entrée de texte
    fireEvent.change(inputElement, { target: { value: keyword } });
    // Mock le clic sur l'icône de recherche
    fireEvent.click(iconElement);

    // Vérifie que la fonction a été appelée avec le mot-clé correct
    expect(getMoviesByKeywordWithGenres).toHaveBeenCalledWith(keyword);
  });
});
