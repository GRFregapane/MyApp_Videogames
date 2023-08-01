import React from 'react';
import { Link } from 'react-router-dom';

function VideogameCard({ videogame }) {
  return (
    <div>
      <Link to={`/videogame/${videogame.id}`}>
        <img src={videogame.image} alt={videogame.name} />
        <h2>{videogame.name}</h2>
      </Link>
        <p>Géneros: {videogame.genres.map((genre) => genre.name).join(', ')}</p>
    </div>
  );
}

export default VideogameCard;

