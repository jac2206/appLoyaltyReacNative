# Convención de código y formato

La configuración vigente es `biome.json`. Mantener TypeScript estricto, código legible y los estilos de pantalla en `src/styles`. Evitar `any`, JSX complejo y estilos extensos dentro del render; reutilizar componentes y tokens existentes.

Para verificar formato y lint ejecuta `npm run check`. Para comprobar tipos ejecuta `npx tsc --noEmit`, y para revisar espacios del diff, `git diff --check`. Si el chequeo global falla por problemas previos, identifícalos en la entrega.

`npm run format` modifica todos los archivos incluidos por Biome. Para limitar cambios, utiliza el ejecutable local de Biome sobre los archivos afectados y revisa el diff. No instales ni ejecutes Prettier como requisito de este proyecto.
