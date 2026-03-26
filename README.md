# TaskFlow

Aplicación web para organizar tareas con calendario. Frontend en HTML/CSS/JS vanilla, backend en Node.js con Express.

---

## Funcionalidades

- Crear tareas con nombre, fecha de inicio y fecha de fin
- Marcar tareas como urgentes al crearlas (aparecen siempre primero en la lista)
- Cambiar el estado de cada tarea entre Pendiente, En proceso y Terminada haciendo clic en el badge
- Editar el nombre de una tarea directamente en la lista con el botón ✏️ o doble clic
- Buscar tareas por texto en tiempo real
- Filtrar tareas por estado: Todas, Pendientes, En proceso, Terminadas
- Ordenar tareas por nombre (A→Z / Z→A) o por fecha de inicio
- Ver estadísticas en tiempo real: conteo por estado y total
- Calendario mensual con puntos de color en los días que tienen tareas asignadas
- Eliminar tareas con confirmación
- Tema claro y oscuro, con preferencia guardada

---

## Arquitectura

El proyecto tiene dos partes separadas que se comunican por HTTP:

```
taskflow-project/
├── src/                          FRONTEND (navegador)
│   ├── index.html                Estructura de la página
│   ├── api/
│   │   └── client.js             Capa de red: fetch hacia el servidor
│   ├── js/
│   │   ├── app.js                Lógica principal: UI, filtros, calendario
│   │   └── config.js             Constantes: estados, etiquetas, clases CSS
│   └── styles/
│       └── style.css             CSS compilado por Tailwind
│
├── server/                       BACKEND (Node.js)
│   ├── src/
│   │   ├── index.js              Punto de entrada: Express + middleware de errores
│   │   ├── config/
│   │   │   └── env.js            Variables de entorno (.env)
│   │   ├── routes/
│   │   │   └── task.routes.js    Rutas: conecta URLs con controladores
│   │   ├── controllers/
│   │   │   └── task.controller.js  Validación de datos + códigos HTTP
│   │   └── services/
│   │       └── task.service.js   Lógica pura: CRUD de tareas en memoria
│   ├── .env                      Variables de entorno (no se sube a git)
│   └── package.json
│
├── tailwind.config.js
└── package.json
```

**Cómo fluye una petición:**
1. El usuario hace clic en "Agregar" en el frontend
2. `app.js` llama a `createTaskAPI()` de `client.js`
3. `client.js` hace un `fetch POST` a `http://localhost:3000/api/v1/tasks`
4. Express recibe la petición y la envía a `task.routes.js`
5. La ruta llama al controlador `createTask` en `task.controller.js`
6. El controlador valida los datos. Si fallan, devuelve 400. Si pasan, llama al servicio
7. `task.service.js` crea la tarea en el array en memoria y la devuelve
8. La respuesta viaja de vuelta al frontend con código 201
9. `app.js` recibe la tarea creada y actualiza la interfaz

**Middleware de errores:**
Al final de `index.js` hay un middleware con 4 parámetros `(err, req, res, next)`. Express lo reconoce como manejador de errores global. Si el error es NOT_FOUND devuelve 404. Cualquier otro error se registra en consola y devuelve 500 genérico, sin filtrar detalles técnicos al exterior.

---

## API REST

Base URL: `http://localhost:3000/api/v1/tasks`

| Método | Ruta | Body | Respuesta | Descripción |
|--------|------|------|-----------|-------------|
| GET | / | — | 200 + array | Obtener todas las tareas |
| POST | / | nombre, inicio, fin, prioridad | 201 + tarea | Crear tarea nueva |
| PUT | /:id | nombre, estado, prioridad | 200 + tarea | Actualizar tarea |
| DELETE | /:id | — | 204 | Eliminar tarea |

Errores posibles:
- 400: datos incorrectos (falta nombre, id no numérico)
- 404: tarea no encontrada
- 500: error interno del servidor

---

## Cómo ejecutar el proyecto

**1. Arrancar el backend:**
```bash
cd server
npm install
npm run dev
```
El servidor arranca en http://localhost:3000

**2. Abrir el frontend:**
Abre `src/index.html` en el navegador. El frontend se conectará automáticamente al servidor.

**3. Si modificas los estilos de Tailwind:**
```bash
npm install
npm run build
```

---

## Ejemplos de uso

**Crear una tarea urgente**
1. Escribe el nombre en el campo "Nombre de la tarea"
2. Selecciona fecha de inicio y fin
3. Marca la casilla "⚡ Marcar como urgente"
4. Pulsa Agregar — la tarea se guarda en el servidor y aparece al principio

**Cambiar el estado de una tarea**
Haz clic en el badge de color (Pendiente → En proceso → Terminada). El cambio se envía al servidor.

**Editar el nombre de una tarea**
Haz clic en ✏️ o doble clic sobre el nombre. Pulsa Enter para guardar o Escape para cancelar.

**Si el servidor no está corriendo**
El frontend muestra un mensaje de error en rojo: "No se pudo conectar al servidor".

---

## Tecnologías

- HTML5 + JavaScript ES6 (sin frameworks)
- Tailwind CSS v3
- Node.js + Express (backend)
- CORS (comunicación frontend-backend)
- fetch API (peticiones HTTP desde el navegador)
