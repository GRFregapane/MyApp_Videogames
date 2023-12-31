require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const  { mapGenresApiDB }  = require("./controllers/genreController");

 const {
   DB_USER, DB_PASSWORD, DB_HOST,
 } = process.env;

const sequelize = new Sequelize(
   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/pi_videogames`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
    define: {
      timestamps: false, //to omit createdAt and updatedAt columns when defining models
    }
  }
);
  
const basename = path.basename(__filename); 

const modelDefiners = []; 

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));

// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Videogame, Genre } = sequelize.models;
console.log("::::::::",Videogame, Genre);

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
Videogame.belongsToMany(Genre, { through: "VideogamesGenres" });
Genre.belongsToMany(Videogame, { through: "VideogamesGenres" });

//guardar géneros de API en DB:
mapGenresApiDB(Genre)
  .then((value) => console.log(value))
  .catch((error) => console.error(error));

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};

/*configura una conexión a la base de datos utilizando Sequelize, define modelos y establece relaciones entre ellos,
 y guarda los géneros de una API en la base de datos*/