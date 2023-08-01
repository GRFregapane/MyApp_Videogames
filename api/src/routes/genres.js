const { Router } = require('express');
const genresRouter = Router();

const { getVideogameGenres, getVideogameGenreById } = require('../controllers/genresControllers.js');

// ruta para buscar todos los generos de videos juegos
genresRouter.get('/genres', async (req, res) => {
  try {
    const genres = await getVideogameGenres.findAll();
    res.status(200).json(genres);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

//ruta oara obtener un genero de un videojuego en específico por su id.
genresRouter.get('/genres/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const genre = await getVideogameGenreById.findByPk(id);
    if (!genre) {
      return res.status(404).json({ message: 'Genre not found' });
    }
    res.status(200).json(genre);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = genresRouter;
