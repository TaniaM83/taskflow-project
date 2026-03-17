var tasks = JSON.parse(localStorage.getItem('tareas') || '[]');
var currentMonth = new Date().getMonth();
var currentYear = new Date().getFullYear();
var activeFilter = 'all';
var searchQuery = '';
var activeSortOrder = 'default';
var themeToggleButton = document.getElementById('theme-toggle');

function saveTasks() {
    localStorage.setItem('tareas', JSON.stringify(tasks));
}

function refreshUI() {
    saveTasks();
    renderTaskList();
    renderCalendar();
}

function filterTasksByStatus(taskList, status) {
    if (!Array.isArray(taskList)) return [];
    return taskList.filter(function (t) { return t.estado === status; });
}

function applySortOrder(taskList) {
    var sorted = taskList.slice();
    if (activeSortOrder === 'name-asc')  return sorted.sort(function (a, b) { return a.nombre.localeCompare(b.nombre); });
    if (activeSortOrder === 'name-desc') return sorted.sort(function (a, b) { return b.nombre.localeCompare(a.nombre); });
    if (activeSortOrder === 'date-asc')  return sorted.sort(function (a, b) { return a.inicio.localeCompare(b.inicio); });
    if (activeSortOrder === 'date-desc') return sorted.sort(function (a, b) { return b.inicio.localeCompare(a.inicio); });
    return sorted;
}

function sortTasksByUrgency(taskList) {
    return taskList.slice().sort(function (a, b) {
        var aScore = a.prioridad === 'urgente' ? 0 : 1;
        var bScore = b.prioridad === 'urgente' ? 0 : 1;
        return aScore - bScore;
    });
}

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

function getCompletedTasks(taskList) {
    return taskList.filter(function (t) { return t.estado === 'terminada'; });
}

function formatDateISO(year, month, day) {
    return year + '-' + String(month + 1).padStart(2, '0') + '-' + String(day).padStart(2, '0');
}

function changeMonth(delta) {
    currentMonth += delta;
    if (currentMonth < 0) { currentMonth = 11; currentYear--; }
    if (currentMonth > 11) { currentMonth = 0; currentYear++; }
    renderCalendar();
}

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

function showFormError(message) {
    var el = document.getElementById('form-error');
    if (el) {
        el.textContent = message;
        el.classList.remove('hidden');
    }
}

function hideFormError() {
    var el = document.getElementById('form-error');
    if (el) {
        el.textContent = '';
        el.classList.add('hidden');
    }
}

function createDayElement(dayNumber, isDisabled) {
    var div = document.createElement('div');
    div.classList.add('day');
    div.classList.toggle('day-disabled', !!isDisabled);
    div.textContent = dayNumber;
    return div;
}

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

