import '../styles/page.scss';
import SearchSection from '@/components/SearchSection';
import MovieSection from '@/components/MovieSection';

export default function Home() {
  return (
    <div className="page">
      <div className="content">
        <SearchSection />
        <MovieSection />
      </div>
    </div>
  );
}
