require ('dotenv'). config();
const server = require('./src/app.js'); 
const { conn } = require('./src/db.js');
const { PORT } = process.env;

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  console.log('Database connected');
  server.listen(PORT, async () => {
    console.log(`%s listening at ${PORT}`);
  });
});

















/*Este código inicia un servidor Express para una aplicación backend en el puerto 3001 y sincroniza los modelos con la base de datos.*/