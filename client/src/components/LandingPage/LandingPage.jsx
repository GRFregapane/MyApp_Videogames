import React from 'react';
import { useHistory } from 'react-router-dom';
import s from './LandingPage.module.scss';


const LandingPage = () =>{

    const history = useHistory();

    const routeChange = () =>{ 
      let path = "/videogames"; 
      history.push(path);
    }

    return(
        <div className={s.landingPage}>
            <h1 className={s.header}>Welcome, here you can find a variety of videogames.</h1>
            <br />
            <button 
                className={`${s.btn} ${s.btnPrimary}`}
                onClick={routeChange} 
                >
                PRESS START 
            </button>
            
        </div>
    )
}

export default LandingPage;
