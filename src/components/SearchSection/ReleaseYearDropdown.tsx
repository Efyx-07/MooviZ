import { Movie } from '@/interfaces/movie.interface';
import useMovieStore from '@/stores/MovieStore';
import { useState } from 'react';

export default function ReleaseYearDropdown() {
  const [selectedYear, setSelectedYear] = useState<string>('');
  const movieStore = useMovieStore();

  // Récupère les films filtrés stockés dans le store
  const movies: Movie[] = movieStore.initialMovies;

  // Récupère leurs dates de sorties, crée un set pour éviter les doublons
  const years: string[] = Array.from(
    new Set(movies.map((movie) => movie.Year)),
  );

  //Trie les dates de la plus récente à la plus ancienne
  const sortedYears: string[] = years.sort((a, b) => parseInt(b) - parseInt(a));

  // Procède au filtrage selon l'année sélectionnée
  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const year = event.target.value;
    setSelectedYear(year);
    movieStore.filterByYear(year);
  };

  return (
    <>
      <select
        id="year-dropdown"
        value={selectedYear}
        onChange={handleYearChange}
      >
        <option value="">-- Date de sortie</option>
        {sortedYears.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </>
  );
}
