# Skill: pruebas de la app móvil

## Estrategia

Usar Jest con `jest-expo` y React Native Testing Library cuando se incorpore la infraestructura. Para contratos HTTP, usar mocks del cliente Axios; para UI, renderizar comportamiento observable.

## Casos prioritarios

- Auth: restauración válida/inválida, login, logout y 401.
- Cuenta: carga de saldo, error y actualización al recuperar foco.
- Transacción: validación, DTO correcto, éxito, fallo y prevención de doble envío.
- QR: permiso, JSON inválido, tipo inválido y navegación con payload válido.

Ver [estrategia](../testing/strategy.md) y [patrones](../testing/patterns.md) antes de añadir configuración o tests.
