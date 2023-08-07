import React, { useState, useEffect } from "react";
import s from "./Pagination.module.scss";
import Games from "../Games/Games";

import { useSelector, useDispatch } from "react-redux";
import {
  sortByName,
  sortByRating,
  filterByCreated,
  filterByGenre,
} from "../../Reducers/actions";

function Pagination() {
  //hook para obtener datos del estado global
  const dispatch = useDispatch();

  const games = useSelector((state) => state.filteredGames);

  const genres = useSelector((state) => state.genres);

  useEffect(() => setCurrentPage(1), [games]); //para restablecer la página después de una búsqueda

  //----------------------pagination------------------------------
  //diferentes estados utilizando el hook useState para controlar la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPageNumber, setMaxPageNumber] = useState(3);
  const [minPageNumber, setMinPageNumber] = useState(0);

  //constantes para el número de elementos por página (itemsPerPage) y el límite de 
  //números de página a mostrar (pageNumberLimit).
  const itemsPerPage = 15;
  const pageNumberLimit = 3;

  //Se calculan los índices del primer y último elemento en la página actual
  const indexLastItem = currentPage * itemsPerPage; //en la 1ra pag es el elemento 15 de games (no incluido)
  const indexFistItem = indexLastItem - itemsPerPage; // en la 1ra pag es el elemento 0 (incluido)
  const currentItems = games && games?.slice(indexFistItem, indexLastItem); // se extraen los elementos correspondientes de la lista de juegos

  //define funciones para manejar los clics en los números de página y los botones de navegación
  const handleClick = (e) => {
    setCurrentPage(Number(e.target.id));
  };

  const handleNext = () => {
    if (currentPage < pages.length) {
      setCurrentPage(currentPage + 1);

      if (currentPage + 1 > maxPageNumber) {
        setMaxPageNumber(maxPageNumber + pageNumberLimit);
        setMinPageNumber(minPageNumber + pageNumberLimit);
      }
    } else {
      alert("You are in the last page");
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);

      if ((currentPage - 1) % pageNumberLimit === 0) {
        setMaxPageNumber(maxPageNumber - pageNumberLimit);
        setMinPageNumber(minPageNumber - pageNumberLimit);
      }
    } else {
      alert("no previous pages available  ");
    }
  };

  const pages = []; //---> matriz con el número de páginas necesarias para mostrar todos los juegos: ej: if games.length=100>> pages=[1,2,3,4,5,6,7]
  for (let i = 1; i <= Math.ceil(games.length / itemsPerPage); i++) {
    pages.push(i);
  }

  let pageIncrementBtn = null;
  if (pages.length > maxPageNumber)
    pageIncrementBtn = <li onClick={handleNext}>&hellip;</li>;

  let pageDecrementBtn = null;
  if (currentPage > pageNumberLimit)
    pageDecrementBtn = <li onClick={handlePrev}>&hellip;</li>;

  //render Pagination function
  //Se renderizan los números de página utilizando el método map sobre pages
  const renderPagesNumbers = pages.map((num) => {
    if (num <= maxPageNumber && num > minPageNumber) {
      return (
        <li
          key={num}
          id={num}
          onClick={handleClick}
          className={currentPage === num ? `${s.active}` : null}
        >
          {num}
        </li>
      );
    }
    return null;
  });
  //--------------------------Sorting------------------
  /*funciones para manejar los cambios en los filtros de clasificación (handleChangeRating, handleChangeName) y
   los filtros de género y origen (handleChangeGenre, handleChangeCreated)*/
  const setSort = useState("");

  function handleChangeRating(e) {
    e.preventDefault();
    dispatch(sortByRating(e.target.value));
    setCurrentPage(1);
    setMinPageNumber(0);
    setMaxPageNumber(3);
    setSort[1](`Rating ${e.target.value}`);
  }

  function handleChangeName(e) {
    e.preventDefault();

    dispatch(sortByName(e.target.value));
    setCurrentPage(1);
    setMinPageNumber(0);
    setMaxPageNumber(3);
    setSort[1](`Name ${e.target.value}`);
  }

  //--------------Filter-----------
  //género
  function handleChangeGenre(e) {
    dispatch(filterByGenre(e.target.value));
    setCurrentPage(1);
    setMinPageNumber(0);
    setMaxPageNumber(3);
  }
//origen
  function handleChangeCreated(e) {
    dispatch(filterByCreated(e.target.value));
    setCurrentPage(1);
    setMinPageNumber(0);
    setMaxPageNumber(3);
  }

  //renderiza selectores para los filtros de clasificación, género y origen.
  return (
    <>
      <div>
        <select className={s.selector} onChange={handleChangeRating}>
          <option value="">---Sort by Rating---</option>
          <option value="Asc">Asc</option>
          <option value="Desc">Desc</option>
        </select>
        <select className={s.selector} onChange={handleChangeName}>
          <option value="">---Sort by Name---</option>
          <option value="Asc">A...Z </option>
          <option value="Desc">Z...A </option>
        </select>
        <select className={s.selector} onChange={handleChangeGenre}>
          <option key="title" value="">
            ---Filter by Genre---
          </option>
          <option key='default' value=''>
              All genres
            </option>
          {genres.map((ele) => (
            <option key={ele.id} value={ele.name}>
              {ele.name}
            </option>
            
          ))}
        </select>
        <select className={s.selector} onChange={handleChangeCreated}>
          <option key="title" value="">
            ---Filter by Source---
          </option>
          <option key="1" value="API">
            external API
          </option>
          <option key="2" value="APP">
            Videogame App
          </option>
        </select>
      </div>
      {currentItems.length > 0 ? ( //solo renderiza la paginación una vez que cargó los juegos desde el servidor
        <ul className={s.pageNumbers}>
          <li>
            <button onClick={handlePrev}> Prev</button>
          </li>
          {pageDecrementBtn}
          {renderPagesNumbers}
          {pageIncrementBtn}
          <li>
            <button onClick={handleNext}> Next</button>
          </li>
        </ul>
      ) : null}
      <Games games={currentItems} /> {/*Se renderiza el componente Games con los juegos de la página actual*/}
    </>
  );
}

export default Pagination;

/*Pagination implementa la paginación y filtros en una lista de juegos. Permite al usuario navegar entre las páginas,
 ordenar los juegos por nombre o clasificación, y filtrar por género y origen. También muestra los juegos de la página 
 actual utilizando el componente Games*/