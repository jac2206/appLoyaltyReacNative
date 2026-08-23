# Convención de código y formato

## Regla obligatoria

Todo cambio en archivos `*.ts` o `*.tsx` debe finalizar con Prettier y TypeScript sin errores. No se aceptan funciones, JSX, objetos `StyleSheet` o props escritos en una sola línea cuando contienen más de una propiedad o expresión.

## Formato

- Usar Prettier 3 con la configuración por defecto: comillas simples, punto y coma, sangría de dos espacios y trailing commas cuando corresponda.
- Mantener una sola expresión simple por línea. Si un `return`, JSX, prop, objeto, llamada, función o estilo ocupa varias partes, expandirlo en líneas legibles.
- Separar con una línea en blanco: imports, tipos, componente/hook, helpers y `StyleSheet.create`.
- Ordenar imports: React/tipos, React Native/Expo, librerías externas y módulos locales.
- No usar estilos inline salvo una composición dinámica pequeña. Preferir `StyleSheet.create` al final del archivo.
- Los componentes reciben props tipadas; desestructurar props en varias líneas cuando sea necesario para que se lean con claridad.
- No usar `any`, funciones anónimas largas en JSX ni objetos de estilos extensos dentro del render.

## Cierre obligatorio

```bash
npx prettier@3.6.2 --write "src/**/*.{ts,tsx}" App.tsx index.ts
npx tsc --noEmit
git diff --check
```

Si Prettier no está instalado localmente, `npx` puede ejecutarlo temporalmente sin agregarlo como dependencia. Si el cambio solo toca unos archivos, limitar Prettier a esos archivos; antes de entregar, no dejar archivos comprimidos o inconsistentes.
