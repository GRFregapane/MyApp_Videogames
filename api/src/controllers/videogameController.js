require('dotenv').config();
const axios = require('axios');
const sequelize = require('sequelize');
const { API_KEY, API_HOST} = process.env;


async function getAllVideogames (model1,model2){
    // try {
        let games = [],
        //solicitud a api externa
        numPage = 1
        while(games.length<100){
        let response = await axios.get(`${API_HOST}/games?key=${API_KEY}&page_size=25&page=${numPage}`)
            response.data.results.forEach(element => {
                games.push( {
                    name:element.name,
                    id:element.id,
                    background_image: element.background_image,
                    genres:element.genres,
                    rating: element.rating
                    })
          
        })
        numPage ++
        } 
        //solicitud a DB
        let aux = await model1.findAll({include:model2})
        let ownGames = aux.map(ele=> ele.dataValues) //ignore meta data
        
     //unir datos y regresar
        let jointGames = [...ownGames,...games]
       
        return jointGames 
        
    // } catch (error) {
    //     let message = {msg: `${error} in get all query`}
    //     return message       
    // }    
}

async function getVideogamesByName(req,model1,model2){
        let name = req.query.name.toLowerCase()
        let games = [];
        let response = await axios.get(`${API_HOST}/games?search=${name}&search_precise=true&key=${API_KEY}&page_size=15`)
            response.data.results.forEach(element => {
                games.push( {
                    name:element.name,
                    id:element.id,
                    background_image: element.background_image,
                    genres:element.genres,
                    rating: element.rating
                    })          
        })
        let aux = await model1.findAll({
            where:{ 
                name:{[sequelize.Op.iLike]: name}
            },
            include:[{model:model2}]
        })        
        
        let ownGames = aux.map(ele=> ele.dataValues) //ignorar los metadatos
        
        //unir datos y regresar
        let jointGames = [ ...ownGames, ...games]
       
        return jointGames
      
}

async function getGameDetails(req,model1, model2){
    // try {
        let idGame = req.params.id;
        //ojo aca que da null porque se genera el ID de la base de datos cada vez q guardas el archivo!!!
        if(idGame.length >=36) { //llamo a la DB si tiene mas de 35 char
            let aux = await model1.findOne({
            where:{ id: idGame },
            include:[{model:model2}]
            })
        
            return dbGameDetail = aux.dataValues //ignore meta data 
            
        } 
        
        else { //sino llamo a la API
            let response = await axios.get(`${API_HOST}/games/${idGame}?key=${API_KEY}`),
            {id, name, description, released, background_image, rating, platforms, genres, background_image_additional, website } = response.data
            let genresOnly = genres.map(ele=>{
                return{
                    name:ele.name,
                    id:ele.id
                }
            })
            let platformsOnly = platforms.map(ele=>{
                return{
                    name:ele.platform.name,
                    id:ele.platform.id
                }
            })
            let descriptionShort = description.split(".").slice(0,4).join('.')+'.'
            gameDetail = {
                id,
                name, 
                description: descriptionShort,
                released, 
                background_image,
                background_image_additional,
                rating,
                platforms:platformsOnly,
                genres: genresOnly,
                website
            }
            
            return gameDetail;
        }
            
        
       
    // } catch (error) {
        
    //     let message = {msg: `no matches found due to: ${error}`}
    //     return message  
    // }
}

async function postGame(req,model1){

        const { name, description, released, rating, platforms, genres} = req.body

        let genresId= genres.map(ele=>ele.id)

        const [ game, created ] = await model1.findOrCreate({
            where:{
                name, 
            }, 
            defaults:{
                released,
                rating,
                description,
                platforms,
            }
        })
            
        await game.setGenres(genresId)
        
        return (created? `success: new videogame created`:`name:${name} already exist in DB, try again`)
        //éxito: nuevo videojuego creado : name: {name} ya existe en DB, inténtelo de nuevo.
   
}


module.exports ={ 
    getAllVideogames,
    getVideogamesByName, 
    getGameDetails,
    postGame
 
}