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

interface ItemCardProps {
  book: Book;
  onPress: (book: Book) => void;
}

/**
 * Tarjeta visual para mostrar información resumida de un libro.
 * Incluye badge de color según el estado (verde = Disponible, naranja = Prestado).
 */
export default function ItemCard({ book, onPress }: ItemCardProps) {
  const isAvailable = book.status === APP_CONFIG.BOOK_STATUS.AVAILABLE;

  // Renderiza estrellas para la calificación
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
      {/* Imagen de portada */}
      <Image
        source={{ uri: book.coverUrl }}
        style={styles.cover}
        defaultSource={require('@/assets/images/icon.png')}
      />

      {/* Contenido de la tarjeta */}
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {book.title}
        </Text>
        <Text style={styles.author} numberOfLines={1}>
          {book.author}
        </Text>

        <View style={styles.metaRow}>
          <Text style={styles.genre}>{book.genre}</Text>
          <Text style={styles.year}>{book.year}</Text>
        </View>

        <View style={styles.bottomRow}>
          {/* Estrellas de rating */}
          <View style={styles.ratingContainer}>{renderStars(book.rating)}</View>

          {/* Badge de estado */}
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

const styles = StyleSheet.create({
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
  cover: {
    width: 80,
    height: 110,
    borderRadius: 8,
    backgroundColor: APP_CONFIG.COLORS.light,
  },
  content: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: APP_CONFIG.COLORS.textPrimary,
    marginBottom: 4,
  },
  author: {
    fontSize: 14,
    color: APP_CONFIG.COLORS.textSecondary,
    marginBottom: 6,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
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
  year: {
    fontSize: 12,
    color: APP_CONFIG.COLORS.textSecondary,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
  },
  star: {
    fontSize: 16,
    color: APP_CONFIG.COLORS.warning,
    marginRight: 1,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});
