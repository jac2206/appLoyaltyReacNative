# Arquitectura móvil

## Mapa actual

```text
App.tsx
  AuthProvider
    AppNavigator (decide sesión)
      AuthNavigator: Login, Register
      MainNavigator: Home, Profile, QRScanner, Accumulate, Redeem

screen -> hook/context -> service -> api (Axios) -> backend
                         -> storage.repository -> AsyncStorage
```

## Responsabilidades

- `src/screens`: composición visual, eventos de usuario y estados de pantalla. No conocen Axios ni AsyncStorage.
- `src/components`: controles y bloques visuales reutilizables, sin reglas de negocio ni navegación de dominio.
- `src/hooks`: estado y orquestación de un caso de uso de UI. Ejemplos: `useBalance`, `useLogin`, `useQRForm`.
- `src/context`: estado transversal de sesión y sus acciones públicas (`login`, `logout`).
- `src/services`: adaptadores del backend por dominio; devuelven datos tipados y no renderizan alertas.
- `src/services/data`: persistencia local; `storage.repository.ts` serializa valores genéricos.
- `src/types`: contratos de dominio y navegación.
- `src/styles`: tokens visuales compartidos.

## Decisiones y límites

- `AuthContext` restaura el token al arrancar y `AppNavigator` elige el stack según `user`.
- `api.ts` inyecta `Authorization: Bearer <token>` y atiende 401. Toda nueva llamada autenticada usa la instancia `api`.
- El backend es el único que determina saldo, puntos disponibles y resultado de una transacción. El cliente no calcula puntos como decisión de negocio.
- Las rutas se tipan en `src/types/navigation.ts`; evitar parámetros `any`. Para QR debe existir un tipo discriminado.

## Evolución permitida

Crear carpetas por feature (`features/auth`, `features/transactions`) solo mediante una spec de migración. Mientras tanto, conservar el patrón por capas actual para no partir la app entre dos arquitecturas.
