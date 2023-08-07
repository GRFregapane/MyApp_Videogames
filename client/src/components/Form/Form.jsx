import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { getGames } from '../../Reducers/actions';
import swal  from 'sweetalert';
import { platforms, server } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import MultiSelector from '../MultipleSelector/MultipleSelector';
import s from './Form.module.scss'

//Se define una función validate que recibe un objeto input y valida los campos del formulario.
// Retorna un objeto errors que contiene los errores encontrados.
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

//función postGame, recibe un juego y realiza una solicitud POST al servidor para crear el juego. 
//Utiliza la función axios.post para enviar la solicitud y muestra el mensaje de respuesta o de error utilizando swal.  
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

/*El componente Form utiliza el hook useDispatch para obtener la función dispatch de Redux y useSelector 
para obtener el estado genres del store de Redux*/
export function Form() {

    const dispatch = useDispatch()
    const genres = useSelector((state)=>state.genres) //necesito los géneros para mostrar en el multiselector
    const [game,setGame] = useState({ //hook para inicializar el estado del formulario game con los campos:
        name:'',
        description:'',
        released:'',
        rating:0,
        genres: [],
        platforms:[]
    })
    const [errors, setErrors] = useState({}) //utilizo useState para inicializar el estado errors con un objeto vacío.

    useEffect(()=>setErrors(validate(game)),[game]) //hook para validar el formulario cada vez que cambia el estado game.

  /*la función handleInputChange que maneja los cambios en los campos del formulario. Actualiza el estado game con los
   nuevos valores*/
    function handleInputChange (e) { 
        const {name,value} = e.target;
        
        setGame((prev)=>({
        ...prev,
        [name]:value
        }))  
        // setErrors(validate(game)) 
    }
//Función para manejar los clicks en el compon multiselector.
//Agrega o elimina elementos del arreglo game[prop] según el estado actual.
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
//se verifica si un elemento está seleccionado en el arreglo game[prop].
    function isItemInSelection(prop,ele){
        if(game[prop]?.find(item=> item.id === ele.id)) return true
        return false
    }
//publicar solicitud para backend para estado global
/*maneja el envío del formulario. Si existen errores de validación, muestra un mensaje de error utilizando swal.
De lo contrario, llama a la función postGame para crear el juego en el servidor, luego llama a la función getGames 
para actualizar la lista de juegos en el estado global y reinicia el estado game a sus valores iniciales*/
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

/*renderiza un formulario que contiene diversos campos de entrada y elementos MultiSelector. Los campos de entrada están
vinculados al estado game y se actualizan mediante la función handleInputChange. Los elementos MultiSelector reciben
datos (platforms y genres), funciones (handleOnClick y isItemInSelection) y se utilizan para seleccionar plataformas y
géneros para el juego*/
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

/*Form representa un formulario para crear un nuevo juego. Los campos del formulario se validan y se muestra un mensaje 
de error si existen errores. Al enviar el formulario, se crea el juego en el servidor y se actualiza la lista de juegos
 en el estado global*/