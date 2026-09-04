# 🎁 Loyalty React Native

## 🚀 React Native + Expo + TypeScript + React Navigation + Context + AsyncStorage + Axios + Biome + Husky + Commitlint

Aplicación móvil de **recompensas y fidelización de clientes**, desarrollada con React Native y Expo.

La aplicación permite a los usuarios:

* 🔐 Registrarse e iniciar sesión.
* 👤 Consultar y administrar su perfil.
* 💰 Consultar su saldo de puntos.
* ➕ Acumular puntos mediante códigos QR.
* 🎁 Redimir puntos por beneficios o recompensas.
* 📊 Consultar movimientos y actividad.
* 📱 Escanear códigos QR.
* 🌐 Consumir servicios de un backend mediante API.
* 💾 Mantener información local de la sesión.

---

# 🧠 1. Tecnologías

El proyecto utiliza:

* React Native
* Expo
* TypeScript
* React Navigation
* Context API
* AsyncStorage
* Axios
* Vitest
* Biome
* Husky
* Commitlint
* Conventional Commits
* EAS (Expo Application Services)

---

# 🏗️ 2. Arquitectura de la Aplicación

La aplicación utiliza una estructura basada en separación de responsabilidades.

```text
                    App.tsx
                       ↓
                  Navigation
                       ↓
              ┌────────┴────────┐
              ↓                 ↓
          Auth Flow          Main Flow
              ↓                 ↓
           Screens           Screens
              ↓                 ↓
           Hooks / Context / Services
                         ↓
                       Axios
                         ↓
                       API
```

### 📌 Regla Principal

Las pantallas no deben concentrar toda la lógica de negocio ni la comunicación directa con la API.

Se recomienda separar:

```text
Screens
   ↓
Hooks / Context
   ↓
Services
   ↓
API
```

---

# 📂 3. Estructura del Proyecto

```text
src
├── components
│   ├── ActivityChart.tsx
│   ├── CustomButtom.tsx
│   ├── CustomInputField.tsx
│   ├── DocumentTypePicker.tsx
│   └── ScreenHeader.tsx
│
├── constants
│   └── storageKeys.ts
│
├── context
│   └── AuthContext.tsx
│
├── hooks
│   ├── useBalance.ts
│   ├── useLogin.ts
│   └── useQRForm.ts
│
├── navigation
│   ├── AppNavigator.tsx
│   ├── AuthNavigator.tsx
│   └── MainNavigator.tsx
│
├── screens
│   ├── AccumulateScreen.tsx
│   ├── HomeScreen.tsx
│   ├── LoginScreen.tsx
│   ├── ProfileScreen.tsx
│   ├── QRScannerScreen.tsx
│   ├── RedeemScreen.tsx
│   └── RegisterScreen.tsx
│
├── services
│   ├── account.service.ts
│   ├── api.ts
│   ├── auth.service.ts
│   ├── data
│   │   ├── storage.repository.ts
│   │   └── storage.ts
│   └── transaction.service.ts
│
├── styles
│   └── colors.ts
│
├── types
│   ├── navigation.ts
│   ├── transaction.ts
│   └── user.ts
│
└── utils
    └── date-util.ts
```

---

# 🧩 4. Responsabilidad de las Carpetas

## 🧱 components

Contiene componentes reutilizables de la aplicación.

Ejemplos:

```text
ActivityChart
CustomButtom
CustomInputField
DocumentTypePicker
ScreenHeader
```

Los componentes deben ser reutilizables y evitar contener lógica específica de una pantalla cuando no sea necesario.

---

## 📱 screens

Contiene las pantallas principales de la aplicación.

```text
LoginScreen
RegisterScreen
HomeScreen
ProfileScreen
AccumulateScreen
RedeemScreen
QRScannerScreen
```

Las screens se encargan principalmente de:

* Renderizar la interfaz.
* Consumir hooks o contextos.
* Mostrar estados.
* Coordinar acciones del usuario.

---

## 🧭 navigation

Contiene la configuración de navegación.

```text
AppNavigator.tsx
AuthNavigator.tsx
MainNavigator.tsx
```

La aplicación separa el flujo de autenticación del flujo principal.

```text
AppNavigator
     │
     ├── AuthNavigator
     │      ├── Login
     │      └── Register
     │
     └── MainNavigator
            ├── Home
            ├── Profile
            ├── Accumulate
            ├── Redeem
            └── QR Scanner
```

---

## 🪝 hooks

Contiene lógica reutilizable relacionada con la aplicación.

