/**
 * ============================================================================
 * ARCHIVO: app/_layout.tsx
 * DESCRIPCIÓN: Layout raíz (Root Layout) de la aplicación con Expo Router.
 * Se encarga de:
 * 1. Cargar fuentes personalizadas (SpaceMono) de manera asíncrona.
 * 2. Controlar la pantalla de bienvenida nativa (SplashScreen) para ocultarla cuando esté listo.
 * 3. Configurar el navegador principal tipo pila (Stack Navigator) y sus rutas globales.
 * ============================================================================
 */
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { APP_CONFIG } from '@/constants/config';

export {
  // Manejo global de excepciones no capturadas en los componentes del Layout
  ErrorBoundary,
} from 'expo-router';

// Configuración de Expo Router para definir la ruta inicial
export const unstable_settings = {
  initialRouteName: '(tabs)',
};

// Evita que la pantalla de inicio (splash screen) se oculte automáticamente antes de cargar recursos
SplashScreen.preventAutoHideAsync();

/**
 * Componente principal RootLayout.
 * Envuelve toda la jerarquía de pantallas de la aplicación.
 */
export default function RootLayout() {
  // Hook para cargar fuentes personalizadas desde los assets
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  // Efecto para propagar errores de carga de fuentes si ocurren
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  // Efecto para ocultar el Splash Screen una vez que las fuentes están listas
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // Retorna null mientras se cargan los recursos para no renderizar contenido incompleto
  if (!loaded) {
    return null;
  }

  // Renderizado del navegador Stack principal
  return (
    <Stack
      screenOptions={{
        // Estilo visual predeterminado para el encabezado en todas las pantallas del Stack
        headerStyle: {
          backgroundColor: APP_CONFIG.COLORS.primary,
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: '700',
        },
      }}
    >
      {/* Grupo de pestañas principales (oculta el header del Stack porque las tabs tienen el suyo) */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      {/* Pantalla modal/detalle de un libro específico identificado por su ID */}
      <Stack.Screen
        name="detail/[id]"
        options={{
          title: 'Detalle del Libro',
          presentation: 'card',
        }}
      />
    </Stack>
  );
}

