import React from 'react';
import s from './Game.module.scss'
import { useHistory } from 'react-router-dom';

export function Game({name,id,background_image, genres}) {
    const history = useHistory();

    const routeChange = () =>{ 
      let path = `/videogames/details/${id}`; 
      history.push(path);
    }
  
    let genresSort = genres.sort((a, b) => {
        
            if (a.name.toLowerCase() > b.name.toLowerCase()) return 1
            if (a.name.toLowerCase() < b.name.toLowerCase()) return -1
            return 0
    })
        
    return (

    <li className={s.cardsItem}  key={id}>
        <div className={s.card}>
            <div className={s.cardContent}>
                <div className={s.divContent}>
                    <span className={s.cardTitle}>{name}</span>
                </div>
                <div className={s.divContent}>
                    <ul> 
                        {/* <li>Genres:</li> */}
                        {genresSort.map(element =><li key={element.id}>{element.name}</li>)}
                    </ul>
                </div>
                <button className={s.btn} onClick={routeChange}>See more</button>
            </div>
            <div className={s.cardImage}>
	            <img src={background_image}  alt=""/>
	        </div>
        </div>
    </li>

)};

export default Game;