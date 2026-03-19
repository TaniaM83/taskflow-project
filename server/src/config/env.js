// aqui cargo las variables del .env para que el servidor las pueda usar
require('dotenv').config();

// compruebo que el puerto esta definido, si no paro todo
if (!process.env.PORT) {
  throw new Error('El puerto no está definido');
}

// lo guardo en una variable para no tener que escribir process.env todo el rato
const PORT = process.env.PORT;

module.exports = { PORT };
