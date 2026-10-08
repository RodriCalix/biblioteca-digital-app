// Interfaz principal para el modelo de datos de un libro
export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  year: number;
  status: string; // "Disponible" | "Prestado"
  coverUrl: string;
  rating: number;
}

// Tipo para crear un libro (sin id, lo genera MockAPI)
export type CreateBookPayload = Omit<Book, 'id'>;

// Tipo para actualizar un libro (campos parciales)
export type UpdateBookPayload = Partial<Omit<Book, 'id'>>;
