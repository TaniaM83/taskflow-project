Experimentos con IA en programación

Este es mi laboratorio. Aquí anoto las pruebas que hago comparando cómo resuelvo problemas sola frente a con ayuda de IA.


PARTE 1: TRES PROBLEMAS GENÉRICOS DE PROGRAMACIÓN


Problema 1: Contar vocales en una cadena

Enunciado: Dada una cadena de texto, devuelve cuántas vocales tiene.

Solución sin IA (yo sola):
Tiempo: ~10 minutos pensando cómo hacerlo.

function contarVocales(texto) {
    var vocales = ['a', 'e', 'i', 'o', 'u'];
    var cuenta = 0;
    for (var i = 0; i < texto.length; i++) {
        if (vocales.indexOf(texto[i].toLowerCase()) !== -1) {
            cuenta++;
        }
    }
    return cuenta;
}

Problemas que tuve: no sabía si usar indexOf o includes, al final usé indexOf porque lo tenía más claro. Tampoco pensé en mayúsculas hasta la mitad.

Solución con IA (prompt: "Escribe una función en JS que cuente las vocales de una cadena, en una sola línea si es posible"):

function contarVocales(texto) {
    return (texto.match(/[aeiouáéíóú]/gi) || []).length;
}

Diferencias:
- Tiempo con IA: 30 segundos.
- La IA usó regex, que yo no hubiera pensado.
- La versión sin IA es más fácil de entender para alguien que empieza.
- La versión con IA es más corta y también cubre tildes, que yo me olvidé.
- Comprensión: con la mía entendí todo, con la de IA tuve que buscar qué significaba /gi.


Problema 2: Invertir un array sin usar .reverse()

Enunciado: Invierte el orden de los elementos de un array sin usar el método reverse().

Solución sin IA:
Tiempo: ~8 minutos.

function invertirArray(arr) {
    var resultado = [];
    for (var i = arr.length - 1; i >= 0; i--) {
        resultado.push(arr[i]);
    }
    return resultado;
}

Problemas que tuve: al principio empecé el bucle al revés y me lié con los índices.

Solución con IA (prompt: "Invierte un array en JS sin usar reverse(), de varias formas posibles"):

// Opción 1: con reduce
const invertirArray = arr => arr.reduce((acc, val) => [val, ...acc], []);

// Opción 2: con índices desde el final
const invertirArray2 = arr => arr.map((_, i) => arr[arr.length - 1 - i]);

Diferencias:
- Tiempo con IA: 20 segundos.
- La IA me dio dos opciones, yo solo pensé en una.
- Mi solución es más legible para mí ahora mismo.
- La de reduce es elegante pero si no sabes cómo funciona el acumulador, es confusa.
- Comprensión: la IA me enseñó que se puede hacer con map también, eso no lo hubiera pensado.


Problema 3: Encontrar el número más grande de un array

Enunciado: Dado un array de números, devuelve el mayor.

Solución sin IA:
Tiempo: ~5 minutos.

function encontrarMaximo(numeros) {
    var maximo = numeros[0];
    for (var i = 1; i < numeros.length; i++) {
        if (numeros[i] > maximo) {
            maximo = numeros[i];
        }
    }
    return maximo;
}

Problemas que tuve: ninguno especial, este lo tenía claro.

Solución con IA (prompt: "Encuentra el número mayor de un array en JS, la forma más corta"):

const encontrarMaximo = arr => Math.max(...arr);

Diferencias:
- Tiempo con IA: 10 segundos.
- Un solo línea frente a 8.
- Math.max con spread es algo que sabía que existía pero no me acordaba cómo usarlo.
- Comprensión: aquí la IA me recordó algo que ya había visto, no me enseñó algo nuevo.


Conclusiones Parte 1:

- Para problemas simples, la diferencia de tiempo es enorme: yo tardé entre 5 y 10 minutos, la IA entre 10 y 30 segundos.
- La calidad del código de la IA es mayor en brevedad, pero no siempre en legibilidad.
- La comprensión del problema es mejor cuando lo resuelvo yo, aunque sea peor el código.
- La IA es más útil cuanto más específico es el prompt. Si pido "de varias formas" aprendo más.
- Lo ideal: resolver primero sola para entenderlo, luego pedir a la IA que mejore o explique alternativas.


