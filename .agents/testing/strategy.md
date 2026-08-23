# Estrategia de pruebas

## Estado actual

No hay framework ni scripts de pruebas configurados. La verificación mínima disponible es `npx tsc --noEmit` y pruebas manuales en Expo.

## Pirámide objetivo

1. Unitarias: validadores, transformaciones DTO y servicios.
2. Integración: hooks, `AuthContext`, almacenamiento e interceptor HTTP con mocks.
3. Componente: pantallas con React Native Testing Library y navegación simulada.
4. Manual/E2E: cámara QR, permisos, restauración de sesión y operaciones en dispositivo.

## Adopción propuesta

Cuando se autorice añadir dependencias, configurar Jest + `jest-expo` + `@testing-library/react-native`, incluir `test` y `test:watch`, y crear utilidades de render con providers. No configurar Vitest para el runtime React Native sin una decisión técnica explícita.

## Matriz de regresión manual

- Registro, login, reinicio de app y logout.
- Sesión expirada/401.
- Saldo en Home y Perfil después de volver a la app.
- Acumulación y redención correctas, inválidas y fallidas.
- Cámara: permiso concedido/denegado, QR correcto e inválido.
