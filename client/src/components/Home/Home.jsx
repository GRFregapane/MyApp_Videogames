import React, {useEffect, useState} from "react";
import s from './Home.module.scss';
import Pagination  from "../Pagination/Pagination";
import SearchBar from '../SearchBar/SearchBar';
import { useDispatch, useSelector } from 'react-redux'; 
import { getGames, getGenres } from '../../Reducers/actions';
import Animation from '../../img/Ryu.gif' 



function Home (){
//utilizo useSelector y useDispatch para acceder al estado global. Selecciona el estado games y genres utilizando 
//useSelector, y obtiene la función dispatch utilizando useDispatch.
    const games = useSelector((state)=>state.games)
    const genres = useSelector((state)=> state.genres)
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(true)//useState inicializa el estado loading como true.

//Se define una función fetchAPI que se encarga de solicitar los juegos y los géneros al servidor    
    async function fetchAPI(){
        if(games.length ===0) await dispatch(getGames())//Si el arreglo games está vacío, se envía la acc getGames al reducer mediante dispatch
        if(genres.length ===0) await dispatch(getGenres())//Si el arreglo genres está vacío, se envía la acción getGenres al reducer mediante dispatch
        setLoading(false) //se cambia el estado loading a false.
    }

   // solicitar juegos y géneros al servidor que va a juegos de estado global
    useEffect(()=>{  
      setLoading(true)//Se establece loading en true antes de llamar a fetchAPI.
      fetchAPI()//llamar a la función fetchAPI cuando el componente se monta por primera vez
      // eslint-disable-next-line           
    }, [])

// función handleClick que envía la acción getGames al reducer mediante dispatch
    function handleClick(){
      dispatch(getGames())
    }

//Si loading es true, se muestra una animación de carga y el mensaje "Loading...".    
   if(loading){
    return(
      <div className={s.container}>
          <img src={Animation} className={s.loading} alt=""/>
          Loading...
      </div>
    )
//Si loading es false, se muestra el contenido principal de la página (buscador, paginación y el boton de reset)
  } else{
      return(
        <>
          <div className={s.topBar}>
            <button className= {s.btn} onClick={handleClick}>Reset games</button>
            <SearchBar/>
          </div>
          <Pagination/>
        </>
      )

  }

}

export default Home;