# Guía para agentes — Loyalty App

## Alcance

Loyalty App es una aplicación móvil de recompensas construida con Expo, React Native y TypeScript. Permite registro e inicio de sesión, consulta de saldo, acumulación y redención de puntos mediante códigos QR.

## Lectura obligatoria antes de cambiar código

1. [Contexto](context.md).
2. La especificación del dominio afectado en `specs/`.
3. La arquitectura y los patrones en `architecture/`.
4. Las instrucciones pertinentes en `instructions/`.
5. La estrategia de pruebas en `testing/`.

## Flujo SDD obligatorio

1. Identificar el dominio afectado y actualizar o crear su especificación antes de implementar.
2. Escribir criterios de aceptación verificables y declarar contratos de datos, navegación y API que cambien.
3. Diseñar la mínima solución que respete `screens -> hooks/context -> services -> api`.
4. Implementar con tipos estrictos y componentes reutilizables.
5. Añadir o actualizar pruebas en la capa correspondiente; si aún no existe infraestructura, dejar los casos definidos en la spec y no afirmar que se ejecutaron.
6. Verificar TypeScript y los flujos manuales indicados por la spec.
7. Actualizar la documentación si cambian contratos, rutas, tokens, dependencias o decisiones técnicas.

No cambies un contrato del backend, el esquema de un QR, una ruta de navegación o la persistencia de sesión sin reflejarlo primero en la spec correspondiente. No mezcles una refactorización amplia con una funcionalidad salvo que la spec lo justifique.

## Reglas no negociables

- TypeScript estricto: no introducir `any`; modelar respuestas, errores, formularios y parámetros de navegación.
- Las pantallas no hacen llamadas HTTP directas. Los servicios encapsulan endpoints y `api.ts` concentra Axios, token e interceptores.
- No persistir contraseñas ni datos sensibles innecesarios. El token se guarda solo mediante el repositorio de almacenamiento.
- Nunca loguear tokens, contraseñas, documentos completos ni payloads sensibles.
- Toda operación de puntos debe enviar la identidad de la sesión y una referencia; validar campos antes de llamar al servicio.
- Mantener la app en español y usar codificación UTF-8.
- Reutilizar tokens de `src/styles/colors.ts` y componentes existentes antes de crear estilos o controles duplicados.

## Comandos actuales

```bash
npm start
npm run android
npm run ios
npm run web
npx tsc --noEmit
```

La app no tiene aún runner de pruebas configurado. Consulta `testing/strategy.md` antes de introducirlo.

## Formato de código obligatorio

Antes de editar TypeScript, leer `instructions/code-style.instructions.md`. Todo cambio debe conservar código expandido, legible y formateado con Prettier. La verificación final incluye `npx tsc --noEmit` y `git diff --check`; si se modifica código TypeScript, también ejecutar Prettier sobre los archivos tocados.
