import {
    FILTER_BY_CREATED,
    FILTER_BY_GENRE,
    GET_GAMES,
    GET_GAME_DETAILS,
    GET_GAME_SEARCHED,
    GET_GENRES,
    SORT_BY_NAME,
    SORT_BY_RATING
} from '../constants'

//estado inicial del reducer. Tiene propiedades para almacenar la lista de juegos, los juegos filtrados, los géneros
// y los detalles del juego.
const initialState = {
    games: [],
    filteredGames: [],
    genres: [],
    gameDetails: {}
};

// la función rootReducer que toma el estado actual y una acción como parámetros y realiza diferentes operaciones
// dependiendo del tipo de acción.
function rootReducer(state = initialState, action) {
    // se utiliza una instrucción switch para determinar qué tipo de acción se ha disparado.
    switch (action.type) {
        case GET_GAMES: //se actualiza el estado con la lista de juegos obtenida de la acción.
            return {
                ...state,
                games: action.payload,
                filteredGames: action.payload
            };
        case GET_GENRES: //se actualiza el estado con la lista de géneros obtenida de la acción.
            return {
                ...state,
                genres: action.payload
            };
        case GET_GAME_DETAILS: //se actualiza el estado con los detalles del juego obtenidos de la acción.
            return {
                ...state,
                gameDetails: action.payload
            };
        case GET_GAME_SEARCHED: //se actualiza el estado con la lista de juegos obtenida de la acción y 
        //se actualizan los juegos filtrados con la misma lista.
            return {
                ...state,
                games: action.payload,
                filteredGames: action.payload
            };
        case FILTER_BY_GENRE: //se filtran los juegos según el género especificado en el payload de la acción
            const games = state.games
            let genreFiltered = action.payload === '' ? games : games.filter((ele) => {
                let aux = ele.genres
                for (let i of aux) {
                    if (i.name === action.payload) return true
                }
                return false
                })
        //Si no se encuentran juegos que coincidan con el género, se muestra una alerta y se restablecen 
        //los juegos filtrados al estado anterior.        
            if (genreFiltered.length === 0) {
                alert(`No ${action.payload} games found`)
                genreFiltered = state.filteredGames
            }
            return {
                ...state,
                filteredGames: genreFiltered,
            };
        case FILTER_BY_CREATED: // se filtran los juegos según el creador especificado en el payload de la acción
            const allgames = state.games
            let createdFiltered = action.payload === '' ? allgames : allgames.filter(ele => {
                if (!ele.createdBy && action.payload === 'API') {
                    return true
                }
                return ele.createdBy === action.payload
                })
        // Si no se encuentran juegos que coincidan con el creador, se muestra una alerta y se restablecen los juegos
        // filtrados al estado anterior.
            if (createdFiltered.length === 0) {
                alert(`No ${action.payload} games found`)
                createdFiltered = state.filteredGames
            }
            return {
                ...state,
                filteredGames: createdFiltered,
            };
        case SORT_BY_RATING: // se ordenan los juegos filtrados según la clasificación especificada en el payload de la acción.
            const allgames2 = state.filteredGames
            const ratingSort = action.payload === '' ? allgames2 : allgames2.sort((a, b) => {
                if (action.payload === 'Asc') {
                    return a.rating - b.rating
                }
                return b.rating - a.rating
                })
            return {
                ...state,
                filteredGames: ratingSort
            };
        case SORT_BY_NAME: //se ordenan los juegos filtr según el nombre en orden asc o desc, según se especifique en el payload de la acción.
            const nameSort = action.payload === '' ? state.filteredGames : state.filteredGames.sort((a, b) => {
                if (action.payload === 'Asc') {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) return 1
                    if (a.name.toLowerCase() < b.name.toLowerCase()) return -1
                    return 0
                } else {
                    if (a.name.toLowerCase() < b.name.toLowerCase()) return 1
                    if (a.name.toLowerCase() > b.name.toLowerCase()) return -1
                    return 0
                }
                })
            return {
                ...state,
                filteredGames: nameSort
            };
//Si la acción no coincide con ninguno de los tipos anteriores, se devuelve el estado actual sin cambios.
        default:
            return state
    }
}

export default rootReducer;

/*el reducer de Redux que maneja las diferentes acciones relacionadas con los juegos y actualiza el estado
 de la aplicación en consecuencia*/