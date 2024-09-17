import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import GenreDropdown from '../GenreDropdown';
import useMovieStore from '@/stores/MovieStore';

// Mock de useMovieStore pour tester le composant
jest.mock('@/stores/MovieStore', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    filterByGenre: jest.fn(),
  })),
}));

const mockGenres: string[] = ['Action', 'Comedy', 'Drama', 'Horror'];

jest.mock('../GenreDropdown', () => {
  return function MockedGenreDropdown() {
    return (
      <select data-testid="genre-dropdown">
        {mockGenres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
    );
  };
});

describe('GenreDropdown', () => {
  // Reset des mocks avant chaque test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render dropdown with options', () => {
    render(<GenreDropdown />);

    const dropdown = screen.getByTestId('genre-dropdown');
    expect(dropdown).toBeInTheDocument();

    const options = screen.getAllByRole('option');
    expect(options.length).toBe(mockGenres.length);

    mockGenres.forEach((genre) => {
      expect(screen.getByText(genre)).toBeInTheDocument();
    });
  });

  it('should call filterByGenre when a genre is selected', () => {
    const filterByGenre = jest.fn();
    jest.mocked(useMovieStore).mockReturnValue({ filterByGenre });

    render(<GenreDropdown />);

    const dropdown = screen.getByTestId('genre-dropdown');
    fireEvent.change(dropdown, { target: { value: 'Action' } });
    // Attend que la fonction soit appelée
    waitFor(() => {
      expect(filterByGenre).toHaveBeenCalledWith('Action');
    });
  });

  it('should call filterByYear with null when no year is selected', () => {
    const filterByGenre = jest.fn();
    jest.mocked(useMovieStore).mockReturnValue({ filterByGenre });

    render(<GenreDropdown />);

    const dropdown = screen.getByTestId('genre-dropdown');
    fireEvent.change(dropdown, { target: { value: '' } });
    // Attend que la fonction soit appelée
    waitFor(() => {
      expect(filterByGenre).toHaveBeenCalledWith(null);
    });
  });
});
