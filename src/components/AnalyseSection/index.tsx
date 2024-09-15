import '../../styles/section.scss';
import LsFilmList from './LsFilmList';

export default function AnalyseSection() {
  return (
    <section className="analyse-section">
      <div className="content">
        <h2>Analyse personnalisée</h2>
        <LsFilmList />
      </div>
    </section>
  );
}
