import React, {useState} from 'react';
import s from './MultipleSelector.module.scss'

function MultiSelector ({title, data, handleOnClick, isItemInSelection}){
    const [open, setOpen] = useState(false);
    
    let prop = title.slice(7).toLowerCase()
    
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

export default MultiSelector