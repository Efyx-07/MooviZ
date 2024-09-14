import './MovieCard.scss';
import Image from 'next/image';

interface MovieCardProps {
  title: string;
  poster: string;
  year: string;
}

export default function MovieCard() {
  return (
    <div className="movie-card">
      <div className="image-container">
        <Image
          className="img"
          src="https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg"
          width={400}
          height={500}
          alt=""
          priority
        />
      </div>
      <div className="infos-container">
        <p className="movie-title">Inception</p>
        <p className="movie-year">2010</p>
      </div>
    </div>
  );
}
