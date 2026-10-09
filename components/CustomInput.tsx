/**
 * ============================================================================
 * ARCHIVO: components/CustomInput.tsx
 * DESCRIPCIÓN: Componente reutilizable de campo de entrada de texto (Input).
 * Proporciona soporte visual unificado para etiquetas (labels), mensajes de error
 * en validaciones, estados deshabilitados y campos multilinea.
 * ============================================================================
 */
import React from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  KeyboardTypeOptions,
} from 'react-native';
import { APP_CONFIG } from '@/constants/config';

/**
 * Propiedades aceptadas por el componente CustomInput
 */
interface CustomInputProps {
  /** Valor actual del campo de texto */
  value: string;
  /** Función callback que se ejecuta al cambiar el texto */
  onChangeText: (text: string) => void;
  /** Texto de sugerencia cuando el campo está vacío */
  placeholder?: string;
  /** Etiqueta descriptiva ubicada sobre el campo */
  label?: string;
  /** Tipo de teclado nativo a mostrar (numérico, email, url, etc.) */
  keyboardType?: KeyboardTypeOptions;
  /** Si permite múltiples líneas de texto */
  multiline?: boolean;
  /** Cantidad de líneas iniciales en modo multilínea */
  numberOfLines?: number;
  /** Longitud máxima permitida de caracteres */
  maxLength?: number;
  /** Si el campo permite edición o está deshabilitado */
  editable?: boolean;
  /** Mensaje de error de validación; si existe, resalta el borde en rojo */
  error?: string;
}

/**
 * Componente funcional CustomInput.
 * Renderiza un contenedor con etiqueta opcional, campo de texto estilizado
 * y mensaje de error en la parte inferior si la validación falla.
 */
export default function CustomInput({
  value,
  onChangeText,
  placeholder = '',
  label,
  keyboardType = 'default',
  multiline = false,
  numberOfLines = 1,
  maxLength,
  editable = true,
  error,
}: CustomInputProps) {
  return (
    <View style={styles.container}>
      {/* Etiqueta superior opcional */}
      {label && <Text style={styles.label}>{label}</Text>}

      {/* Campo de entrada de texto principal */}
      <TextInput
        style={[
          styles.input,
          multiline && styles.multiline,
          !editable && styles.disabled,
          error ? styles.inputError : null,
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={APP_CONFIG.COLORS.textSecondary}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={numberOfLines}
        maxLength={maxLength}
        editable={editable}
        autoCapitalize="sentences"
      />

      {/* Mensaje de retroalimentación en caso de error de validación */}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

/**
 * Estilos visuales del componente de entrada de texto
 */
const styles = StyleSheet.create({
  // Contenedor principal con margen inferior para separar campos
  container: {
    marginBottom: 16,
  },
  // Estilo de la etiqueta superior
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: APP_CONFIG.COLORS.textPrimary,
    marginBottom: 6,
  },
  // Estilo base del cuadro de texto
  input: {
    borderWidth: 1,
    borderColor: APP_CONFIG.COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: APP_CONFIG.COLORS.textPrimary,
    backgroundColor: APP_CONFIG.COLORS.cardBackground,
  },
  // Modificador para campos de texto extensos (área de texto)
  multiline: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  // Modificador visual cuando el campo está bloqueado/deshabilitado
  disabled: {
    backgroundColor: APP_CONFIG.COLORS.light,
    color: APP_CONFIG.COLORS.textSecondary,
  },
  // Borde rojo aplicado cuando existe un error de validación
  inputError: {
    borderColor: APP_CONFIG.COLORS.danger,
  },
  // Estilo del texto del mensaje de error
  errorText: {
    fontSize: 12,
    color: APP_CONFIG.COLORS.danger,
    marginTop: 4,
  },
});


