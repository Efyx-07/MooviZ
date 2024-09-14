// Stocke la clé API de OMDB provenant du .env
// ===========================================================================================
const OmdbApiKey: string | undefined = process.env.NEXT_PUBLIC_OMDB_APIKEY;

// Stocke la base URL de l'API Omdb et y inclut l'Api Key
// ===========================================================================================
export const OmdbBaseUrl: string | undefined =
  `http://www.omdbapi.com/?apikey=${OmdbApiKey}&`;
