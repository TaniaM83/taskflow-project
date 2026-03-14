var tareasGuardadas = localStorage.getItem('tareas');
var tareas = tareasGuardadas ? JSON.parse(tareasGuardadas) : [];

function guardarTareas() {
    localStorage.setItem('tareas', JSON.stringify(tareas));
}

/** Persiste tareas y actualiza lista + calendario. Evita repetir la tripleta en cada acción. */
function refrescarUI() {
    guardarTareas();
    renderTareas();
    renderCalendario();
}

function obtenerTareasCompletadas(arrTareas) {
    return arrTareas.filter(function(t) { return t.estado === 'terminada'; });
}

function obtenerTareasFiltradas() {
    return filtro === 'all'
        ? tareas
        : tareas.filter(function(t) { return t.estado === filtro; });
}

var mesActual = new Date().getMonth();
var anioActual = new Date().getFullYear();
var filtro = 'all';

var meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

var estados = ['pendiente', 'en-proceso', 'terminada'];
var estadoTexto = { 'pendiente': 'Pendiente', 'en-proceso': 'En proceso', 'terminada': 'Terminada' };

var badgeClases = {
    'pendiente': 'bg-estado-pendiente',
    'en-proceso': 'bg-estado-proceso',
    'terminada': 'bg-estado-terminada'
};

var borderClases = {
    'pendiente': 'border-l-estado-pendiente',
    'en-proceso': 'border-l-estado-proceso',
    'terminada': 'border-l-estado-terminada'
};

function formatearFechaISO(anio, mes, dia) {
    return anio + '-' + String(mes + 1).padStart(2, '0') + '-' + String(dia).padStart(2, '0');
}

function cambiarMes(delta) {
    mesActual += delta;
    if (mesActual < 0) { mesActual = 11; anioActual--; }
    if (mesActual > 11) { mesActual = 0; anioActual++; }
    renderCalendario();
}

function renderCalendario() {
    document.getElementById('month-name').textContent = meses[mesActual];
    document.getElementById('year-number').textContent = anioActual;

    var grid = document.getElementById('calendario-grid');
    grid.querySelectorAll('.day').forEach(function(el) { el.remove(); });

    var primerDia = new Date(anioActual, mesActual, 1).getDay();
    var offset = primerDia === 0 ? 6 : primerDia - 1;

    var diasMesAnterior = new Date(anioActual, mesActual, 0).getDate();
    for (var i = offset - 1; i >= 0; i--) {
        grid.appendChild(crearDia(diasMesAnterior - i, true));
    }

    var totalDias = new Date(anioActual, mesActual + 1, 0).getDate();
    var hoy = new Date();

    for (var d = 1; d <= totalDias; d++) {
        var el = crearDia(d, false);
        var fecha = formatearFechaISO(anioActual, mesActual, d);
        var esHoy = d === hoy.getDate() && mesActual === hoy.getMonth() && anioActual === hoy.getFullYear();

        if (esHoy) {
            el.classList.add('today');
        }

        var tareasDelDia = tareas
            .filter(function(t) { return fecha >= t.inicio && fecha <= t.fin; })
            .map(function(t) { return t.estado; });
        if (tareasDelDia.length > 0) {
            var dotsDiv = document.createElement('div');
            dotsDiv.classList.add('task-dots');
            tareasDelDia.forEach(function(estado) {
                var dot = document.createElement('span');
                dot.classList.add('task-dot', 'dot-' + estado);
                dotsDiv.appendChild(dot);
            });
            el.appendChild(dotsDiv);
        }

        grid.appendChild(el);
    }

    var celdas = offset + totalDias;
    var restantes = celdas % 7 === 0 ? 0 : 7 - (celdas % 7);
    for (var j = 1; j <= restantes; j++) 
    {
        grid.appendChild(crearDia(j, true));
    }
}

function crearDia(numero, deshabilitado) {
    var div = document.createElement('div');
    div.classList.add('day');
    div.classList.toggle('day-disabled', !!deshabilitado);
    div.textContent = numero;
    return div;
}


