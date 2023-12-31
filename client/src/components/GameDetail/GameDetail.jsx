import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import s from './GameDetail.module.scss';
import {getGameDetails} from '../../Reducers/actions';
import { useParams } from "react-router-dom";
import Animation from '../../img/Ryu.gif' //modificar


function GameDetails ({ getGameDetails, gameDetails}){ //recibe las siguientes propiedades: getGameDetails (acción para
    // obtener los detalles del juego) y gameDetails (objeto con los detalles del juego).
    const { id } = useParams(); //useParams para obtener el parámetro id de la URL.
    const background={ //fondo de la página
        backgroundImage: `url(${gameDetails.background_image_additional})`,
        backgroundSize: 'cover'
    }

    const [loading, setLoading] = useState(true) //useState para inicializar el estado loading como true.
   
//función getDetails asincrónica que llama a getGameDetails con el id del juego y luego cambia el estado loading a false.
    async function getDetails(){ 
        await getGameDetails(id)
        setLoading(false)
    }

//useEffect para llamar a la función getDetails cuando el id cambia. Se establece loading en true antes de llamar a getDetails.    
    useEffect(()=>{
        setLoading(true)
        getDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);
  

    if(loading){ //Si loading es true, se muestra una animación de carga
        return(
            <div className={s.container}>
                <img src={Animation} className={loading?s.loading:s.inactive} alt=""/>
                Loading...
            </div>
        )
 //Si loading es false, se muestra el detalle del juego. El fondo de la página se establece utilizando el estilo background. Los detalles del juego se muestran en una tarjeta dividida en dos secciones.       
    }else{ 
        return(
            <div className= {s.back} style={background}>

            
            <div className={s.card}>
                        <div className={s.cardLeft}>
                            <img src={gameDetails.background_image} width="500" height="500" alt=''/>
                        </div>
                        <div className={s.cardRight}>
                            <h1>{gameDetails.name} </h1>
                            <div className={s.cardRightDetails}>
                                <ul>
                                    <li><span>Rating:</span> {gameDetails.rating}</li>
                                    <li><span>Launch:</span> {gameDetails.released}</li>
                                </ul>
                            </div>
                            <div className={s.cardRightDetails}>
                                <ul> 
                                    <li><span>Genres:</span></li>
                                    {gameDetails.genres?.map(element =><li key={element.id}>{element.name}</li>)}
                                </ul>
                            </div>
                            <div className={s.cardRightDetails}>
                                <ul> 
                                    <li><span>Platforms:</span></li>
                                    {gameDetails.platforms?.map(element =><li key={element.id}>{element.name}</li>)}
                                </ul>
                            </div>
                            {/* <h4>Description</h4> */}
                            <div className={s.cardRightDesc}>
                                <p><span>Description:</span> {gameDetails.description.replace(/(<([^>]+)>)/ig, '')}</p>
                            </div> 
                        </div>
                    
            </div>
            </div>
        
        )
    }

}
//para conectar el estado gameDetails y la acción getGameDetails al componente.
function mapStateToProps(state){
    return {
        gameDetails: state.gameDetails
    }
}

function mapDispatchToProps(dispatch) {
    return {
      getGameDetails: (id) => dispatch(getGameDetails(id))
    };
}

export default connect (mapStateToProps, mapDispatchToProps)(GameDetails)

/*el componente GameDetails muestra los detalles de un juego, incluyendo su imagen, nombre, calificación,
 fecha de lanzamiento, géneros, plataformas y descripción. Muestra una animación de carga mientras se obtienen
  los detalles del juego. Los detalles se obtienen utilizando Redux y se actualizan a través de la acción getGameDetails*/