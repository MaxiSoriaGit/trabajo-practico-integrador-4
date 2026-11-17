# Simulacro integrador: Sistema de Soporte Técnico (Helpdesk)

> Backend con **Node.js, Express, MongoDB/Mongoose, JWT en cookie httpOnly, bcrypt, express-validator, roles y autorización por pertenencia**.
> Es un simulacro: practicalo **sin ayuda de IA**, con tus repositorios abiertos, y con cronómetro.

## Reglas del simulacro
- **Tiempo objetivo: 2 horas.** La primera vez permitite 2 h 30. Anotá cuánto tardás en cada bloque.
- Podés usar solo tus repositorios (y los del profesor). Nada de IA.
- **Mínimo 10 commits** atómicos (uno por módulo funcionando). Hacé `git init` desde el primer minuto.
- No modificar los archivos marcados `// ! ARCHIVO BASE: no modificar`.
- Respuestas: `{ ok: true, mensaje, data }` en éxito y `{ ok: false, mensaje }` en error. Los errores de validación los arma `validarCampos` (`{ ok:false, errors }`).
- Códigos: validación o dato inválido **400** · sin sesión o credenciales inválidas **401** · sin permiso **403** · no existe **404** · error inesperado **500**.
- Siempre `return` al responder.

## Convención de comentarios
`// !` restricciones · `// *` archivos a completar · `// TODO:` tareas numeradas · `// ?` pistas.

## Puesta en marcha
1. `npm install` 2. copiar `.env.example` a `.env` 3. MongoDB corriendo 4. `npm run dev` 5. Importar `Helpdesk.postman_collection.json` en Postman.

## Modelos y relaciones
| Modelo | Campos | Relaciones |
| --- | --- | --- |
| **User** | `username`, `email`, `password`, `role` (`client` \| `agent` \| `administrator`), `profile`, `activo` | `profile` **embebido** (1:1). Unicidad de username y email solo entre usuarios activos (índices parciales) |
| **profile** (subdocumento) | `full_name`, `phone` | Vive dentro del User |
| **Tag** | `name`, `description`, `activo` | Virtual `tickets` (lado inverso de la N:M) |
| **Ticket** | `code`, `title`, `description`, `status`, `priority`, `created_by`, `assigned_to`, `tags`, `comments`, `activo` | `created_by` y `assigned_to` referencian a User (individuales). `tags` es un arreglo de referencias a Tag (N:M). `comments` es un arreglo **embebido** |

## Roles y permisos
| Acción | client | agent | administrator |
| --- | :-: | :-: | :-: |
| Registrarse / iniciar sesión | sí | sí | sí |
| Crear ticket / ver mis tickets | sí | sí | sí |
| Ver **todos** los tickets | no | sí | sí |
| Editar / eliminar un ticket | solo el que creó | solo el que creó | solo el que creó |
| Asignar ticket | no | sí | sí |
| Comentar | si participa | si participa | sí |
| Crear / eliminar tags | no | no | sí |
| Listar / eliminar usuarios | no | no | sí |

"Participa" = es el creador del ticket o el agente asignado.

## Endpoints esperados
| Método | Ruta | Acceso | Respuesta exitosa |
| --- | --- | --- | --- |
| POST | `/api/auth/register` | Público | 201 + usuario sin password |
| POST | `/api/auth/login` | Público | 200 + cookie `token` (httpOnly) |
| POST | `/api/auth/logout` | Sesión iniciada | 204 sin cuerpo |
| GET | `/api/users` | administrator | 200 *(base)* |
| DELETE | `/api/users/:id` | administrator | 204, eliminación lógica *(base)* |
| POST | `/api/tags` | administrator | 201 + tag |
| GET | `/api/tags` | Sesión iniciada | 200 + tags activos con sus tickets activos |
| DELETE | `/api/tags/:id` | administrator | 200 + `ticketsActualizados`; el tag se quita de los tickets |
| POST | `/api/tickets` | Sesión iniciada | 201 + ticket con `created_by` y `tags` |
| GET | `/api/tickets` | agent, administrator | 200 + tickets activos |
| GET | `/api/tickets/my-tickets` | Sesión iniciada | 200 + los tickets creados por mí |
| PUT | `/api/tickets/:id` | Solo el creador | 200 + ticket actualizado |
| PATCH | `/api/tickets/:id/assign` | agent, administrator | 200 + ticket en estado `in_progress` |
| POST | `/api/tickets/:id/comments` | Participante o administrator | 201 + ticket con el comentario |
| DELETE | `/api/tickets/:id` | Solo el creador | 200, eliminación lógica |

