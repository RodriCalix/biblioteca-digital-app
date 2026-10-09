/**
 * ============================================================================
 * ARCHIVO: app/(tabs)/index.tsx
 * DESCRIPCIÓN: Pantalla principal de Catálogo de Libros (Operación GET).
 * Funcionalidades clave:
 * 1. Obtiene la lista completa de libros desde MockAPI.
 * 2. Recarga los datos automáticamente cuando la pantalla gana el foco (useFocusEffect).
 * 3. Permite filtrado y búsqueda en tiempo real por título o autor.
 * 4. Soporta gesto de arrastrar para actualizar (Pull-to-Refresh).
 * 5. Muestra tarjetas con estado visual y navega a los detalles del libro seleccionado.
 * ============================================================================
 */
import React, { useState, useCallback } from 'react';
import {
  View,
  FlatList,
  TextInput,
  StyleSheet,
  Text,
  RefreshControl,
} from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';

import { Book } from '@/types/Entity';
import { getBooks } from '@/services/resourceService';
import ItemCard from '@/components/ItemCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { APP_CONFIG } from '@/constants/config';

/**
 * Componente de la pantalla de catálogo de libros
 */
export default function CatalogScreen() {
  // Hook de navegación de Expo Router
  const router = useRouter();

  // Estado para la lista completa de libros obtenidos del backend
  const [books, setBooks] = useState<Book[]>([]);
  // Estado para controlar el indicador de carga inicial
  const [loading, setLoading] = useState(true);
  // Estado para controlar la animación del gesto pull-to-refresh
  const [refreshing, setRefreshing] = useState(false);
  // Estado para el texto ingresado en el buscador
  const [searchQuery, setSearchQuery] = useState('');
  // Estado para almacenar mensajes de error si la petición falla
  const [error, setError] = useState<string | null>(null);

  /**
   * Petición asíncrona para obtener los libros del servicio API.
   * Maneja estados de error y finalización.
   */
  const fetchBooks = useCallback(async () => {
    try {
      setError(null);
      const data = await getBooks();
      setBooks(data);
    } catch (err) {
      console.error('Error al cargar libros:', err);
      setError('No se pudieron cargar los libros. Verifica tu conexión.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  /**
   * Hook de ciclo de vida que se ejecuta cada vez que el usuario vuelve a esta pestaña.
   * Garantiza que la lista se mantenga sincronizada con cambios realizados en otras pantallas.
   */
  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchBooks();
    }, [fetchBooks])
  );

  /**
   * Controlador para el gesto de deslizamiento hacia abajo (Pull-to-refresh)
   */
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchBooks();
  }, [fetchBooks]);

  /**
   * Filtro en memoria: evalúa si el título o autor coincide con el término de búsqueda
   */
  const filteredBooks = books.filter(
    (b) =>
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  /**
   * Manejador de selección: navega hacia la pantalla de detalle del libro
   */
  const handleBookPress = (book: Book) => {
    router.push(`/detail/${book.id}`);
  };

  // Renderizado condicional mientras se descargan los datos por primera vez
  if (loading) {
    return <LoadingSpinner message="Cargando catálogo..." />;
  }

  return (
    <View style={styles.container}>
      {/* Contenedor del buscador superior */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por título o autor..."
          placeholderTextColor={APP_CONFIG.COLORS.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {/* Botón para borrar el texto de búsqueda si hay contenido escrito */}
        {searchQuery.length > 0 && (
          <Text style={styles.clearButton} onPress={() => setSearchQuery('')}>
            ✕
          </Text>
        )}
      </View>

      {/* Contador dinámico de resultados encontrados */}
      <Text style={styles.resultsCount}>
        {filteredBooks.length} libro{filteredBooks.length !== 1 ? 's' : ''}{' '}
        encontrado{filteredBooks.length !== 1 ? 's' : ''}
      </Text>

      {/* Banner de error si falló la consulta al servidor */}
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {/* Lista optimizada con FlatList para renderizar las tarjetas de libros */}
      <FlatList
        data={filteredBooks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ItemCard book={item} onPress={handleBookPress} />
        )}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={APP_CONFIG.COLORS.primary}
            colors={[APP_CONFIG.COLORS.primary]}
          />
        }
        // Vista vacía cuando no existen libros o no coinciden con la búsqueda
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📖</Text>
            <Text style={styles.emptyText}>
              {searchQuery
                ? 'No se encontraron libros con esa búsqueda.'
                : 'No hay libros en el catálogo.'}
            </Text>
          </View>
        }
      />
    </View>
  );
}

/**
 * Estilos visuales de la pantalla de catálogo
 */
const styles = StyleSheet.create({
  // Contenedor principal de pantalla completa
  container: {
    flex: 1,
    backgroundColor: APP_CONFIG.COLORS.background,
  },
  // Barra de búsqueda redondeada con sombra suave
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: APP_CONFIG.COLORS.cardBackground,
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 4,
    borderRadius: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: APP_CONFIG.COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  // Ícono de lupa
  searchIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  // Campo de texto del buscador
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: APP_CONFIG.COLORS.textPrimary,
  },
  // Botón táctil para limpiar el texto ingresado
  clearButton: {
    fontSize: 18,
    color: APP_CONFIG.COLORS.textSecondary,
    padding: 4,
  },
  // Texto informativo sobre la cantidad de resultados
  resultsCount: {
    fontSize: 13,
    color: APP_CONFIG.COLORS.textSecondary,
    marginHorizontal: 20,
    marginVertical: 8,
  },
  // Espaciado inferior para la lista de libros
  listContent: {
    paddingBottom: 20,
  },
  // Contenedor de alerta de error
  errorContainer: {
    backgroundColor: '#FFF0F0',
    marginHorizontal: 16,
    marginBottom: 8,
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: APP_CONFIG.COLORS.danger,
  },
  // Texto de la alerta de error
  errorText: {
    color: APP_CONFIG.COLORS.danger,
    fontSize: 14,
  },
  // Contenedor centrado cuando no hay libros para mostrar
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  // Ícono de libro vacío
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  // Mensaje para estado vacío
  emptyText: {
    fontSize: 16,
    color: APP_CONFIG.COLORS.textSecondary,
    textAlign: 'center',
    paddingHorizontal: 32,
  },
});
