const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');

// GET /api/v1/tasks -> devuelve todas las tareas
router.get('/', taskController.getTasks);

// POST /api/v1/tasks -> crea una tarea nueva
router.post('/', taskController.createTask);

// DELETE /api/v1/tasks/3 -> borra la tarea con id 3
router.delete('/:id', taskController.deleteTask);

module.exports = router;
