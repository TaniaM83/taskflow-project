const express = require('express');
const cors = require('cors');
const { PORT } = require('./config/env');
const taskRoutes = require('./routes/task.routes');

const app = express();

// esto es para que acepte json y para que el frontend pueda hacer peticiones
app.use(cors());
app.use(express.json());

// ruta de prueba para ver si funciona
app.get('/', (req, res) => {
  res.json({ mensaje: 'el servidor funciona' });
});

// aqui conecto las rutas de tareas
app.use('/api/v1/tasks', taskRoutes);

app.listen(PORT, () => {
  console.log('Servidor corriendo en http://localhost:' + PORT);
});
