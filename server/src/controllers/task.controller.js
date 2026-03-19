const taskService = require('../services/task.service');

function getTasks(req, res) {
  const tareas = taskService.obtenerTodas();
  res.json(tareas);
}

function createTask(req, res) {
  const { nombre, fechaInicio, fechaFin } = req.body;

  // compruebo que al menos venga el nombre
  if (!nombre) {
    return res.status(400).json({ error: 'El nombre es obligatorio' });
  }

  // compruebo que vengan las fechas
  if (!fechaInicio || !fechaFin) {
    return res.status(400).json({ error: 'Las fechas de inicio y fin son obligatorias' });
  }

  const nueva = taskService.crearTarea(req.body);
  res.status(201).json(nueva);
}

function deleteTask(req, res) {
  // el id viene como texto en la url, lo paso a numero
  const id = Number(req.params.id);

  // si no es un numero valido devuelvo error
  if (isNaN(id)) {
    return res.status(400).json({ error: 'El id tiene que ser un numero' });
  }

  try {
    taskService.eliminarTarea(id);
    res.status(204).send();
  } catch (error) {
    if (error.message === 'NOT_FOUND') {
      return res.status(404).json({ error: 'No encontre ninguna tarea con ese id' });
    }
    res.status(500).json({ error: 'Algo salio mal' });
  }
}

module.exports = { getTasks, createTask, deleteTask };
