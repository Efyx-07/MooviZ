'use client';

import '../../styles/section.scss';
import { useState } from 'react';
import { Movie } from '@/interfaces/movie.interface';
import Button from '../Shared/Button';
import { FetchMovieByKeyword } from '@/services/movie.service';
import useMovieStore from '@/stores/MovieStore';

export default function SearchSection() {
  const [keyword, setKeyword] = useState<Movie['Title']>('');
  const movieStore = useMovieStore();

  // Procéde à la recherche par mot-clé
  const handleSearchByKeyword = async () => {
    try {
      const response = await FetchMovieByKeyword(keyword);
      if (response) {
        // Met à jour la liste des films dans le store
        movieStore.setMoviesData(response);
      }
    } catch (error) {
      console.error('Error fetching movies', error);
    }
  };

  return (
    <section className="search-section">
      <h2>Rechercher un film</h2>
      <div className="search-inputs-container">
        <input
          type="text"
          placeholder="Titre du film"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>
      <Button
        name="Recherche"
        backgroundColor="orangered"
        color="white"
        onClick={handleSearchByKeyword}
      ></Button>
    </section>
  );
}
