# Ingeniería de Prompts

# 10 prompts útiles

1. Prompt para refactoriza
Eres un desarrollador senior haciendo code review de este proyecto. Refactoriza la función renderTaskList para mejorar legibilidad y reducir complejidad. Explica cada cambio que hagas y por qué.
Por qué funciona: pedir que explique cada cambio evita que la IA modifique cosas sin justificación. Aprendes mientras refactorizas.

2. Prompt para documentar
Documenta esta función con JSDoc. Incluye: descripción de una línea, parámetros con tipo y descripción, valor de retorno, y un ejemplo de uso en @example.
Por qué funciona: listar los campos concretos produce documentación consistente en todo el proyecto, no comentarios vagos de calidad variable.

3. Prompt para detectar bugs
Analiza este código de taskflow como si fueras a hacer una auditoría de calidad. Lista los bugs potenciales, casos borde no controlados y cualquier problema de seguridad. Sé específico y cita líneas.
Por qué funciona: el marco de auditoría activa un modo más crítico. Pedir que cite líneas evita respuestas del tipo "podría haber problemas" sin concretar dónde.

4. Prompt para escribir tests
Escribe tests unitarios para filterTasksByStatus usando Jest. Cubre: el caso feliz, al menos dos casos borde, y un caso donde deba lanzar error. Usa describe e it con nombres descriptivos en español.
Por qué funciona: especificar los tipos de caso obliga a la IA a pensar en escenarios reales, no solo en el happy path. Sin esto, suele generar solo el caso más obvio.

5. Prompt para tomar decisiones técnicas
Eres un arquitecto de software. Compara estas dos opciones para persistir las tareas en este proyecto: localStorage vs una API REST. Dame una tabla comparativa con criterios de rendimiento, escalabilidad, complejidad y mantenimiento. Recomienda una opción justificando por qué.
Por qué funciona: el formato tabla fuerza una comparación estructurada. Pedir recomendación final evita respuestas diplomáticas del tipo "depende" sin valor práctico.

6. Prompt con rol definido
Eres un desarrollador senior con 10 años de experiencia en Node.js. Revisa esta función de taskflow y dime qué problemas de rendimiento o mantenibilidad ves, siendo directo y técnico.
Por qué funciona: el rol ancla el tono y nivel de detalle. Sin rol definido la respuesta tiende a ser genérica y superficial.

7. Few-shot prompting (con ejemplos)
Convierte estos nombres de funciones a camelCase siguiendo este patrón:
- get_user_data → getUserData
- send_email_notification → sendEmailNotification
Ahora convierte: validate_input_form, fetch_product_list, update_user_profile
Por qué funciona: los ejemplos eliminan ambigüedad. La IA infiere el patrón exacto sin que lo expliques con palabras, muy útil para transformaciones repetitivas.

8. Razonamiento paso a paso
Necesito implementar un sistema para que las tareas urgentes aparezcan primero. Antes de escribir el código, explica paso a paso la lógica que vas a usar para ordenar el array y cómo manejarás el renderizado.
Por qué funciona: forzar el razonamiento previo reduce errores lógicos. La IA expone sus decisiones antes de comprometerse con código, y puedes corregirla antes de que escriba nada.

9. Prompt con restricciones claras
Refactoriza la función filterTasksByStatus. Restricciones: máximo 20 líneas, sin dependencias externas, mantén la misma firma, añade un comentario JSDoc.
Por qué funciona: las restricciones evitan soluciones sobrediseñadas. La IA trabaja dentro de límites concretos y produce código que encaja directamente en el proyecto.

10. Prompt para generar código
Eres un desarrollador senior en JavaScript. Escribe una función filterTasksByStatus(tasks, status) que filtre un array de tareas por su campo status. Usa ES6+, sin librerías externas, e incluye JSDoc.
Por qué funciona: combina rol + especificación técnica + restricciones. La IA tiene todo el contexto necesario para generar código listo para usar sin iteraciones adicionales.