/**
 * ============================================================================
 * ARCHIVO: services/resourceService.ts
 * DESCRIPCIÓN: Capa de servicios para la entidad Libro (Books).
 * Contiene todas las funciones de comunicación asíncrona que consumen los
 * endpoints CRUD de la API REST (GET, POST, PUT/PATCH, DELETE).
 * ============================================================================
 */
import { api } from './api';
import { Book, CreateBookPayload, UpdateBookPayload } from '@/types/Entity';

// Endpoint del recurso en la API REST
const RESOURCE = '/books';

/**
 * Obtiene todos los libros del catálogo.
 * 
 * Operación: GET /books
 * @returns Promesa con el arreglo de libros existentes.
 */
export const getBooks = async (): Promise<Book[]> => {
  const response = await api.get<Book[]>(RESOURCE);
  return response.data;
};

/**
 * Obtiene los detalles completos de un libro específico mediante su ID.
 * 
 * Operación: GET /books/:id
 * @param id Identificador único del libro.
 * @returns Promesa con los datos del libro consultado.
 */
export const getBookById = async (id: string): Promise<Book> => {
  const response = await api.get<Book>(`${RESOURCE}/${id}`);
  return response.data;
};

/**
 * Registra un nuevo libro en la base de datos de la biblioteca.
 * 
 * Operación: POST /books
 * @param book Objeto con la información del nuevo libro (sin id).
 * @returns Promesa con el libro creado, incluyendo el ID asignado por la API.
 */
export const createBook = async (book: CreateBookPayload): Promise<Book> => {
  const response = await api.post<Book>(RESOURCE, book);
  return response.data;
};

/**
 * Actualiza parcialmente o totalmente la información de un libro existente.
 * 
 * Operación: PUT /books/:id
 * @param id Identificador del libro a actualizar.
 * @param changes Objeto con las propiedades modificadas del libro.
 * @returns Promesa con el libro actualizado.
 */
export const updateBook = async (id: string, changes: UpdateBookPayload): Promise<Book> => {
  const response = await api.put<Book>(`${RESOURCE}/${id}`, changes);
  return response.data;
};

/**
 * Elimina permanentemente un libro del catálogo por su ID.
 * 
 * Operación: DELETE /books/:id
 * @param id Identificador del libro que se desea remover.
 * @returns Promesa con el registro del libro eliminado.
 */
export const deleteBook = async (id: string): Promise<Book> => {
  const response = await api.delete<Book>(`${RESOURCE}/${id}`);
  return response.data;
};

