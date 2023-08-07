require('dotenv').config();
const axios = require('axios');

const { API_HOST, API_KEY } = process.env;


// la función mapGenresApiDB realiza una solicitud HTTP para obtener los géneros de una API utilizando axios,
// y luego recorre los resultados de la respuesta para buscar o crear entradas en la base de datos utilizando un
// modelo proporcionado. Al final, devuelve un mensaje indicando el éxito de la operación.
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

//la función getGenresDB realiza una operación de búsqueda en la base de datos utilizando el modelo proporcionado
// y devuelve los géneros encontrados, almacenados en la DB
async function getGenresDB(model){
    let genres = await model.findAll()
        
    return genres
}


module.exports ={
    mapGenresApiDB,
    getGenresDB
}


/*La primera función realiza una solicitud HTTP para obtener géneros desde una API y los almacena en la base de 
datos, mientras que la segunda función busca los géneros en la base de datos y los devuelve*/