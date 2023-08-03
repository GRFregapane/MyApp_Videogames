import React from 'react';
import { Link } from 'react-router-dom';
import s from './LandingPage.module.scss';


const LandingPage = () =>{
    return(
        <div className={s.landingPage}>
            <h1 className={s.header}>
                Welcome, here you can find a variety of videogames.
            </h1>
            <br />
            <Link className={`${s.btn} ${s.btnPrimary}`} to="/videogames">
                PRESS START 
            </Link>
            
        </div>
    )
}

export default LandingPage;
