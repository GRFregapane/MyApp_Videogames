import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPage, fetchVideogames } from '../actions';

function Pagination() {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.page);
  const videogames = useSelector((state) => state.videogames.slice(0, 100));
  const totalPages = useSelector((state) => Math.ceil(videogames.length / 15));

  useEffect(() => {
    dispatch(fetchVideogames());
  }, [dispatch]);

  const handlePreviousClick = () => {
    dispatch(setPage(page - 1));
  };

  const handleNextClick = () => {
    dispatch(setPage(page + 1));
  };

  const handlePageClick = (pageNumber) => {
    dispatch(setPage(pageNumber));
  };

  const displayedVideogames = videogames.slice((page - 1) * 15, page * 15);

  return (
    <div>
      <button onClick={handlePreviousClick} disabled={page === 1}>
        Anterior
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
        <button key={pageNumber} onClick={() => handlePageClick(pageNumber)}>
          {pageNumber}
        </button>
      ))}
      <button onClick={handleNextClick} disabled={page === totalPages}>
        Siguiente
      </button>
      {displayedVideogames.map((videogame) => (
        <div key={videogame.id}>
          <h2>{videogame.name}</h2>
          <img src={videogame.image} alt={videogame.name} />
          <p>Plataformas: {videogame.platforms.join(', ')}</p>
          <p>Rating: {videogame.rating}</p>
          <p>Géneros: {videogame.genres.join(', ')}</p>
        </div>
      ))}
    </div>
  );
}

export default Pagination;

