# Sistema de diseño móvil

> Se conserva el nombre de carpeta `desing/` para respetar la estructura acordada.

## Principios

1. Claridad antes que decoración: saldo, acción y resultado siempre son visibles.
2. Confianza: importes, puntos y datos de operación se confirman antes de ejecutar.
3. Accesibilidad: contraste suficiente, objetivos táctiles de al menos 44 × 44 pt y texto legible sin depender solo del color.
4. Consistencia: una misma intención usa el mismo componente, etiqueta, color y comportamiento.
5. Prevención de errores: validación cercana al campo, estados de carga y acciones destructivas claramente diferenciadas.

## Tokens existentes

| Token        | Valor     | Uso                                |
| ------------ | --------- | ---------------------------------- |
| `primary`    | `#2563EB` | acción principal, saldo y foco     |
| `secondary`  | `#3B82F6` | variante informativa               |
| `background` | `#EFF6FF` | fondo de pantallas                 |
| `textDark`   | `#1E293B` | texto principal                    |
| `white`      | `#FFFFFF` | superficies y texto sobre primario |

Agregar tokens semánticos (`success`, `error`, `warning`, `textMuted`, `border`) antes de usar hexadecimales sueltos. El rojo solo comunica error o salida; el verde solo éxito o confirmación.

## Material Design adaptado a React Native

- Usar jerarquía de Material: superficie, contenido, acción principal y feedback.
- Botones: un CTA primario por pantalla; usar `Pressable`, estado `disabled`, feedback visual y etiqueta verbal concreta.
- Formularios: etiqueta/placeholder en español, tipo de teclado adecuado, `secureTextEntry` para contraseña, error junto al campo y no solo `Alert`.
- Cards: radio consistente (12–16), elevación moderada y no emplearlas para todo el contenido.
- Cámara/QR: permiso explicado, contraste alto en overlay y salida accesible.
- Incluir `accessibilityLabel`, `accessibilityRole` y `accessibilityHint` cuando el texto o icono no explique la acción.

No introducir una biblioteca Material sin una decisión registrada: el diseño actual usa componentes propios y StyleSheet.
