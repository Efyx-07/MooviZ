import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import KeywordSearchBar from '../KeywordSearchBar';
import { getMoviesByKeywordWithGenres } from '@/services/movie.service';
import { Movie } from '@/interfaces/movie.interface';

// Mock des dépendances
jest.mock('@/services/movie.service', () => ({
  getMoviesByKeywordWithGenres: jest.fn(),
}));

const mockSetMoviesData = jest.fn();
const mockAddMoviesToAllSearched = jest.fn();

jest.mock('@/stores/MovieStore', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    setMoviesData: mockSetMoviesData,
    addMoviesToAllSearched: mockAddMoviesToAllSearched,
  })),
}));

// Mock de l'icône
jest.mock('@iconify/react');

describe('KeywordSearchBar', () => {
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

  // Test la mise à jour du store après une recherche réussie
  it('should update the store with the search results', async () => {
    const keyword: Movie['Title'] = 'keyword';
    const mockMovies: Movie[] = [
      {
        Title: 'Title',
        Year: '2000',
        imdbID: 'imdbID',
        Type: 'movie',
        Poster: 'https://m.media-amazon.com/images/M/Poster.jpg',
      },
    ];

    (getMoviesByKeywordWithGenres as jest.Mock).mockResolvedValue(mockMovies);

    render(<KeywordSearchBar />);
    const inputElement = screen.getByPlaceholderText('Titre du film');
    const iconElement = screen.getByTestId('search-icon');

    fireEvent.change(inputElement, { target: { value: keyword } });
    fireEvent.click(iconElement);

    await waitFor(() => {
      expect(mockSetMoviesData).toHaveBeenCalledWith(mockMovies);
      expect(mockAddMoviesToAllSearched).toHaveBeenCalledWith(mockMovies);
    });
  });

  // Test la gestion des erreurs API
  it('should handle errors from the API call', async () => {
    const keyword: Movie['Title'] = 'keyword';
    (getMoviesByKeywordWithGenres as jest.Mock).mockRejectedValue(
      new Error('API Error'),
    );

    const consoleError = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(<KeywordSearchBar />);

    const inputElement = screen.getByPlaceholderText('Titre du film');
    const iconElement = screen.getByTestId('search-icon');

    fireEvent.change(inputElement, { target: { value: keyword } });
    fireEvent.click(iconElement);

    // Vérifie que console.error a été appelé
    await waitFor(() => {
      expect(consoleError).toHaveBeenCalledWith(
        'Error fetching movies',
        expect.any(Error),
      );
    });

    // Nettoyage du mock
    consoleError.mockRestore();
  });
});
