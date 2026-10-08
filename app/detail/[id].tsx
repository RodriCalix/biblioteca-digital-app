import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { Book } from '@/types/Entity';
import { getBookById, updateBook, deleteBook } from '@/services/resourceService';
import LoadingSpinner from '@/components/LoadingSpinner';
import { APP_CONFIG } from '@/constants/config';

/**
 * Pantalla de detalle del libro (GET, PUT/PATCH, DELETE)
 * Muestra toda la información del libro con opciones para editar estado,
 * calificación y eliminar.
 */
export default function BookDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cargar los datos del libro
  useEffect(() => {
    if (id) {
      fetchBookDetail();
    }
  }, [id]);

  const fetchBookDetail = async () => {
    try {
      setError(null);
      setLoading(true);
      const data = await getBookById(id!);
      setBook(data);
    } catch (err) {
      console.error('Error al cargar detalle:', err);
      setError('No se pudo cargar el libro.');
    } finally {
      setLoading(false);
    }
  };

  // Cambiar estado del libro (Disponible <-> Prestado)
  const handleToggleStatus = async () => {
    if (!book) return;

    const newStatus =
      book.status === APP_CONFIG.BOOK_STATUS.AVAILABLE
        ? APP_CONFIG.BOOK_STATUS.BORROWED
        : APP_CONFIG.BOOK_STATUS.AVAILABLE;

    setUpdating(true);
    try {
      const updated = await updateBook(book.id, { status: newStatus });
      setBook(updated);
      Alert.alert(
        '✅ Estado actualizado',
        `El libro ahora está "${newStatus}".`
      );
    } catch (err) {
      console.error('Error al actualizar estado:', err);
      Alert.alert('Error', 'No se pudo actualizar el estado.');
    } finally {
      setUpdating(false);
    }
  };

  // Cambiar calificación del libro
  const handleChangeRating = async (newRating: number) => {
    if (!book) return;

    setUpdating(true);
    try {
      const updated = await updateBook(book.id, { rating: newRating });
      setBook(updated);
      Alert.alert(
        '⭐ Calificación actualizada',
        `Nueva calificación: ${newRating} de 5 estrellas.`
      );
    } catch (err) {
      console.error('Error al actualizar calificación:', err);
      Alert.alert('Error', 'No se pudo actualizar la calificación.');
    } finally {
      setUpdating(false);
    }
  };

  // Eliminar el libro con confirmación
  const handleDelete = () => {
    if (!book) return;

    Alert.alert(
      '🗑️ Eliminar libro',
      `¿Estás seguro de eliminar "${book.title}"? Esta acción no se puede deshacer.`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sí, eliminar',
          style: 'destructive',
          onPress: async () => {
            setUpdating(true);
            try {
              await deleteBook(book.id);
              Alert.alert('✅ Eliminado', 'El libro ha sido eliminado.', [
                { text: 'OK', onPress: () => router.back() },
              ]);
            } catch (err) {
              console.error('Error al eliminar:', err);
              Alert.alert('Error', 'No se pudo eliminar el libro.');
              setUpdating(false);
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return <LoadingSpinner message="Cargando detalle..." />;
  }

  if (error || !book) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorIcon}>⚠️</Text>
        <Text style={styles.errorText}>
          {error || 'No se encontró el libro.'}
        </Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => router.back()}
        >
          <Text style={styles.retryButtonText}>Volver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const isAvailable = book.status === APP_CONFIG.BOOK_STATUS.AVAILABLE;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {updating && (
        <View style={styles.updatingOverlay}>
          <ActivityIndicator color={APP_CONFIG.COLORS.primary} size="small" />
          <Text style={styles.updatingText}>Actualizando...</Text>
        </View>
      )}

      {/* Imagen de portada */}
      <View style={styles.coverSection}>
        <Image
          source={{ uri: book.coverUrl }}
          style={styles.coverImage}
          defaultSource={require('@/assets/images/icon.png')}
        />
      </View>

      {/* Información principal */}
      <View style={styles.infoSection}>
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>por {book.author}</Text>

        {/* Badge de estado */}
        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor: isAvailable
                ? APP_CONFIG.COLORS.statusAvailable
                : APP_CONFIG.COLORS.statusBorrowed,
            },
          ]}
        >
          <Text style={styles.statusBadgeText}>
            {isAvailable ? '📗' : '📕'} {book.status}
          </Text>
        </View>
      </View>

      {/* Detalles del libro */}
      <View style={styles.detailsCard}>
        <Text style={styles.cardTitle}>📋 Detalles</Text>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Género</Text>
          <Text style={styles.detailValue}>{book.genre}</Text>
        </View>

        <View style={styles.separator} />

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Año</Text>
          <Text style={styles.detailValue}>{book.year}</Text>
        </View>

        <View style={styles.separator} />

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>ID</Text>
          <Text style={[styles.detailValue, styles.idText]}>{book.id}</Text>
        </View>
      </View>

      {/* Sección de calificación interactiva */}
      <View style={styles.detailsCard}>
        <Text style={styles.cardTitle}>⭐ Calificación</Text>
        <View style={styles.ratingContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity
              key={star}
              onPress={() => handleChangeRating(star)}
              disabled={updating}
              style={styles.starTouchable}
            >
              <Text
                style={[
                  styles.starLarge,
                  {
                    color:
                      star <= book.rating
                        ? APP_CONFIG.COLORS.warning
                        : '#D1D5DB',
                  },
                ]}
              >
                ★
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.ratingHint}>
          Toca una estrella para cambiar la calificación
        </Text>
      </View>

      {/* Botón de cambiar estado */}
      <TouchableOpacity
        style={[
          styles.statusToggleButton,
          {
            backgroundColor: isAvailable
              ? APP_CONFIG.COLORS.statusBorrowed
              : APP_CONFIG.COLORS.statusAvailable,
          },
        ]}
        onPress={handleToggleStatus}
        disabled={updating}
      >
        <Text style={styles.statusToggleText}>
          {isAvailable
            ? '📕 Marcar como Prestado'
            : '📗 Marcar como Disponible'}
        </Text>
      </TouchableOpacity>

      {/* Botón de eliminar */}
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={handleDelete}
        disabled={updating}
      >
        <Text style={styles.deleteButtonText}>🗑️ Eliminar Libro</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_CONFIG.COLORS.background,
  },
  content: {
    paddingBottom: 40,
  },
  updatingOverlay: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8F0FE',
    paddingVertical: 8,
    gap: 8,
  },
  updatingText: {
    color: APP_CONFIG.COLORS.primary,
    fontSize: 13,
    fontWeight: '600',
  },
  coverSection: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: APP_CONFIG.COLORS.cardBackground,
  },
  coverImage: {
    width: 180,
    height: 260,
    borderRadius: 12,
    backgroundColor: APP_CONFIG.COLORS.light,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  infoSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: APP_CONFIG.COLORS.cardBackground,
    borderBottomWidth: 1,
    borderBottomColor: APP_CONFIG.COLORS.border,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: APP_CONFIG.COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: 4,
  },
  author: {
    fontSize: 16,
    color: APP_CONFIG.COLORS.textSecondary,
    marginBottom: 12,
  },
  statusBadge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusBadgeText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  detailsCard: {
    backgroundColor: APP_CONFIG.COLORS.cardBackground,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: APP_CONFIG.COLORS.border,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: APP_CONFIG.COLORS.textPrimary,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  detailLabel: {
    fontSize: 14,
    color: APP_CONFIG.COLORS.textSecondary,
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 14,
    color: APP_CONFIG.COLORS.textPrimary,
    fontWeight: '600',
  },
  idText: {
    fontFamily: 'SpaceMono',
    color: APP_CONFIG.COLORS.primary,
  },
  separator: {
    height: 1,
    backgroundColor: APP_CONFIG.COLORS.border,
    marginVertical: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  starTouchable: {
    padding: 4,
  },
  starLarge: {
    fontSize: 36,
  },
  ratingHint: {
    textAlign: 'center',
    fontSize: 12,
    color: APP_CONFIG.COLORS.textSecondary,
    marginTop: 8,
  },
  statusToggleButton: {
    marginHorizontal: 16,
    marginTop: 20,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  statusToggleText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  deleteButton: {
    marginHorizontal: 16,
    marginTop: 12,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: APP_CONFIG.COLORS.danger,
    shadowColor: APP_CONFIG.COLORS.danger,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: APP_CONFIG.COLORS.background,
  },
  errorIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 16,
    color: APP_CONFIG.COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: APP_CONFIG.COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
