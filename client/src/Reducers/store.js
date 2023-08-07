import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../Reducers/reducer";
import thunkMiddleware from "redux-thunk";

//es una función para mejorar la capacidad de usar Redux DevTools en el navegador
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
    rootReducer, 
    composeEnhancer(applyMiddleware(thunkMiddleware))
    );

export default store;

/* configura y exporta la tienda de Redux para la aplicación, utilizando el reducer rootReducer y el
 middleware thunkMiddleware. También se utiliza composeEnhancer para permitir el uso de Redux DevTools en el navegador*/