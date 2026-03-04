var tareasGuardadas = localStorage.getItem('tareas');
var tareas = tareasGuardadas ? JSON.parse(tareasGuardadas) : [];

function guardarTareas() {
    localStorage.setItem('tareas', JSON.stringify(tareas));
}
var mesActual = new Date().getMonth();
var anioActual = new Date().getFullYear();
var filtro = 'all';

var meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

var estados = ['pendiente', 'en-proceso', 'terminada'];
var estadoTexto = { 'pendiente': 'Pendiente', 'en-proceso': 'En proceso', 'terminada': 'Terminada' };

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
        var fecha = anioActual + '-' + String(mesActual + 1).padStart(2, '0') + '-' + String(d).padStart(2, '0');

        if (d === hoy.getDate() && mesActual === hoy.getMonth() && anioActual === hoy.getFullYear()) {
            el.classList.add('today');
        }

        var tareasDelDia = [];
        for (var t = 0; t < tareas.length; t++) {
            if (fecha >= tareas[t].inicio && fecha <= tareas[t].fin) {
                tareasDelDia.push(tareas[t].estado);
            }
        }
        if (tareasDelDia.length > 0) {
            var dotsDiv = document.createElement('div');
            dotsDiv.classList.add('task-dots');
            for (var k = 0; k < tareasDelDia.length; k++) {
                var dot = document.createElement('span');
                dot.classList.add('task-dot', 'dot-' + tareasDelDia[k]);
                dotsDiv.appendChild(dot);
            }
            el.appendChild(dotsDiv);
        }

        grid.appendChild(el);
    }

    var celdas = offset + totalDias;
    var restantes = celdas % 7 === 0 ? 0 : 7 - (celdas % 7);
    for (var j = 1; j <= restantes; j++) {
        grid.appendChild(crearDia(j, true));
    }
}

function crearDia(numero, deshabilitado) {
    var div = document.createElement('div');
    div.classList.add('day');
    if (deshabilitado) div.classList.add('day-disabled');
    div.textContent = numero;
    return div;
}

function renderTareas() {
    var lista = document.getElementById('tasks-list');
    var filtradas = tareas;

    if (filtro !== 'all') {
        filtradas = tareas.filter(function(t) { return t.estado === filtro; });
    }

    if (filtradas.length === 0) {
        lista.innerHTML = '<p class="empty-message">No hay tareas.</p>';
        return;
    }

    var html = '';
    for (var i = 0; i < filtradas.length; i++) {
        var t = filtradas[i];
        html += '<div class="task-card ' + t.estado + '">'
            + '  <div class="task-info">'
            + '    <span class="task-name">' + t.nombre + '</span>'
            + '    <span class="task-dates">' + t.inicio + ' / ' + t.fin + '</span>'
            + '  </div>'
            + '  <div class="task-actions">'
            + '    <span class="status-badge ' + t.estado + '" data-id="' + t.id + '">' + estadoTexto[t.estado] + '</span>'
            + '    <button class="delete-btn" data-id="' + t.id + '">&times;</button>'
            + '  </div>'
            + '</div>';
    }
    lista.innerHTML = html;
}


document.getElementById('tasks-list').addEventListener('click', function(e) {
    if (e.target.classList.contains('status-badge')) {
        var id = Number(e.target.dataset.id);
        var tarea = tareas.find(function(t) { return t.id === id; });
        if (tarea) {
            var idx = estados.indexOf(tarea.estado);
            tarea.estado = estados[(idx + 1) % 3];
            guardarTareas();
            renderTareas();
            renderCalendario();
        }
    }

    if (e.target.classList.contains('delete-btn')) {
        var id = Number(e.target.dataset.id);
        tareas = tareas.filter(function(t) { return t.id !== id; });
        guardarTareas();
        renderTareas();
        renderCalendario();
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
    guardarTareas();
    renderTareas();
    renderCalendario();
    this.reset();
});

document.getElementById('prev-month').addEventListener('click', function() {
    mesActual--;
    if (mesActual < 0) { mesActual = 11; anioActual--; }
    renderCalendario();
});

document.getElementById('next-month').addEventListener('click', function() {
    mesActual++;
    if (mesActual > 11) { mesActual = 0; anioActual++; }
    renderCalendario();
});

document.querySelectorAll('.filter-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.filter-btn').forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');
        filtro = btn.dataset.filter;
        renderTareas();
    });
});

renderCalendario();
renderTareas();
