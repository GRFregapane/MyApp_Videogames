const axios = require('axios');
const { Videogames } = require('../db.js');
const { API_KEY, API_HOST } = process.env;


const getVideogames = async (req, res) => {
  try {
    const games = await Videogames.findAll();
    res.status(200).json(games);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getVideogameById = async (req, res) => {
  const { id } = req.params;
  try {
    const game = await Videogames.findByPk(id);
    if (!game) {
      return res.status(404).json({ message: 'Videogame not found' });
    }
    res.status(200).json(game);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const createVideogame = async (req, res) => {
  const { title, genre, platform } = req.body;
  try {
    const newGame = await Videogames.create({
      title,
      genre,
      platform,
    });
    res.status(201).json(newGame);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Función que utiliza axios y la api_key para hacer una llamada a una API externa
const getVideogameDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(`${API_HOST}/${id}?api_key=${API_KEY}`);
    const game = response.data;
    res.status(200).json(game);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


const deleteVideogame = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedGame = await Videogames.destroy({ where: { id } });
    if (deletedGame === 0) {
      return res.status(404).json({ message: 'Videogame not found' });
    }
    res.status(200).json({ message: 'Videogame removed successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


module.exports = {
  getVideogames,
  getVideogameById,
  createVideogame,
  getVideogameDetails,
  deleteVideogame
};


