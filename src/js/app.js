/**
 * TaskFlow - Aplicación para organizar tareas con calendario.
 * @module app
 */

/* ----- Estado de la aplicación ----- */

var tasks = JSON.parse(localStorage.getItem('tareas') || '[]');
var currentMonth = new Date().getMonth();
var currentYear = new Date().getFullYear();
var activeFilter = 'all';
var searchQuery = '';
var activeSortOrder = 'default';
var themeToggleButton = document.getElementById('theme-toggle');

/* ----- Storage ----- */

/**
 * Guarda las tareas en localStorage.
 */
function saveTasks() {
    localStorage.setItem('tareas', JSON.stringify(tasks));
}

/**
 * Persiste tareas y actualiza la interfaz (lista + calendario).
 */
function refreshUI() {
    saveTasks();
    renderTaskList();
    renderCalendar();
}

/* ----- Filtrado ----- */

/**
 * Filtra un array de tareas por su campo estado.
 * @param {Object[]} taskList - Array de objetos tarea.
 * @param {string} status - Estado a filtrar ('pendiente', 'en-proceso', 'terminada').
 * @returns {Object[]} Nuevo array con las tareas que coinciden con el estado.
 * @example
 * filterTasksByStatus(tasks, 'pendiente') // → [{id:1, estado:'pendiente'}, ...]
 */
function filterTasksByStatus(taskList, status) {
    if (!Array.isArray(taskList)) return [];
    return taskList.filter(function (t) { return t.estado === status; });
}

/**
 * Aplica el criterio de ordenación activo a una lista de tareas.
 * @param {Object[]} taskList - Lista de tareas a ordenar.
 * @returns {Object[]} Nuevo array ordenado según activeSortOrder.
 */
function applySortOrder(taskList) {
    var sorted = taskList.slice();
    if (activeSortOrder === 'name-asc')   return sorted.sort(function (a, b) { return a.nombre.localeCompare(b.nombre); });
    if (activeSortOrder === 'name-desc')  return sorted.sort(function (a, b) { return b.nombre.localeCompare(a.nombre); });
    if (activeSortOrder === 'date-asc')   return sorted.sort(function (a, b) { return a.inicio.localeCompare(b.inicio); });
    if (activeSortOrder === 'date-desc')  return sorted.sort(function (a, b) { return b.inicio.localeCompare(a.inicio); });
    return sorted;
}

/**
 * Ordena las tareas poniendo las urgentes primero.
 * @param {Object[]} taskList - Lista de tareas a ordenar.
 * @returns {Object[]} Nuevo array con urgentes al inicio.
 */
function sortTasksByUrgency(taskList) {
    return taskList.slice().sort(function (a, b) {
        var aScore = a.prioridad === 'urgente' ? 0 : 1;
        var bScore = b.prioridad === 'urgente' ? 0 : 1;
        return aScore - bScore;
    });
}

/**
 * Devuelve las tareas según el filtro activo, búsqueda y orden.
 * @returns {Object[]} Lista de tareas filtradas y ordenadas.
 */
function getFilteredTasks() {
    var filtered = activeFilter === 'all'
        ? tasks.slice()
        : filterTasksByStatus(tasks, activeFilter);
    if (searchQuery) {
        var q = searchQuery.toLowerCase();
        filtered = filtered.filter(function (t) {
            return t.nombre.toLowerCase().indexOf(q) !== -1;
        });
    }
    if (activeSortOrder === 'default') return sortTasksByUrgency(filtered);
    return applySortOrder(filtered);
}

/**
 * Devuelve las tareas completadas de un array.
 * @param {Object[]} taskList - Lista de tareas.
 * @returns {Object[]} Tareas con estado 'terminada'.
 */
function getCompletedTasks(taskList) {
    return taskList.filter(function (t) { return t.estado === 'terminada'; });
}

/* ----- Utilidades de fecha ----- */

/**
 * Formatea año, mes y día como YYYY-MM-DD.
 * @param {number} year - Año.
 * @param {number} month - Mes (0-11).
 * @param {number} day - Día del mes.
 * @returns {string} Fecha en formato ISO.
 */
function formatDateISO(year, month, day) {
    return year + '-' + String(month + 1).padStart(2, '0') + '-' + String(day).padStart(2, '0');
}

