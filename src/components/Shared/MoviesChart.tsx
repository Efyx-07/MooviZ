import './MoviesChart.scss';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import useMovieStore from '@/stores/MovieStore';
import { Movie } from '@/interfaces/movie.interface';

// Enregistre les composants de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

// Passe les props
interface MoviesChartProps {
  movies: Movie[];
}

export default function MoviesChart({ movies }: MoviesChartProps) {
  // Configure les données du graphique
  const data = {
    labels: movies.map((movie) => movie.Title), // Label des barres
    datasets: [
      {
        label: 'IMDb Rating', // Legende du graphique
        data: movies.map((movie) => parseFloat(movie.imdbRating || '0')), // note IMDb des filteredmovies
        backgroundColor: 'rgb(255, 69, 0)', // Couleur des barres
        borderColor: '#ff4500',
        borderWidth: 1,
      },
    ],
  };

  // Configure les options du graphique
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top' as const, // Position de la légende
      },
      title: {
        display: true,
        text: 'Classement des films par note IMDb',
      },
    },
    scales: {
      y: {
        beginAtZero: true, // Commencer l'axe Y à 0
        ticks: {
          stepSize: 1, // Échelle de l'axe Y
        },
      },
    },
  };

  return (
    <div className="movies-chart">
      <Bar data={data} options={options} />
    </div>
  );
}
