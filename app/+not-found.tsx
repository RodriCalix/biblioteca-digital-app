/**
 * ============================================================================
 * ARCHIVO: app/+not-found.tsx
 * DESCRIPCIÓN: Pantalla de respaldo para rutas no encontradas (Error 404).
 * Se muestra automáticamente cuando un usuario navega hacia una URL o ruta inexistente,
 * ofreciendo un mensaje amigable y un botón de redirección de regreso al catálogo.
 * ============================================================================
 */
import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { APP_CONFIG } from '@/constants/config';

/**
 * Componente NotFoundScreen.
 * Renderiza la interfaz de aviso cuando la pantalla solicitada no existe.
 */
export default function NotFoundScreen() {
  return (
    <>
      {/* Configuración del título en la barra superior para esta pantalla */}
      <Stack.Screen options={{ title: 'Oops!' }} />

      {/* Contenedor principal con mensaje y botón de redirección */}
      <View style={styles.container}>
        {/* Ícono representativo */}
        <Text style={styles.icon}>📚</Text>

        {/* Título de error */}
        <Text style={styles.title}>Página no encontrada</Text>

        {/* Descripción explicativa para el usuario */}
        <Text style={styles.subtitle}>
          La pantalla que buscas no existe en la biblioteca.
        </Text>

        {/* Enlace tipo botón para retornar al inicio (Catálogo) */}
        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Volver al catálogo</Text>
        </Link>
      </View>
    </>
  );
}

/**
 * Estilos visuales de la pantalla de error 404
 */
const styles = StyleSheet.create({
  // Contenedor centrado vertical y horizontalmente
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: APP_CONFIG.COLORS.background,
  },
  // Tamaño del ícono de libros
  icon: {
    fontSize: 64,
    marginBottom: 16,
  },
  // Título principal del error
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: APP_CONFIG.COLORS.textPrimary,
    marginBottom: 8,
  },
  // Subtítulo con instrucciones o aclaraciones
  subtitle: {
    fontSize: 15,
    color: APP_CONFIG.COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  // Botón estilizado para el enlace de regreso
  link: {
    backgroundColor: APP_CONFIG.COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },
  // Texto interno del botón de regreso
  linkText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