```text
useBalance.ts
useLogin.ts
useQRForm.ts
```

Los hooks permiten evitar que las screens acumulen lógica de negocio o de comunicación con servicios.

---

## 🌐 services

Contiene la comunicación con APIs y servicios externos.

```text
services/
├── account.service.ts
├── api.ts
├── auth.service.ts
├── transaction.service.ts
└── data/
    ├── storage.repository.ts
    └── storage.ts
```

Flujo recomendado:

```text
Screen
   ↓
Hook
   ↓
Service
   ↓
Axios
   ↓
Backend
```

---

## 💾 context

Contiene el estado global de la aplicación.

Actualmente:

```text
AuthContext.tsx
```

Se utiliza principalmente para manejar información relacionada con:

* Usuario autenticado.
* Sesión.
* Estado de autenticación.

---

## 🗄️ constants

Contiene constantes utilizadas en toda la aplicación.

Ejemplo:

```text
storageKeys.ts
```

Esto evita tener claves de almacenamiento repetidas directamente dentro de los componentes.

---

## 🎨 styles

Contiene estilos y valores visuales reutilizables.

Ejemplo:

```text
colors.ts
```

---

## 🧾 types

Contiene los tipos e interfaces de TypeScript.

```text
navigation.ts
transaction.ts
user.ts
```

Esto permite mantener tipada la navegación, usuarios y transacciones.

---

## 🛠️ utils

Contiene funciones auxiliares reutilizables.

Ejemplo:

```text
date-util.ts
```

---

# 🚀 5. Requisitos

Antes de trabajar con el proyecto se necesita:

* Node.js LTS
* NPM
* VS Code
* Expo
* Expo Go para pruebas en dispositivo físico
* Cuenta de Expo para realizar builds con EAS

Verificar Node y NPM:

```bash
node -v
npm -v
```

---

# 📦 6. Instalación del Proyecto

Clonar el repositorio:

```bash
git clone https://github.com/tu-usuario/loyalty-react-native.git

cd loyalty-react-native
```

Instalar dependencias:

```bash
npm install
```

---

# 📱 7. Ejecutar la Aplicación

Iniciar Expo:

```bash
npx expo start
```

También:

```bash
npm start
```

### Android

```bash
npm run android
```

### iOS

```bash
npm run ios
```

### Web

```bash
npm run web
```

Durante el desarrollo se puede escanear el código QR mostrado por Expo utilizando Expo Go.

---

# 🧭 8. React Navigation

La aplicación utiliza React Navigation para administrar las pantallas.

Dependencias principales:

```bash
npm install @react-navigation/native
npm install @react-navigation/native-stack
```

Y las dependencias compatibles con Expo:

```bash
npx expo install react-native-screens react-native-safe-area-context
```

La navegación está organizada en:

```text
src/navigation/
├── AppNavigator.tsx
├── AuthNavigator.tsx
└── MainNavigator.tsx
```

---

# 🔐 9. Autenticación

La autenticación se maneja mediante:

```text
AuthContext
      ↓
auth.service
      ↓
API
```

Las pantallas relacionadas son:

```text
LoginScreen
RegisterScreen
```

El contexto permite mantener el estado de autenticación disponible para diferentes partes de la aplicación.

---

# 💰 10. Sistema de Recompensas

La aplicación está orientada a un sistema de fidelización basado en puntos.

## Acumulación

El usuario puede acumular puntos mediante:

```text
Home
 ↓
Accumulate
 ↓
QR Scanner
 ↓
API
 ↓
Actualización de saldo
```

Componentes relacionados:

```text
AccumulateScreen.tsx
QRScannerScreen.tsx
useQRForm.ts
```

---

## 🎁 Redención

El usuario puede utilizar sus puntos para redimir recompensas.

```text
RedeemScreen
      ↓
transaction.service
      ↓
API
      ↓
Actualización de saldo
```

---

## 💰 Consulta de saldo

La lógica relacionada con el saldo se encuentra en:

```text
useBalance.ts
```

---

## 📊 Actividad y transacciones

La aplicación permite visualizar información relacionada con la actividad del usuario.

Componentes relacionados:

```text
ActivityChart.tsx
transaction.service.ts
transaction.ts
```

---

# 💾 11. Almacenamiento Local

La aplicación utiliza AsyncStorage para mantener información persistente localmente.

Instalar:

```bash
npx expo install @react-native-async-storage/async-storage
```

La implementación se encuentra en:

```text
src/services/data/
├── storage.repository.ts
└── storage.ts
```

Las claves utilizadas se centralizan en:

