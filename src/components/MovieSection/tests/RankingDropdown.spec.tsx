import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RankingDropdown from '../RankingDropdown';
import useMovieStore from '@/stores/MovieStore';

// Mock de useMovieStore pour tester le composant
jest.mock('@/stores/MovieStore', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    sortByPopularityDesc: jest.fn(),
    sortByPopularityAsc: jest.fn(),
    sortByYearDesc: jest.fn(),
    sortByYearAsc: jest.fn(),
  })),
}));

describe('RnkingDropdown', () => {
  // Reset des mocks avant chaque test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render dropdown with options', () => {
    render(<RankingDropdown />);

    const dropdown = screen.getByTestId('ranking-dropdown');
    expect(dropdown).toBeInTheDocument();
    const options = screen.getAllByRole('option');
    expect(options.length).toBe(5);

    expect(screen.getByText('Plus populaires en 1er')).toBeInTheDocument();
    expect(screen.getByText('Moins populaires en 1er')).toBeInTheDocument();
    expect(screen.getByText('Plus récents en 1er')).toBeInTheDocument();
    expect(screen.getByText('Plus anciens en 1er')).toBeInTheDocument();
  });

  it('should call sortByPopularityDesc when option is selected', () => {
    const sortByPopularityDesc = jest.fn();
    jest.mocked(useMovieStore).mockReturnValue({ sortByPopularityDesc });

    render(<RankingDropdown />);

    const dropdown = screen.getByTestId('ranking-dropdown');
    fireEvent.change(dropdown, { target: { value: 'Plus populaires en 1er' } });
    waitFor(() => {
      expect(sortByPopularityDesc).toHaveBeenCalled();
    });
  });

  it('should call sortByPopularityAsc when option is selected', () => {
    const sortByPopularityAsc = jest.fn();
    jest.mocked(useMovieStore).mockReturnValue({ sortByPopularityAsc });

    render(<RankingDropdown />);

    const dropdown = screen.getByTestId('ranking-dropdown');
    fireEvent.change(dropdown, {
      target: { value: 'Moins populaires en 1er' },
    });
    waitFor(() => {
      expect(sortByPopularityAsc).toHaveBeenCalled();
    });
  });

  it('should call sortByYearDesc when option is selected', () => {
    const sortByYearDesc = jest.fn();
    jest.mocked(useMovieStore).mockReturnValue({ sortByYearDesc });

    render(<RankingDropdown />);

    const dropdown = screen.getByTestId('ranking-dropdown');
    fireEvent.change(dropdown, {
      target: { value: 'Plus récents en 1er' },
    });
    waitFor(() => {
      expect(sortByYearDesc).toHaveBeenCalled();
    });
  });

  it('should call sortByYearAsc when option is selected', () => {
    const sortByYearAsc = jest.fn();
    jest.mocked(useMovieStore).mockReturnValue({ sortByYearAsc });

    render(<RankingDropdown />);

    const dropdown = screen.getByTestId('ranking-dropdown');
    fireEvent.change(dropdown, {
      target: { value: 'Plus anciens en 1er' },
    });
    waitFor(() => {
      expect(sortByYearAsc).toHaveBeenCalled();
    });
  });
});
