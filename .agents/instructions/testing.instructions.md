# Instrucciones de pruebas

- Actualizar primero la spec con ejemplos y criterios que se puedan probar.
- Priorizar pruebas de comportamiento: validación, servicio, hook/context y flujo de pantalla.
- Simular Axios, AsyncStorage, navegación y cámara; no llamar al backend real desde pruebas.
- Probar errores 401, red/5xx y payload QR malformado para cambios en esos flujos.
- No usar snapshots como única garantía de UI.
- Ejecutar `npx tsc --noEmit` para todo cambio TypeScript. Registrar en el PR o entrega las pruebas no automatizadas.
