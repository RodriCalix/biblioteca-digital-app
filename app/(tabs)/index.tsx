import React, { useState, useCallback } from 'react';
import {
  View,
  FlatList,
  TextInput,
  StyleSheet,
  Text,
  RefreshControl,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';

import { Book } from '@/types/Entity';
import { getBooks } from '@/services/resourceService';
import ItemCard from '@/components/ItemCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { APP_CONFIG } from '@/constants/config';

/**
 * Pantalla principal - Catálogo de libros (GET)
 * Muestra la lista de libros con buscador y filtrado dinámico.
 */
export default function CatalogScreen() {
  const router = useRouter();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Función para cargar los libros desde la API
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

  // Recargar al hacer focus en la pantalla (useFocusEffect)
  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchBooks();
    }, [fetchBooks])
  );

  // Pull-to-refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchBooks();
  }, [fetchBooks]);

  // Filtrar libros por título o autor
  const filteredBooks = books.filter(
    (b) =>
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Navegar al detalle de un libro
  const handleBookPress = (book: Book) => {
    router.push(`/detail/${book.id}`);
  };

  if (loading) {
    return <LoadingSpinner message="Cargando catálogo..." />;
  }

  return (
    <View style={styles.container}>
      {/* Barra de búsqueda */}
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
        {searchQuery.length > 0 && (
          <Text style={styles.clearButton} onPress={() => setSearchQuery('')}>
            ✕
          </Text>
        )}
      </View>

      {/* Contador de resultados */}
      <Text style={styles.resultsCount}>
        {filteredBooks.length} libro{filteredBooks.length !== 1 ? 's' : ''}{' '}
        encontrado{filteredBooks.length !== 1 ? 's' : ''}
      </Text>

      {/* Mensaje de error */}
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {/* Lista de libros */}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_CONFIG.COLORS.background,
  },
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
  searchIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: APP_CONFIG.COLORS.textPrimary,
  },
  clearButton: {
    fontSize: 18,
    color: APP_CONFIG.COLORS.textSecondary,
    padding: 4,
  },
  resultsCount: {
    fontSize: 13,
    color: APP_CONFIG.COLORS.textSecondary,
    marginHorizontal: 20,
    marginVertical: 8,
  },
  listContent: {
    paddingBottom: 20,
  },
  errorContainer: {
    backgroundColor: '#FFF0F0',
    marginHorizontal: 16,
    marginBottom: 8,
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: APP_CONFIG.COLORS.danger,
  },
  errorText: {
    color: APP_CONFIG.COLORS.danger,
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    color: APP_CONFIG.COLORS.textSecondary,
    textAlign: 'center',
    paddingHorizontal: 32,
  },
});
