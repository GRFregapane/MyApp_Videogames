import React, { useState } from "react";
import { useDispatch } from "react-redux";
import s from './SearchBar.module.scss';
import { getGameSearched } from "../../reducers/actions";


const SearchBar=()=> {
  
  const [input, setInput] = useState('')

  const dispatch = useDispatch()
  
  const handleChange =(e) =>{
      setInput(e.target.value)
  }

  const handleSubmit =(e) => {
      e.preventDefault()
      dispatch(getGameSearched(input))
      setInput('')
  }
    
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


export default SearchBar



