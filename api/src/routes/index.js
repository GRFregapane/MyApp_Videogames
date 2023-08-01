const { Router } = require('express');
const videogamesRouter = require('./videogames');
const genresRouter = require('./genres');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
router.use('/videogames', videogamesRouter);
router.use('/genres', genresRouter);
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;










