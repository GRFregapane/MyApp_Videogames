import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getVideogameDetail } from '../actions';

function Detail({ match }) {
  const dispatch = useDispatch();
  const videogame = useSelector((state) => state.videogameDetail);

  useEffect(() => {
    dispatch(getVideogameDetail(match.params.id));
  }, [dispatch, match.params.id]);

  return (
    <div>
      <h2>{videogame.name}</h2>
      <img src={videogame.image} alt={videogame.name} />
      <p>Plataformas: {videogame.platforms.join(', ')}</p>
      <p>Descripción: {videogame.description}</p>
      <p>Fecha de lanzamiento: {videogame.releaseDate}</p>
      <p>Rating: {videogame.rating}</p>
      <p>Géneros: {videogame.genres.join(', ')}</p>
    </div>
  );
}

export default Detail;
