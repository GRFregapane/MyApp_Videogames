const { Router } = require('express');
const  Videogames  = require('../models/Videogames.js');
const  Genres  = require('../models/Genres.js');
const videogamesRouter = Router();
const API_HOST = process.env.API_HOST;


// Trae todos los videosjuegos
videogamesRouter.get('/', async (req, res) => {
  try {
    const videogames = await Videogames.findAll({
      include: Genres
    });
    res.json(videogames);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Trae el videojuego por id
videogamesRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const videogame = await Videogames.findByPk(id, {
      include: Genres
    });
    if (!videogame) {
      res.status(404).json({ message: 'Videogame not found' });
    } else {
      res.json(videogame);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Crear un videojuego
videogamesRouter.post('/', async (req, res) => {
  try {
    const {
      name,
      description,
      release_date,
      rating,
      platforms,
      image,
      genres
    } = req.body;
    const videogame = await Videogames.create({
      name,
      description,
      release_date,
      rating,
      platforms,
      image
    });
    for (const genre of genres) {
      const [dbGenre, created] = await Genres.findOrCreate({
        where: { name: genre }
      });
      await VideogameGenre.create({
        videogameId: videogame.id,
        genreId: dbGenre.id
      });
    }
    res.json(videogame);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Buscar videojuego por nombre
videogamesRouter.get('/name', async (req, res) => { 
  try {
    const { name } = req.query;
    const videogamesFromApi = await axios.get(`${API_HOST}/${name}`);
    const videogamesFromDb = await Videogames.findAll({
      where: {
        name: { $iLike: `%${name}%` }
      },
      include: Genres,
      limit: 15
    });

    const videogames = [...videogamesFromApi.data, ...videogamesFromDb];
    if (videogames.length === 0) {
      res.status(404).json({ message: 'No videogames found' });
    } else {
      res.json(videogames.slice(0, 15));
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

//Eliminar un videojuego existente
videogamesRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const videogame = await Videogames.findByPk(id);
    if (!videogame) {
      res.status(404).json({ message: 'Videogame not found' });
    } else {
      await videogame.destroy();
      res.status(204).end();
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = videogamesRouter;



