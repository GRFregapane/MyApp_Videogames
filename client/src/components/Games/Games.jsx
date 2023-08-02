import React  from "react";
import s from'./Games.module.scss';

import  {Game}  from "../Game/Game"


function Games ({ games }){

    const renderGames= (data)=>{
        
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
         
    return (    
        <>
        {renderGames(games)}
        </>
    )
}

  
  export default Games;