import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Linking,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { APP_CONFIG } from '@/constants/config';

/**
 * Pantalla de configuración e información de la app.
 */
export default function SettingsScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.headerSection}>
        <Text style={styles.appIcon}>📚</Text>
        <Text style={styles.appName}>{APP_CONFIG.APP_NAME}</Text>
        <Text style={styles.appVersion}>Versión 1.0.0</Text>
      </View>

      {/* Información de la API */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔗 Conexión API</Text>
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Base URL</Text>
          <Text style={styles.infoValue} selectable>
            {APP_CONFIG.API_BASE_URL}
          </Text>
          <Text style={styles.infoLabel}>Timeout</Text>
          <Text style={styles.infoValue}>
            {APP_CONFIG.API_TIMEOUT / 1000} segundos
          </Text>
        </View>
      </View>

      {/* Información del proyecto */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📋 Sobre el Proyecto</Text>
        <View style={styles.infoCard}>
          <Text style={styles.description}>
            Esta aplicación es una biblioteca digital desarrollada como práctico
            para la materia de Desarrollo de Plataformas y Servicios (DPS).
          </Text>
          <Text style={styles.description}>
            Utiliza React Native con Expo Router para la navegación, Axios para
            las peticiones HTTP y MockAPI.io como backend simulado.
          </Text>
        </View>
      </View>

      {/* Tecnologías */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>⚡ Tecnologías</Text>
        <View style={styles.techGrid}>
          {[
            { name: 'React Native', icon: '⚛️' },
            { name: 'Expo Router', icon: '🧭' },
            { name: 'TypeScript', icon: '📘' },
            { name: 'Axios', icon: '🌐' },
            { name: 'MockAPI.io', icon: '🗄️' },
            { name: 'Expo SDK', icon: '📱' },
          ].map((tech) => (
            <View key={tech.name} style={styles.techItem}>
              <Text style={styles.techIcon}>{tech.icon}</Text>
              <Text style={styles.techName}>{tech.name}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Enlace a MockAPI */}
      <TouchableOpacity
        style={styles.linkButton}
        onPress={() => Linking.openURL('https://mockapi.io')}
      >
        <Text style={styles.linkButtonText}>🌍 Abrir MockAPI.io</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>
        Desarrollado con ❤️ usando Expo y React Native
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_CONFIG.COLORS.background,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  headerSection: {
    alignItems: 'center',
    paddingVertical: 24,
    marginBottom: 16,
  },
  appIcon: {
    fontSize: 56,
    marginBottom: 8,
  },
  appName: {
    fontSize: 24,
    fontWeight: '700',
    color: APP_CONFIG.COLORS.textPrimary,
    marginBottom: 4,
  },
  appVersion: {
    fontSize: 14,
    color: APP_CONFIG.COLORS.textSecondary,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: APP_CONFIG.COLORS.textPrimary,
    marginBottom: 10,
  },
  infoCard: {
    backgroundColor: APP_CONFIG.COLORS.cardBackground,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: APP_CONFIG.COLORS.border,
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: APP_CONFIG.COLORS.textSecondary,
    textTransform: 'uppercase',
    marginBottom: 2,
    marginTop: 8,
  },
  infoValue: {
    fontSize: 14,
    color: APP_CONFIG.COLORS.primary,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: APP_CONFIG.COLORS.textSecondary,
    lineHeight: 22,
    marginBottom: 8,
  },
  techGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  techItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: APP_CONFIG.COLORS.cardBackground,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: APP_CONFIG.COLORS.border,
  },
  techIcon: {
    fontSize: 18,
    marginRight: 6,
  },
  techName: {
    fontSize: 13,
    fontWeight: '600',
    color: APP_CONFIG.COLORS.textPrimary,
  },
  linkButton: {
    backgroundColor: APP_CONFIG.COLORS.info,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  linkButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  footer: {
    textAlign: 'center',
    fontSize: 13,
    color: APP_CONFIG.COLORS.textSecondary,
    marginBottom: 20,
  },
});
