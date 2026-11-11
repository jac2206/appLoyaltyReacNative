---
name: loyalty-ui
description: Diseña o modifica interfaces móviles de Loyalty, aplicando sus componentes, temas y criterios de accesibilidad a pantallas de recompensas y operaciones.
---

# Interfaz móvil de Loyalty

Usa esta skill para cambios visuales o de interacción en esta aplicación. Lee `.agents/desing/design.system.md`, `.agents/instructions/ui.instructions.md` y los componentes y estilos implicados; conserva los temas definidos en `src/styles/colors.ts`.

Muestra de forma clara saldo, importes, puntos, aliado, sede y referencia cuando sean relevantes. Reutiliza componentes existentes y contempla carga, error, éxito, vacío, permisos y doble envío según el flujo. Comprueba contraste, objetivos táctiles, escalado de texto y etiquetas accesibles; evita depender solo del color o de alertas para errores de formulario. Para cámara y QR ofrece una salida o reintento apropiado.

Si cambia el comportamiento de una operación o su contrato, aplica `.agents/specs/workflow.md` y consulta la spec de dominio. Para implementación general usa `loyalty-mobile`; para verificación de comportamiento usa `loyalty-testing`.

## Criterios de calidad

- [ ] La interfaz utiliza los componentes y tokens apropiados y contempla ambos temas.
- [ ] Los estados y acciones relevantes son comprensibles y accesibles.
- [ ] Las limitaciones de validación visual y de dispositivos se comunican.

## Validación

Inspecciona los estados aplicables y compruébalos en Android o iOS cuando haya entorno disponible; registra las plataformas y escenarios no ejecutados sin dar por validada su accesibilidad.
