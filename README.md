# TaskFlow

Aplicación web para organizar tareas con calendario. Sin librerías ni frameworks, solo HTML, CSS y JavaScript vanilla.

---

## Funcionalidades

- Crear tareas con nombre, fecha de inicio y fecha de fin
- Marcar tareas como urgentes al crearlas (aparecen siempre primero en la lista)
- Cambiar el estado de cada tarea entre Pendiente, En proceso y Terminada haciendo clic en el badge
- Editar el nombre de una tarea directamente en la lista con el botón ✏️
- Buscar tareas por texto en tiempo real
- Filtrar tareas por estado: Todas, Pendientes, En proceso, Terminadas
- Ordenar tareas por nombre (A→Z / Z→A) o por fecha de inicio
- Ver estadísticas en tiempo real: conteo por estado y total
- Calendario mensual con puntos de color en los días que tienen tareas asignadas
- Eliminar tareas con el botón ×
- Las tareas se guardan en `localStorage`, no se pierden al recargar la página
- Tema claro y oscuro, con preferencia guardada

---

## Estructura del proyecto

```
taskflow-project/
├── src/
│   ├── index.html          Estructura de la página
│   ├── input.css           Entrada de Tailwind CSS
│   ├── js/
│   │   ├── app.js          Lógica principal: tareas, calendario, filtros, búsqueda
│   │   └── config.js       Constantes: estados, etiquetas, clases CSS, límites
│   └── styles/
│       └── style.css       CSS compilado (generado automáticamente)
├── tailwind.config.js
└── package.json
```

---

## Cómo ejecutar el proyecto

Abre `src/index.html` directamente en el navegador. No requiere servidor.

Si modificas los estilos, necesitas recompilar el CSS:

```bash
npm install
npm run build
```

Para desarrollo con recarga automática del CSS:

```bash
npm run dev
```

---

## Ejemplos de uso

**Crear una tarea urgente**
1. Escribe el nombre en el campo "Nombre de la tarea"
2. Selecciona fecha de inicio y fin
3. Marca la casilla "⚡ Marcar como urgente"
4. Pulsa Agregar — la tarea aparecerá al principio de la lista

**Cambiar el estado de una tarea**
Haz clic en el badge de color (Pendiente / En proceso / Terminada) para avanzar al siguiente estado en el ciclo.

**Editar el nombre de una tarea**
Haz clic en el botón ✏️ de la tarjeta. El nombre se convierte en un campo editable. Pulsa Enter para guardar o Escape para cancelar.

**Buscar y filtrar**
Escribe en el buscador para filtrar por texto. Usa los botones de filtro para ver solo las tareas de un estado concreto. Ambos se pueden combinar.

**Ordenar tareas**
Usa el selector "Urgentes primero / Nombre A→Z / Fecha inicio ↑..." situado a la derecha de los filtros.

---

## Tecnologías

- HTML5
- JavaScript ES6 (sin frameworks)
- Tailwind CSS v3
- localStorage para persistencia de datos
