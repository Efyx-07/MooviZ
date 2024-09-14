import '../styles/page.scss';
import SearchSection from '@/components/SearchSection';
import MovieSection from '@/components/MovieSection';
import AnalyseSection from '@/components/AnalyseSection';

export default function Home() {
  return (
    <div className="page">
      <div className="content">
        <SearchSection />
        <MovieSection />
        <AnalyseSection />
      </div>
    </div>
  );
}
