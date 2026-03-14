# Comparativa de Modelos de IA

# ChatGPT vs Claude.

# Explicación conceptos
    Hola! podrías explicarme estos conceptos? closures, event loop, DOM, hoisting y prototipos

        ·   Closures,
        Chatgpt, se entiende de forma clara el concepto, explicación sencilla, fácil de entender, ejemplo sencillo y se entiende con facilidad. En cambio claude, la explicación se entiende de forma clara,  no es tan fácil de comprender como la explicación de chatgpt y en este caso, el ejemplo es más complejo y menos intuitivo.

        · Event loop,
        ChatGPt, la explicación del concepto es un poco más complicada de entender, no se entiende de forma clara, en la explicación añade un nuevo concepto, threads, y a la hora de explicar el funcionamiento nos habla de Call Stack, Web APIs y Callback Queue, que explica de forma breve, luego de eso explica el flujo y por último pone un ejemplo junto con el resultado. Es un poco complejo de entender pero gracias a la explicación del flujo y las breves explicaciones se entiende bastante bien lo que sucede en el código, por otra parte Caude, explica el concepto de forma facil y simple, la explicación es muy buena pero en comparación con ChatgPT, no explica los terminos, pero si que consideo que el ejemplo al ser interactivo es más sencillo de entender.

        ·   DOM,
        ChatGPt y Claude, las dos son muy claras, ejemplos buenos y visuales, se entiende con facilidad.

        ·   Hoisting, 
        Claude, es más sencillo de comprender, gracias al ejemplo se entiende mucho mejor, en comparación con ChatGpt, es menos claro, más complejo de entender, el ejemplo es más complicado de entender.

        ·   Prototipos,
        En este caso la explicación de Claude es más fácil de entender que Chatgp, el ejemplo es mucho más comprensible y sencillo de entender. Chatgpt en cambio me dió una respuesta más vaga y complicada de entender.


# Correción de código.

1. Puedes corregirme este código?
        function incrementar(numero) 
        {
            const resultado = numero;
            resultado++; 
            return resultado;
        }

    Corrección de Claude,
    
        function incrementar(numero) 
        {
                let resultado = numero;
                resultado++;
                return resultado;
            }
            
                function incrementar(numero) 
                {
                return numero + 1;
                }

        Corrección de ChatGPT,

            function incrementar(numero) 
            {
                let resultado = numero;
                resultado++;
                return resultado;
            }
            
                function incrementar(numero) 
                {
                    return numero + 1;
                }
            Con esta prueba se han comportado exactamente igual, los dos han corregido y han mostrado una forma de simplificar el código.

2. Gracias!, puedes corregirme este otro ejercicio?
        const calcularArea = (base, altura) => 
        {
            base * altura;
        }


        Corrección de Claude,
            // ✅ Opción 1: añadir return
            const calcularArea = (base, altura) => 
            {
            return base * altura;
            }
            // ✅ Opción 2: retorno implícito (más conciso)
            const calcularArea = (base, altura) => base * altura;

        Corrección de ChatGPT,
            const calcularArea = (base, altura) => 
            {
            return base * altura;
            };

                Tambien añadió un apunte de como  simplificar el código:
                    const calcularArea = (base, altura) => base * altura;

            Lo mismo que en el primero, en ambos casos la ia se ha comportado de la misma forma. Me gustaría decir que Chatgpt añadió un ejemplo para facilitar su comprensión.

3. Gracias, este es el ultimo código con el que tengo dudas
        function obtenerUltimo(lista) 
        {
            return lista[lista.length];
        }

        Corrección de Claude,

            function obtenerUltimo(lista) 
            {
                return lista[lista.length - 1];
            }

            Y la alternativa 
                function obtenerUltimo(lista) 
                {
                    return lista.at(-1);
                }
        
        Corrección de ChatGpt,

            function obtenerUltimo(lista) 
            { 
                return lista[lista.length - 1];
            }

        En este caso ChatGPT no me ha dado alternativa pero si me ha vuelto a dar un ejemplo de como se vería el código.

    Ambos asistentes identificaron correctamente los tres fallos (Scope de const, retorno en arrow functions e índices de arrays).