## Reglas de negocio
- El **creador** de un ticket es el usuario logueado (sale del token, no del body).
- Un usuario con `activo: false` no puede iniciar sesión ni ser asignado a un ticket.
- Solo se puede asignar un usuario **activo con rol `agent`**. Al asignar, el ticket pasa a `in_progress`.
- Los tags de un ticket deben existir y estar activos. Al desactivar un tag, se quita de todos los tickets (cascada manual).
- `code` y nombres de tag duplicados devuelven **400** (error 11000 de MongoDB).
- Un ticket eliminado lógicamente no aparece en ningún listado ni se puede editar.
- Rutas inexistentes responden 404 con el formato `{ ok:false, mensaje }`; un JSON mal escrito responde 400.

## Ejemplos de body
**Registro**
```json
{ "username": "ana", "email": "ana@mail.com", "password": "12345678", "role": "client",
  "profile": { "full_name": "Ana Pérez", "phone": "3704123456" } }
```
**Crear tag** `{ "name": "Hardware", "description": "Problemas de equipos" }`

**Crear ticket**
```json
{ "code": "tk-001", "title": "No enciende la notebook", "description": "Ayer dejó de prender",
  "priority": "high", "tags": ["<id de tag>"] }
```
**Asignar** `{ "assigned_to": "<id de un usuario agent>" }` · **Comentar** `{ "text": "Ya lo estoy revisando" }`

## Qué hay que completar
| Parte | Archivos |
| --- | --- |
| Modelos | `user.model.js` (1-4), `tag.model.js` (1-5), `ticket.model.js` (1-10) |
| Middlewares | `auth.middleware.js`, `roles.middleware.js`, `ticket-owner.middleware.js`, `error.middleware.js` |
| Validaciones | `auth.validation.js` (1-9), `tag.validation.js` (1-3), `ticket.validation.js` (1-8) |
| Controladores | `auth.controller.js`, `tags.controller.js`, `tickets.controller.js` |
| Rutas | `auth.routes.js`, `tags.routes.js`, `tickets.routes.js` |
| README | Listado de endpoints |

## Plan de tiempos sugerido (2 h 20 min + margen)
| Bloque | Qué | Min |
| --- | --- | --- |
| 0 | Leer la consigna, `git init`, tabla de entidades (relaciones, roles, borrado) | 10 |
| 1 | Modelos y `npm run dev` | 20 |
| 2 | Middlewares (auth, roles, owner, errores) | 15 |
| 3 | Auth completo (validación, controlador, rutas) y prueba | 20 |
| 4 | Tags (3 endpoints) y prueba de la cascada | 15 |
| 5 | Tickets (7 endpoints, de a uno, probando cada uno) | 50 |
| 6 | README y prueba de punta a punta | 10 |

**Si se te acaba el tiempo, priorizá:** auth -> tags -> crear y listar tickets -> el resto. Un endpoint probado vale más que cuatro sin probar.

## Criterios de evaluación (100 puntos)

### A. Modelos y relaciones (20)
- **User (6):** role enum con default (1) · profile embebido obligatorio (2) · `activo` (1) · índices parciales de username y email (2).
- **Tag (4):** campos y `unique` (2) · virtual `tickets` (1) · `toJSON` con virtuals (1).
- **Ticket (10):** code/title/description con restricciones (2) · enums con defaults (2) · `created_by` y `assigned_to` con `ref` (2) · `tags` como arreglo de refs (2) · `comments` embebido (1) · `activo` (1).

