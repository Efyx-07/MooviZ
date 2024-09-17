import { Movie } from '@/interfaces/movie.interface';
import { OmdbBaseUrl } from '@/config';
import { FetchMovieDetailsById } from '../movie.service';

// Mock global fetch function
global.fetch = jest.fn();

// Test de FetchMoviesByKeyword
// ===========================================================================================
describe('FetchMovieDetailsById', () => {
  // Nettoie les mocks après chaque test
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockResponse: Movie = {
    Title: 'Title',
    Year: '2000',
    imdbID: 'imdbID',
    Type: 'movie',
    Poster: 'https://m.media-amazon.com/images/M/Poster.jpg',
    Genre: 'genre',
    imdbRating: '8.5',
  };

  //  Teste le scénario succés
  it('should fetch and return movie with details when API call is successful', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    const movieId: Movie['imdbID'] = 'tt0000000';
    const result = await FetchMovieDetailsById(movieId);
    expect(fetch).toHaveBeenCalledWith(`${OmdbBaseUrl}&i=${movieId}`);
    expect(result).toEqual(mockResponse);
  });

  //  Teste le scénario echec
  it('should throw an error when the API call fails', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      statusText: 'Server error',
    });
    const movieId: Movie['imdbID'] = 'tt0000000';
    await expect(FetchMovieDetailsById(movieId)).rejects.toThrow(
      'Error while fetching movie details: Error: Error while fetching movie details',
    );
  });
});
