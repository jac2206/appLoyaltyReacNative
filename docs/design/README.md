# Diseño móvil JAC

La fuente de las reglas de esta aplicación es el [sistema de diseño móvil](../../.agents/desing/design.system.md). Los colores y temas están en `src/styles/colors.ts`; la tipografía, el espaciado y los tamaños compartidos están en `src/styles/tokens.ts`. Las fuentes y sus licencias están en `assets/fonts`.

La referencia HTML del sistema JAC pertenece a la skill instalada `ui-ux-design-system`; las pantallas móviles utilizan componentes nativos adaptados a esa referencia. Las capturas y vistas generadas durante revisiones puntuales no se conservan como documentación ni como referencias de la skill.

Al revisar cambios de interfaz, comprueba en Android y, cuando sea posible, iOS: temas claro y oscuro, tamaños de texto grandes, campos y acciones con el teclado abierto, estados de carga y error, y accesibilidad con lector de pantalla. En el inicio de sesión comprueba correo y contraseña, cambio entre ambos campos y el control de mostrar contraseña. La inspección web con datos simulados no reemplaza estas pruebas nativas.
