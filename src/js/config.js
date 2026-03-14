/**
 * Configuración y constantes de TaskFlow.
 * @module config
 * @description Constantes compartidas: meses, estados de tarea, límites de validación.
 */

/** @constant {string[]} Nombres de los meses en español. */
var MONTH_NAMES = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

/** @constant {string[]} Estados posibles de una tarea. */
var TASK_STATES = ['pendiente', 'en-proceso', 'terminada'];

/** @constant {Object<string, string>} Etiquetas legibles para cada estado. */
var STATE_LABELS = {
    'pendiente': 'Pendiente',
    'en-proceso': 'En proceso',
    'terminada': 'Terminada'
};

/** @constant {Object<string, string>} Clases CSS para badges de estado. */
var STATE_BADGE_CLASSES = {
    'pendiente': 'bg-estado-pendiente',
    'en-proceso': 'bg-estado-proceso',
    'terminada': 'bg-estado-terminada'
};

/** @constant {Object<string, string>} Clases CSS para borde izquierdo por estado. */
var STATE_BORDER_CLASSES = {
    'pendiente': 'border-l-estado-pendiente',
    'en-proceso': 'border-l-estado-proceso',
    'terminada': 'border-l-estado-terminada'
};

/** @constant {number} Longitud máxima del nombre de tarea. */
var MAX_TASK_NAME_LENGTH = 200;

/** @constant {number} Días máximos de rango entre inicio y fin de tarea. */
var MAX_TASK_DAYS_RANGE = 365;
