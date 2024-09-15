'use client';

import '../../styles/section.scss';
import './SearchSection.scss';
import KeywordSearchBar from './KeywordSearchBar';
import GenreDropdown from './GenreDropdown';
import ReleaseYearDropdown from './ReleaseYearDropdown';
import NoteImdbDropdown from './NoteImdbDropdown';

export default function SearchSection() {
  return (
    <section className="search-section">
      <div className="main-search">
        <h2 className="search-title">Rechercher un film</h2>
        <KeywordSearchBar />
      </div>
      <div className="advanced-search">
        <h3>Recherche avancée</h3>
        <div className="dropdowns-container">
          <div className="content">
            <GenreDropdown />
            <ReleaseYearDropdown />
            <NoteImdbDropdown />
          </div>
        </div>
      </div>
    </section>
  );
}
