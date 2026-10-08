import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';

import CustomInput from '@/components/CustomInput';
import LoadingSpinner from '@/components/LoadingSpinner';
import { createBook } from '@/services/resourceService';
import { APP_CONFIG } from '@/constants/config';

/**
 * Pantalla de registro - Agregar nuevo libro (POST)
 * Formulario con validación y envío a la API.
 */
export default function CreateBookScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Estados del formulario
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [rating, setRating] = useState(3);
  const [status, setStatus] = useState(APP_CONFIG.BOOK_STATUS.AVAILABLE);

  // Estados de validación
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Validación del formulario
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!title.trim()) {
      newErrors.title = 'El título es obligatorio.';
    }
    if (!author.trim()) {
      newErrors.author = 'El autor es obligatorio.';
    }
    if (!genre.trim()) {
      newErrors.genre = 'El género es obligatorio.';
    }
    if (!year.trim()) {
      newErrors.year = 'El año es obligatorio.';
    } else {
      const yearNum = parseInt(year, 10);
      if (isNaN(yearNum) || yearNum < 1000 || yearNum > new Date().getFullYear()) {
        newErrors.year = `Ingresa un año válido (1000-${new Date().getFullYear()}).`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Guardar el libro
  const handleSave = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      const newBook = {
        title: title.trim(),
        author: author.trim(),
        genre: genre.trim(),
        year: parseInt(year, 10),
        status,
        coverUrl: coverUrl.trim() || `https://picsum.photos/seed/${Date.now()}/200/300`,
        rating,
      };

      await createBook(newBook);

      Alert.alert(
        '✅ Éxito',
        `"${newBook.title}" ha sido agregado al catálogo.`,
        [
          {
            text: 'OK',
            onPress: () => router.replace('/'),
          },
        ]
      );
    } catch (err) {
      console.error('Error al crear libro:', err);
      Alert.alert('Error', 'No se pudo agregar el libro. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  // Limpiar formulario
  const handleClear = () => {
    setTitle('');
    setAuthor('');
    setGenre('');
    setYear('');
    setCoverUrl('');
    setRating(3);
    setStatus(APP_CONFIG.BOOK_STATUS.AVAILABLE);
    setErrors({});
  };

  if (loading) {
    return <LoadingSpinner message="Guardando libro..." />;
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.header}>📖 Nuevo Libro</Text>
        <Text style={styles.subtitle}>
          Completa los datos del libro para agregarlo al catálogo.
        </Text>

        <CustomInput
          label="Título *"
          value={title}
          onChangeText={setTitle}
          placeholder="Ej: Cien años de soledad"
          error={errors.title}
        />

        <CustomInput
          label="Autor *"
          value={author}
          onChangeText={setAuthor}
          placeholder="Ej: Gabriel García Márquez"
          error={errors.author}
        />

        <CustomInput
          label="Género *"
          value={genre}
          onChangeText={setGenre}
          placeholder="Ej: Ficción, Ciencia Ficción, etc."
          error={errors.genre}
        />

        <CustomInput
          label="Año de publicación *"
          value={year}
          onChangeText={setYear}
          placeholder="Ej: 1967"
          keyboardType="numeric"
          maxLength={4}
          error={errors.year}
        />

        <CustomInput
          label="URL de portada (opcional)"
          value={coverUrl}
          onChangeText={setCoverUrl}
          placeholder="https://ejemplo.com/portada.jpg"
          keyboardType="url"
        />

        {/* Selector de calificación */}
        <View style={styles.ratingSection}>
          <Text style={styles.sectionLabel}>Calificación</Text>
          <View style={styles.ratingRow}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                onPress={() => setRating(star)}
                style={styles.starButton}
              >
                <Text
                  style={[
                    styles.starText,
                    { color: star <= rating ? APP_CONFIG.COLORS.warning : '#D1D5DB' },
                  ]}
                >
                  ★
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Selector de estado */}
        <View style={styles.statusSection}>
          <Text style={styles.sectionLabel}>Estado</Text>
          <View style={styles.statusRow}>
            <TouchableOpacity
              style={[
                styles.statusButton,
                status === APP_CONFIG.BOOK_STATUS.AVAILABLE &&
                  styles.statusButtonActive,
              ]}
              onPress={() => setStatus(APP_CONFIG.BOOK_STATUS.AVAILABLE)}
            >
              <Text
                style={[
                  styles.statusButtonText,
                  status === APP_CONFIG.BOOK_STATUS.AVAILABLE &&
                    styles.statusButtonTextActive,
                ]}
              >
                📗 Disponible
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.statusButton,
                status === APP_CONFIG.BOOK_STATUS.BORROWED &&
                  styles.statusBorrowedActive,
              ]}
              onPress={() => setStatus(APP_CONFIG.BOOK_STATUS.BORROWED)}
            >
              <Text
                style={[
                  styles.statusButtonText,
                  status === APP_CONFIG.BOOK_STATUS.BORROWED &&
                    styles.statusButtonTextActive,
                ]}
              >
                📕 Prestado
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Botones de acción */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>💾 Guardar Libro</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
          <Text style={styles.clearButtonText}>🗑️ Limpiar Formulario</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_CONFIG.COLORS.background,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    color: APP_CONFIG.COLORS.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: APP_CONFIG.COLORS.textSecondary,
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: APP_CONFIG.COLORS.textPrimary,
    marginBottom: 8,
  },
  ratingSection: {
    marginBottom: 20,
  },
  ratingRow: {
    flexDirection: 'row',
    gap: 4,
  },
  starButton: {
    padding: 4,
  },
  starText: {
    fontSize: 32,
  },
  statusSection: {
    marginBottom: 24,
  },
  statusRow: {
    flexDirection: 'row',
    gap: 12,
  },
  statusButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: APP_CONFIG.COLORS.border,
    alignItems: 'center',
    backgroundColor: APP_CONFIG.COLORS.cardBackground,
  },
  statusButtonActive: {
    borderColor: APP_CONFIG.COLORS.statusAvailable,
    backgroundColor: '#E8F5E9',
  },
  statusBorrowedActive: {
    borderColor: APP_CONFIG.COLORS.statusBorrowed,
    backgroundColor: '#FFF3E0',
  },
  statusButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: APP_CONFIG.COLORS.textSecondary,
  },
  statusButtonTextActive: {
    color: APP_CONFIG.COLORS.textPrimary,
  },
  saveButton: {
    backgroundColor: APP_CONFIG.COLORS.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: APP_CONFIG.COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
  clearButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: APP_CONFIG.COLORS.border,
  },
  clearButtonText: {
    color: APP_CONFIG.COLORS.textSecondary,
    fontSize: 15,
    fontWeight: '600',
  },
});

