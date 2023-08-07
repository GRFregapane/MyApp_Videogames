import React, { useState } from "react";
import { useDispatch } from "react-redux";
import s from './SearchBar.module.scss';
import { getGameSearched } from "../../Reducers/actions";

//define un estado input utilizando el hook useState para almacenar el valor del campo de entrada de búsqueda.
const SearchBar=()=> {
  
  const [input, setInput] = useState('')

//Se obtiene la función dispatch del hook useDispatch para enviar acciones al Redux.  
  const dispatch = useDispatch()

//la función handleChange para manejar los cambios en el campo de entrada de búsqueda
// y actualizar el estado input con el valor ingresado.  
  const handleChange =(e) =>{
      setInput(e.target.value)
  }

  //se maneja el envío del formulario de búsqueda. Se envía una acción getGameSearched al Redux con el valor de búsqueda almacenado en input
  const handleSubmit =(e) => {
      e.preventDefault()
      dispatch(getGameSearched(input))
      setInput('') //se reestablece el estado input a una cadena vacía
  }

  //renderiza un formulario y se le asigna la función handleSubmit al evento onSubmit del formulario.
    return (
      
        <form className={s.formContainer} onSubmit={(e) => handleSubmit(e)}>
          <div className='divSB'>
            <input
              type="text"
              id="title"
              autoComplete="off"
              value={input}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <button className={s.btn} type="submit">SEARCH</button>
        </form>
      
    );
  
}


export default SearchBar;

/*SearchBar muestra una barra de búsqueda con un campo de entrada de texto y un botón de búsqueda. 
Cuando se envía el formulario, se envía una acción al Redux con el término de búsqueda ingresado por el usuario*/


