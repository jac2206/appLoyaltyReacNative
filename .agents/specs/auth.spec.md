# Spec — Autenticación

## Alcance

El alcance tambien incluye inicio de sesion biometrico en dispositivos compatibles.

Registro, inicio/cierre y restauración de sesión de una persona usuaria.

## Criterios adicionales de biometria

- Despues de un login exitoso con email y contrasena, el token se puede conservar
  en almacenamiento seguro para habilitar el acceso biometrico; nunca se persiste
  la contrasena.
- En un dispositivo con huella o Face ID configurado, el login muestra la accion
  biometrica y, tras una autenticacion exitosa, recupera el token seguro, consulta
  el perfil y abre el stack principal.
- Si la biometria no esta disponible, no esta inscrita, es cancelada o falla, el
  login conserva el formulario de email y contrasena y muestra un mensaje en
  espanol sin modificar la sesion.
- Si el token biometrico ya no es valido, se elimina del almacenamiento seguro y
  se informa que se debe iniciar sesion con email y contrasena.

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
