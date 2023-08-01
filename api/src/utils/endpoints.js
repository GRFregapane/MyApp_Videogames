const BASE_URL = '/api';
const API_KEY = process.env.API_KEY;

export const videogamesEndpoint = `${BASE_URL}/videogames`;
export const genresEndpoint = `${BASE_URL}/genres`;

// Obtener todos los videojuegos
export const getAllVideogamesEndpoint = () => `${videogamesEndpoint}?api_key=${API_KEY}`;

// Obtener un videojuego por su id
export const getVideogameByIdEndpoint = (id) => `${videogamesEndpoint}/${id}?api_key=${API_KEY}`;

// Obtener videojuegos por nombre (búsqueda)
export const getVideogamesByNameEndpoint = (name) => `${videogamesEndpoint}?search=${name}&api_key=${API_KEY}`;

// Obtener videojuegos por género
export const getVideogamesByGenreEndpoint = (genreId) => `${videogamesEndpoint}?genres=${genreId}&api_key=${API_KEY}`;

// Obtener todos los géneros
export const getAllGenresEndpoint = () => `${genresEndpoint}?api_key=${API_KEY}`;


/* es un módulo de JavaScript que exporta diferentes endpoints para la API. Se utiliza la variable BASE_URL para definir
 la ruta base de la API y la variable API_KEY para definir la clave de la API. Luego se exportan diferentes funciones que 
 construyen los endpoints para obtener todos los videojuegos, un videojuego por su id, videojuegos por nombre, videojuegos 
 por género y todos los géneros.*/

 //---------------------------------------------------------------------------------------------

/*OTRA OPCIÓN :es un módulo de Node.js que utiliza Axios para hacer una petición a la API de Rawg y obtener información
 de videojuegos. La función getVideogamesFromAPI recibe como parámetro name, que es el nombre del videojuego que se desea
  buscar en la API. Luego se construye la URL con la API key y el nombre del videojuego, se realiza la petición GET y se
   retorna una lista de objetos con la información de los videojuegos obtenidos*/

/*const { API_KEY } = process.env;
const axios = require('axios');

const getVideogamesFromAPI = async (name) => {
  const url = `https://api.rawg.io/api/games?key=${API_KEY}&search=${name}`;
  const response = await axios.get(url);
  return response.data.results.map((game) => {
    return {
      name: game.name,
      description: game.description_raw,
      release_date: game.released,
      rating: game.rating,
      platforms: game.platforms.map((platform) => platform.platform.name),
      image: game.background_image,
    };
  });
};

module.exports = {
  getVideogamesFromAPI,
};*/