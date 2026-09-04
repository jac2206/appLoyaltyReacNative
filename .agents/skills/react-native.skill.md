# Skill: React Native Loyalty Feature

## Cuándo usarlo

Al crear o modificar una pantalla, navegación, hook, contexto, llamada móvil, permiso o almacenamiento de la aplicación.

## Receta

1. Leer la spec del dominio y `architecture/mobile.architecture.md`.
2. Definir o actualizar tipos de dominio y parámetros de navegación.
3. Construir el servicio tipado si existe un contrato remoto.
4. Colocar la coordinación reutilizable en hook o context; mantener la pantalla enfocada en UI.
5. Aplicar estados de carga, éxito, error y accesibilidad.
6. Escribir pruebas y ejecutar TypeScript.

## Lista de salida

- Sin `any`, secretos ni datos sensibles en logs.
- Sin llamada HTTP directa desde una screen.
- El flujo funciona tras restaurar sesión y tras logout/401.
- Spec, contratos y pruebas actualizados.

## Calidad de código

Antes de cerrar, aplicar `instructions/code-style.instructions.md`: ejecutar Prettier en los archivos modificados, TypeScript y `git diff --check`. La legibilidad de JSX y estilos es parte de la entrega, no un paso opcional.
