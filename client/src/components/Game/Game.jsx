import React from 'react';
import s from './Game.module.scss'
import { Link } from 'react-router-dom';

export function Game({name,id,background_image, genres}) {
    
        let genresSort = genres.sort((a, b) => {
        
            if (a.name.toLowerCase() > b.name.toLowerCase()) return 1
            if (a.name.toLowerCase() < b.name.toLowerCase()) return -1
            return 0
    })
    //El componente renderiza una tarjeta de juego que contiene el nombre del juego (name) y una lista de 
    //géneros (genresSort). Cada género se renderiza como un elemento de lista (li).
        
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
                <Link className={s.btn} to={`/videogames/details/${id}`}>See more</Link>
            </div>
            <div className={s.cardImage}>
	            <img src={background_image}  alt=""/>
	        </div>
        </div>
    </li>

)};

export default Game;

/*el componente Game muestra la información de un juego en una tarjeta, incluyendo el nombre, los géneros y una imagen 
de fondo. También proporciona un enlace para ver más detalles del juego*/