import React, {useState} from 'react';
import s from './MultipleSelector.module.scss'

function MultiSelector ({title, data, handleOnClick, isItemInSelection}){
    const [open, setOpen] = useState(false); //useState para inicializar el estado open como false.
    
    let prop = title.slice(7).toLowerCase()//prop que obtiene una porción de title y la convierte a minúsculas.
    

/*El componente MultiSelector muestra un contenedor principal con la clase de estilo container.
Dentro del contenedor, hay un encabezado (ddHeader) que tiene un comportamiento de desplegable.
Al hacer clic en él o presionar la tecla Enter, se cambia el estado open para abrir o cerrar el desplegable.
El encabezado muestra el título (title) y un mensaje que indica si el desplegable está abierto o cerrado.
Si el desplegable está abierto (open es true), se muestra una lista (ddList) que contiene elementos (li). 
Cada elemento se crea utilizando el arreglo de datos (data) proporcionado como propiedad.
Cada elemento de la lista es un botón que llama a la función handleOnClick cuando se hace clic en él.
El botón muestra el nombre del elemento y la palabra "Selected" si el elemento está seleccionado según la función
isItemInSelection*/
    return(
        <div className={s.container}>

        <div className= {s.ddWrapper}>
            <div
                tabIndex= {0}
                className= {s.ddHeader}
                role= 'button'
                onKeyPress={()=>setOpen(!open)}
                onClick={()=>setOpen(!open)}
            >
                <div className={`${s.ddHeader} ${s.titleBold}}`}>
                    <p>{title}</p>
                </div >
                <div className='dd-header-action'>
                    <p>{open? 'Open' : 'Close'}</p>
                </div>
            </div>
            {open &&(
                <ul className={s.ddList}>
                    {data.map(ele=>(
                        <li className='dd-list-item' key={ele.id}>
                            <button className='button' type='button' onClick={()=>handleOnClick(prop,ele)}>
                                <span>{ele.name}</span>
                                <span>{isItemInSelection(prop,ele) && 'Selected'}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
        </div>
    )
}

export default MultiSelector;

/*MultiSelector muestra un selector múltiple con un encabezado que se puede abrir y cerrar. Los elementos del selector 
se obtienen del arreglo de datos proporcionado. Cada elemento tiene un botón que muestra su nombre y si está seleccionado.
 Al hacer clic en un botón, se llama a la función handleOnClick para manejar la selección del elemento*/