```text
src/constants/storageKeys.ts
```

### ⚠️ Importante

AsyncStorage **no cifra los datos**.

No debe utilizarse directamente para almacenar información sensible sin una estrategia de almacenamiento seguro.

---

# 🌐 12. Consumo de APIs

La aplicación utiliza Axios para comunicarse con el backend.

Instalar:

```bash
npm install axios
```

El cliente HTTP se encuentra en:

```text
src/services/api.ts
```

Los servicios específicos se encuentran separados:

```text
auth.service.ts
account.service.ts
transaction.service.ts
```

La pantalla no debería encargarse directamente de toda la comunicación con la API.

Flujo:

```text
Screen
   ↓
Hook / Context
   ↓
Service
   ↓
Axios
   ↓
Backend
```

---

# ⏳ 13. Estados de una Solicitud

Al consumir una API, la aplicación debe considerar:

```text
Loading
Data
Error
```

Flujo:

```text
Solicitud
    ↓
 Loading
    ↓
 ┌───────────┐
 ↓           ↓
Éxito       Error
 ↓           ↓
Data       Mensaje
```

Esto permite mostrar una experiencia adecuada al usuario mientras se procesan las solicitudes.

---

# 🎨 14. Formateo y Calidad de Código con Biome

El proyecto utiliza **Biome** para mantener un estándar consistente de formato y calidad de código.

Biome reemplaza la necesidad de utilizar Prettier + ESLint para estas tareas.

Se utiliza para:

* Formatear código.
* Ejecutar linting.
* Organizar imports.
* Mantener reglas recomendadas.
* Mantener un estilo consistente entre archivos TypeScript y TSX.

---

## 📦 Instalación

```bash
npm install -D @biomejs/biome
```

Inicializar:

```bash
npx @biomejs/biome init
```

Esto genera:

```text
biome.json
```

---

## ⚙️ Estándar de Formato

El proyecto utiliza:

* 2 espacios de indentación.
* Comillas simples.
* Punto y coma.
* Trailing commas.
* Ancho de línea de 88 caracteres.
* Saltos de línea consistentes.
* Imports organizados.
* Linter con reglas recomendadas.
* Finales de línea `LF`.

La configuración se encuentra en:

```text
biome.json
```

---

## 🧹 Formatear

```bash
npm run format
```

Script:

```json
{
  "format": "biome format --write ."
}
```

---

## 🔍 Validar

```bash
npm run check
```

Script:

```json
{
  "check": "biome check ."
}
```

`check` valida formato y linting sin modificar los archivos.

---

# 🪝 15. Git Hooks con Husky

El proyecto utiliza Husky para automatizar las validaciones antes de crear commits.

Instalar:

```bash
npm install -D husky
```

Inicializar:

```bash
npx husky init
```

Estructura:

```text
.husky/
├── pre-commit
└── commit-msg
```

---

## 🔍 Pre-commit

Archivo:

```text
.husky/pre-commit
```

Contenido:

```sh
#!/usr/bin/env sh

npm run format
npm run check
```

Cuando se ejecuta:

```bash
git commit
```

Husky:

1. Formatea el código.
2. Ejecuta las validaciones de Biome.
3. Detiene el commit si existen errores.

Flujo:

```text
git commit
    ↓
pre-commit
    ↓
npm run format
    ↓
npm run check
    ↓
Biome
    ↓
✅ Continúa
❌ Error → Commit detenido
```

---

# 📝 16. Conventional Commits con Commitlint

El proyecto utiliza Commitlint para garantizar que los mensajes sigan Conventional Commits.

Instalar:

```bash
npm install -D @commitlint/cli @commitlint/config-conventional
```

---

## ⚙️ Configuración

Archivo:

```text
commitlint.config.json
```

Contenido:

```json
{
  "extends": ["@commitlint/config-conventional"]
}
```

---

## 🪝 Commit-msg

Archivo:

```text
.husky/commit-msg
```

Contenido:

```sh
#!/usr/bin/env sh

npx --no -- commitlint --edit "$1"
```

---

## ✅ Commits válidos

```bash
git commit -m "feat: add rewards screen"

git commit -m "fix: resolve login validation"

git commit -m "refactor: improve transaction service"

git commit -m "test: add balance tests"

git commit -m "docs: update README"

git commit -m "chore: update dependencies"
```

---

## ❌ Commits inválidos

```bash
git commit -m "crear pantalla"

git commit -m "feat add rewards"

git commit -m "feat : add rewards"
```

Formato:

```text
type: description
```