/**
 * Navega al mes anterior o siguiente.
 * @param {number} delta - -1 para anterior, 1 para siguiente.
 */
function changeMonth(delta) {
    currentMonth += delta;
    if (currentMonth < 0) { currentMonth = 11; currentYear--; }
    if (currentMonth > 11) { currentMonth = 0; currentYear++; }
    renderCalendar();
}

/* ----- Validación del formulario ----- */

/**
 * Valida los datos del formulario de nueva tarea.
 * @param {string} name - Nombre de la tarea.
 * @param {string} startDate - Fecha de inicio (YYYY-MM-DD).
 * @param {string} endDate - Fecha de fin (YYYY-MM-DD).
 * @returns {{ valid: boolean, message?: string }} Resultado de la validación.
 */
function validateTaskForm(name, startDate, endDate) {
    if (!name || !startDate || !endDate) {
        return { valid: false, message: 'Todos los campos son obligatorios.' };
    }
    if (name.length > MAX_TASK_NAME_LENGTH) {
        return { valid: false, message: 'El nombre no puede superar ' + MAX_TASK_NAME_LENGTH + ' caracteres.' };
    }
    if (endDate < startDate) {
        return { valid: false, message: 'La fecha de fin debe ser igual o posterior a la de inicio.' };
    }
    var start = new Date(startDate);
    var end = new Date(endDate);
    var daysDiff = Math.floor((end - start) / (1000 * 60 * 60 * 24));
    if (daysDiff > MAX_TASK_DAYS_RANGE) {
        return { valid: false, message: 'El rango de fechas no puede superar ' + MAX_TASK_DAYS_RANGE + ' días.' };
    }
    return { valid: true };
}

/**
 * Muestra un mensaje de error en el formulario.
 * @param {string} message - Mensaje a mostrar.
 */
function showFormError(message) {
    var el = document.getElementById('form-error');
    if (el) {
        el.textContent = message;
        el.classList.remove('hidden');
    }
}

/**
 * Oculta el mensaje de error del formulario.
 */
function hideFormError() {
    var el = document.getElementById('form-error');
    if (el) {
        el.textContent = '';
        el.classList.add('hidden');
    }
}

/* ----- Calendario ----- */

/**
 * Crea un elemento DOM para un día del calendario.
 * @param {number} dayNumber - Número del día.
 * @param {boolean} isDisabled - Si es día de otro mes.
 * @returns {HTMLDivElement} Elemento del día.
 */
function createDayElement(dayNumber, isDisabled) {
    var div = document.createElement('div');
    div.classList.add('day');
    div.classList.toggle('day-disabled', !!isDisabled);
    div.textContent = dayNumber;
    return div;
}

/**
 * Crea los puntos indicadores de tareas para un día.
 * @param {string[]} estados - Estados de las tareas del día.
 * @returns {HTMLDivElement} Contenedor de puntos.
 */
function createTaskDots(estados) {
    var container = document.createElement('div');
    container.classList.add('task-dots');
    estados.forEach(function (estado) {
        var dot = document.createElement('span');
        dot.classList.add('task-dot', 'dot-' + estado);
        container.appendChild(dot);
    });
    return container;
}

/**
 * Renderiza el calendario del mes actual.
 */
function renderCalendar() {
    document.getElementById('month-name').textContent = MONTH_NAMES[currentMonth];
    document.getElementById('year-number').textContent = currentYear;

    var grid = document.getElementById('calendario-grid');
    grid.querySelectorAll('.day').forEach(function (el) { el.remove(); });

    var firstWeekday = new Date(currentYear, currentMonth, 1).getDay();
    var offset = firstWeekday === 0 ? 6 : firstWeekday - 1;
    var prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();

    for (var i = offset - 1; i >= 0; i--) {
        grid.appendChild(createDayElement(prevMonthDays - i, true));
    }

    var totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();
    var today = new Date();

    for (var d = 1; d <= totalDays; d++) {
        var cell = createDayElement(d, false);
        var dateStr = formatDateISO(currentYear, currentMonth, d);
        var isToday = d === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();

        if (isToday) cell.classList.add('today');

        var taskStatesOnDay = tasks
            .filter(function (t) { return dateStr >= t.inicio && dateStr <= t.fin; })
            .map(function (t) { return t.estado; });

        if (taskStatesOnDay.length > 0) {
            cell.appendChild(createTaskDots(taskStatesOnDay));
        }

        grid.appendChild(cell);
    }

    var totalCells = offset + totalDays;
    var remainingCells = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
    for (var j = 1; j <= remainingCells; j++) {
        grid.appendChild(createDayElement(j, true));
    }
}

