Herramientas profesionales para trabajar con APIs


Axios

Axios es una libreria de JavaScript para hacer peticiones HTTP. Es una alternativa a fetch (que es lo nativo del navegador). La diferencia principal es que Axios convierte automaticamente las respuestas a JSON, tiene mejor manejo de errores y permite configurar interceptores (funciones que se ejecutan antes o despues de cada peticion). Se usa mucho en proyectos con React, Vue o cualquier frontend que consuma APIs. En nuestro proyecto usamos fetch porque es mas sencillo y no queriamos añadir dependencias al frontend, pero en un proyecto mas grande Axios seria la opcion mas comoda.

Ejemplo basico:
axios.get('http://localhost:3000/api/v1/tasks')
  .then(response => console.log(response.data))
  .catch(error => console.log(error));


Postman

Postman es una aplicacion de escritorio para probar APIs. En vez de escribir comandos curl en la terminal, te da una interfaz visual donde pones la URL, eliges el metodo (GET, POST, PUT, DELETE), escribes el body en JSON y le das a Send. Te muestra la respuesta con colores, el codigo HTTP, el tiempo que tardo, las cabeceras... todo organizado. Tambien puedes guardar colecciones de peticiones para no tener que reescribirlas cada vez. Es la herramienta mas usada para testear APIs manualmente antes de conectar el frontend.

Thunder Client es lo mismo pero como extension de VS Code, sin salir del editor.


Sentry

Sentry es un servicio para monitorizar errores en produccion. Cuando tu aplicacion esta desplegada y un usuario se encuentra un error, Sentry lo captura automaticamente y te avisa. Te dice que error fue, en que linea de codigo, que navegador usaba el usuario, que datos tenia la peticion, etc. Es como tener un console.error pero que funciona cuando la app esta en el servidor real y no en tu ordenador. Se integra tanto en frontend como en backend. En nuestro proyecto no lo usamos porque estamos en desarrollo local, pero en un proyecto real es imprescindible para saber que esta fallando sin tener que preguntar al usuario "que hiciste para que se rompiese".


Swagger

Swagger (ahora se llama OpenAPI) es un estandar para documentar APIs. En vez de escribir un documento a mano diciendo "la ruta GET /tasks devuelve un array de tareas", Swagger te genera una pagina web interactiva donde cualquier desarrollador puede ver todos los endpoints, que parametros aceptan, que devuelven, y encima puede probarlos directamente desde esa pagina. Es como un Postman pero integrado en la documentacion del proyecto. Se usa mucho cuando trabajas en equipo porque el frontend y el backend pueden ponerse de acuerdo en los endpoints antes de programarlos.

Ejemplo de nuestra API documentada en formato Swagger:
- GET /api/v1/tasks → devuelve array de tareas, codigo 200
- POST /api/v1/tasks → crea tarea, necesita nombre, inicio, fin en el body, devuelve 201
- PUT /api/v1/tasks/:id → actualiza tarea, acepta nombre, estado, prioridad, devuelve 200
- DELETE /api/v1/tasks/:id → borra tarea, devuelve 204


Por que se usan

Las cuatro herramientas resuelven problemas distintos del ciclo de vida de una API:
- Axios te facilita consumir la API desde el codigo
- Postman te permite probarla sin codigo
- Sentry te avisa cuando falla en produccion
- Swagger la documenta para que otros la entiendan

En un proyecto profesional se suelen usar las cuatro juntas.
