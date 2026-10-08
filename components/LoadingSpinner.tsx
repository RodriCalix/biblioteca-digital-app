import React from 'react';
import { ActivityIndicator, StyleSheet, View, Text } from 'react-native';
import { APP_CONFIG } from '@/constants/config';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'small' | 'large';
  color?: string;
}

/**
 * Componente de carga reutilizable con indicador de actividad.
 * Muestra un spinner centrado con un mensaje opcional.
 */
export default function LoadingSpinner({
  message = 'Cargando...',
  size = 'large',
  color = APP_CONFIG.COLORS.primary,
}: LoadingSpinnerProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  message: {
    marginTop: 12,
    fontSize: 16,
    color: APP_CONFIG.COLORS.textSecondary,
    fontWeight: '500',
  },
});

