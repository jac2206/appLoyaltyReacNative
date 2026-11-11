# Instrucciones de pruebas

- Cuando cambie el comportamiento, actualizar primero la spec pertinente con ejemplos y criterios verificables; consultar `../specs/workflow.md`.
- Priorizar pruebas de comportamiento: validación, servicio, hook/context y flujo de pantalla.
- Simular Axios, AsyncStorage, SecureStore, navegación y cámara; no llamar al backend real desde pruebas.
- Probar errores 401, red/5xx y payload QR malformado para cambios en esos flujos.
- No usar snapshots como única garantía de UI.
- Ejecutar `npx tsc --noEmit` para todo cambio TypeScript. Registrar en el PR o entrega las pruebas no automatizadas.
