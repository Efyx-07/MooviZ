import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AnalysisMovieForm from '../AnalysisMovieForm';
import useAnalysisCriteriaStore from '@/stores/AnalysisCriteriaStore';

jest.mock('@/stores/AnalysisCriteriaStore', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    setCriteria: jest.fn().mockResolvedValue(undefined),
  })),
}));

jest.mock('@iconify/react', () => ({
  Icon: () => null,
}));

describe('AnalysisMovieForm', () => {
  // Reset des mocks avant chaque test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the form with correct fields', () => {
    render(<AnalysisMovieForm movies={[]} />);

    expect(screen.getByLabelText('Type')).toBeInTheDocument();
    expect(screen.getByLabelText('Genre')).toBeInTheDocument();
    expect(screen.getByLabelText('Note minimale')).toBeInTheDocument();
    expect(screen.getByLabelText('Note maximale')).toBeInTheDocument();
    expect(screen.getByLabelText('Année de départ')).toBeInTheDocument();
    expect(screen.getByLabelText('Année de fin')).toBeInTheDocument();
  });

  it('should call setCriteria when form is submitted', async () => {
    const setCriteria = jest.fn().mockResolvedValue(undefined);
    jest.mocked(useAnalysisCriteriaStore).mockReturnValue({ setCriteria });

    render(<AnalysisMovieForm movies={[]} />);

    fireEvent.change(screen.getByLabelText('Type'), {
      target: { value: 'movie' },
    });

    fireEvent.change(screen.getByLabelText('Genre'), {
      target: { value: '' },
    });

    fireEvent.change(screen.getByLabelText('Note minimale'), {
      target: { value: '7' },
    });

    fireEvent.change(screen.getByLabelText('Note maximale'), {
      target: { value: '8.5' },
    });

    fireEvent.change(screen.getByLabelText('Année de départ'), {
      target: { value: '1980' },
    });

    fireEvent.change(screen.getByLabelText('Année de fin'), {
      target: { value: '2024' },
    });

    fireEvent.submit(screen.getByTestId('analysis-movie-form'));

    await waitFor(() => {
      expect(setCriteria).toHaveBeenCalledWith({
        type: 'movie',
        genre: '',
        minRating: 7,
        maxRating: 8.5,
        startYear: 1980,
        endYear: 2024,
      });
    });
  });
});
