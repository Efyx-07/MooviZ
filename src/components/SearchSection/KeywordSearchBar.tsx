import { useState } from 'react';
import { Movie } from '@/interfaces/movie.interface';
import { FetchMoviesByKeywordWithGenres } from '@/services/movie.service';
import useMovieStore from '@/stores/MovieStore';
import Button from '../Shared/Button';

export default function KeywordSearchBar() {
  const [keyword, setKeyword] = useState<Movie['Title']>('');
  const movieStore = useMovieStore();

  // Procéde à la recherche par mot-clé
  const handleSearchByKeyword = async (): Promise<void> => {
    try {
      const response = await FetchMoviesByKeywordWithGenres(keyword);
      if (response) {
        // Met à jour la liste des films dans le store
        movieStore.setMoviesData(response);
      }
    } catch (error) {
      console.error('Error fetching movies', error);
    }
  };
  return (
    <div className="keyword-searchbar">
      <input
        type="text"
        placeholder="Titre du film"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Button
        name="Recherche"
        backgroundColor="orangered"
        color="white"
        onClick={handleSearchByKeyword}
      />
    </div>
  );
}
