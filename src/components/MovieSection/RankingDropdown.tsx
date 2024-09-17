import './RankingDropdown.scss';
import { Icon } from '@iconify/react';
import useMovieStore from '@/stores/MovieStore';
import Dropdown from '../Shared/Dropdown';

export default function RankingDropdown() {
  const movieStore = useMovieStore();

  const handleRankChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    if (value === 'popularityDesc') movieStore.sortByPopularityDesc();
    if (value === 'popularityAsc') movieStore.sortByPopularityAsc();
    if (value === 'yearDesc') movieStore.sortByYearDesc();
    if (value === 'yearAsc') movieStore.sortByYearAsc();
  };

  return (
    <div>
      <Dropdown
        id="type"
        selectedValue=""
        onChange={handleRankChange}
        defaultLabel="-- Classer par"
        options={[
          { label: 'Plus populaires en 1er', value: 'popularityDesc' },
          { label: 'Moins populaires en 1er', value: 'popularityAsc' },
          { label: 'Plus récents en 1er', value: 'yearDesc' },
          { label: 'Plus anciens en 1er', value: 'yearAsc' },
        ]}
      />
    </div>
  );
}