PARTE 2: TRES TAREAS RELACIONADAS CON EL PROYECTO TASKFLOW


Las tres tareas que elegí para experimentar en app.js:

1. Confirmación antes de borrar una tarea
2. Doble clic para editar el nombre de una tarea
3. Mostrar el número de tareas urgentes en las estadísticas


Tarea 1: Confirmación antes de borrar

Sin IA (yo sola):
Pensé en meter un window.confirm dentro de deleteTask. Tardé poco en pensarlo pero dudé si era mala práctica usar alert/confirm en proyectos reales.

function deleteTask(taskId) {
    if (!confirm('¿Seguro que quieres borrar esta tarea?')) return;
    tasks = tasks.filter(function (t) { return t.id !== taskId; });
    refreshUI();
}

Con IA (prompt: "Actúa como desarrollador senior. En esta función deleteTask quiero añadir confirmación antes de borrar. ¿Cuál es la forma más limpia en vanilla JS sin librerías?"):

La IA confirmó que window.confirm es aceptable para proyectos pequeños, y además sugirió guardar el nombre de la tarea en el mensaje para que sea más claro. Resultado implementado en app.js.

Diferencia: la IA no me dio código muy distinto al mío, pero me dio seguridad en la decisión y mejoró el mensaje de confirmación con el nombre de la tarea.


Tarea 2: Doble clic para editar el nombre

Sin IA (yo sola):
Sabía que necesitaba añadir un evento dblclick sobre el span del nombre. El problema fue que las tarjetas se renderizan dinámicamente con innerHTML, así que el listener tiene que ir en el contenedor padre (delegación de eventos), igual que ya hace el click. Tardé en recordar cómo identificar el span correcto.

Con IA (prompt: "Necesito que al hacer doble clic sobre el nombre de una tarea en esta lista dinámica se active la edición. Antes de escribir código, explica paso a paso la lógica"):

La IA explicó: (1) escuchar dblclick en el contenedor padre, (2) comprobar si el target es un .task-name, (3) subir al data-task-id del ancestro. Ese orden me aclaró cómo hacerlo bien. El código resultante fue limpio.

Diferencia: el razonamiento paso a paso fue clave. Sin IA hubiera tardado más en resolver el problema del ancestro con data-task-id.


Tarea 3: Urgentes en las estadísticas

Sin IA (yo sola):
filterTasksByStatus ya existe, así que pensé en hacer algo similar para urgentes: tasks.filter(t => t.prioridad === 'urgente').length. Lo único que dudé fue si añadirlo al HTML de renderStats o crear una función nueva.

Con IA (prompt: "Eres desarrollador senior. Quiero añadir el conteo de tareas urgentes a renderStats. Restricciones: sin funciones nuevas, máximo 2 líneas añadidas, mismo estilo visual que el resto"):

La IA propuso inline dentro del innerHTML existente, reutilizando el mismo patrón de span. Consistente con el resto del código y sin añadir funciones innecesarias.

Diferencia: la restricción "sin funciones nuevas, máximo 2 líneas" fue clave. Sin ella, la IA hubiera creado una función getUrgentCount() separada que no era necesaria.


Conclusiones Parte 2:

- Para tareas del proyecto, la IA es más útil cuando ya entiendes el código base. Si no lo entiendes, acepta código que no encaja.
- El prompt de razonamiento paso a paso (tarea 2) fue el más valioso: me ayudó a entender la solución antes de verla.
- El prompt con restricciones (tarea 3) evitó sobreingeniería. Sin restricciones la IA tiende a añadir más de lo necesario.
- Siempre revisé el código antes de integrarlo. En la tarea 1 cambié el mensaje que propuso la IA porque no me gustaba cómo estaba redactado.
- Tiempo total sin IA: ~25 minutos para las 3 tareas. Con IA: ~8 minutos.
