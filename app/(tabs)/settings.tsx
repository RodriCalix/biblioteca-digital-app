/**
 * ============================================================================
 * ARCHIVO: app/(tabs)/settings.tsx
 * DESCRIPCIÓN: Pantalla de Configuración e Información del Sistema.
 * Presenta detalles informativos sobre la aplicación:
 * 1. Identidad de la app y versión actual.
 * 2. Parámetros de conexión con la API REST (Base URL, Timeout).
 * 3. Contexto académico del proyecto (Práctico DPS).
 * 4. Listado de tecnologías utilizadas (React Native, Expo Router, TypeScript, Axios, MockAPI).
 * 5. Acceso directo al portal web de MockAPI.io y créditos de los desarrolladores.
 * ============================================================================
 */
import { APP_CONFIG } from '@/constants/config';
import {
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

/**
 * Componente SettingsScreen.
 * Vista estática e informativa estructurada en secciones con tarjetas visuales.
 */
export default function SettingsScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Sección 1: Encabezado de identidad de la aplicación */}
      <View style={styles.headerSection}>
        <Text style={styles.appIcon}>📚</Text>
        <Text style={styles.appName}>{APP_CONFIG.APP_NAME}</Text>
        <Text style={styles.appVersion}>Versión 1.0.0</Text>
      </View>

      {/* Sección 2: Parámetros técnicos de conexión a la API */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔗 Conexión API</Text>
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Base URL</Text>
          {/* Texto seleccionable para que el usuario pueda copiar la URL del backend */}
          <Text style={styles.infoValue} selectable>
            {APP_CONFIG.API_BASE_URL}
          </Text>
          <Text style={styles.infoLabel}>Timeout</Text>
          <Text style={styles.infoValue}>
            {APP_CONFIG.API_TIMEOUT / 1000} segundos
          </Text>
        </View>
      </View>

      {/* Sección 3: Descripción contextual y académica del proyecto */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📋 Sobre el Proyecto</Text>
        <View style={styles.infoCard}>
          <Text style={styles.description}>
            Esta aplicación es una biblioteca digital desarrollada como práctico
            para la materia de Diseño y Programación de Software Multiplataforma (DPS104).
          </Text>
          <Text style={styles.description}>
            Utiliza React Native con Expo Router para la navegación, Axios para
            las peticiones HTTP y MockAPI.io como backend simulado.
          </Text>
        </View>
      </View>

      {/* Sección 4: Grilla de tecnologías del stack de desarrollo */}
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

      {/* Sección 5: Enlace externo para abrir el panel de MockAPI en el navegador del dispositivo */}
      <TouchableOpacity
        style={styles.linkButton}
        onPress={() => Linking.openURL('https://mockapi.io')}
      >
        <Text style={styles.linkButtonText}>🌍 Abrir MockAPI.io</Text>
      </TouchableOpacity>

      {/* Pie de página con créditos de desarrollo */}
      <Text style={styles.footer}>
        Desarrollado por Rodrigo Calixto y Luis Cuadra usando Expo y React Native
      </Text>
    </ScrollView>
  );
}

/**
 * Estilos visuales de la pantalla de configuración
 */
const styles = StyleSheet.create({
  // Fondo de la pantalla completa
  container: {
    flex: 1,
    backgroundColor: APP_CONFIG.COLORS.background,
  },
  // Espaciado interno general
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  // Bloque del ícono y nombre de la aplicación centrado
  headerSection: {
    alignItems: 'center',
    paddingVertical: 24,
    marginBottom: 16,
  },
  // Tamaño del ícono de la app
  appIcon: {
    fontSize: 56,
    marginBottom: 8,
  },
  // Nombre de la app destacado en negrita
  appName: {
    fontSize: 24,
    fontWeight: '700',
    color: APP_CONFIG.COLORS.textPrimary,
    marginBottom: 4,
  },
  // Etiqueta de la versión instalada
  appVersion: {
    fontSize: 14,
    color: APP_CONFIG.COLORS.textSecondary,
  },
  // Contenedor de cada bloque de configuración
  section: {
    marginBottom: 20,
  },
  // Título de cada sección
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: APP_CONFIG.COLORS.textPrimary,
    marginBottom: 10,
  },
  // Tarjeta contenedora de información con borde suave
  infoCard: {
    backgroundColor: APP_CONFIG.COLORS.cardBackground,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: APP_CONFIG.COLORS.border,
  },
  // Etiquetas secundarias en mayúsculas
  infoLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: APP_CONFIG.COLORS.textSecondary,
    textTransform: 'uppercase',
    marginBottom: 2,
    marginTop: 8,
  },
  // Valores destacados con tipografía monoespaciada para URLs y métricas
  infoValue: {
    fontSize: 14,
    color: APP_CONFIG.COLORS.primary,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    marginBottom: 4,
  },
  // Párrafos informativos con interlineado cómodo
  description: {
    fontSize: 14,
    color: APP_CONFIG.COLORS.textSecondary,
    lineHeight: 22,
    marginBottom: 8,
  },
  // Cuadrícula flexible para chips de tecnologías
  techGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  // Elemento individual (badge) de cada tecnología
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
  // Ícono de la tecnología
  techIcon: {
    fontSize: 18,
    marginRight: 6,
  },
  // Nombre de la tecnología
  techName: {
    fontSize: 13,
    fontWeight: '600',
    color: APP_CONFIG.COLORS.textPrimary,
  },
  // Botón para abrir URL externa
  linkButton: {
    backgroundColor: APP_CONFIG.COLORS.info,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  // Texto del botón externo
  linkButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  // Créditos al pie de la pantalla
  footer: {
    textAlign: 'center',
    fontSize: 13,
    color: APP_CONFIG.COLORS.textSecondary,
    marginBottom: 20,
  },
});
