/**
 * ============================================================================
 * ARCHIVO: components/useColorScheme.ts
 * DESCRIPCIÓN: Hook personalizado para detectar el esquema de color del sistema.
 * Normaliza el valor devolviendo 'light' si el esquema es indefinido.
 * ============================================================================
 */
import { useColorScheme as useColorSchemeCore } from 'react-native';

/**
 * Hook para obtener el esquema de color activo ('light' o 'dark').
 */
export const useColorScheme = () => {
  const coreScheme = useColorSchemeCore();
  return coreScheme === 'unspecified' ? 'light' : coreScheme;
};