# Generacion de la implementación de tres funciones distintas

1. Hola, puedes ayudarme a crear una función llamada formatearPrecio que reciba un número y un código de moneda ( 'USD' y 'EUR'). La función debe devolver el número con dos decimales y el símbolo de la moneda correspondiente. Si no se pasa una moneda, debe usar 'USD' por defecto. Asegúrate de que si el usuario pasa algo que no sea un número, la función devuelva un mensaje de error claro.

        Claude: 
            function formatearPrecio(numero, moneda = 'USD') 
            {
                // Validación: verificar que sea un número válido
                if (typeof numero !== 'number' || isNaN(numero)) 
                {
                    return 'Error: el precio debe ser un número válido.';
                }
                // Mapa de monedas y sus símbolos
                const monedas = 
                {
                    USD: '$',
                    EUR: '€',
                };
                // Validación: verificar que la moneda sea compatible
                if (!monedas[moneda]) 
                {
                    return `Error: moneda no reconocida. Usa 'USD' o 'EUR'.`;
                }
                const simbolo = monedas[moneda];
                const precio = numero.toFixed(2);
                return `${simbolo}${precio}`;
            }

        ChatGPT:
            function formatearPrecio(numero, moneda = 'USD') 
            {
                if (typeof numero !== 'number' || isNaN(numero)) 
                {
                    return 'Error: el precio debe ser un número válido.';
                }
                const simbolos = 
                {
                    USD: '$',
                    EUR: '€'
                };
                const simbolo = simbolos[moneda] || simbolos['USD'];
                return simbolo + numero.toFixed(2);
            }

2. segundo ejercicio, necesito una función llamada buscarProductos que reciba un array de objetos (donde cada objeto tiene nombre, precio y categoria) y un texto de búsqueda. La función debe devolver un nuevo array con los productos cuyo nombre contenga el texto buscado (sin importar mayúsculas o minúsculas) y que además estén ordenados de menor a mayor precio.
        Claude:
            function buscarProductos(productos, textoBusqueda) 
            {
                // Validación: verificar que productos sea un array
                    if (!Array.isArray(productos)) 
                    {
                        return 'Error: el primer argumento debe ser un array.';
                    }
                // Validación: verificar que textoBusqueda sea un string
                if (typeof textoBusqueda !== 'string') 
                {
                    return 'Error: el texto de búsqueda debe ser un string.';
                }

                return productos
                .filter(producto =>
                producto.nombre.toLowerCase().includes(textoBusqueda.toLowerCase())
                )
                .sort((a, b) => a.precio - b.precio);
            }

        ChatGPT:
            function buscarProductos(productos, textoBusqueda) 
            {
                const texto = textoBusqueda.toLowerCase();
                return productos
                .filter(producto =>
                producto.nombre.toLowerCase().includes(texto)
                )
                .sort((a, b) => a.precio - b.precio);
            }

3. Último ejercicio, escribe una función llamada obtenerIniciales que reciba el nombre completo de una persona (por ejemplo: 'juan pablo pérez') y devuelva solo las iniciales en mayúsculas y separadas por puntos (resultado esperado: 'J.P.P.'). La función debe limpiar espacios extra al principio o al final si los hay

        Claude

            function obtenerIniciales(nombreCompleto) 
            {
                // Validación: verificar que sea un string
                if (typeof nombreCompleto !== 'string') 
                {
                    return 'Error: el nombre debe ser un string.';
                }
                // Validación: verificar que no esté vacío tras limpiar espacios
                if (nombreCompleto.trim() === '') 
                {
                    return 'Error: el nombre no puede estar vacío.';
                }

                return nombreCompleto
                .trim()                          // elimina espacios al inicio y al final
                .split(' ')                      // separa por espacios → ['juan', 'pablo', 'pérez']
                .filter(palabra => palabra)      // elimina espacios extra entre palabras
                .map(palabra => palabra[0].toUpperCase()) // toma la primera letra en mayúscula
                .join('.');                      // une con puntos → 'J.P.P'
                + '.';                           // añade el punto final
            }

        Chatgpt

            function obtenerIniciales(nombreCompleto) 
            {
                return nombreCompleto
                .trim()
                .split(/\s+/)
                .map(palabra => palabra[0].toUpperCase())
                .join('.') + '.';
            }

    Claude es más eficiente y correcto a la hora de programar, ofrece un código más profesional y seguro para que no falle la app, en comparación con ChatGPT es  "rápido", te da un código que puede que funcione, no se preocupa de los posibles errores por falta de validaciones.
    El código de Claude es limpio y ordenado, añade puntos extra que no has pedido para pulir el código, en cambio, ChatGPT va al grano, hace directamente lo que le pides de forma breve 

