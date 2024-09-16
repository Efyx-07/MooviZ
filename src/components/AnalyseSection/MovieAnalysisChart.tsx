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

// Enregistre les composants de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export default function MovieAnalysisChart() {
  // Récupère les films filtrés sur le store
  const { analysedMovies } = useMovieStore();

  // Configure les données du graphique
  const data = {
    labels: analysedMovies.map((movie) => movie.Title), // Label des barres
    datasets: [
      {
        label: 'IMDb Rating', // Legende du graphique
        data: analysedMovies.map((movie) =>
          parseFloat(movie.imdbRating || '0'),
        ), // note IMDb des filteredmovies
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
    <div className="movie-analysis-chart">
      <Bar data={data} options={options} />
    </div>
  );
}
