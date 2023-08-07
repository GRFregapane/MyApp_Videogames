import React  from "react";
import s from'./Games.module.scss';

import  {Game}  from "../Game/Game"

// recibe una propiedad llamada games, que es un arreglo de objetos que representan los juegos a mostrar.
function Games ({ games }){
/*Se define una función renderGames que toma el arreglo de juegos como argumento y renderiza una lista de
 tarjetas de juego utilizando el componente Game*/
    const renderGames= (data)=>{
/* Cada tarjeta de juego se crea utilizando una iteración del 
 arreglo data utilizando el método map(). Se pasa la información del juego (name, id, genres, background_image) 
 como propiedades al componente Game*/        
          return (
            <ul className = {s.cardsContainer}>          
                {data?.map(d =>(
                  <Game 
                    key={d.id}
                    name={d.name}
                    id={d.id}
                    genres={d.genres}
                    background_image={d.background_image}
                  />
                ))}   
            </ul>      
          )
    }
 //Games devuelve el resultado de llamar a la función renderGames con el arreglo de juegos. Esto renderiza la lista de tarjetas de juegos.        
    return (    
        <>
        {renderGames(games)}
        </>
    )
}

  
  export default Games;

  /*Games recibe una lista de juegos y renderiza la lista de tarjetas de juego utilizando el componente Game. 
  Cada tarjeta de juego se crea utilizando la información del juego proporcionada*/