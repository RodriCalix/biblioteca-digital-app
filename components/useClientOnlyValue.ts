/**
 * ============================================================================
 * ARCHIVO: components/useClientOnlyValue.ts
 * DESCRIPCIÓN: Utilidad para renderizado condicional de cliente.
 * En entornos nativos (iOS y Android), siempre devuelve el valor de cliente.
 * ============================================================================
 */

/**
 * Retorna el valor correspondiente al entorno de ejecución (servidor o cliente).
 */
export function useClientOnlyValue<S, C>(server: S, client: C): S | C {
  return client;
}
