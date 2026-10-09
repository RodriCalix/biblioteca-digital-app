/**
 * ============================================================================
 * ARCHIVO: app/detail/[id].tsx
 * DESCRIPCIÓN: Pantalla de Detalle de Libro (Operaciones GET, PUT y DELETE).
 * Permite visualizar la información completa de un libro y realizar acciones:
 * 1. Cargar el detalle individual mediante su ID (GET /books/:id).
 * 2. Alternar su estado entre "Disponible" y "Prestado" (PUT /books/:id).
 * 3. Modificar la calificación con estrellas interactivas (PUT /books/:id).
 * 4. Eliminar el libro con cuadro de diálogo de confirmación (DELETE /books/:id).
 * ============================================================================
 */
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
 * Componente BookDetailScreen.
 * Maneja la visualización detallada y operaciones de actualización y eliminación.
 */
export default function BookDetailScreen() {
  // Obtiene el parámetro de ruta 'id' desde la URL dinámica
  const { id } = useLocalSearchParams<{ id: string }>();
  // Hook para navegación hacia atrás o reemplazo de ruta
  const router = useRouter();

  // Estado que almacena la información detallada del libro actual
  const [book, setBook] = useState<Book | null>(null);
  // Estado para la carga inicial de datos
  const [loading, setLoading] = useState(true);
  // Estado para deshabilitar botones y mostrar overlay mientras se actualiza o elimina
  const [updating, setUpdating] = useState(false);
  // Estado para capturar y mostrar errores de conexión
  const [error, setError] = useState<string | null>(null);

  /**
   * Efecto que dispara la consulta del libro cuando el parámetro 'id' está disponible
   */
  useEffect(() => {
    if (id) {
      fetchBookDetail();
    }
  }, [id]);

  /**
   * Consulta el registro del libro en la API (GET /books/:id)
   */
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

  /**
   * Alterna el estado del libro entre 'Disponible' y 'Prestado'
   * Ejecuta una solicitud de actualización en el servidor (PUT)
   */
  const handleToggleStatus = async () => {
    if (!book) return;

    // Conmutador del nuevo estado
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

  /**
   * Modifica la calificación por estrellas del libro (1 a 5)
   * Ejecuta una actualización en la API (PUT)
   */
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

  /**
   * Solicita confirmación y elimina permanentemente el libro (DELETE)
   */
  const handleDelete = () => {
    if (!book) return;

    // Diálogo de confirmación nativo para prevenir borrado accidental
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
              // Llamada a la operación DELETE
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

  // Renderizado condicional durante la carga inicial
  if (loading) {
    return <LoadingSpinner message="Cargando detalle..." />;
  }

  // Vista en caso de que ocurra un error o el libro no exista
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

  // Bandera de disponibilidad
  const isAvailable = book.status === APP_CONFIG.BOOK_STATUS.AVAILABLE;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Barra de progreso / overlay superior cuando una acción asíncrona está en curso */}
      {updating && (
        <View style={styles.updatingOverlay}>
          <ActivityIndicator color={APP_CONFIG.COLORS.primary} size="small" />
          <Text style={styles.updatingText}>Actualizando...</Text>
        </View>
      )}

      {/* Sección 1: Portada grande del libro */}
      <View style={styles.coverSection}>
        <Image
          source={{ uri: book.coverUrl }}
          style={styles.coverImage}
          defaultSource={require('@/assets/images/icon.png')}
        />
      </View>

      {/* Sección 2: Información principal (título, autor y badge de estado) */}
      <View style={styles.infoSection}>
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>por {book.author}</Text>

        {/* Badge visual de disponibilidad */}
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

      {/* Sección 3: Tarjeta con metadatos técnicos (Género, Año, ID) */}
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

      {/* Sección 4: Selector de calificación interactivo (tocar para actualizar) */}
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

      {/* Botón de acción: Alternar estado Disponible <-> Prestado */}
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

      {/* Botón de acción peligrosa: Eliminar libro */}
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

/**
 * Estilos visuales de la pantalla de detalles
 */
const styles = StyleSheet.create({
  // Contenedor principal
  container: {
    flex: 1,
    backgroundColor: APP_CONFIG.COLORS.background,
  },
  // Espaciado inferior para permitir scroll cómodo
  content: {
    paddingBottom: 40,
  },
  // Barra de estado durante peticiones de actualización
  updatingOverlay: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8F0FE',
    paddingVertical: 8,
    gap: 8,
  },
  // Texto dentro de la barra de actualización
  updatingText: {
    color: APP_CONFIG.COLORS.primary,
    fontSize: 13,
    fontWeight: '600',
  },
  // Contenedor centrado para la portada
  coverSection: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: APP_CONFIG.COLORS.cardBackground,
  },
  // Imagen de portada con sombra pronunciada
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
  // Sección de textos informativos principales
  infoSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: APP_CONFIG.COLORS.cardBackground,
    borderBottomWidth: 1,
    borderBottomColor: APP_CONFIG.COLORS.border,
  },
  // Título destacado del libro
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: APP_CONFIG.COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: 4,
  },
  // Nombre del autor
  author: {
    fontSize: 16,
    color: APP_CONFIG.COLORS.textSecondary,
    marginBottom: 12,
  },
  // Etiqueta del estado
  statusBadge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  // Texto del badge de estado
  statusBadgeText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  // Tarjeta contenedora de detalles
  detailsCard: {
    backgroundColor: APP_CONFIG.COLORS.cardBackground,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: APP_CONFIG.COLORS.border,
  },
  // Título de sección dentro de la tarjeta
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: APP_CONFIG.COLORS.textPrimary,
    marginBottom: 12,
  },
  // Fila de clave y valor
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  // Etiqueta del campo (clave)
  detailLabel: {
    fontSize: 14,
    color: APP_CONFIG.COLORS.textSecondary,
    fontWeight: '500',
  },
  // Valor del campo
  detailValue: {
    fontSize: 14,
    color: APP_CONFIG.COLORS.textPrimary,
    fontWeight: '600',
  },
  // Formato tipográfico especial para el identificador único
  idText: {
    fontFamily: 'SpaceMono',
    color: APP_CONFIG.COLORS.primary,
  },
  // Línea separadora tenue
  separator: {
    height: 1,
    backgroundColor: APP_CONFIG.COLORS.border,
    marginVertical: 4,
  },
  // Contenedor horizontal de estrellas táctiles
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  // Espaciado táctil por estrella
  starTouchable: {
    padding: 4,
  },
  // Tamaño grande de la estrella
  starLarge: {
    fontSize: 36,
  },
  // Sugerencia interactiva para el usuario
  ratingHint: {
    textAlign: 'center',
    fontSize: 12,
    color: APP_CONFIG.COLORS.textSecondary,
    marginTop: 8,
  },
  // Botón para alternar estado
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
  // Texto del botón de alternar estado
  statusToggleText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  // Botón para eliminar libro en rojo
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
  // Texto del botón eliminar
  deleteButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  // Contenedor de error si no se pudo cargar el libro
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: APP_CONFIG.COLORS.background,
  },
  // Ícono de advertencia
  errorIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  // Texto del mensaje de error
  errorText: {
    fontSize: 16,
    color: APP_CONFIG.COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
  },
  // Botón para volver atrás tras un error
  retryButton: {
    backgroundColor: APP_CONFIG.COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },
  // Texto del botón de reintento/volver
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});

