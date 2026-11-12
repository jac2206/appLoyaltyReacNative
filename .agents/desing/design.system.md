# Sistema de diseño móvil — JAC

Loyalty utiliza los tokens semánticos JAC en `src/styles/colors.ts` y la escala de espaciado y radios en `src/styles/tokens.ts`. El tema claro y el oscuro conservan las mismas claves; `textDark` representa el texto principal en ambos temas. `ThemeContext` gestiona la preferencia actual.

## Uso

- `primary` es el fondo de acciones; usa `onPrimary` para texto e iconos sobre ese fondo. Para texto de acción sobre superficies usa `primaryText`, un color derivado para mejorar contraste en el tema claro.
- `onError`, `overlay` y `cameraBackground` son roles derivados para botones de peligro y el escáner; no son tokens oficiales de la paleta JAC.
- Usa `background`, `surface`, `surfaceMuted`, `textDark`, `textMuted` y `border` según su función. Reserva `accent` dorado para énfasis puntual y comprueba el contraste antes de usarlo como texto.
- Reutiliza `CustomButton`, `InputField`, `DocumentTypeSelector` y `ScreenHeader`, y usa Ionicons para acciones. Los controles sin texto necesitan un nombre accesible y un área táctil adecuada.
- Conserva los estados de carga, error, éxito, permisos y prevención de doble envío; no comuniques estados solamente mediante color.
- Para Android y iOS utiliza componentes nativos, áreas seguras, texto escalable y comprueba ambos temas. El objetivo de accesibilidad es WCAG 2.2 AA donde corresponda; requiere pruebas reales para evaluar conformidad.

La aplicación carga Montserrat para títulos e Inter para el cuerpo mediante `expo-font`, con archivos y licencias locales en `assets/fonts`. Las variantes y alturas de línea absolutas de React Native están centralizadas en `src/styles/tokens.ts`. La aplicación utiliza las imágenes raster JAC suministradas en `assets/jac-isotype.png` y `assets/jac-app-icon.png` para la marca y los iconos de la app. La referencia no identifica todos los originales maestros aprobados; las imágenes no deben presentarse como vectores maestros. Los iconos funcionales conservan la familia Ionicons.

El nombre de carpeta `desing/` se mantiene por compatibilidad con las rutas existentes.

## Componentes y composición

- `ScreenLayout` aporta áreas seguras, desplazamiento, comportamiento de teclado y un ancho de contenido máximo de 600 unidades. Las pantallas conservan sus hojas de estilos para la composición propia.
- `InputField` mantiene la etiqueta visible y admite icono, ayuda, error, tipo de teclado, autocompletado, foco y estado deshabilitado. Los campos de contraseña incluyen control accesible de visibilidad.
- `CustomButton` dispone de variantes primaria, secundaria, outline, ghost y danger, con carga, deshabilitado, presionado y foco. El tamaño mínimo del control es de 52 unidades.
- `FormSection` agrupa campos relacionados; `InlineNotice` muestra instrucciones y errores; `ContentState` presenta carga, vacío y recuperación.
- `DocumentTypeSelector` conserva una etiqueta visible y ofrece selección modal, opción actual y cierre explícito. Los ajustes del perfil usan controles nativos con nombres accesibles.
- Inicio prioriza saldo y acciones; Perfil agrupa identidad y preferencias; Movimientos utiliza filtros y una lista delimitada, evitando una tarjeta independiente por cada dato.

`controlBorder` e `inputSurface` son roles derivados para los campos. Los iconos y la navegación leen el tema activo. No se copian componentes web del catálogo JAC al runtime móvil.

La especificación de esta adaptación está en [ui.spec.md](../specs/ui.spec.md). Las referencias y comprobaciones recomendadas están documentadas en [docs/design](../../docs/design/README.md). La revisión web previa no sustituye las pruebas nativas.