Ejemplo:

```text
feat: add rewards screen
```

No debe existir un espacio antes de `:`.

---

# 🔄 17. Flujo Completo de Git

Cuando se ejecuta:

```bash
git commit -m "feat: add rewards screen"
```

se ejecuta:

```text
                 git commit
                      ↓
              ┌──────────────┐
              │  pre-commit   │
              └──────┬───────┘
                     ↓
              npm run format
                     ↓
               npm run check
                     ↓
                   Biome
                     ↓
              ┌──────────────┐
              │  commit-msg  │
              └──────┬───────┘
                     ↓
                 Commitlint
                     ↓
          Conventional Commits
                     ↓
                    ✅
```

Si Biome o Commitlint detectan un error, el commit no se crea.

---

# 📦 18. Expo Application Services (EAS)

EAS permite generar builds de Android e iOS y preparar la aplicación para distribución.

---

## 📦 Instalar EAS CLI

```bash
npm install -g eas-cli
```

Verificar:

```bash
eas --version
```

---

# 🔐 19. Login en Expo

Iniciar sesión:

```bash
eas login
```

Para utilizar el login mediante navegador:

```bash
eas login -b
```

---

# ⚙️ 20. Configurar EAS

Desde la raíz del proyecto:

```bash
eas build:configure
```

Esto configura el proyecto para utilizar EAS Build.

Se generará/configurará:

```text
eas.json
```

---

# 🤖 21. Generar Build Android

## APK para pruebas

Para generar un APK:

```bash
eas build -p android --profile preview
```

El APK puede utilizarse para instalar la aplicación manualmente en dispositivos Android.

---

## AAB para producción

Para generar el archivo que será utilizado para Google Play:

```bash
eas build -p android --profile production
```

### Diferencia

```text
APK
 ↓
Instalación manual / pruebas

AAB
 ↓
Google Play Store
```

---

# 🍎 22. Generar Build iOS

```bash
eas build -p ios
```

Para generar builds de iOS se requiere una cuenta en **Apple Developer Program**.

---

# 🔁 23. ¿Cuándo necesito generar un nuevo Build?

No todos los cambios requieren generar nuevamente el APK o IPA.

---

## 🟢 Cambios normales — NO requieren Build

Ejemplos:

* Cambios de UI.
* Cambios de estilos.
* Cambios en lógica TypeScript.
* Cambios en consumo de API.

Durante desarrollo:

```bash
npx expo start
```

Expo actualizará los cambios durante el desarrollo.

---

## 🔴 Cambios que SÍ requieren Build

Ejemplos:

* Instalación de nuevas librerías nativas.
* Cambios en permisos.
* Cambios en `app.json`.
* Cambios de icono.
* Cambios de splash.
* Nueva versión destinada a publicación.

En Android:

```bash
eas build -p android
```

En iOS:

```bash
eas build -p ios
```

---

# 🔢 24. Versionado de la Aplicación

La versión visible de la aplicación se configura en:

```text
app.json
```

Ejemplo:

```json
{
  "version": "1.0.0"
}
```

---

## 📱 Versiones

### Patch

Para correcciones pequeñas:

```text
1.0.1
```

### Minor

Para nuevas funcionalidades:

```text
1.1.0
```

### Major

Para cambios importantes:

```text
2.0.0
```

---

## 🤖 Android

Android utiliza:

```json
{
  "android": {
    "versionCode": 1
  }
}
```

---

## 🍎 iOS

iOS utiliza:

```json
{
  "ios": {
    "buildNumber": "1.0.0"
  }
}
```

Si el perfil de producción utiliza:

```json
{
  "production": {
    "autoIncrement": true
  }
}
```

EAS puede incrementar automáticamente el número técnico de build.

### 📌 Regla práctica

Antes de publicar una nueva versión:

```text
1. Cambiar version
2. Ejecutar build
3. Verificar build
4. Publicar
```

---

# 🏪 25. Publicación en Tiendas

## 🤖 Google Play

Para publicar en Google Play se requiere una cuenta de Google Play Console.

Generar producción:

```bash
eas build -p android --profile production
```

Después:

```bash
eas submit -p android
```

El formato utilizado para la tienda es:

```text
AAB
```

---

## 🍎 App Store

Se requiere una cuenta de Apple Developer Program.

Generar:

```bash
eas build -p ios
```

Enviar:

```bash
eas submit -p ios
```

---

# 🚨 26. Cambios y Builds — Resumen

