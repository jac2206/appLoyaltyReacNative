# Patrones de implementación

## Formulario y operación remota

1. La pantalla mantiene el formulario o delega en un hook específico.
2. Validar formato, campos requeridos y conversión numérica antes de enviar.
3. Construir un DTO tipado con datos de sesión, formulario y referencia.
4. Invocar un único servicio de dominio.
5. Mostrar estado de carga, éxito o error accesible; no permitir doble envío.
6. Tras éxito, limpiar o invalidar los datos dependientes y navegar explícitamente.

## Sesión

- Restaurar sesión una vez en el provider.
- Al iniciar sesión: guardar token, configurar cliente HTTP, consultar perfil y luego publicar `user`.
- Al cerrar o recibir 401: limpiar token, token en memoria y usuario. La pantalla debe volver al flujo de autenticación por el estado del contexto.
- No duplicar `storage.ts` y `storage.repository.ts` en código nuevo: usar `storage.repository.ts` y migrar con cuidado si se toca el legado.

## QR

El QR es entrada no confiable. Analizar JSON, validar esquema y tipo antes de navegar. El payload esperado es:

```ts
type QrPayload = {
  type: 'ACCUMULATE' | 'REDEEM';
  partnerCode: string;
  locationCode: string;
  amount?: number;
  points?: number;
  reference?: string;
};
```

Para `ACCUMULATE` exigir `amount`; para `REDEEM`, `points`. Un QR inválido informa el error y permite reintentar o volver sin perder el control de la cámara.

## Errores

Mapear errores técnicos a mensajes en español que indiquen una acción posible. Reservar `console` para diagnóstico local y nunca exponer respuestas internas del servidor.
