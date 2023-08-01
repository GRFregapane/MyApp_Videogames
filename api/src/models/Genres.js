const { DataTypes } = require('sequelize');
//Exportamos una función que define el modelo
//Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  //defino el modelo
  sequelize.define('Genres' , {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    }, 
    {
      freezeTableName: true,
      timestamps: false,
    }
    );
};