import './AdvSearchDropdown.scss';
import { Movie } from '@/interfaces/movie.interface';
import useMovieStore from '@/stores/MovieStore';
import { useState } from 'react';
import { Icon } from '@iconify/react';

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
    <div className="dropdown-container">
      <select
        className="advSearch-dropdown"
        id="year-dropdown"
        value={selectedYear}
        onChange={handleYearChange}
      >
        <option value="">-- Année de sortie</option>
        {sortedYears.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
      <Icon
        icon="material-symbols-light:play-arrow"
        className="dropdown-icon"
      />
    </div>
  );
}
