'use client';

import '../../styles/section.scss';
import KeywordSearchBar from './KeywordSearchBar';
import GenreDropdown from './GenreDropdown';
import ReleaseYearDropdown from './ReleaseYearDropdown';

export default function SearchSection() {
  return (
    <section className="search-section">
      <h2>Rechercher un film</h2>
      <KeywordSearchBar />
      <div className="advanced-search">
        <h3>Recherche avancée</h3>
        <GenreDropdown />
        <ReleaseYearDropdown />
      </div>
    </section>
  );
}