function renderTareas() {
    var lista = document.getElementById('tasks-list');
    var filtradas = obtenerTareasFiltradas();

    if (filtradas.length === 0) {
        lista.innerHTML = '<p class="text-center text-gray-400 dark:text-olive-200 py-8 text-sm">No hay tareas.</p>';
        return;
    }

    var html = filtradas.map(function(t) {
        var opacidad = t.estado === 'terminada' ? ' opacity-75' : '';
        var tachado = t.estado === 'terminada' ? ' line-through text-gray-400 dark:text-olive-200' : '';
        return `
            <div class="flex justify-between items-center p-4 rounded-lg border-l-4 ${borderClases[t.estado]} bg-olive-50 dark:bg-olive-800 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg max-md:flex-col max-md:items-start max-md:gap-2${opacidad}">
                <div class="flex flex-col gap-1 flex-1 min-w-0">
                    <span class="font-semibold text-sm transition-colors duration-300${tachado}">${t.nombre}</span>
                    <span class="text-xs text-gray-400 dark:text-olive-200">${t.inicio} / ${t.fin}</span>
                </div>
                <div class="flex items-center gap-2 shrink-0 max-md:self-end">
                    <span class="status-badge px-2 py-1 rounded-xl text-xs font-semibold text-white cursor-pointer transition-all duration-300 hover:scale-105 ${badgeClases[t.estado]}" data-id="${t.id}">${estadoTexto[t.estado]}</span>
                    <button class="delete-btn w-7 h-7 flex items-center justify-center rounded-full text-gray-400 dark:text-olive-200 transition-all duration-300 hover:bg-estado-pendiente hover:text-white focus:outline-none focus:ring-2 focus:ring-estado-pendiente/50" data-id="${t.id}">&times;</button>
                </div>
            </div>`;
    }).join('');
    lista.innerHTML = html;
}

function avanzarEstadoTarea(id) {
    var tarea = tareas.find(function(t) { return t.id === id; });
    if (!tarea) return;
    var idx = estados.indexOf(tarea.estado);
    tarea.estado = estados[(idx + 1) % estados.length];
    refrescarUI();
}

function eliminarTarea(id) {
    tareas = tareas.filter(function(t) { return t.id !== id; });
    refrescarUI();
}

document.getElementById('tasks-list').addEventListener('click', function(e) {
    if (e.target.classList.contains('status-badge')) {
        avanzarEstadoTarea(Number(e.target.dataset.id));
    }
    if (e.target.classList.contains('delete-btn')) {
        eliminarTarea(Number(e.target.dataset.id));
    }
});

document.getElementById('task-form').addEventListener('submit', function(e) {
    e.preventDefault();
    var nombre = document.getElementById('task-name').value.trim();
    var inicio = document.getElementById('start-date').value;
    var fin = document.getElementById('end-date').value;

    if (!nombre || !inicio || !fin) return;
    if (fin < inicio) {
        alert('La fecha de fin debe ser igual o posterior a la de inicio.');
        return;
    }

    tareas.push({ id: Date.now(), nombre: nombre, inicio: inicio, fin: fin, estado: 'pendiente' });
    refrescarUI();
    this.reset();
});

document.getElementById('prev-month').addEventListener('click', function() { cambiarMes(-1); });
document.getElementById('next-month').addEventListener('click', function() { cambiarMes(1); });

document.querySelectorAll('.filter-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.filter-btn').forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');
        filtro = btn.dataset.filter;
        renderTareas();
    });
});

var iconoTema = document.getElementById('theme-toggle');

function obtenerTemaActual() {
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

function aplicarTema(tema) {
    document.documentElement.classList.toggle('dark', tema === 'dark');
    localStorage.setItem('theme', tema);
    iconoTema.textContent = tema === 'dark' ? '🌕' : '🌑';
}

function toggleTema() {
    var siguiente = obtenerTemaActual() === 'dark' ? 'light' : 'dark';
    aplicarTema(siguiente);
}

document.getElementById('theme-toggle').addEventListener('click', toggleTema);

var temaGuardado = localStorage.getItem('theme');
if (temaGuardado === 'light') {
    aplicarTema('light');
} else {
    aplicarTema('dark');
}

renderCalendario();
renderTareas();
