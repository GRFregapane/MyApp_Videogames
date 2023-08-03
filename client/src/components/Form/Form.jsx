import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { getGames } from '../../Reducers/actions';
import swal  from 'sweetalert';
import { platforms, server } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import MultiSelector from '../MultipleSelector/MultipleSelector';
import s from './Form.module.scss'


function validate(input) {
    let errors = {};
    if (!input.name && !input.description) {
      errors.name = "Name is required";
      errors.description = "Description is required"
    } else if (!input.name) {
      errors.name = "Name is required"; 
    }else if (!input.description) {
      errors.description = "Description is required";
    } else if (input.platforms.length === 0) {
      errors.platforms = "Must select at least one platform";
    }
    return errors;
  }

function postGame(game){
  
  axios.post(`${server}/videogame`, game)
  .then(function (response) {
   swal(response.data)
   return response
  })
  .catch(function (error) {
   swal(error)
  return error
  });
}

export function Form() {

    const dispatch = useDispatch()
    const genres = useSelector((state)=>state.genres) //necesita los géneros para mostrar en el multiselector
    const [game,setGame] = useState({
        name:'',
        description:'',
        released:'',
        rating:0,
        genres: [],
        platforms:[]
    })
    const [errors, setErrors] = useState({})

    useEffect(()=>setErrors(validate(game)),[game])

    function handleInputChange (e) {    
        const {name,value} = e.target;
        
        setGame((prev)=>({
        ...prev,
        [name]:value
        }))  
        // setErrors(validate(game)) 
    }
//-------------------Función para manejar el multiselector-------------
    function handleOnClick(prop,ele){
      
        if(!game[prop].some(item=> item.id === ele.id)){
            let newGame = {
                ...game,
                [prop]:[...game[prop], ele]
            }
            setGame(()=>newGame)
            // setErrors(validate(game))        
        }else {
            let gameAfterRemoval = game[prop]
            gameAfterRemoval = gameAfterRemoval.filter( item=> item.id !== ele.id)
            setGame({
                ...game,
                [prop]:[...gameAfterRemoval]
            })
            // setErrors(validate(game))
        }
        
    }

    function isItemInSelection(prop,ele){
        if(game[prop]?.find(item=> item.id === ele.id)) return true
        return false
    }
//-------------------publicar solicitud para backend para estado global como cuerpo -------------
    async function handleSubmit (e) {
        e.preventDefault();
        
        if(errors.name || errors.description || errors.platforms){
          let msj = ''
          for(const prop in errors ){
            msj = errors[prop] +"\n"+ msj
          }
          swal(msj)
        }
        else {
          await postGame(game)
          dispatch(getGames())
          setGame({
            name:'',
            description:'',
            released:'',
            rating:0,
            genres: [],
            platforms:[]
          })
          
        }     
    }

  return (
    <div className={s.flex}>
      {/* <div className={} > */}
        <form className={s.gridContainer} onSubmit={handleSubmit}>
              <div className={s.formGroupRow}>
                <label className={s.formLabelCol}>Name</label>
                <div className={s.formLabelCol}>
                    <input
                        className={s.input}
                        type='text'
                        name='name'
                        value={game.name}
                        onChange={handleInputChange}
                        required
                    />
                    {errors.name && ( 
                        <p className={s.danger}>{errors.name}</p>
                    )}
                </div>
              </div>
              <div className= {s.formGroupRow}>
                <label className={s.formLabelCol}>Description</label>
                <div className={s.formLabelCol}>
                  <textarea
                    className={s.input}
                    name='description'
                    value={game.description}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.description && ( 
                        <p className={s.danger}>{errors.description}</p>
                    )}
                </div>
              </div>
              <div className= {s.formGroupRow}>
                <label className={s.formLabelCol}>Launch date</label>
                <div className={s.formLabelCol}>
                  <input
                    type='date'
                    name='released'
                    value={game.released}
                    onChange={handleInputChange}
                    className={s.input}
                  />

                </div>
                
              </div>
              <div className= {s.formGroupRow}>
                <label className={s.formLabelCol}>Rating</label>
                <div className={s.formLabelCol}>
                  <input
                    className={s.input}
                    type='number'
                    step='any'
                    name='rating'
                    value={game.rating}
                    max='5'
                    min="0"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <MultiSelector 
                title='Select Platforms' 
                data= {platforms} 
                handleOnClick={handleOnClick}
                isItemInSelection ={isItemInSelection}
                
                />
                {errors.platforms && ( 
                        <p className="danger">{errors.platforms}</p>
                    )}
              <MultiSelector 
                title='Select Genres' 
                data= {genres} 
                handleOnClick={handleOnClick}
                isItemInSelection ={isItemInSelection}
                
                />
             
              <div>
                <div className={s.divButton} >
                  <button className={s.btn} type='submit'> Create Game </button>   
                </div>
              </div>
            </form>
        {/* </div> */}
    </div>

  )
};

export default Form;