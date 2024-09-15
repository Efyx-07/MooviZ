import './RankingDropdown.scss';
import { Icon } from '@iconify/react';
import useMovieStore from '@/stores/MovieStore';

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
    <div className="dropdown-container">
      <select
        className="ranking-dropdown"
        id="genre-dropdown"
        onChange={handleRankChange}
      >
        <option value="">-- Classer par</option>
        <option value="popularityDesc">Plus populaires en 1er</option>
        <option value="popularityAsc">Moins populaires en 1er</option>
        <option value="yearDesc">Plus récents en 1er</option>
        <option value="yearAsc">Plus anciens en 1er</option>
      </select>
      <Icon
        icon="material-symbols-light:play-arrow"
        className="dropdown-icon"
      />
    </div>
  );
}