/* ----- Lista de tareas ----- */

/**
 * Genera el HTML de una tarjeta de tarea.
 * @param {Object} task - Objeto tarea.
 * @returns {string} HTML de la tarjeta.
 */
function buildTaskCardHTML(task) {
    var isCompleted = task.estado === 'terminada';
    var opacityClass = isCompleted ? ' opacity-75' : '';
    var strikeClass = isCompleted ? ' line-through text-gray-400 dark:text-olive-200' : '';
    var urgentBadge = task.prioridad === 'urgente'
        ? '<span class="text-xs font-bold text-red-500 uppercase tracking-wide">⚡ Urgente</span>'
        : '';
    return `
        <div class="flex justify-between items-center p-4 rounded-lg border-l-4 ${STATE_BORDER_CLASSES[task.estado]} bg-olive-50 dark:bg-olive-800 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg max-md:flex-col max-md:items-start max-md:gap-2${opacityClass}">
            <div class="flex flex-col gap-1 flex-1 min-w-0">
                ${urgentBadge}
                <span class="font-semibold text-sm transition-colors duration-300${strikeClass}">${escapeHtml(task.nombre)}</span>
                <span class="text-xs text-gray-400 dark:text-olive-200">${task.inicio} / ${task.fin}</span>
            </div>
            <div class="flex items-center gap-2 shrink-0 max-md:self-end">
                <span class="status-badge px-2 py-1 rounded-xl text-xs font-semibold text-white cursor-pointer transition-all duration-300 hover:scale-105 ${STATE_BADGE_CLASSES[task.estado]}" data-id="${task.id}">${STATE_LABELS[task.estado]}</span>
                <button class="delete-btn w-7 h-7 flex items-center justify-center rounded-full text-gray-400 dark:text-olive-200 transition-all duration-300 hover:bg-estado-pendiente hover:text-white focus:outline-none focus:ring-2 focus:ring-estado-pendiente/50" data-id="${task.id}">&times;</button>
            </div>
        </div>`;
}

/**
 * Escapa HTML para evitar XSS.
 * @param {string} text - Texto a escapar.
 * @returns {string} Texto seguro.
 */
