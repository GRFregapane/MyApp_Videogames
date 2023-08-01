const axios = require('axios');
const { Genres } = require('../db.js');



// buscar géneros
const getVideogameGenres = async (req, res) => {
    try {
      const genres = await Genres.findAll();
      res.status(200).json(genres);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  /*
const getVideogameGenres = async (req, res) => {
  try {
    const response = await axios.get('URL_API');
    const genres = response.data;

    for (const genre of genres) {
      await Genres.create(genre);
    }

  //buscar género de un videojuego en específico por su id
  const getVideogameGenreById = async (req, res) => {
    const { id } = req.params;
    try {
      const genre = await Genres.findByPk(id);
      if (!genre) {
        return res.status(404).json({ message: 'Genre not found' });
      }
      res.status(200).json(genre);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  module.exports = {
    getVideogameGenres,
    getVideogameGenreById
  }