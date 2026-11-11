---
name: loyalty-testing
description: Planifica y verifica pruebas de cambios en Loyalty, incluidos sesión, saldo, transacciones y QR, según la infraestructura realmente disponible.
---

# Pruebas de Loyalty

Usa esta skill al planificar o validar el comportamiento de un cambio en este repositorio. Lee `.agents/testing/strategy.md`, `.agents/testing/patterns.md` y la spec afectada; aplica `.agents/specs/workflow.md` para trazar criterios y evidencia.

Prioriza comportamiento observable y casos afectados: sesión y 401; saldo y errores de red; transacciones, datos enviados y doble envío; permisos y QR inválido. En pruebas automatizadas aísla Axios, AsyncStorage, SecureStore, navegación y cámara cuando corresponda; no llames al backend real por defecto ni uses snapshots como única garantía.

El proyecto no tiene runner de pruebas configurado. No afirmes que se ejecutó una prueba que solo está propuesta; informa verificaciones manuales y comandos efectivamente ejecutados. Consulta la estrategia antes de proponer dependencias y no las instales sin autorización.

## Criterios de calidad

- [ ] Cada criterio aplicable tiene evidencia o un estado pendiente explícito.
- [ ] Se distinguen pruebas ejecutadas, escenarios propuestos y limitaciones del entorno.
- [ ] Los casos cubren errores y regresiones relevantes sin depender de servicios reales.

## Validación

Revisa la trazabilidad criterio → comprobación → resultado; ejecuta solo las comprobaciones disponibles y autorizadas e informa fallos y escenarios no ejecutados.