function escapeHtml(text) {
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Renderiza la barra de estadísticas con el conteo de tareas por estado.
 */
function renderStats() {
    var statsEl = document.getElementById('task-stats');
    if (!statsEl) return;
    var pending = filterTasksByStatus(tasks, 'pendiente').length;
    var inProgress = filterTasksByStatus(tasks, 'en-proceso').length;
    var done = filterTasksByStatus(tasks, 'terminada').length;
    statsEl.innerHTML =
        '<span class="px-2 py-1 rounded-full bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300 font-semibold">Pendientes: ' + pending + '</span>' +
        '<span class="px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-semibold">En proceso: ' + inProgress + '</span>' +
        '<span class="px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 font-semibold">Terminadas: ' + done + '</span>' +
        '<span class="px-2 py-1 rounded-full bg-gray-200 dark:bg-olive-600 text-gray-600 dark:text-white font-semibold">Total: ' + tasks.length + '</span>';
}

/**
 * Renderiza la lista de tareas según el filtro activo.
 */
function renderTaskList() {
    renderStats();
    var listEl = document.getElementById('tasks-list');
    var filtered = getFilteredTasks();

    if (filtered.length === 0) {
        listEl.innerHTML = '<p class="text-center text-gray-400 dark:text-olive-200 py-8 text-sm">No hay tareas.</p>';
        return;
    }

    listEl.innerHTML = filtered.map(buildTaskCardHTML).join('');
}

/* ----- Operaciones CRUD ----- */

/**
 * Avanza el estado de una tarea al siguiente en el ciclo.
 * @param {number} taskId - ID de la tarea.
 */
function advanceTaskState(taskId) {
    var task = tasks.find(function (t) { return t.id === taskId; });
    if (!task) return;
    var idx = TASK_STATES.indexOf(task.estado);
    task.estado = TASK_STATES[(idx + 1) % TASK_STATES.length];
    refreshUI();
}

/**
 * Elimina una tarea por ID.
 * @param {number} taskId - ID de la tarea.
 */
function deleteTask(taskId) {
    tasks = tasks.filter(function (t) { return t.id !== taskId; });
    refreshUI();
}

/**
 * Añade una nueva tarea.
 * @param {Object} taskData - { nombre, inicio, fin }.
 */
function addTask(taskData) {
    tasks.push({
        id: Date.now(),
        nombre: taskData.nombre,
        inicio: taskData.inicio,
        fin: taskData.fin,
        estado: 'pendiente',
        prioridad: taskData.prioridad || 'normal'
    });
}

/* ----- Tema ----- */

/**
 * Obtiene el tema actual (dark/light).
 * @returns {string} 'dark' o 'light'.
 */
function getCurrentTheme() {
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

/**
 * Aplica un tema y actualiza el icono.
 * @param {string} theme - 'dark' o 'light'.
 */
function applyTheme(theme) {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
    if (themeToggleButton) {
        themeToggleButton.textContent = theme === 'dark' ? '🌕' : '🌑';
    }
}

/**
 * Alterna entre tema oscuro y claro.
 */
function toggleTheme() {
    var next = getCurrentTheme() === 'dark' ? 'light' : 'dark';
    applyTheme(next);
}

/* ----- Filtros ----- */

/**
 * Activa el botón de filtro seleccionado y desactiva el resto.
 * @param {HTMLElement} activeBtn - Botón que recibe la clase active.
 */
function setActiveFilterButton(activeBtn) {
    document.querySelectorAll('.filter-btn').forEach(function (b) {
        b.classList.remove('active');
    });
    activeBtn.classList.add('active');
}

/* ----- Inicialización de eventos ----- */

function initTaskListClickHandler() {
    document.getElementById('tasks-list').addEventListener('click', function (e) {
        if (e.target.classList.contains('status-badge')) {
            advanceTaskState(Number(e.target.dataset.id));
        }
        if (e.target.classList.contains('delete-btn')) {
            deleteTask(Number(e.target.dataset.id));
        }
    });
}

function initTaskFormHandler() {
    document.getElementById('task-form').addEventListener('submit', function (e) {
        e.preventDefault();
        hideFormError();

        var nameInput = document.getElementById('task-name');
        var startInput = document.getElementById('start-date');
        var endInput = document.getElementById('end-date');
        var nombre = nameInput.value.trim();
        var inicio = startInput.value;
        var fin = endInput.value;

        var validation = validateTaskForm(nombre, inicio, fin);
        if (!validation.valid) {
            showFormError(validation.message);
            return;
        }

        var prioridad = document.getElementById('task-urgent').checked ? 'urgente' : 'normal';
        addTask({ nombre: nombre, inicio: inicio, fin: fin, prioridad: prioridad });
        refreshUI();
        this.reset();
    });
}

function initMonthNavigation() {
    document.getElementById('prev-month').addEventListener('click', function () { changeMonth(-1); });
    document.getElementById('next-month').addEventListener('click', function () { changeMonth(1); });
}

function initFilterButtons() {
    document.querySelectorAll('.filter-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            setActiveFilterButton(this);
            activeFilter = this.dataset.filter;
            renderTaskList();
        });
    });
}

function initThemeToggle() {
    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', toggleTheme);
    }
}

function initSearchHandler() {
    document.getElementById('search-input').addEventListener('input', function () {
        searchQuery = this.value.trim();
        renderTaskList();
    });
}

function initSortHandler() {
    document.getElementById('sort-select').addEventListener('change', function () {
        activeSortOrder = this.value;
        renderTaskList();
    });
}

/* ----- Inicio ----- */

function init() {
    var savedTheme = localStorage.getItem('theme');
    applyTheme(savedTheme === 'light' ? 'light' : 'dark');

    initTaskListClickHandler();
    initTaskFormHandler();
    initMonthNavigation();
    initFilterButtons();
    initThemeToggle();
    initSearchHandler();
    initSortHandler();

    renderCalendar();
    renderTaskList();
}

init();
