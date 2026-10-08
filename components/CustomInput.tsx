import React from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  KeyboardTypeOptions,
} from 'react-native';
import { APP_CONFIG } from '@/constants/config';

interface CustomInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  label?: string;
  keyboardType?: KeyboardTypeOptions;
  multiline?: boolean;
  numberOfLines?: number;
  maxLength?: number;
  editable?: boolean;
  error?: string;
}

/**
 * Input de texto reutilizable con soporte para label, validación y múltiples tipos de teclado.
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
      {label && <Text style={styles.label}>{label}</Text>}
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
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: APP_CONFIG.COLORS.textPrimary,
    marginBottom: 6,
  },
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
  multiline: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  disabled: {
    backgroundColor: APP_CONFIG.COLORS.light,
    color: APP_CONFIG.COLORS.textSecondary,
  },
  inputError: {
    borderColor: APP_CONFIG.COLORS.danger,
  },
  errorText: {
    fontSize: 12,
    color: APP_CONFIG.COLORS.danger,
    marginTop: 4,
  },
});
