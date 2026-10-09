/**
 * ============================================================================
 * ARCHIVO: constants/config.ts
 * DESCRIPCIÓN: Objeto de configuración global para la aplicación de biblioteca.
 * Define la URL base de la API, tiempos de espera, paleta cromática,
 * estados permitidos para los libros y catálogo predeterminado de géneros.
 * ============================================================================
 */
export const APP_CONFIG = {
  // URL base del backend simulado en MockAPI.io donde se almacenan los libros
  API_BASE_URL: 'https://6ac70c67bea0e72cf5c96a7a.mockapi.io/api/v1',

  // Tiempo límite (en milisegundos) antes de cancelar una solicitud HTTP por timeout
  API_TIMEOUT: 10000,

  // Nombre visible y título comercial de la aplicación móvil
  APP_NAME: 'Biblioteca Digital',

  // Paleta de colores principal para mantener coherencia de diseño en toda la app
  COLORS: {
    primary: '#4A90D9',       // Color primario (azul) para botones, barras de navegación y destacados
    secondary: '#6C757D',     // Color secundario (gris) para textos secundarios y detalles neutros
    success: '#28A745',       // Color para acciones exitosas
    danger: '#DC3545',        // Color para advertencias, errores y eliminación
    warning: '#FFC107',       // Color de advertencia y estrellas de calificación
    info: '#17A2B8',          // Color para botones informativos y enlaces
    light: '#F8F9FA',         // Color gris muy claro para fondos de componentes inactivos
    dark: '#343A40',          // Color oscuro para textos o contrastes fuertes
    background: '#F0F4F8',    // Color de fondo principal de las pantallas
    cardBackground: '#FFFFFF',// Fondo blanco de las tarjetas y contenedores
    textPrimary: '#212529',   // Color del texto principal de alto contraste
    textSecondary: '#6C757D', // Color de texto secundario y subtítulos
    border: '#DEE2E6',        // Color de bordes y divisores
    statusAvailable: '#28A745', // Verde para indicar libro disponible
    statusBorrowed: '#FF6B35',  // Naranja para indicar libro prestado
  },

  // Estados estándar del ciclo de vida de un libro en la biblioteca
  BOOK_STATUS: {
    AVAILABLE: 'Disponible',
    BORROWED: 'Prestado',
  },

  // Lista de géneros literarios disponibles para categorización y filtrado
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

