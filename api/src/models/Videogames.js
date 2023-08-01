const { DataTypes } = require('sequelize'); //sólo DataTypes
//Exportamos una función que define el modelo
//Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  //defino el modelo
  sequelize.define('Videogames' , {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    platforms: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    release_date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    background_image: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    freezeTableName:true,
    timestamps: false
  } 
  );
};