# Cursor

# Autocompletado de funciones

        function obtenerTareasCompletadas(arrTareas) 
        {
            return arrTareas.filter(function(t) { return t.estado === 'terminada'; });
        }

# Explicación de una función

    @src/app.js:33-85 Explicme línea por línea como si fuera un niño de 5 años

    Respuesta:
    Te explico la función renderCalendario como si fueras pequeño:

    Líneas 33-36 — Título del mes y año

    Escribe el nombre del mes (Enero, Febrero, etc.) y el año en la pantalla.
    Limpia el calendario anterior borrando los días que había.
    Líneas 41-42 — Empezar en el día correcto

    Calcula en qué día de la semana cae el día 1 del mes.
    offset indica cuántos días del mes anterior hay que mostrar para que el mes comience en el lugar correcto.
    Líneas 44-46 — Días del mes anterior

    Muestra algunos días del mes anterior (en gris) para completar la primera semana y que el calendario quede alineado.
    Líneas 48-49

    Cuenta cuántos días tiene el mes actual (28, 30 o 31).
    Guarda la fecha de hoy para poder destacarla más tarde.
    Líneas 51-53

    Para cada día del mes, crea una casilla y construye su fecha (por ejemplo 2025-3-14).
    Líneas 55-57 — Marcar el día de hoy

    Si el día coincide con hoy, le pone una clase especial (por ejemplo, color diferente o borde).
    Líneas 59-64 — Tareas de ese día

    Revisa cada tarea para ver si ese día cae entre la fecha de inicio y la fecha de fin.
    Si sí, guarda el estado de esa tarea (pendiente, en proceso o terminada).
    Líneas 65-74 — Puntitos de colores

    Si hay tareas ese día, crea puntitos de colores debajo del número.
    Cada puntito indica una tarea y su color depende del estado (pendiente, en proceso o terminada).
    Líneas 75-76

    Añade la casilla del día (con número, puntitos, etc.) al calendario.
    Líneas 78-82 — Días del mes siguiente

    Si sobran casillas vacías en la última semana, las rellena con los primeros días del mes siguiente (también en gris) para que el calendario se vea cuadrado y ordenado.
    En resumen:
    La función dibuja un calendario del mes, pone el día de hoy resaltado, añade puntitos de colores según las tareas de cada día, y completa con días de otros meses para que todo quede bien organizado en una cuadrícula.

# Edición inline

Líneas de la 87 a la 103.

function crearDia(numero, deshabilitado) 
{
    var div = document.createElement('div');
    div.classList.add('day');
    if (deshabilitado) div.classList.add('day-disabled');
    div.textContent = numero;
    return div;
}

Promt: Moderniza esta función: cambia 'var' por 'const', conviértela en una arrow function y usa classList.toggle si es posible.

const crearDia = (numero, deshabilitado) => {
    const div = document.createElement('div');
    div.classList.add('day');
    div.classList.toggle('day-disabled', !!deshabilitado);
    div.textContent = numero;
    return div;
};

# Mejora de código 

1. Sección de puntos del calendario (líneas 58–73)
Sustituí el for manual por filter() y map() para obtener las tareas del día.
Sustituí el for de creación de puntos por forEach().
El código queda más declarativo y fácil de leer.

