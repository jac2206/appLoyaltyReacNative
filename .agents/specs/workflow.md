# Desarrollo guiado por especificaciones

Este flujo coordina cambios de Loyalty App. Las specs de dominio en esta carpeta describen contratos y comportamiento esperado; no garantizan que todo esté implementado. El código y las comprobaciones aportan evidencia del comportamiento real. Ante una diferencia, documenta ambos y aclara la autoridad o decisión antes de cambiar un contrato.

## Elegir el alcance

1. Identifica la solicitud, el dominio, la spec existente y los cambios activos relacionados. Reutiliza lo que exista y preserva cambios locales. Para autenticación, cuenta o transacciones/QR consulta respectivamente [auth](auth.spec.md), [account](account.spec.md) y [transaction](transaction.spec.md).
2. Para una corrección pequeña sin cambio de comportamiento o contrato, registra objetivo y verificación en la tarea o entrega; no crees una spec por rutina. Si cambia un comportamiento o contrato, actualiza primero la spec afectada con criterios observables. Para un cambio técnico sin dominio existente, usa una nota de cambio solo cuando haga falta conservar decisiones o tareas entre sesiones.
3. Para un cambio amplio o incierto, registra alcance y exclusiones, supuestos y preguntas, contratos afectados (API, navegación, almacenamiento, QR), riesgos, diseño mínimo, tareas ordenadas y verificación. La [plantilla](change-template.md) es opcional. No crees un sistema paralelo ni instales OpenSpec por defecto.
4. Implementa lo autorizado siguiendo las reglas del proyecto. Valida entradas y considera sesión, datos sensibles, permisos y efectos de integración cuando correspondan. No inventes reglas de puntos o contratos del backend; detén solo la parte dependiente si falta una decisión material.
5. Relaciona cada criterio con evidencia real: prueba, comando, inspección o comprobación manual. Registra `Aprobado`, `Fallido`, `Parcial`, `Bloqueado`, `No ejecutado` o `No aplica` y explica límites. Una prueba planificada no equivale a una ejecutada.
6. Actualiza la spec de dominio con el comportamiento acordado e informa resultados, desviaciones y riesgos. No marques un cambio como cerrado si quedan criterios o verificaciones requeridas pendientes o fallidas. No archives automáticamente ni borres historial.

## Comprobaciones móviles

Según el cambio, considera Android/iOS, navegación, modo claro/oscuro, accesibilidad, permisos, cámara, sesión, biometría, conectividad, errores y doble envío. Usa `npx tsc --noEmit` y `npm run check` cuando sean pertinentes; informa errores preexistentes. No hay runner de pruebas configurado: consulta [la estrategia](../testing/strategy.md) y no afirmes que se ejecutaron pruebas inexistentes.
