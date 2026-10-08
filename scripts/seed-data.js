/**
 * Script para poblar MockAPI con 10 libros de ejemplo.
 * Ejecutar con: node scripts/seed-data.js
 */
const axios = require('axios');

const BASE_URL = 'https://6ac70c67bea0e72cf5c96a7a.mockapi.io/api/v1';

const books = [
  {
    title: 'Cien años de soledad',
    author: 'Gabriel García Márquez',
    genre: 'Ficción',
    year: 1967,
    status: 'Disponible',
    coverUrl: 'https://picsum.photos/seed/book1/200/300',
    rating: 5,
  },
  {
    title: 'Don Quijote de la Mancha',
    author: 'Miguel de Cervantes',
    genre: 'Ficción',
    year: 1605,
    status: 'Prestado',
    coverUrl: 'https://picsum.photos/seed/book2/200/300',
    rating: 5,
  },
  {
    title: '1984',
    author: 'George Orwell',
    genre: 'Ciencia Ficción',
    year: 1949,
    status: 'Disponible',
    coverUrl: 'https://picsum.photos/seed/book3/200/300',
    rating: 4,
  },
  {
    title: 'El Principito',
    author: 'Antoine de Saint-Exupéry',
    genre: 'Ficción',
    year: 1943,
    status: 'Disponible',
    coverUrl: 'https://picsum.photos/seed/book4/200/300',
    rating: 5,
  },
  {
    title: 'Rayuela',
    author: 'Julio Cortázar',
    genre: 'Ficción',
    year: 1963,
    status: 'Prestado',
    coverUrl: 'https://picsum.photos/seed/book5/200/300',
    rating: 4,
  },
  {
    title: 'Sapiens: De animales a dioses',
    author: 'Yuval Noah Harari',
    genre: 'No Ficción',
    year: 2011,
    status: 'Disponible',
    coverUrl: 'https://picsum.photos/seed/book6/200/300',
    rating: 4,
  },
  {
    title: 'El nombre del viento',
    author: 'Patrick Rothfuss',
    genre: 'Fantasía',
    year: 2007,
    status: 'Disponible',
    coverUrl: 'https://picsum.photos/seed/book7/200/300',
    rating: 5,
  },
  {
    title: 'El código Da Vinci',
    author: 'Dan Brown',
    genre: 'Misterio',
    year: 2003,
    status: 'Prestado',
    coverUrl: 'https://picsum.photos/seed/book8/200/300',
    rating: 3,
  },
  {
    title: 'Clean Code',
    author: 'Robert C. Martin',
    genre: 'Tecnología',
    year: 2008,
    status: 'Disponible',
    coverUrl: 'https://picsum.photos/seed/book9/200/300',
    rating: 4,
  },
  {
    title: 'La sombra del viento',
    author: 'Carlos Ruiz Zafón',
    genre: 'Misterio',
    year: 2001,
    status: 'Disponible',
    coverUrl: 'https://picsum.photos/seed/book10/200/300',
    rating: 5,
  },
];

async function seedBooks() {
  console.log('🌱 Iniciando seed de datos en MockAPI...\n');

  for (const book of books) {
    try {
      const response = await axios.post(`${BASE_URL}/books`, book);
      console.log(`✅ Creado: "${book.title}" (ID: ${response.data.id})`);
    } catch (error) {
      console.error(`❌ Error al crear "${book.title}":`, error.message);
    }
  }

  console.log('\n🎉 Seed completado!');
}

seedBooks();

