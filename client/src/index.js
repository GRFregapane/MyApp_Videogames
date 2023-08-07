import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import store from "./Reducers/store";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);


reportWebVitals();


/*index.js configura y renderiza la aplicación principal (App) en el elemento del DOM con el id "root".
 También se configura el enrutamiento basado en el navegador y se proporciona acceso global a la tienda de Redux 
 a través del componente Provider*/
