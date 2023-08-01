import axios from 'axios';
import {
  SEARCH_VIDEOGAMES,
  VIEW_VIDEOGAME,
  FILTER_VIDEOGAMES,
  SORT_VIDEOGAMES,
  CREATE_VIDEOGAME,
  DELETE_VIDEOGAME,
  FETCH_VIDEOGAMES_PAGE_REQUEST, 
  FETCH_VIDEOGAMES_PAGE_SUCCESS, 
  FETCH_VIDEOGAMES_PAGE_FAILURE,
} from './actionsTypes'
import { videogamesEndpoint } from '../../../api/src/utils';

// Acción para buscar videojuegos
export const searchVideogames = (query) => (dispatch) => {
  axios
    .get(`${videogamesEndpoint}?search=${query}`)
    .then((response) => {
      dispatch({ type: SEARCH_VIDEOGAMES, payload: response.data });
    })
    .catch((error) => {
      console.error(error);
    });
};

// Acción para visualizar un videojuego
export const viewVideogame = (id) => (dispatch) => {
  axios
    .get(`${videogamesEndpoint}/${id}`)
    .then((response) => {
      dispatch({ type: VIEW_VIDEOGAME, payload: response.data });
    })
    .catch((error) => {
      console.error(error);
    });
};

// Acción para filtrar videojuegos
export const filterVideogames = (filters) => (dispatch) => {
  axios
    .get('videogamesEndpoint', { params: filters })
    .then((response) => {
      dispatch({ type: FILTER_VIDEOGAMES, payload: response.data });
    })
    .catch((error) => {
      console.error(error);
    });
};

// Acción para ordenar videojuegos
export const sortVideogames = (sortBy) => (dispatch) => {
  axios
    .get('videogamesEndpoint', { params: { sort: sortBy } })
    .then((response) => {
      dispatch({ type: SORT_VIDEOGAMES, payload: { sortBy, data: response.data } });
    })
    .catch((error) => {
      console.error(error);
    });
};

// Acción para crear un nuevo videojuego
export const createVideogame = (data) => (dispatch) => {
  axios
    .post('videogamesEndpoint', data)
    .then((response) => {
      dispatch({ type: CREATE_VIDEOGAME, payload: response.data });
    })
    .catch((error) => {
      console.error(error);
    });
};

// Acción para eliminar un videojuego
export const deleteVideogame = (id) => (dispatch) => {
  axios
    .delete(`${videogamesEndpoint}/${id}`)
    .then(() => {
      dispatch({ type: DELETE_VIDEOGAME, payload: id });
    })
    .catch((error) => {
      console.error(error);
    });
};

export const fetchVideogamesPageRequest = () => ({
  type: FETCH_VIDEOGAMES_PAGE_REQUEST
});

export const fetchVideogamesPageSuccess = (videoGames, page) => ({
  type: FETCH_VIDEOGAMES_PAGE_SUCCESS,
  payload: { videoGames, page }
});

export const fetchVideogamesPageFailure = (error) => ({
  type: FETCH_VIDEOGAMES_PAGE_FAILURE,
  payload: error
});

export const fetchVideogamesPage = (page) => {
  return (dispatch) => {
    dispatch(fetchVideogamesPageRequest());
    return fetch(`https://example.com/api/video-games?page=${page}`)
      .then(response => response.json())
      .then(data => dispatch(fetchVideogamesPageSuccess(data, page)))
      .catch(error => dispatch(fetchVideogamesPageFailure(error)));
  };
};