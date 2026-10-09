/**
 * ============================================================================
 * ARCHIVO: components/LoadingSpinner.tsx
 * DESCRIPCIÓN: Componente reutilizable para estados de carga (Loading).
 * Centra un indicador de actividad animado (ActivityIndicator) y un mensaje
 * textual personalizable para informar al usuario mientras se resuelven peticiones.
 * ============================================================================
 */
import React from 'react';
import { ActivityIndicator, StyleSheet, View, Text } from 'react-native';
import { APP_CONFIG } from '@/constants/config';

/**
 * Propiedades del componente LoadingSpinner
 */
interface LoadingSpinnerProps {
  /** Mensaje informativo mostrado debajo del indicador */
  message?: string;
  /** Tamaño del indicador circular ('small' o 'large') */
  size?: 'small' | 'large';
  /** Color hexadecimal del indicador */
  color?: string;
}

/**
 * Componente funcional LoadingSpinner.
 * Renderiza el spinner centrado en la pantalla o en el contenedor padre.
 */
export default function LoadingSpinner({
  message = 'Cargando...',
  size = 'large',
  color = APP_CONFIG.COLORS.primary,
}: LoadingSpinnerProps) {
  return (
    <View style={styles.container}>
      {/* Indicador giratorio nativo */}
      <ActivityIndicator size={size} color={color} />
      {/* Mensaje explicativo opcional */}
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
}

/**
 * Estilos visuales del componente LoadingSpinner
 */
const styles = StyleSheet.create({
  // Contenedor centrado que ocupa todo el espacio disponible
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  // Texto del mensaje con espaciado superior y color atenuado
  message: {
    marginTop: 12,
    fontSize: 16,
    color: APP_CONFIG.COLORS.textSecondary,
    fontWeight: '500',
  },
});


