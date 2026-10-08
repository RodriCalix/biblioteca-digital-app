import { api } from './api';
import { Book, CreateBookPayload, UpdateBookPayload } from '@/types/Entity';

const RESOURCE = '/books';

/**
 * Obtiene todos los libros del catálogo.
 * Operación GET /books
 */
export const getBooks = async (): Promise<Book[]> => {
  const response = await api.get<Book[]>(RESOURCE);
  return response.data;
};

/**
 * Obtiene un libro específico por su ID.
 * Operación GET /books/:id
 */
export const getBookById = async (id: string): Promise<Book> => {
  const response = await api.get<Book>(`${RESOURCE}/${id}`);
  return response.data;
};

/**
 * Crea un nuevo libro en el catálogo.
 * Operación POST /books
 */
export const createBook = async (book: CreateBookPayload): Promise<Book> => {
  const response = await api.post<Book>(RESOURCE, book);
  return response.data;
};

/**
 * Actualiza un libro existente.
 * Operación PUT /books/:id
 */
export const updateBook = async (id: string, changes: UpdateBookPayload): Promise<Book> => {
  const response = await api.put<Book>(`${RESOURCE}/${id}`, changes);
  return response.data;
};

/**
 * Elimina un libro del catálogo.
 * Operación DELETE /books/:id
 */
export const deleteBook = async (id: string): Promise<Book> => {
  const response = await api.delete<Book>(`${RESOURCE}/${id}`);
  return response.data;
};

