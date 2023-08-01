import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteVideogame } from '../actions';
 
function DeleteVideogame({ videogame}) {
  const dispatch = useDispatch();
 
 //función que se ejecuta al presionar el botón 
  const handleClick = () => {
    dispatch(deleteVideogame(videogame.id));
  };
 
  return (
    <button onClick={handleClick}>DELETE</button>
  );
}
 
export default DeleteVideogame;

