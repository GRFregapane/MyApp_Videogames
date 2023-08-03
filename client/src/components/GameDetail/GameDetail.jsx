import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import s from './GameDetail.module.scss';
import {getGameDetails} from '../../Reducers/actions';
import { useParams } from "react-router-dom";
import Animation from '../../img/Ryu.gif' //modificar


function GameDetails ({ getGameDetails, gameDetails}){
    const { id } = useParams();
    const background={
        backgroundImage: `url(${gameDetails.background_image_additional})`,
        backgroundSize: 'cover'
    }

    const [loading, setLoading] = useState(true)
   
    async function getDetails(){
        await getGameDetails(id)
        setLoading(false)
    }

    useEffect(()=>{
        setLoading(true)
        getDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);
  

    if(loading){
        return(
            <div className={s.container}>
                <img src={Animation} className={loading?s.loading:s.inactive} alt=""/>
                Loading...
            </div>
        )
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