# Sistema de diseño móvil — JAC

Loyalty utiliza los tokens semánticos JAC en `src/styles/colors.ts` y la escala de espaciado y radios en `src/styles/tokens.ts`. El tema claro y el oscuro conservan las mismas claves; `textDark` representa el texto principal en ambos temas. `ThemeContext` gestiona la preferencia actual.

## Uso

- `primary` es el fondo de acciones; usa `onPrimary` para texto e iconos sobre ese fondo. Para texto de acción sobre superficies usa `primaryText`, un color derivado para mejorar contraste en el tema claro.
- `onError`, `overlay` y `cameraBackground` son roles derivados para botones de peligro y el escáner; no son tokens oficiales de la paleta JAC.
- Usa `background`, `surface`, `surfaceMuted`, `textDark`, `textMuted` y `border` según su función. Reserva `accent` dorado para énfasis puntual y comprueba el contraste antes de usarlo como texto.
- Reutiliza `CustomButton`, `InputField`, `DocumentTypeSelector` y `ScreenHeader`, y usa Ionicons para acciones. Los controles sin texto necesitan un nombre accesible y un área táctil adecuada.
- Conserva los estados de carga, error, éxito, permisos y prevención de doble envío; no comuniques estados solamente mediante color.
- Para Android y iOS utiliza componentes nativos, áreas seguras, texto escalable y comprueba ambos temas. El objetivo de accesibilidad es WCAG 2.2 AA donde corresponda; requiere pruebas reales para evaluar conformidad.

La referencia JAC recomienda Montserrat para títulos e Inter para texto. La aplicación todavía utiliza las fuentes nativas: no se incluyeron archivos de fuente ni dependencias nuevas. La aplicación no incorpora logotipos JAC adicionales; la referencia disponible no identifica todos los originales maestros aprobados.

El nombre de carpeta `desing/` se mantiene por compatibilidad con las rutas existentes.
