// aqui guardo las tareas en memoria, cuando reinicie el servidor se pierden
// pero de momento vale para probar
let tasks = [];

// esto lo uso para que cada tarea tenga un id diferente
let contadorId = 1;

function obtenerTodas() {
  return tasks;
}

function crearTarea(data) {
  const nueva = {
    id: contadorId,
    nombre: data.nombre,
    fechaInicio: data.fechaInicio,
    fechaFin: data.fechaFin,
    estado: data.estado || 'pendiente',
    urgente: data.urgente || false
  };
  contadorId++;
  tasks.push(nueva);
  return nueva;
}

function eliminarTarea(id) {
  // busco la posicion de la tarea con ese id
  const indice = tasks.findIndex(t => t.id === id);

  // si no la encuentro lanzo un error
  if (indice === -1) {
    throw new Error('NOT_FOUND');
  }

  // la quito del array
  tasks.splice(indice, 1);
}

module.exports = { obtenerTodas, crearTarea, eliminarTarea };
