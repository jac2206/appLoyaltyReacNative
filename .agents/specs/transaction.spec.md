# Spec — Acumulación, redención y QR

## Alcance

Registrar una operación de puntos iniciada manualmente o desde un QR.

## Contratos actuales

| Acción   | Ruta                            | DTO                                           |
| -------- | ------------------------------- | --------------------------------------------- |
| Acumular | `POST /transactions/accumulate` | identidad, aliado, sede, `amount`, referencia |
| Redimir  | `POST /transactions/redeem`     | identidad, aliado, sede, `points`, referencia |

`Transaction` contiene `documentType`, `documentNumber`, `partnerCode`, `locationCode`, `reference` y exactamente uno entre `amount` o `points`.

## Criterios de aceptación

- Una persona autenticada puede acumular con aliado, sede y monto válidos; el éxito confirma y vuelve a Inicio.
- Puede redimir con aliado, sede y puntos válidos; el éxito confirma y vuelve a Inicio.
- No se envía una transacción si faltan campos, el valor no es numérico/positivo o no hay identidad de sesión.
- La referencia usa la recibida por QR; sin ella aplica el valor por defecto actual (`APP-ACCUMULATE` o `APP-REDEEM`).
- Un QR válido contiene JSON con tipo, aliado, sede, valor requerido y referencia opcional; dirige al formulario apropiado y lo precarga.
- QR inválido, permiso denegado o error remoto se comunica en español y no ejecuta operación alguna.

## Reglas de seguridad

- No confiar en el QR para identidad ni saldo: ambos provienen de la sesión/backend.
- El backend valida saldo suficiente, aliado, sede, duplicados e idempotencia. Si expone una clave de idempotencia, añadirla al contrato antes de usarla.
