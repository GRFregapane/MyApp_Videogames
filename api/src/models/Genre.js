const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) =>{
    sequelize.define('Genre',{
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
          },
        name: {
            type: DataTypes.STRING,
        }
    })
}

/*define un modelo de datos "Genre" con propiedades "id" y "name" utilizando Sequelize y lo vincula 
a la conexión a la base de datos proporcionada. Este modelo se puede utilizar para interactuar con la tabla
 "genres" en la base de datos y realizar operaciones como crear, leer, actualizar y eliminar registros de géneros*/