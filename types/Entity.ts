/**
 * ============================================================================
 * ARCHIVO: types/Entity.ts
 * DESCRIPCIÓN: Definiciones de tipos e interfaces de TypeScript para la entidad Libro (Book).
 * Centraliza los modelos de datos utilizados en toda la aplicación para garantizar
 * tipado estricto y prevenir errores en tiempo de compilación.
 * ============================================================================
 */

/**
 * Interfaz principal que representa la estructura completa de un Libro en la base de datos.
 */
export interface Book {
  /** Identificador único asignado automáticamente por MockAPI */
  id: string;
  /** Título del libro */
  title: string;
  /** Nombre del autor o autora */
  author: string;
  /** Género o categoría literaria */
  genre: string;
  /** Año de publicación */
  year: number;
  /** Estado de disponibilidad: "Disponible" o "Prestado" */
  status: string;
  /** URL pública de la imagen de portada */
  coverUrl: string;
  /** Calificación del libro (escala de 1 a 5) */
  rating: number;
}

/**
 * Tipo para la creación de un nuevo libro (petición POST).
 * Omite el campo 'id' ya que es generado automáticamente por el servidor/MockAPI.
 */
export type CreateBookPayload = Omit<Book, 'id'>;

/**
 * Tipo para la actualización parcial de un libro (petición PUT/PATCH).
 * Permite enviar únicamente los campos que han cambiado, excluyendo el 'id'.
 */
export type UpdateBookPayload = Partial<Omit<Book, 'id'>>;

