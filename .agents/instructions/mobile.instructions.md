# Instrucciones de React Native y Expo

- Mantener compatibilidad con la versión de Expo y las dependencias declaradas en `package.json` y el lockfile.
- Usar `StyleSheet.create`; extraer tokens compartidos antes de repetir medidas o colores.
- En pantallas largas usar `ScrollView` con `contentContainerStyle`; proteger contenido con `SafeAreaView` cuando se cree o modernice una pantalla.
- Evitar lógica pesada durante render; usar hooks para efectos, solicitudes y estado derivado.
- Solicitar permisos en contexto y manejar: pendiente, concedido, denegado y reintento.
- Probar cualquier cambio de navegación en Android y, cuando aplique, en iOS/web.
- Las rutas nuevas o modificadas actualizan `MainStackParamList` o `AuthStackParamList` con parámetros exactos.

## Legibilidad

Las pantallas y hooks deben mantener imports agrupados, helpers separados y `StyleSheet.create` al final. Componentes, props y estilos que no sean triviales se escriben en varias líneas y siguen Biome según `code-style.instructions.md`.