### B. Middlewares (10)
- `authMiddleware`: 401 sin token, 401 token inválido, deja `req.user` (3).
- `authorize`: fábrica con roles variables, 403 (3).
- `isTicketCreator`: 400 id inválido, 404 inexistente/inactivo, 403 si no es el creador, usa `.equals` (4).

### C. Validaciones (20)
- **Register (8):** username y email únicos entre activos (3) · formato de email (1) · password mínima (1) · role opcional con `isIn` (1) · profile obligatorio y `full_name` (2). **Login (2).**
- **Tag (2).**
- **Ticket (8):** code único (1) · title/description (1) · priority (1) · tags: arreglo, sin repetidos, existentes y activos (2) · update con todo opcional (1) · assign: usuario activo con rol agent (1) · comment (1).

### D. Controladores de auth (10)
- Register: hash, `activo:true`, respuesta sin password, 11000 -> 400 (4).
- Login: usuario activo, `select("+password")`, 401 con el mismo mensaje, token con `id` y `role`, cookie `httpOnly` (5).
- Logout: `clearCookie` y 204 (1).

### E. Tags y cascada (10)
- Crear con 11000 -> 400 (3) · listar con virtual populate y `match` (3) · eliminar: lógica + 404 + `$pull` + `modifiedCount` (4).

### F. Tickets (15)
- Crear: `created_by` del token, populate, 11000 (3) · listar (2) · mis tickets (2) · editar con `new` y `runValidators` (2) · asignar con `$set` de dos campos y 404 (3) · comentar con `$push` y regla 403 (2) · eliminar lógico (1).

### G. Rutas y README (5)
- Orden correcto de middlewares (2) · `my-tickets` antes de `:id` (1) · permisos correctos por ruta (1) · README completo (1).

### H. Manejo de errores global (5)
- `notFound` (2) · `errorHandler` con JSON mal formado, 11000, CastError y 500 (3).

### I. Git (5)
- Al menos 10 commits (3) · mensajes claros y un módulo por commit (2).

### Descuentos
| Falta | Puntos |
| --- | --- |
| La password aparece en alguna respuesta | -3 |
| No usar `matchedData` (usar `req.body` directo) | -3 |
| Ignorar la eliminación lógica (listar inactivos) | -3 |
| Modificar un archivo base | -5 |
| Secretos escritos en el código (JWT_SECRET) en vez de `.env` | -2 |
| Falta `return` al responder (error "headers already sent") | -1 por caso |

## Guion de pruebas mínimas (Postman)
**Preparación (una vez):** registrá tres usuarios (`ana` client, `beto` agent, `carla` administrator). Ojo: la cookie es **una sola**; para cambiar de usuario hacé login con el que corresponda. Copiá los ids que necesites.

| Endpoint | Prueba 1 | Prueba 2 |
| --- | --- | --- |
| register | 201 y sin password | username repetido -> 400 |
| login | 200 y cookie | password incorrecta -> 401 |
| POST /tags (carla) | 201 | como ana -> 403 |
| GET /tags | 200 con `tickets: []` | sin login -> 401 |
| POST /tickets (ana) | 201 | tag inexistente -> 400 |
| GET /tickets | como beto -> 200 | como ana -> 403 |
| GET /tickets/my-tickets (ana) | 200 con su ticket | — |
| PUT /tickets/:id | como ana -> 200 | como beto -> 403; id inexistente -> 404 |
| PATCH /tickets/:id/assign (beto) | `assigned_to` = beto -> 200 y `in_progress` | `assigned_to` = ana -> 400 |
| POST /tickets/:id/comments | como beto -> 201 | un cuarto usuario cliente -> 403 |
| DELETE /tags/:id (carla) | `ticketsActualizados: 1` y el ticket ya no tiene el tag | repetirlo -> 404 |
| DELETE /tickets/:id (ana) | 200 | repetirlo -> 404 |
| ruta inexistente | 404 con `{ ok:false }` | body con JSON roto -> 400 |

## Autoevaluación
Al terminar, corregí con la rúbrica (sumá tus puntos), anotá el tiempo por bloque y **los 3 errores que más repetiste**. Después compará con la solución.
