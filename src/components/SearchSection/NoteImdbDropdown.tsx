import './AdvSearchDropdown.scss';
import useMovieStore from '@/stores/MovieStore';
import { useState } from 'react';
import { Icon } from '@iconify/react';

export default function NoteTESTImdbDropdown() {
  const [selectedNoteRange, setSelectedNoteRange] = useState<string>('');
  const movieStore = useMovieStore();

  // Plages de notes IMDb
  const ratingRanges = [
    { label: 'entre 0 et 2', min: 0, max: 2 },
    { label: 'entre 2 et 4', min: 2.1, max: 4 },
    { label: 'entre 4 et 6', min: 4.1, max: 6 },
    { label: 'entre 6 et 8', min: 6.1, max: 8 },
    { label: 'entre 8 et 10', min: 8.1, max: 10 },
  ];

  // Procède au filtrage selon la plage de note sélectionnée
  const handleNoteRangeChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const selectedRange = event.target.value;
    setSelectedNoteRange(selectedRange);

    if (selectedRange) {
      const [min, max] = selectedRange.split('-').map(Number);
      movieStore.filterByImdbRatingRange(min, max);
    }
  };

  return (
    <div className="dropdown-container">
      <select
        className="advSearch-dropdown"
        id="noteImdb-dropdown"
        value={selectedNoteRange}
        onChange={handleNoteRangeChange}
      >
        <option value="">-- Sélectionnez une plage de notes --</option>
        {ratingRanges.map((range) => (
          <option key={range.label} value={`${range.min}-${range.max}`}>
            {range.label}
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
