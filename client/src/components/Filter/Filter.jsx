import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { filterByCreated, filterByGenre } from "../../actions";
// import { Link } from 'react-router-dom';
import './Filter.css';



const Filter=({handleChangeGenre, val, count})=> {
  
  const genres = [{id:4,name:"Action"},{id:51,name:"Indie"},{id:3,name:"Adventure"},{id:5,name:"RPG"},{id:10,name:"Strategy"},{id:2,name:"Shooter"},{id:40,name:"Casual"},{id:14,name:"Simulation"},{id:7,name:"Puzzle"},{id:11,name:"Arcade"},{id:1,name:"Racing"},{id:83,name:"Platformer"},{id:59,name:"Massively Multiplayer"},{id:15,name:"Sports"},{id:19,name:"Family"},{id:6,name:"Fighting"},{id:28,name:"Board Games"},{id:34,name:"Educational"},{id:17,name:"Card"}]
//   const dispatch = useDispatch()

//   const games =useSelector((state)=>state.games)
// //   const filteredGames =useSelector((state)=>state.filteredGames)
  
//   const genre =useSelector((state)=>state.genre)
//   const created = useSelector((state)=> state.created)

//   const handleOnChange =(e)=>{
//       filter(games,e.target.value)
// }
  
    return (
        <div>
            <div>{count} games found</div>
            <div>

                <label htmlFor="game-select">'Choose genre'</label>

                <select 
                    name="games" 
                    id="game-select"
                    value={val}
                    onChange={handleChangeGenre} 
                >
                    <option key="title" value="">ALL</option>
                        {genres.map((ele)=>(
                            <option key={ele.id} value={ele.name}>{ele.name}</option>
                        ))}
                </select>
            
            </div>
        </div>
        //   <button type="submit">Filter</button>
      
    );
  
}


export default Filter



