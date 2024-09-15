import { Movie } from '@/interfaces/movie.interface';
import useMovieStore from '@/stores/MovieStore';
import { useState } from 'react';
import Dropdown from '../Shared/Dropdown';

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

  // Mappe pour récupérer les options
  const options = sortedYears.map((year) => ({ label: year, value: year }));

  // Procède au filtrage selon l'année sélectionnée
  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const year = event.target.value;
    setSelectedYear(year);
    movieStore.filterByYear(year);
  };

  return (
    <div className="dropdown-container">
      <Dropdown
        id="year-dropdown"
        selectedValue={selectedYear}
        onChange={handleYearChange}
        defaultLabel="-- Année de sortie"
        options={options}
      />
    </div>
  );
}
