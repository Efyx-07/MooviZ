import './RankingDropdown.scss';
import { Icon } from '@iconify/react';

export default function RankingDropdown() {
  return (
    <div className="dropdown-container">
      <select className="ranking-dropdown" id="genre-dropdown">
        <option value="">-- Classer par</option>
      </select>
      <Icon
        icon="material-symbols-light:play-arrow"
        className="dropdown-icon"
      />
    </div>
  );
}
