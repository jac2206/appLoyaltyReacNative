# Guía de agentes — Loyalty App

Aplicación móvil de fidelización con Expo, React Native y TypeScript. Conserva la organización existente por capas; no muevas ni renombres archivos sin una necesidad concreta.

## Punto de entrada

Lee [.agents/AGENTS.md](.agents/AGENTS.md) y [.agents/context.md](.agents/context.md) antes de cambiar código. Consulta las especificaciones en [.agents/specs](.agents/specs), la arquitectura en [.agents/architecture](.agents/architecture), y las instrucciones en [.agents/instructions](.agents/instructions) según el dominio afectado. Para UI, consulta también [.agents/desing/design.system.md](.agents/desing/design.system.md); para pruebas, [.agents/testing/strategy.md](.agents/testing/strategy.md). Los documentos de `.agents` se consultan explícitamente; no se cargan automáticamente.

Para cambios guiados por especificaciones consulta [.agents/specs/workflow.md](.agents/specs/workflow.md). Las skills locales son [loyalty-mobile](.agents/skills/loyalty-mobile/SKILL.md) para implementación móvil, [loyalty-ui](.agents/skills/loyalty-ui/SKILL.md) para interfaz y [loyalty-testing](.agents/skills/loyalty-testing/SKILL.md) para pruebas. Úsalas según el trabajo; los archivos `*.skill.md` anteriores son guías históricas y no son puntos de entrada de skills.

## Verificación y límites

- `package.json`, `biome.json` y el código son las fuentes para versiones, comandos y comportamiento existente; contrasta las especificaciones con la implementación y comunica discrepancias.
- `npm run check` ejecuta Biome y `npx tsc --noEmit` verifica tipos. El proyecto no tiene runner de pruebas configurado. Ejecuta las comprobaciones pertinentes y distingue errores preexistentes de los introducidos.
- `npm run format` modifica todo el proyecto; evita ejecutarlo indiscriminadamente. Usa Biome sobre archivos afectados cuando corresponda.
- Conserva cambios ajenos. No expongas secretos ni datos sensibles; no ejecutes builds, despliegues o migraciones como parte de una revisión rutinaria.
- Comprueba los cambios móviles relevantes en Android y, cuando sea posible, iOS; informa qué dispositivos o flujos no se verificaron.
