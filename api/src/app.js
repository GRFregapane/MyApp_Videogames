const express = require("express"); //import express
const cookieParser = require("cookie-parser");
// const bodyParser = require('body-parser');
const morgan = require("morgan"); 
const routes = require("./routes/index.js"); 
const cors = require("cors"); //hook de importacion para darle acceso al frontend que se ejecuta en puerto 3001 del servidor
require("./db.js"); 

const server = express(); 
server.name = "API";

server.use(express.urlencoded({ extended: true, limit: "50mb" })); 
server.use(express.json({ limit: "50mb" })); 
server.use(cookieParser());
server.use(morgan("dev"));
server.use(cors());

server.use("/", routes);

// Error catching endware.
server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

//simple route para probar
//server.get("/", (req, res) => {
//   res.json({ message: "Welcome to Georgina application." });
// });

module.exports = server;