```text
¿Cambiaste código?
       ↓
      Sí
       ↓
¿Es UI / lógica / API?
   ┌───┴───┐
  Sí       No
   ↓        ↓
Expo      ¿Es configuración,
Start     librería nativa,
          permisos o versión?
             ↓
            Sí
             ↓
          EAS Build
```

### Desarrollo diario

```bash
npx expo start
```

### APK de pruebas

```bash
eas build -p android --profile preview
```

### AAB de producción

```bash
eas build -p android --profile production
```

### iOS

```bash
eas build -p ios
```

### Enviar Android

```bash
eas submit -p android
```

### Enviar iOS

```bash
eas submit -p ios
```

---

# 🧪 27. Comandos Principales

| Comando                                     | Función                              |
| ------------------------------------------- | ------------------------------------ |
| `node -v`                                   | Ver versión de Node                  |
| `npm -v`                                    | Ver versión de NPM                   |
| `npm install`                               | Instalar dependencias                |
| `npx expo start`                            | Iniciar Expo                         |
| `npm start`                                 | Iniciar aplicación                   |
| `npm run android`                           | Ejecutar Android                     |
| `npm run ios`                               | Ejecutar iOS                         |
| `npm run web`                               | Ejecutar Web                         |
| `npx expo start --clear`                    | Limpiar caché                        |
| `npx expo install paquete`                  | Instalar paquete compatible con Expo |
| `npx expo prebuild`                         | Generar proyectos nativos            |
| `npm run format`                            | Formatear con Biome                  |
| `npm run check`                             | Validar con Biome                    |
| `eas login`                                 | Iniciar sesión en Expo               |
| `eas build:configure`                       | Configurar EAS                       |
| `eas build -p android --profile preview`    | Generar APK                          |
| `eas build -p android --profile production` | Generar AAB                          |
| `eas build -p ios`                          | Generar build iOS                    |
| `eas submit -p android`                     | Enviar Android                       |
| `eas submit -p ios`                         | Enviar iOS                           |

---

# 🧠 28. Buenas Prácticas

* Utilizar TypeScript.
* Separar `screens` y `components`.
* Mantener las APIs dentro de `services`.
* Utilizar hooks para lógica reutilizable.
* Utilizar Context para estado global cuando sea necesario.
* Definir tipos en `types`.
* Mantener la navegación separada de las screens.
* Manejar estados de `loading`, `error` y `data`.
* No guardar información sensible directamente en AsyncStorage.
* Centralizar las claves de almacenamiento.
* Mantener los servicios separados por responsabilidad.
* Utilizar Biome para formato y linting.
* Utilizar Husky para automatizar validaciones.
* Utilizar Conventional Commits.
* No generar builds innecesarios durante el desarrollo.
* Incrementar la versión antes de publicar una nueva versión.
* Utilizar EAS para generar builds de distribución.

---

# 📋 29. Flujo de Desarrollo Recomendado

```text
1. Clonar proyecto
        ↓
2. npm install
        ↓
3. npx expo start
        ↓
4. Desarrollar funcionalidad
        ↓
5. npm run format
        ↓
6. npm run check
        ↓
7. git add .
        ↓
8. git commit -m "feat: description"
        ↓
9. Husky
        ↓
10. Biome + Commitlint
        ↓
11. Push
        ↓
12. Build EAS cuando sea necesario
        ↓
13. Publicación
```

---

# 🏁 30. Conclusión

Loyalty React Native es una aplicación móvil orientada a la **fidelización y recompensas**, utilizando una arquitectura organizada para separar interfaz, navegación, lógica reutilizable, estado global, servicios y modelos.

La aplicación permite gestionar:

```text
                    Loyalty App
                         │
          ┌──────────────┼──────────────┐
          ↓              ↓              ↓
      Autenticación    Puntos       Transacciones
          │              │              │
          ↓              ↓              ↓
       Login          Acumular       Actividad
       Register       Redimir        Historial
          │              │
          └───────┬──────┘
                  ↓
               Backend
```

El proyecto utiliza Expo para facilitar el desarrollo y EAS para generar builds de Android e iOS.

Además, Biome, Husky y Commitlint permiten mantener un estándar de calidad y consistencia durante el desarrollo.

---

> Las screens manejan la interfaz.
> Los hooks encapsulan lógica reutilizable.
> Context administra el estado global.
> Los services manejan la comunicación con APIs.
> Types mantiene el tipado.
> Biome mantiene la calidad del código.
> Husky automatiza las validaciones.
> Commitlint garantiza Conventional Commits.
> EAS permite generar y distribuir la aplicación.
