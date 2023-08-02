const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id:{
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    released: {
      type: DataTypes.STRING,
    },
    rating: {
      type: DataTypes.FLOAT,
    },
    platforms: {
      type: DataTypes.JSON,
      allowNull: false,
    }, 
    createdBy: {
      type: DataTypes.STRING,
      defaultValue: 'APP',
    },
    background_image :{
      type: DataTypes.TEXT,
      validate:{ isUrl: true},
      defaultValue: 'https://media.istockphoto.com/vectors/glowing-neon-line-gamepad-icon-isolated-on-black-background-game-vector-id1257035663?k=20&m=1257035663&s=170667a&w=0&h=1jv2K3U5rNcOW54HXWOYdUU9ODSpt_ds12W33j_oGnM='
    }
  });
};
