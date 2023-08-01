import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVideogamesPage } from '../actions';
import VideogameCard from './VideogameCard';
import Pagination from './Pagination';
import SearchBar from './SearchBar';

function Home() {
  const dispatch = useDispatch();
  const videogames = useSelector((state) => state.videogames);
  const currentPage = useSelector(state => state.currentPage);

  useEffect(() => {
    dispatch(fetchVideogamesPage());
  }, [dispatch]);

  return (
    <div>
      <SearchBar />
      {videogames.map((videogame) => (
        <VideogameCard key={videogame.id} videogame={videogame} />
      ))}
      <Pagination />
    </div>
  );
}

export default Home;

