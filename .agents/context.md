# Contexto del producto

## Propósito

Loyalty App permite que una persona gestione puntos de un programa de lealtad: crea una cuenta, inicia sesión, consulta su saldo, acumula puntos por una compra y redime puntos con aliados. El QR transmite los datos de la operación; el backend conserva la fuente de verdad del saldo y valida las reglas de negocio.

## Stack actual

- Expo SDK 54, React Native 0.81, React 19 y TypeScript estricto.
- React Navigation Native Stack para navegación.
- Axios para HTTP, AsyncStorage para la sesión y `expo-camera` para QR.
- `react-native-gifted-charts` para la gráfica de actividad.
- Backend externo bajo `/loyalty/v1`; su URL actual está en `src/services/api.ts`.

## Dominios y estado

| Dominio       | Fuente de verdad                     | Cliente                                |
| ------------- | ------------------------------------ | -------------------------------------- |
| Sesión        | Token y perfil validados por backend | `AuthContext` y AsyncStorage           |
| Cuenta        | Saldo del backend                    | `useBalance`                           |
| Transacciones | Backend                              | pantallas Accumulate/Redeem y servicio |
| QR            | Código escaneado                     | `QRScannerScreen` y `useQRForm`        |

El gráfico semanal y la lista de aliados en Home son actualmente datos de presentación estáticos, no historial ni catálogo real.

## Restricciones de producto

- Idioma de interfaz: español.
- Orientación: vertical; Android e iOS, con soporte web de Expo.
- Documentos admitidos: `CC`, `CE`, `NIT`, `PT`.
- Una transacción es de acumulación o redención, nunca ambas.
