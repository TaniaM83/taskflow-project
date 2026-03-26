const express = require('express');
const cors = require('cors');
const path = require('path');
const { PORT } = require('./config/env');
const taskRoutes = require('./routes/task.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '../../src')));

app.use('/api/v1/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../src/index.html'));
});

app.use((err, req, res, next) => {

  if (err.message === 'NOT_FOUND') {
    return res.status(404).json({ error: 'Recurso no encontrado' });
  }


  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(PORT, () => {
  console.log('Servidor corriendo en http://localhost:' + PORT);
});
