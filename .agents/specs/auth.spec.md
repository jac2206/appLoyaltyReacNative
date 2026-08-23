# Spec — Autenticación

## Alcance

Registro, inicio/cierre y restauración de sesión de una persona usuaria.

## Contratos actuales

| Operación | Método y ruta          | Entrada                                               | Resultado usado                    |
| --------- | ---------------------- | ----------------------------------------------------- | ---------------------------------- |
| Login     | `POST /users/login`    | `email`, `password`                                   | `token`                            |
| Perfil    | `GET /users/me`        | Bearer token                                          | nombre, email, documento, teléfono |
| Registro  | `POST /users/register` | documento, nombre completo, email, teléfono, password | usuario creado                     |

## Criterios de aceptación

- Con email y contraseña válidos, se persiste el token, se consulta perfil y se abre el stack principal.
- Sin token persistido, la aplicación muestra el stack de autenticación al terminar la restauración.
- Si el token es inválido, expira o la API retorna 401, se elimina la sesión y se informa que debe iniciar nuevamente.
- Registro exige tipo/número de documento, nombres, apellidos, email, teléfono y contraseña antes de invocar la API.
- Cerrar sesión elimina usuario, token en memoria y token persistido.

## Reglas técnicas

- `AuthContext` expone el usuario de UI, nunca el token.
- El token se identifica por `STORAGE_KEYS.TOKEN` y se accede mediante `storage.repository.ts`.
- Las respuestas y errores deben tiparse antes de mejorar este flujo; no propagar `any`.
