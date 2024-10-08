// Stocke la clé API de OMDB provenant du .env
// ===========================================================================================
const OmdbApiKey: string | undefined = process.env.NEXT_PUBLIC_OMDB_APIKEY;

// Stocke la base URL de l'API Omdb et y inclut l'Api Key
// De base l'adresse est en http, modifiée en https pour éviter les requêtes mixtes (!IMPORTANT en production)
// ===========================================================================================
export const OmdbBaseUrl: string | undefined =
  `https://www.omdbapi.com/?apikey=${OmdbApiKey}&`;

// Récupère l'année en cour
// ===========================================================================================
export const currentYear: number = new Date().getFullYear();
