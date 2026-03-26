require('dotenv').config();

if (!process.env.PORT) {
  throw new Error('El puerto no está definido');
}

const PORT = process.env.PORT;

module.exports = { PORT };
