import React, {useEffect, useState} from "react";
import s from './Home.module.scss';
import Pagination  from "../Pagination/Pagination";
import SearchBar from '../SearchBar/SearchBar';
import { useDispatch, useSelector } from 'react-redux'; 
import { getGames, getGenres } from '../../reducers/actions';
import Animation from '../../img/Ryu.gif' 



function Home (){

    const games = useSelector((state)=>state.games)
    const genres = useSelector((state)=> state.genres)
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(true)
   
    async function fetchAPI(){
        if(games.length ===0)await dispatch(getGames())
        if(genres.length ===0)await dispatch(getGenres())
        setLoading(false)
    }

    //request games and genres to server which goes to global state games
    useEffect(()=>{  
      setLoading(true)
      fetchAPI()
      // eslint-disable-next-line           
    }, [])


    function handleClick(){
      dispatch(getGames())
    }

   if(loading){
    return(
      <div className={s.container}>
          <img src={Animation} className={s.loading} alt=""/>
          Loading...
      </div>
    )
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

export default Home