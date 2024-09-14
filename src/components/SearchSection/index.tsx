'use client';

import '../../styles/section.scss';
import KeywordSearchBar from './KeywordSearchBar';

export default function SearchSection() {
  return (
    <section className="search-section">
      <h2>Rechercher un film</h2>
      <KeywordSearchBar />
    </section>
  );
}
