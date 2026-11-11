---
name: loyalty-mobile
description: Implementa cambios de pantallas, navegación, hooks, sesión o integraciones de la app móvil Loyalty con Expo y React Native, respetando sus contratos y arquitectura.
---

# Desarrollo móvil de Loyalty

Usa esta skill para cambios de implementación móvil de este repositorio. Para diseño visual o estrategia de pruebas específica, consulta las skills locales correspondientes; no sustituye una revisión especializada de seguridad.

## Flujo

1. Lee `AGENTS.md`, `.agents/AGENTS.md`, `.agents/context.md` y la spec afectada. Aplica `.agents/specs/workflow.md` según el alcance; contrasta el contrato con el código y documenta diferencias.
2. Examina el flujo existente en `src/screens`, `hooks`, `context`, `navigation`, `services` y `types` que corresponda. Evita HTTP directo desde pantallas, usa tipos estrictos y conserva las hojas de `src/styles`.
3. Para sesión, QR, permisos y operaciones, considera entradas inválidas, red, expiración y prevención de doble envío; no inventes reglas o contratos del backend. Usa el repositorio de almacenamiento existente y no registres datos sensibles.
4. Reutiliza componentes y temas claros/oscuros. Para UI consulta `loyalty-ui`; para pruebas consulta `loyalty-testing` cuando corresponda.
5. Comprueba los cambios con los comandos pertinentes de `package.json`, TypeScript y revisión del diff. Declara comprobaciones de dispositivo, pruebas y criterios no ejecutados, así como fallas anteriores.

## Criterios de calidad

- [ ] Los criterios aplicables y contratos afectados son verificables y están enlazados a su fuente.
- [ ] El cambio conserva las responsabilidades, tipos y límites de persistencia del proyecto.
- [ ] Se informan evidencia real, limitaciones y cualquier diferencia entre spec y código.

## Validación

Revisa los archivos y contratos afectados, ejecuta comprobaciones disponibles y verifica los criterios aplicables sin asumir que existe infraestructura de pruebas o dispositivos conectados.
