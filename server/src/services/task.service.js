let tasks = [];
let contadorId = 1;

function obtenerTodas() {
  return tasks;
}

function crearTarea(data) {
  const nueva = {
    id: contadorId,
    nombre: data.nombre,
    inicio: data.inicio,
    fin: data.fin,
    estado: data.estado || 'pendiente',
    prioridad: data.prioridad || 'normal'
  };
  contadorId++;
  tasks.push(nueva);
  return nueva;
}

function actualizarTarea(id, data) {
  const tarea = tasks.find(t => t.id === id);
  if (!tarea) {
    throw new Error('NOT_FOUND');
  }
 
  if (data.nombre !== undefined) tarea.nombre = data.nombre;
  if (data.estado !== undefined) tarea.estado = data.estado;
  if (data.prioridad !== undefined) tarea.prioridad = data.prioridad;
  return tarea;
}

function eliminarTarea(id) {
  const indice = tasks.findIndex(t => t.id === id);
  if (indice === -1) {
    throw new Error('NOT_FOUND');
  }
  tasks.splice(indice, 1);
}

module.exports = { obtenerTodas, crearTarea, actualizarTarea, eliminarTarea };
