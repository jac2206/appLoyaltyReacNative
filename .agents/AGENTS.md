# Guía para agentes — Loyalty App

## Alcance

Loyalty App es una aplicación móvil de recompensas construida con Expo, React Native y TypeScript. Permite registro e inicio de sesión, consulta de saldo, acumulación y redención de puntos mediante códigos QR.

## Lectura obligatoria antes de cambiar código

1. [Contexto](context.md).
2. La especificación del dominio afectado en `specs/`, si existe.
3. La arquitectura y los patrones en `architecture/`.
4. Las instrucciones pertinentes en `instructions/`.
5. La estrategia de pruebas en `testing/`.

## Flujo SDD

Aplicar [specs/workflow.md](specs/workflow.md) de forma proporcional. Consultar la spec del dominio si existe; antes de cambiar comportamiento o contratos, registrar criterios verificables y actualizar la spec pertinente. Un ajuste pequeño sin cambio de comportamiento no necesita crear una spec. Verificar y comunicar resultados reales, diferencias con el código y pruebas pendientes. No cambiar contratos del backend, QR, navegación o persistencia sin reflejarlo en la spec correspondiente.

## Reglas no negociables

- TypeScript estricto: no introducir `any`; modelar respuestas, errores, formularios y parámetros de navegación.
- Las pantallas no hacen llamadas HTTP directas. Los servicios encapsulan endpoints y `api.ts` concentra Axios, token e interceptores.
- Toda pantalla debe respetar `screens -> hooks/context -> services -> api`; las pantallas no importan servicios para ejecutar casos de uso.
- Cada pantalla mantiene su hoja de estilos en `src/styles/<screen>.styles.ts`; no declarar `StyleSheet` dentro de `src/screens`.
- Cada servicio debe tipar parámetros y respuestas explícitamente (`Promise<ResponseType>` y `api.get<ResponseType>`, `api.post<ResponseType>`, etc.).
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
npm run check
npx tsc --noEmit
```

La app no tiene aún runner de pruebas configurado. Consulta `testing/strategy.md` antes de introducirlo.

## Formato de código obligatorio

Antes de editar TypeScript, leer `instructions/code-style.instructions.md`. Todo cambio debe conservar código legible y seguir `biome.json`. Verifica con `npx tsc --noEmit`, `npm run check` y `git diff --check`; informa por separado los errores preexistentes.
