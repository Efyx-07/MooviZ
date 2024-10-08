import useMovieStore from '@/stores/MovieStore';
import { useState } from 'react';
import Dropdown from '../Shared/Dropdown';

export default function NoteImdbDropdown() {
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

  // Mappe pour récupérer les options
  const options = ratingRanges.map((range) => ({
    label: range.label,
    min: range.min,
    max: range.max,
  }));

  // Procède au filtrage selon la plage de note sélectionnée
  const handleNoteRangeChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const selectedRange = event.target.value;
    setSelectedNoteRange(selectedRange);

    if (selectedRange) {
      const [min, max] = selectedRange.split('-').map(Number);
      movieStore.filterByImdbRatingRange(min, max);
    } else {
      // Réinitialise les films si aucune plage n'est sélectionnée
      movieStore.filterByImdbRatingRange();
    }
  };

  return (
    <div className="dropdown-container">
      <Dropdown
        id="noteImdb-dropdown"
        data-testid="noteImdb-dropdown"
        selectedValue={selectedNoteRange}
        onChange={handleNoteRangeChange}
        defaultLabel="-- Sélectionnez une plage de notes"
        options={options}
      />
    </div>
  );
}
