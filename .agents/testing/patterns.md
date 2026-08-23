# Patrones de prueba

## Arrange / Act / Assert

Cada prueba expresa una única regla de producto. Preparar mocks de servicio, ejecutar la acción visible y afirmar resultado, navegación o payload sin depender de implementación interna.

## Ejemplos de intención

- Dado un login exitoso, al autenticar, se guarda el token y se publica el usuario.
- Dado un formulario de redención sin puntos, al pulsar Redimir, no se llama al servicio y aparece la validación.
- Dado un QR `ACCUMULATE` válido, al escanearlo, se navega a Acumular con campos precargados.
- Dado un 401, al responder la API, se borra sesión y se muestra autenticación.

## Mocks requeridos

- `api`/Axios para respuestas, fallo de red y 401.
- AsyncStorage para persistencia.
- React Navigation para foco, navegación y parámetros.
- `expo-camera` para permisos y callback de escaneo.

Evitar snapshots masivos. Afirmar texto accesible, estado de botones, llamadas a servicio y rutas con parámetros tipados.
