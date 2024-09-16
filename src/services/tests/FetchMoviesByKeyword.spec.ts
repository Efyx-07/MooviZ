import { Movie } from '@/interfaces/movie.interface';
import { OmdbBaseUrl } from '@/config';
import { FetchMoviesByKeyword } from '../movie.service';

// Mock global fetch function
global.fetch = jest.fn();

// Test de FetchMoviesByKeyword
// ===========================================================================================
describe('FetchMoviesByKeyword', () => {
  const mockResponse = {
    Search: [
      {
        Title: 'Title',
        Year: '2000',
        imdbID: 'imdbID',
        Type: 'movie',
        Poster: 'https://m.media-amazon.com/images/M/Poster.jpg',
      },
    ],
  };

  // Nettoie les mocks après chaque test
  afterEach(() => {
    jest.clearAllMocks();
  });

  //  Teste le scénario succés
  it('should fetch and return movies when API call is successful', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    const keyword = 'keyword';
    const movies: Movie[] = await FetchMoviesByKeyword(keyword);
    expect(fetch).toHaveBeenCalledWith(`${OmdbBaseUrl}&s=${keyword}`);
    expect(movies).toEqual(mockResponse.Search);
  });

  //  Teste le scénario echec
  it('should throw an error when the API call fails', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      statusText: 'Server error',
    });
    const keyword = 'keyword';
    await expect(FetchMoviesByKeyword(keyword)).rejects.toThrow(
      'Error while fetching movies: Error: Error while fetching movies',
    );
  });
});
