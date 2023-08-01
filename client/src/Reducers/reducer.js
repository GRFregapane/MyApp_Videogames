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
} from "./actionsTypes";

const initialState = {
  videogames: [],
  filteredVideogames: [],
  selectedVideogame: null,
  searchQuery: '',
  filters: {
    platforms: [],
    genres: [],
    rating: null,
  },
  sortBy: 'name',
  sortOrder: 'asc',
  isLoading: false,
  error: null,
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case SEARCH_VIDEOGAMES:
      return {
        ...state,
        videogames: payload,
        filteredVideogames: payload,
      };
    case VIEW_VIDEOGAME:
      return {
        ...state,
        selectedVideogame: payload,
      };
    case FILTER_VIDEOGAMES:
      return {
        ...state,
        filters: payload,
        filteredVideogames: state.videogames.filter((videogame) => {
          const { platforms, genres, rating, name } = payload;
          return (
            (platforms.length === 0 || platforms.includes(videogame.platform)) &&
            (genres.length === 0 || genres.some((genre) => videogame.genres.includes(genre))) &&
            (rating === null || videogame.rating >= rating)
            (name = videogame.name.toLowerCase().includes(name.toLowerCase()))
          )
        }),
      };
    case SORT_VIDEOGAMES:
      return {
        ...state,
        sortBy: payload.sortBy,
        sortOrder: state.sortOrder === 'asc' ? 'desc' : 'asc',
        filteredVideogames: payload.data.sort((a, b) =>
          state.sortOrder === 'asc'
            ? a[state.sortBy].localeCompare(b[state.sortBy])
            : b[state.sortBy].localeCompare(a[state.sortBy])
        ),
      };
    case CREATE_VIDEOGAME:
      return {
        ...state,
        videogames: [...state.videogames, payload],
        filteredVideogames: [...state.filteredVideogames, payload],
      };
    case DELETE_VIDEOGAME:
      return {
        ...state,
        videogames: state.videogames.filter((videogame) => videogame.id !== payload),
        filteredVideogames: state.filteredVideogames.filter((videogame) => videogame.id !== payload),
      };
    case FETCH_VIDEOGAMES_PAGE_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_VIDEOGAMES_PAGE_SUCCESS:
      return {
        ...state,
        videogames: [...state.videogames, ...payload.videoGames],
        filteredVideogames: [...state.filteredVideogames, ...payload.videoGames],
        isLoading: false,
        error: null,
      };
    case FETCH_VIDEOGAMES_PAGE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    default:
      return state;
  }
};
