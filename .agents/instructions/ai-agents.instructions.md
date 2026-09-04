# Instrucciones para agentes

- Empieza por la spec y modifica la documentación en el mismo cambio cuando el comportamiento público cambie.
- Inspecciona archivos relacionados antes de editar; preserva cambios ajenos del worktree.
- Prefiere cambios pequeños, reversibles y tipados. No cambies dependencias ni configuración de Expo sin necesidad explícita.
- Declara supuestos y deuda técnica; no presentes datos estáticos como datos del backend.
- Antes de finalizar, ejecuta las verificaciones disponibles y comunica con precisión qué se verificó y qué no.
- La codificación de todos los archivos nuevos es UTF-8; corrige texto mal codificado solo en una tarea acotada para no mezclar cambios.

## Convención de formato

Seguir `code-style.instructions.md`. No entregar JSX, funciones, props u objetos de estilos comprimidos en una sola línea. Ejecutar Prettier sobre los archivos modificados antes de validar TypeScript.
