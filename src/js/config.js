var MONTH_NAMES = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

var TASK_STATES = ['pendiente', 'en-proceso', 'terminada'];

var STATE_LABELS = {
    'pendiente': 'Pendiente',
    'en-proceso': 'En proceso',
    'terminada': 'Terminada'
};

var STATE_BADGE_CLASSES = {
    'pendiente': 'bg-estado-pendiente',
    'en-proceso': 'bg-estado-proceso',
    'terminada': 'bg-estado-terminada'
};

var STATE_BORDER_CLASSES = {
    'pendiente': 'border-l-estado-pendiente',
    'en-proceso': 'border-l-estado-proceso',
    'terminada': 'border-l-estado-terminada'
};

var MAX_TASK_NAME_LENGTH = 200;

var MAX_TASK_DAYS_RANGE = 365;
