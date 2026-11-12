# Spec — Componentes y pantallas JAC

Estado: implementación revisada en web con datos simulados; validación nativa pendiente.

## Origen y alcance

Solicitud: revisar Loyalty contra la referencia HTML JAC también a nivel de componentes y composición. El catálogo `JAC-DESIGN-SYSTEM-v4.html` de la skill `ui-ux-design-system` orienta formularios, botones, estados y superficies; la paleta especializada conserva la autoridad sobre los colores.

Se mantienen los flujos y contratos de autenticación, cuenta, transacciones y QR de sus specs de dominio. La adaptación no cambia las reglas de puntos ni los endpoints. Las fuentes se distribuyen localmente con sus licencias.

## Criterios de aceptación

1. Los campos mantienen su etiqueta al escribir y distinguen foco, ayuda, error y deshabilitado. Correo, teléfono e importes usan teclados adecuados; la contraseña puede mostrarse u ocultarse con un control identificado.
2. Los botones comparten variantes, tamaños táctiles y estados de carga/presión/foco. El acceso informa el error y evita envíos simultáneos entre contraseña y biometría.
3. Registro agrupa identificación, datos personales y contacto/acceso. Acumulación y redención ofrecen el acceso QR y separan instrucciones, campos y confirmación.
4. Las pantallas usan espaciado, tipografía y superficies coherentes con JAC, conservan ambos temas y permiten desplazar contenido largo sin ocultar permanentemente las acciones.
5. Inicio prioriza saldo y acciones; Perfil conserva datos y preferencias accesibles; Movimientos conserva filtros, presentación incremental y estados de carga, vacío, error y reintento.
6. La cámara conserva su flujo y utiliza componentes comunes para preparación y permisos. La navegación y la barra de estado respetan el tema.
7. Con el teclado abierto, el campo enfocado del formulario se mantiene visible y el contenido sigue siendo desplazable.

## Decisiones y evidencia

- `src/styles/tokens.ts` define tipografía Inter/Montserrat, espaciado, radios y tamaños. `App.tsx` carga las fuentes y provee el área segura.
- Los componentes compartidos de `src/components` implementan los criterios; las pantallas continúan orquestando sus hooks y navegación existentes.
- Se hizo una revisión web con datos simulados; sus capturas y archivos generados eran temporales y no sustituyen la validación nativa ni una prueba de integración con el backend.

## Verificación pendiente

Comprobar Android/iOS con teclado abierto, escalado de texto nativo, TalkBack/VoiceOver, cámara, permisos y biometría. Ejecutar los casos funcionales de las specs de dominio con servicios autorizados. La inspección web y el tipado no prueban estos criterios nativos; el cambio sigue en revisión hasta obtener esa evidencia.
