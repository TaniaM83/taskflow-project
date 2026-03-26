
var API_URL = 'http://localhost:3000/api/v1/tasks';

function fetchTasks() {
    return fetch(API_URL)
        .then(function (res) {
            if (!res.ok) throw new Error('Error al cargar las tareas');
            return res.json();
        });
}

function createTaskAPI(data) {
    return fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(function (res) {
        if (!res.ok) {
            return res.json().then(function (err) {
                throw new Error(err.error || 'Error al crear la tarea');
            });
        }
        return res.json();
    });
}

function updateTaskAPI(id, data) {
    return fetch(API_URL + '/' + id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(function (res) {
        if (!res.ok) {
            return res.json().then(function (err) {
                throw new Error(err.error || 'Error al actualizar la tarea');
            });
        }
        return res.json();
    });
}

function deleteTaskAPI(id) {
    return fetch(API_URL + '/' + id, {
        method: 'DELETE'
    }).then(function (res) {
        if (!res.ok) {
            return res.json().then(function (err) {
                throw new Error(err.error || 'Error al borrar la tarea');
            });
        }
    });
}
