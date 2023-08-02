require('dotenv').config();
const axios = require('axios');

const { API_HOST, API_KEY } = process.env;



async function mapGenresApiDB (model){
        let response = await axios.get(`${API_HOST}/genres?key=${API_KEY}`)
        
        response.data.results.forEach(element => {
                  model.findOrCreate( {
                      where: {name: element.name},
                      defaults:{ id: element.id}
                  })
          })
        
        return {msg:'success: genres loaded in DB'} //éxito:géneros cargados en DB
        
}

async function getGenresDB(model){
    let genres = await model.findAll()
        
    return genres
}


module.exports ={
    mapGenresApiDB,
    getGenresDB
}