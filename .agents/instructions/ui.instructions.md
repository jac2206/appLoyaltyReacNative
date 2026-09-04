# Instrucciones de UI

- Aplicar `desing/design.system.md` en cada pantalla o componente visual.
- Dar a cada pantalla un estado de carga, error y vacío cuando consulte datos.
- Mantener un CTA principal y prevenir doble toque durante solicitudes.
- Los importes usan moneda/localización definida por producto; no asumir formato ni convertir puntos con reglas locales.
- No ocultar información crítica detrás de iconos o color. Todas las acciones deben ser accesibles con lector de pantalla.
- Reutilizar `CustomButton` e `InputField` o mejorar sus APIs de forma compatible antes de crear duplicados.

## Implementación legible

Un diseño consistente también exige código consistente: no compactar JSX ni objetos de estilos extensos. Mantener cada bloque visual reconocible y formateado con la convención de código.
