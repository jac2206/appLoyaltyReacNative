# Spec — Cuenta y saldo

## Alcance

Consulta y presentación del saldo de puntos de la persona autenticada.

## Contrato actual

`GET /accounts/balance/{documentType}/{documentNumber}` devuelve un objeto que contiene `balance: number`.

## Criterios de aceptación

- Home y Perfil muestran el saldo de la sesión actual.
- Al recuperar el foco de una pantalla que muestra saldo, se consulta el valor vigente.
- Durante la carga se muestra un estado de carga; ante fallo, un mensaje y opción de reintento sin inventar saldo.
- El progreso hacia una meta siempre se limita al rango 0–100 y la meta se identifica como configuración/producto, no como regla de backend.

## Estado de implementación observado

Los criterios anteriores describen el comportamiento esperado, no una validación completa. `useBalance` consulta el saldo al recuperar el foco, pero inicializa el saldo en cero y solo registra los errores; no expone una opción de reintento ni un estado de error. Home y Perfil aún no presentan toda la recuperación descrita arriba. Estos criterios quedan pendientes de implementación y verificación.

## Fuera de alcance de esta spec

El historial tiene una consulta implementada y se describe en `transaction.spec.md`. El catálogo de aliados y la gráfica semanal en Home siguen usando datos estáticos de presentación.
