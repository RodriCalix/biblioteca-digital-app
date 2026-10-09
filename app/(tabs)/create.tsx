/**
 * ============================================================================
 * ARCHIVO: app/(tabs)/create.tsx
 * DESCRIPCIÓN: Pantalla de Registro / Creación de Libros (Operación POST).
 * Permite al usuario registrar un nuevo libro en el catálogo con:
 * 1. Campos validados para título, autor, género y año de publicación.
 * 2. Campo opcional para URL de portada (con imagen aleatoria de respaldo si está vacío).
 * 3. Selector interactivo de calificación por estrellas (1 a 5).
 * 4. Selector de estado inicial (Disponible / Prestado).
 * 5. Envío mediante createBook a MockAPI y alerta con navegación de regreso al catálogo.
 * ============================================================================
 */
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
 * Componente CreateBookScreen.
 * Gestiona el formulario controlado para agregar un nuevo libro.
 */
export default function CreateBookScreen() {
  // Hook de navegación de Expo Router
  const router = useRouter();

  // Estado para indicar si la petición de guardado está en progreso
  const [loading, setLoading] = useState(false);

  // Estados locales para los valores de cada campo del formulario
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [rating, setRating] = useState(3);
  const [status, setStatus] = useState(APP_CONFIG.BOOK_STATUS.AVAILABLE);

  // Estado para almacenar los errores de validación por cada campo
  const [errors, setErrors] = useState<Record<string, string>>({});

  /**
   * Función de validación del formulario en el cliente.
   * Verifica campos obligatorios y formato numérico del año.
   * @returns true si no hay errores, false si falta algún campo requerido.
   */
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validación: Título requerido
    if (!title.trim()) {
      newErrors.title = 'El título es obligatorio.';
    }
    // Validación: Autor requerido
    if (!author.trim()) {
      newErrors.author = 'El autor es obligatorio.';
    }
    // Validación: Género requerido
    if (!genre.trim()) {
      newErrors.genre = 'El género es obligatorio.';
    }
    // Validación: Año requerido y dentro de un rango cronológico válido
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

  /**
   * Manejador para enviar el formulario y persistir el libro en la API (POST).
   */
  const handleSave = async () => {
    // Si la validación falla, se detiene la ejecución
    if (!validate()) return;

    setLoading(true);
    try {
      // Construcción del objeto para enviar a la API
      const newBook = {
        title: title.trim(),
        author: author.trim(),
        genre: genre.trim(),
        year: parseInt(year, 10),
        status,
        // Si no se proporcionó portada, se genera una imagen aleatoria de Picsum
        coverUrl: coverUrl.trim() || `https://picsum.photos/seed/${Date.now()}/200/300`,
        rating,
      };

      // Llamada al servicio POST
      await createBook(newBook);

      // Alerta de éxito con confirmación y redirección al catálogo
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

  /**
   * Restablece todos los campos del formulario a sus valores iniciales
   */
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

  // Muestra spinner durante la creación
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
        {/* Encabezado descriptivo del formulario */}
        <Text style={styles.header}>📖 Nuevo Libro</Text>
        <Text style={styles.subtitle}>
          Completa los datos del libro para agregarlo al catálogo.
        </Text>

        {/* Campo de texto: Título */}
        <CustomInput
          label="Título *"
          value={title}
          onChangeText={setTitle}
          placeholder="Ej: Cien años de soledad"
          error={errors.title}
        />

        {/* Campo de texto: Autor */}
        <CustomInput
          label="Autor *"
          value={author}
          onChangeText={setAuthor}
          placeholder="Ej: Gabriel García Márquez"
          error={errors.author}
        />

        {/* Campo de texto: Género */}
        <CustomInput
          label="Género *"
          value={genre}
          onChangeText={setGenre}
          placeholder="Ej: Ficción, Ciencia Ficción, etc."
          error={errors.genre}
        />

        {/* Campo de texto: Año de publicación */}
        <CustomInput
          label="Año de publicación *"
          value={year}
          onChangeText={setYear}
          placeholder="Ej: 1967"
          keyboardType="numeric"
          maxLength={4}
          error={errors.year}
        />

        {/* Campo de texto: URL de la portada */}
        <CustomInput
          label="URL de portada (opcional)"
          value={coverUrl}
          onChangeText={setCoverUrl}
          placeholder="https://ejemplo.com/portada.jpg"
          keyboardType="url"
        />

        {/* Sección: Selector interactivo de estrellas de calificación */}
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

        {/* Sección: Selector de disponibilidad (Disponible / Prestado) */}
        <View style={styles.statusSection}>
          <Text style={styles.sectionLabel}>Estado</Text>
          <View style={styles.statusRow}>
            {/* Opción Disponible */}
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

            {/* Opción Prestado */}
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

        {/* Botón principal: Guardar libro */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>💾 Guardar Libro</Text>
        </TouchableOpacity>

        {/* Botón secundario: Limpiar todos los campos */}
        <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
          <Text style={styles.clearButtonText}>🗑️ Limpiar Formulario</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

/**
 * Estilos visuales de la pantalla de creación
 */
const styles = StyleSheet.create({
  // Contenedor principal con fondo de la app
  container: {
    flex: 1,
    backgroundColor: APP_CONFIG.COLORS.background,
  },
  // Espaciado interno para el contenido deslizable
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  // Título grande de la pantalla
  header: {
    fontSize: 24,
    fontWeight: '700',
    color: APP_CONFIG.COLORS.textPrimary,
    marginBottom: 4,
  },
  // Subtítulo con instrucciones
  subtitle: {
    fontSize: 14,
    color: APP_CONFIG.COLORS.textSecondary,
    marginBottom: 24,
  },
  // Etiquetas de las secciones personalizadas (calificación, estado)
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: APP_CONFIG.COLORS.textPrimary,
    marginBottom: 8,
  },
  // Contenedor del selector de calificación
  ratingSection: {
    marginBottom: 20,
  },
  // Distribución horizontal de las estrellas
  ratingRow: {
    flexDirection: 'row',
    gap: 4,
  },
  // Área táctil para cada estrella
  starButton: {
    padding: 4,
  },
  // Tamaño del caracter de estrella
  starText: {
    fontSize: 32,
  },
  // Contenedor de la sección de estado
  statusSection: {
    marginBottom: 24,
  },
  // Fila de los dos botones de estado
  statusRow: {
    flexDirection: 'row',
    gap: 12,
  },
  // Estilo base de los botones de estado
  statusButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: APP_CONFIG.COLORS.border,
    alignItems: 'center',
    backgroundColor: APP_CONFIG.COLORS.cardBackground,
  },
  // Estilo cuando 'Disponible' está seleccionado
  statusButtonActive: {
    borderColor: APP_CONFIG.COLORS.statusAvailable,
    backgroundColor: '#E8F5E9',
  },
  // Estilo cuando 'Prestado' está seleccionado
  statusBorrowedActive: {
    borderColor: APP_CONFIG.COLORS.statusBorrowed,
    backgroundColor: '#FFF3E0',
  },
  // Texto por defecto dentro de los botones de estado
  statusButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: APP_CONFIG.COLORS.textSecondary,
  },
  // Texto activo dentro del botón de estado seleccionado
  statusButtonTextActive: {
    color: APP_CONFIG.COLORS.textPrimary,
  },
  // Botón para guardar el registro con sombra
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
  // Texto del botón guardar
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
  // Botón para limpiar el formulario
  clearButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: APP_CONFIG.COLORS.border,
  },
  // Texto del botón limpiar
  clearButtonText: {
    color: APP_CONFIG.COLORS.textSecondary,
    fontSize: 15,
    fontWeight: '600',
  },
});

