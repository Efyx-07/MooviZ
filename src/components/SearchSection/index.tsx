import '../../styles/section.scss';
import Button from '../Shared/Button';

export default function SearchSection() {
  return (
    <section className="search-section">
      <h2>Rechercher un film</h2>
      <div className="search-inputs-container">
        <input type="text" placeholder="Titre du film" />
        <input type="text" placeholder="Genre" />
        <input type="text" placeholder="Année de sortie" />
        <input type="text" placeholder="Popularité" />
      </div>
      <Button
        name="Recherche"
        backgroundColor="orangered"
        color="white"
      ></Button>
    </section>
  );
}
