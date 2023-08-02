import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../../img/game_gamepad_1486.png' //importar logo que quieras

import s from './NavBar.module.scss';

export default function NavBar() {
    
    return (
        <nav >
            <div className={s.navbar}>
                <NavLink  className={s.navlink} exact to = '/videogames' > 
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