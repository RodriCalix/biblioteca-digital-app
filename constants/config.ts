// Configuración global de la aplicación
export const APP_CONFIG = {
  // URL base de MockAPI - Reemplaza con tu URL real de MockAPI.io
  API_BASE_URL: 'https://6ac70c67bea0e72cf5c96a7a.mockapi.io/api/v1',

  // Timeout para las peticiones HTTP (en milisegundos)
  API_TIMEOUT: 10000,

  // Nombre de la aplicación
  APP_NAME: 'Biblioteca Digital',

  // Colores de la aplicación
  COLORS: {
    primary: '#4A90D9',
    secondary: '#6C757D',
    success: '#28A745',
    danger: '#DC3545',
    warning: '#FFC107',
    info: '#17A2B8',
    light: '#F8F9FA',
    dark: '#343A40',
    background: '#F0F4F8',
    cardBackground: '#FFFFFF',
    textPrimary: '#212529',
    textSecondary: '#6C757D',
    border: '#DEE2E6',
    statusAvailable: '#28A745',
    statusBorrowed: '#FF6B35',
  },

  // Estados posibles de un libro
  BOOK_STATUS: {
    AVAILABLE: 'Disponible',
    BORROWED: 'Prestado',
  },

  // Géneros literarios predefinidos
  GENRES: [
    'Ficción',
    'No Ficción',
    'Ciencia Ficción',
    'Fantasía',
    'Misterio',
    'Romance',
    'Terror',
    'Biografía',
    'Historia',
    'Tecnología',
    'Autoayuda',
    'Poesía',
  ],
};

