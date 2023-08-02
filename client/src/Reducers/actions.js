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
} from '../constants'

export function getGames() {
    return function (dispatch) {
        return fetch(`${server}/videogames`)
            .then(response => response.json())
            .then(json => {

                dispatch({
                    type: GET_GAMES,
                    payload: json
                });

            })
            .catch(error => alert(error));
    };
}

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