2. renderTareas() (líneas 117–134)
Reemplacé la concatenación con + por template literals (`).
Sustituí el bucle for por map() para generar el HTML.
El HTML es más legible y los datos se insertan con ${}.


# Revisión y refactorización

Partes mejorables detectadas:

Duplicación: guardarTareas() + renderTareas() + renderCalendario() repetidos en varios manejadores.

Responsabilidades mezcladas: Lógica de filtro dentro de renderTareas(); lógica de mes duplicada en prev/next.

Código muerto: Bloque comentado de crearDia antiguo.

Tema: Lógica de dark/light repartida y poco clara.

Mantenibilidad: Fechas y navegación del calendario sin funciones reutilizables.
Cinco (y más) refactorizaciones aplicadas

1. refrescarUI()
Nueva función que centraliza: guardarTareas() → renderTareas() → renderCalendario().
Sustituye la tripleta en: cambio de estado del badge, borrado de tarea y envío del formulario.
Ventaja: un solo punto de verdad para “guardar y refrescar”.

2. obtenerTareasFiltradas()
Devuelve tareas o el subconjunto según filtro ('all' o estado).
renderTareas() solo pide las tareas filtradas y pinta; la lógica de filtrado queda separada y reutilizable.

3. avanzarEstadoTarea(id) y eliminarTarea(id)
Toda la lógica de “siguiente estado” y “borrar” sale del listener de tasks-list.
El listener queda en: si es badge → avanzarEstadoTarea(id); si es delete → eliminarTarea(id).
Ventaja: funciones testeables y manejador más legible. Además se usa estados.length en lugar de 3 fijo.

4. formatearFechaISO(anio, mes, dia) y cambiarMes(delta)
formatearFechaISO: centraliza el formato YYYY-MM-DD usado en el calendario.
cambiarMes(delta): unifica prev/next en una sola función; los botones solo hacen cambiarMes(-1) y cambiarMes(1).
En renderCalendario() se usa formatearFechaISO y una variable esHoy para clarificar la condición del día actual.

5. Tema: obtenerTemaActual(), aplicarTema(tema), toggleTema()
obtenerTemaActual(): devuelve 'dark' o 'light' según la clase en document.documentElement.
aplicarTema(tema): pone/quita dark, guarda en localStorage y actualiza el icono.
toggleTema(): alterna entre dark y light y llama a aplicarTema.
Inicio: se lee localStorage y se aplica tema (y icono) con aplicarTema, sin lógica duplicada.

6. Limpieza
Eliminado el bloque comentado del crearDia antiguo.
crearDia unificado como function crearDia(numero, deshabilitado) (mismo estilo que el resto del archivo).

# Mejora del código 

1. Estructura de archivos
src/js/config.js – Constantes (meses, estados, límites, clases CSS)
src/js/app.js – Toda la lógica de la app
src/app.js – Eliminado (reemplazado por src/js/app.js)
index.html – Carga config.js antes de app.js
2. Nombres de variables
Antes	Después
tareas	tasks
mesActual	currentMonth
anioActual	currentYear
filtro	activeFilter
meses	MONTH_NAMES
estados	TASK_STATES
estadoTexto	STATE_LABELS
badgeClases	STATE_BADGE_CLASSES
borderClases	STATE_BORDER_CLASSES

3. Validaciones del formulario
Campos obligatorios – Nombre, inicio y fin
Longitud máxima – 200 caracteres para el nombre (MAX_TASK_NAME_LENGTH)
Rango de fechas – Máximo 365 días entre inicio y fin (MAX_TASK_DAYS_RANGE)
Feedback en pantalla – Mensajes en #form-error en lugar de alert()

4. Funciones simplificadas
createTaskDots() – Crea puntos de tareas en el calendario
buildTaskCardHTML() – Genera el HTML de cada tarjeta
escapeHtml() – Evita XSS en nombres
setActiveFilterButton() – Evita repetir querySelectorAll en filtros
initTaskFormHandler(), initFilterButtons(), etc. – Init más modular

5. JSDoc
Se añadieron comentarios JSDoc en todas las funciones principales, incluyendo @param, @returns y @description cuando aplica.

# Consultas

1. ¿Puedes listar todos los archivos que hay en la raíz de este proyecto usando el servidor MCP?