function escapeHtml(text) {
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function buildTaskCardHTML(task) {
    var isCompleted = task.estado === 'terminada';
    var opacityClass = isCompleted ? ' opacity-75' : '';
    var strikeClass = isCompleted ? ' line-through text-gray-400 dark:text-olive-200' : '';
    var urgentBadge = task.prioridad === 'urgente'
        ? '<span class="text-xs font-bold text-red-500 uppercase tracking-wide">⚡ Urgente</span>'
        : '';
    return `
        <div class="flex justify-between items-center p-4 rounded-lg border-l-4 ${STATE_BORDER_CLASSES[task.estado]} bg-olive-50 dark:bg-olive-800 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg max-md:flex-col max-md:items-start max-md:gap-2${opacityClass}" data-task-id="${task.id}">
            <div class="flex flex-col gap-1 flex-1 min-w-0">
                ${urgentBadge}
                <span class="task-name font-semibold text-sm transition-colors duration-300${strikeClass}">${escapeHtml(task.nombre)}</span>
                <span class="text-xs text-gray-400 dark:text-olive-200">${task.inicio} / ${task.fin}</span>
            </div>
            <div class="flex items-center gap-2 shrink-0 max-md:self-end">
                <button class="edit-btn w-7 h-7 flex items-center justify-center rounded-full text-gray-400 dark:text-olive-200 transition-all duration-300 hover:bg-olive-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-olive-400/50" data-id="${task.id}" title="Editar nombre">✏️</button>
                <span class="status-badge px-2 py-1 rounded-xl text-xs font-semibold text-white cursor-pointer transition-all duration-300 hover:scale-105 ${STATE_BADGE_CLASSES[task.estado]}" data-id="${task.id}">${STATE_LABELS[task.estado]}</span>
                <button class="delete-btn w-7 h-7 flex items-center justify-center rounded-full text-gray-400 dark:text-olive-200 transition-all duration-300 hover:bg-estado-pendiente hover:text-white focus:outline-none focus:ring-2 focus:ring-estado-pendiente/50" data-id="${task.id}">&times;</button>
            </div>
        </div>`;
}

function renderStats() {
    var statsEl = document.getElementById('task-stats');
    if (!statsEl) return;
    var pending = filterTasksByStatus(tasks, 'pendiente').length;
    var inProgress = filterTasksByStatus(tasks, 'en-proceso').length;
    var done = filterTasksByStatus(tasks, 'terminada').length;
    var urgent = tasks.filter(function (t) { return t.prioridad === 'urgente'; }).length;
    statsEl.innerHTML =
        '<span class="px-2 py-1 rounded-full bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300 font-semibold">Pendientes: ' + pending + '</span>' +
        '<span class="px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-semibold">En proceso: ' + inProgress + '</span>' +
        '<span class="px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 font-semibold">Terminadas: ' + done + '</span>' +
        (urgent > 0 ? '<span class="px-2 py-1 rounded-full bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-300 font-semibold">⚡ Urgentes: ' + urgent + '</span>' : '') +
        '<span class="px-2 py-1 rounded-full bg-gray-200 dark:bg-olive-600 text-gray-600 dark:text-white font-semibold">Total: ' + tasks.length + '</span>';
}

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

function advanceTaskState(taskId) {
    var task = tasks.find(function (t) { return t.id === taskId; });
    if (!task) return;
    var idx = TASK_STATES.indexOf(task.estado);
    task.estado = TASK_STATES[(idx + 1) % TASK_STATES.length];
    refreshUI();
}

function startEditingTask(taskId) {
    var card = document.querySelector('[data-task-id="' + taskId + '"]');
    var task = tasks.find(function (t) { return t.id === taskId; });
    if (!card || !task) return;

    var nameSpan = card.querySelector('.task-name');
    if (!nameSpan) return;

    var input = document.createElement('input');
    input.type = 'text';
    input.value = task.nombre;
    input.className = 'task-name font-semibold text-sm bg-transparent border-b-2 border-olive-400 focus:outline-none w-full text-gray-800 dark:text-white';
    input.maxLength = MAX_TASK_NAME_LENGTH;

    nameSpan.replaceWith(input);
    input.focus();
    input.select();

    var saved = false;
    function save() {
        if (saved) return;
        saved = true;
        var newName = input.value.trim();
        if (newName && newName !== task.nombre) {
            task.nombre = newName;
            saveTasks();
        }
        renderTaskList();
    }

    input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') { e.preventDefault(); save(); }
        if (e.key === 'Escape') { saved = true; renderTaskList(); }
    });
    input.addEventListener('blur', save);
}

function deleteTask(taskId) {
    var task = tasks.find(function (t) { return t.id === taskId; });
    if (!task) return;
    if (!confirm('¿Borrar la tarea "' + task.nombre + '"?')) return;
    tasks = tasks.filter(function (t) { return t.id !== taskId; });
    refreshUI();
}

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

function getCurrentTheme() {
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

function applyTheme(theme) {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
    if (themeToggleButton) {
        themeToggleButton.textContent = theme === 'dark' ? '🌕' : '🌑';
    }
}

function toggleTheme() {
    var next = getCurrentTheme() === 'dark' ? 'light' : 'dark';
    applyTheme(next);
}

function setActiveFilterButton(activeBtn) {
    document.querySelectorAll('.filter-btn').forEach(function (b) {
        b.classList.remove('active');
    });
    activeBtn.classList.add('active');
}

function initTaskListClickHandler() {
    document.getElementById('tasks-list').addEventListener('click', function (e) {
        if (e.target.classList.contains('edit-btn')) {
            startEditingTask(Number(e.target.dataset.id));
        }
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

        var nombre = document.getElementById('task-name').value.trim();
        var inicio = document.getElementById('start-date').value;
        var fin = document.getElementById('end-date').value;

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
