import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { APP_CONFIG } from '@/constants/config';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={styles.container}>
        <Text style={styles.icon}>📚</Text>
        <Text style={styles.title}>Página no encontrada</Text>
        <Text style={styles.subtitle}>
          La pantalla que buscas no existe en la biblioteca.
        </Text>
        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Volver al catálogo</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: APP_CONFIG.COLORS.background,
  },
  icon: {
    fontSize: 64,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: APP_CONFIG.COLORS.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: APP_CONFIG.COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  link: {
    backgroundColor: APP_CONFIG.COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },
  linkText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
