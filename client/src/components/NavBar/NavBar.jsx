import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../../img/game_gamepad_1486.png' //importar logo que quiera

import s from './NavBar.module.scss';

export default function NavBar() {
    
    return (
        <nav >
            <div className={s.navbar}>
                <NavLink  className={s.navlink} to='/videogames' > 
                    <img id="logoGame" src={Logo} width="30" height="30" className={s.logo} alt="" />
                    <span href='#/' className={s.titleApp}>Videogames Finder APP</span>
                </NavLink>
                <NavLink className={s.navlink} to="/videogames/add-videogame" >
                    <span className ={s.navOption}>Create New Game</span>
                </NavLink>
                
            </div>
        </nav>
    )
}

/*el componente NavBar muestra una barra de navegación con dos opciones: una opción para ir a la página de videojuegos 
y una opción para crear un nuevo videojuego. Incluye un logo y un título de la aplicación en la opción de la página de
videojuegos*/