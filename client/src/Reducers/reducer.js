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


const initialState = {
    games: [],
    filteredGames: [],
    genres: [],
    gameDetails: {}
};


function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_GAMES:
            return {
                ...state,
                games: action.payload,
                filteredGames: action.payload
            };
        case GET_GENRES:
            return {
                ...state,
                genres: action.payload
            };
        case GET_GAME_DETAILS:
            return {
                ...state,
                gameDetails: action.payload
            };
        case GET_GAME_SEARCHED:
            return {
                ...state,
                games: action.payload,
                filteredGames: action.payload
            };
        case FILTER_BY_GENRE:
            const games = state.games
            let genreFiltered = action.payload === '' ? games : games.filter((ele) => {
                let aux = ele.genres
                for (let i of aux) {
                    if (i.name === action.payload) return true
                }
                return false
                })
            if (genreFiltered.length === 0) {
                alert(`No ${action.payload} games found`)
                genreFiltered = state.filteredGames
            }
            return {
                ...state,
                filteredGames: genreFiltered,
            };
        case FILTER_BY_CREATED:
            const allgames = state.games
            let createdFiltered = action.payload === '' ? allgames : allgames.filter(ele => {
                if (!ele.createdBy && action.payload === 'API') {
                    return true
                }
                return ele.createdBy === action.payload
                })

            if (createdFiltered.length === 0) {
                alert(`No ${action.payload} games found`)
                createdFiltered = state.filteredGames
            }
            return {
                ...state,
                filteredGames: createdFiltered,
            };
        case SORT_BY_RATING:
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
        case SORT_BY_NAME:
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

        default:
            return state
    }
}

export default rootReducer;