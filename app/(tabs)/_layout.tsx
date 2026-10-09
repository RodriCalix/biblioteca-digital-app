/**
 * ============================================================================
 * ARCHIVO: app/(tabs)/_layout.tsx
 * DESCRIPCIÓN: Layout de navegación por pestañas inferiores (Bottom Tabs).
 * Define la barra de pestañas principal de la aplicación con 3 secciones:
 * 1. Catálogo (index): Lista principal de libros registrados.
 * 2. Agregar (create): Formulario para crear un nuevo libro.
 * 3. Configuración (settings): Información del sistema, endpoints y autores.
 * ============================================================================
 */
import { Tabs } from 'expo-router';
import { APP_CONFIG } from '@/constants/config';
import { Text } from 'react-native';

/**
 * Componente TabLayout.
 * Configura los estilos visuales de la barra de navegación inferior y los encabezados
 * de cada pantalla perteneciente al grupo de pestañas.
 */
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        // Color del ícono y texto de la pestaña activa (seleccionada)
        tabBarActiveTintColor: APP_CONFIG.COLORS.primary,
        // Color para las pestañas inactivas
        tabBarInactiveTintColor: APP_CONFIG.COLORS.textSecondary,
        // Estilos de la barra inferior de navegación
        tabBarStyle: {
          backgroundColor: APP_CONFIG.COLORS.cardBackground,
          borderTopWidth: 1,
          borderTopColor: APP_CONFIG.COLORS.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 4,
        },
        // Tipografía de los nombres de cada pestaña
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        // Estilo del encabezado superior (Header) compartido por las pestañas
        headerStyle: {
          backgroundColor: APP_CONFIG.COLORS.primary,
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: '700',
          fontSize: 18,
        },
      }}
    >
      {/* Pestaña 1: Catálogo principal de libros */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Catálogo',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>📚</Text>
          ),
        }}
      />

      {/* Pestaña 2: Registro de nuevo libro */}
      <Tabs.Screen
        name="create"
        options={{
          title: 'Agregar',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>➕</Text>
          ),
        }}
      />

      {/* Pestaña 3: Configuración e información técnica */}
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Configuración',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>⚙️</Text>
          ),
        }}
      />
    </Tabs>
  );
}

