/**
 * ============================================================================
 * ARCHIVO: components/ItemCard.tsx
 * DESCRIPCIÓN: Componente visual de tarjeta (Card) para listar libros.
 * Muestra la portada, título, autor, género, año de publicación, calificación en
 * estrellas y un indicador de estado con color distintivo (disponible o prestado).
 * Permite interacción táctil para navegar al detalle del libro.
 * ============================================================================
 */
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Book } from '@/types/Entity';
import { APP_CONFIG } from '@/constants/config';

/**
 * Propiedades recibidas por el componente ItemCard
 */
interface ItemCardProps {
  /** Objeto del libro a renderizar */
  book: Book;
  /** Función callback que se activa al presionar la tarjeta */
  onPress: (book: Book) => void;
}

/**
 * Componente funcional ItemCard.
 * Diseñado para ser utilizado dentro de un FlatList en la pantalla de catálogo.
 */
export default function ItemCard({ book, onPress }: ItemCardProps) {
  // Comprobación booleana para determinar el estado de disponibilidad
  const isAvailable = book.status === APP_CONFIG.BOOK_STATUS.AVAILABLE;

  /**
   * Genera el arreglo de caracteres de estrella (★ o ☆)
   * basado en la calificación numérica del libro (1 a 5).
   */
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Text key={i} style={styles.star}>
          {i <= rating ? '★' : '☆'}
        </Text>
      );
    }
    return stars;
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(book)}
      activeOpacity={0.7}
    >
      {/* Portada del libro con imagen por defecto en caso de carga lenta */}
      <Image
        source={{ uri: book.coverUrl }}
        style={styles.cover}
        defaultSource={require('@/assets/images/icon.png')}
      />

      {/* Contenedor de metadatos y detalles textuales */}
      <View style={styles.content}>
        {/* Título del libro (máximo 2 líneas) */}
        <Text style={styles.title} numberOfLines={2}>
          {book.title}
        </Text>

        {/* Nombre del autor (máximo 1 línea) */}
        <Text style={styles.author} numberOfLines={1}>
          {book.author}
        </Text>

        {/* Fila intermedia: Categoría/Género y Año de publicación */}
        <View style={styles.metaRow}>
          <Text style={styles.genre}>{book.genre}</Text>
          <Text style={styles.year}>{book.year}</Text>
        </View>

        {/* Fila inferior: Estrellas de valoración y Badge de estado */}
        <View style={styles.bottomRow}>
          {/* Valoración gráfica en estrellas */}
          <View style={styles.ratingContainer}>{renderStars(book.rating)}</View>

          {/* Etiqueta / Badge de estado (Verde = Disponible, Naranja = Prestado) */}
          <View
            style={[
              styles.badge,
              {
                backgroundColor: isAvailable
                  ? APP_CONFIG.COLORS.statusAvailable
                  : APP_CONFIG.COLORS.statusBorrowed,
              },
            ]}
          >
            <Text style={styles.badgeText}>{book.status}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

/**
 * Hoja de estilos del componente ItemCard
 */
const styles = StyleSheet.create({
  // Tarjeta principal con elevación y sombra
  card: {
    flexDirection: 'row',
    backgroundColor: APP_CONFIG.COLORS.cardBackground,
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 6,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  // Imagen de portada con dimensiones fijas y bordes redondeados
  cover: {
    width: 80,
    height: 110,
    borderRadius: 8,
    backgroundColor: APP_CONFIG.COLORS.light,
  },
  // Contenedor de la información derecha del libro
  content: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  // Título destacado del libro
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: APP_CONFIG.COLORS.textPrimary,
    marginBottom: 4,
  },
  // Autor del libro
  author: {
    fontSize: 14,
    color: APP_CONFIG.COLORS.textSecondary,
    marginBottom: 6,
  },
  // Distribución en fila para género y año
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  // Etiqueta estilizada para el género
  genre: {
    fontSize: 12,
    color: APP_CONFIG.COLORS.primary,
    fontWeight: '500',
    backgroundColor: '#E8F0FE',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    overflow: 'hidden',
  },
  // Texto del año de publicación
  year: {
    fontSize: 12,
    color: APP_CONFIG.COLORS.textSecondary,
  },
  // Fila para estrellas y badge de estado
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  // Contenedor en fila para los caracteres de estrellas
  ratingContainer: {
    flexDirection: 'row',
  },
  // Estilo individual de cada estrella
  star: {
    fontSize: 16,
    color: APP_CONFIG.COLORS.warning,
    marginRight: 1,
  },
  // Etiqueta píldora para el estado del libro
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  // Texto dentro de la etiqueta de estado
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});

