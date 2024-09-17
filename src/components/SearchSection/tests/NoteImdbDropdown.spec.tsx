import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import NoteImdbDropdown from '../NoteImdbDropdown';
import useMovieStore from '@/stores/MovieStore';

// Mock de useMovieStore pour tester le composant
jest.mock('@/stores/MovieStore', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    filterByImdbRatingRange: jest.fn(),
  })),
}));

describe('NoteImdbDropdown Component', () => {
  // Reset des mocks avant chaque test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the dropdown with options', () => {
    render(<NoteImdbDropdown />);
    const dropdown = screen.getByTestId('noteImdb-dropdown');
    expect(dropdown).toBeInTheDocument();

    // Vérifie que les options sont rendues
    expect(screen.getByText('entre 0 et 2')).toBeInTheDocument();
    expect(screen.getByText('entre 2 et 4')).toBeInTheDocument();
    expect(screen.getByText('entre 4 et 6')).toBeInTheDocument();
    expect(screen.getByText('entre 6 et 8')).toBeInTheDocument();
    expect(screen.getByText('entre 8 et 10')).toBeInTheDocument();
  });

  it('should call filterByImdbRatingRange when selection change', () => {
    const filterByImdbRatingRange = jest.fn();
    jest.mocked(useMovieStore).mockReturnValue({ filterByImdbRatingRange });

    render(<NoteImdbDropdown />);

    // Simule le changement de valeur dans le dropdown
    fireEvent.change(screen.getByTestId('noteImdb-dropdown'), {
      target: { value: '0-2' },
    });

    // Vérifie que la fonction a été appelée avec les bons arguments
    expect(filterByImdbRatingRange).toHaveBeenCalledWith(0, 2);
  });

  it('should call filterByImdbRatingRange without arguments when no selection is made', () => {
    const filterByImdbRatingRange = jest.fn();
    jest.mocked(useMovieStore).mockReturnValue({ filterByImdbRatingRange });

    render(<NoteImdbDropdown />);

    // Simule la réinitialisation du dropdown
    fireEvent.change(screen.getByTestId('noteImdb-dropdown'), {
      target: { value: '' },
    });

    // Vérifie que la fonction a été appelée sans arguments
    expect(filterByImdbRatingRange).toHaveBeenCalledWith();
  });
});
