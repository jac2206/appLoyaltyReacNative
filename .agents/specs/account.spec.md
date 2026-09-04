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

## Fuera de alcance actual

Historial transaccional, catálogo dinámico de aliados y gráfica semanal real no están conectados al backend.
