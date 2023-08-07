import {
    server,
    GET_GAMES,
    GET_GENRES,
    GET_GAME_DETAILS,
    GET_GAME_SEARCHED,
    FILTER_BY_GENRE,
    FILTER_BY_CREATED, 
    SORT_BY_RATING, 
    SORT_BY_NAME
} from '../constants' //constantes representan las diferentes acciones que se pueden realizar.

//import axios from 'axios';



/*export function getGames() {
    return function (dispatch) {
      return axios.get(`${server}/videogames`)
        .then(json => {
          dispatch({
            type: GET_GAMES,
            payload: JSON
          });
        })
        .catch(error => alert(error));
    };
  }
  
  export function getGenres() {
    return function (dispatch) {
      return axios.get(`${server}/genres`)
        .then(response => {
          dispatch({
            type: GET_GENRES,
            payload: response.data
          });
        })
        .catch(error => alert(error));
    };
  }
  
  export function getGameDetails(idGame) {
    return function (dispatch) {
      return axios.get(`${server}/videogames/${idGame}`)
        .then(response => {
          dispatch({
            type: GET_GAME_DETAILS,
            payload: response.data
          });
        })
        .catch(error => alert(error));
    };
  }
  
  export function getGameSearched(name) {
    return function (dispatch) {
      return axios.get(`${server}}/videogames?name=${name}`)
        .then(response => {
          if (response.data.msg === 'Error: no matches found') {
            throw new Error(response.data.msg);
          } else {
            dispatch({
              type: GET_GAME_SEARCHED,
              payload: response.data
            });
          }
        })
        .catch(error => alert(error));
    };
  }
*/

//la función getGames que realiza una solicitud GET a la API para obtener la lista de juegos.
// Luego, se dispara una acción GET_GAMES con los datos obtenidos.
export function getGames() {
    return function (dispatch) {
        return fetch(`${server}/videogames`)
            .then(response => response.json())
            .then(json1 => {
                dispatch({
                    type: GET_GAMES,
                    payload: json1
                });
           })
            .catch(error => alert(error));
    };
}
//la función getGenres que realiza una solicitud GET a la API para obtener la lista de géneros de juegos.
// Luego, se dispara una acción GET_GENRES con los datos obtenidos.
export function getGenres() {
    return function (dispatch) {
        return fetch(`${server}/genres`)
            .then(response => response.json())
            .then(json => {

                dispatch({
                    type: GET_GENRES,
                    payload: json
                });

            })
            .catch(error => alert(error));
    };
}

//la función getGameDetails que toma un idGame como parámetro y realiza una solicitud GET a la API para 
//obtener los detalles de un juego específico. Luego, se dispara una acción GET_GAME_DETAILS con los datos obtenidos.
export function getGameDetails(idGame) {
    return function (dispatch) {
        return fetch(`${server}/videogames/${idGame}`)
            .then(response => response.json())
            .then(json => {

                dispatch({
                    type: GET_GAME_DETAILS,
                    payload: json
                });

            })
            .catch(error => alert(error));
    };
}

//la función getGameSearched que toma un nombre de juego como parámetro y realiza una solicitud GET a la API para buscar
//juegos que coincidan con el nombre proporcionado. Si no se encuentran coincidencias, se lanza una excepción. 
//De lo contrario, se dispara una acción GET_GAME_SEARCHED con los datos obtenidos.
export function getGameSearched(name) {
    return function (dispatch) {
        return fetch(`${server}/videogames?name=${name}`)
            .then(response => response.json())
            .then(json => {
                if (json.msg === 'Error: no matches found') {
                    throw (json.msg)
                } else {
                    dispatch({
                        type: GET_GAME_SEARCHED,
                        payload: json
                    })
                };

            })
            .catch(error => alert(error));
    };
}

//las funciones filterByGenre, filterByCreated, sortByRating y sortByName que toman un objeto payload como parámetro y 
//retornan una acción respectiva con el tipo de acción y el payload proporcionado.
export function filterByGenre(payload) {
    return {
        type: FILTER_BY_GENRE,
        payload
        }
}

export function filterByCreated(payload) {
    return {
        type: FILTER_BY_CREATED,
        payload
    }
}

export function sortByRating(payload) {
    return {
        type: SORT_BY_RATING,
        payload
    }
}

export function sortByName(payload) {
    return {
        type: SORT_BY_NAME,
        payload
    }
}

/*exporta funciones de acción que realizan solicitudes a la API para obtener datos de juegos, filtrar y ordenar juegos,
 y obtener detalles de juegos específicos. Estas funciones de acción se utilizan en Redux para actualizar el estado 
 global de la aplicación*/