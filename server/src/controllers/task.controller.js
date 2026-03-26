const taskService = require('../services/task.service');

function getTasks(req, res) {
  const tareas = taskService.obtenerTodas();
  res.json(tareas);
}

function createTask(req, res) {
  const { nombre, inicio, fin } = req.body;

  if (!nombre) {
    return res.status(400).json({ error: 'El nombre es obligatorio' });
  }
  if (!inicio || !fin) {
    return res.status(400).json({ error: 'Las fechas de inicio y fin son obligatorias' });
  }

  const nueva = taskService.crearTarea(req.body);
  res.status(201).json(nueva);
}

function updateTask(req, res, next) {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'El id tiene que ser un numero' });
  }

  try {
    const actualizada = taskService.actualizarTarea(id, req.body);
    res.json(actualizada);
  } catch (error) {
    next(error);
  }
}

function deleteTask(req, res, next) {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'El id tiene que ser un numero' });
  }

  try {
    taskService.eliminarTarea(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

module.exports = { getTasks, createTask, updateTask, deleteTask };
