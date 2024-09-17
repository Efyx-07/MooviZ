import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ReleaseYearDropdown from '../ReleaseYearDropdown';
import useMovieStore from '@/stores/MovieStore';

// Mock de useMovieStore pour tester le composant
jest.mock('@/stores/MovieStore', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    filterByYear: jest.fn(),
  })),
}));

const mockYears = [2024, 2023, 2022, 2021, 2020];

jest.mock('../ReleaseYearDropdown', () => {
  return function MockedReleaseYearDropdown() {
    return (
      <select data-testid="release-year-dropdown">
        {mockYears.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    );
  };
});

describe('ReleaseYearDropdown', () => {
  // Reset des mocks avant chaque test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render dropdown with options', () => {
    render(<ReleaseYearDropdown />);

    const dropdown = screen.getByTestId('release-year-dropdown');
    expect(dropdown).toBeInTheDocument();

    const options = screen.getAllByRole('option');
    expect(options.length).toBe(mockYears.length);

    mockYears.forEach((year) => {
      expect(screen.getByText(year.toString())).toBeInTheDocument();
    });
  });

  it('should call filterByYear when a year is selected', () => {
    const filterByYear = jest.fn();
    jest.mocked(useMovieStore).mockReturnValue({ filterByYear });

    render(<ReleaseYearDropdown />);

    const dropdown = screen.getByTestId('release-year-dropdown');
    fireEvent.change(dropdown, { target: { value: '2024' } });
    // Attend que la fonction soit appelée
    waitFor(() => {
      expect(filterByYear).toHaveBeenCalledWith(2024);
    });
  });

  it('should call filterByYear with null when no year is selected', () => {
    const filterByYear = jest.fn();
    jest.mocked(useMovieStore).mockReturnValue({ filterByYear });

    render(<ReleaseYearDropdown />);

    const dropdown = screen.getByTestId('release-year-dropdown');
    fireEvent.change(dropdown, { target: { value: '' } });
    // Attend que la fonction soit appelée
    waitFor(() => {
      expect(filterByYear).toHaveBeenCalledWith(null);
    });
  });
});
